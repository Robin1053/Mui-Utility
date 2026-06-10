import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    MUIOTPInputProps,
    useEvent,
    getFilledArray,
    joinArrayStrings,
    mergeArrayStringFromIndex,
    updateIndex,
    KEYBOARD_KEY,
    split
} from '@robineb/mui-utility';

const StatRoot = styled('div', {
    name: 'MUIOTPInput', // The component name
    slot: 'root', // The slot name
})(({ theme }) => ({
}));

const Textfield = styled('div', {
    name: 'MUIOTPInput',
    slot: 'Input',
})(({ theme }) => ({
}));

const Dash = styled('text', {
    name: 'MUIDash',
    slot: 'Dash'
})(({ theme }) => ({
}))


//function MUIOTPInput({ Props, autoFocus, error, length, loading, onChange, onComplete, validateChar, value }: MUIOTPInputProps) {
const MUIOTPInput = React.forwardRef<HTMLDivElement, MUIOTPInputProps>(function MUIOTPInput(MUIOTPInputProps, ref) {

    const initialValue = React.useRef(MUIOTPInputProps.value);
    const onCallbackEvent = useEvent(MUIOTPInputProps.onComplete);

    const matchIsCompletedEvent = useEvent((filledStrings: string) => {
        const finalValue = filledStrings.slice(0, length)

        return {
            isCompleted: finalValue.length === length,
            finalValue
        }
    })

    React.useEffect(() => {
        const { isCompleted, finalValue } = matchIsCompletedEvent(
            initialValue.current
        )

        if (isCompleted) {
            onCallbackEvent(finalValue)
        }
    }, [length, onCallbackEvent, matchIsCompletedEvent])

    const getIndexByInputElement = (inputElement: HTMLInputElement) => {
        return valueSplitted.findIndex(({ inputRef }) => {
            return inputRef.current === inputElement
        })
    }

    const getCharactersSplitted = () => {
        return valueSplitted.map(({ character }) => {
            return character
        })
    }

    const replaceCharOfValue = (charIndex: number, charValue: string) => {
        const newValueSplitted = updateIndex(
            getCharactersSplitted(),
            charIndex,
            charValue
        )

        return joinArrayStrings(newValueSplitted)
    }

    const focusInputByIndex = (inputIndex: number) => {
        valueSplitted[inputIndex]?.inputRef.current?.focus()
    }

    const selectInputByIndex = (inputIndex: number) => {
        valueSplitted[inputIndex]?.inputRef.current?.select()
    }

    const manageCaretForNextInput = (currentInputIndex: number) => {
        if (currentInputIndex + 1 === length) {
            return
        }

        if (valueSplitted[currentInputIndex + 1].character) {
            selectInputByIndex(currentInputIndex + 1)
        } else {
            focusInputByIndex(currentInputIndex + 1)
        }
    }

    const matchIsCharIsValid = (character: string, index: number) => {
        return typeof validateChar !== 'function'
            ? true
            : validateChar(character, index)
    }

    const handleOneInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const currentInputIndex = getIndexByInputElement(event.target)

        if (currentInputIndex === 0 && event.target.value.length > 1) {
            const { finalValue, isCompleted } = matchIsCompletedEvent(
                event.target.value
            )
            MUIOTPInputProps.onChange?.(finalValue)

            if (isCompleted) {
                MUIOTPInputProps.onComplete?.(finalValue)
            }

            selectInputByIndex(finalValue.length - 1)

            return
        }

        const initialChar = event.target.value[0] || ''
        let character = initialChar

        if (character && !matchIsCharIsValid(character, currentInputIndex)) {
            character = ''
        }

        const newValue = replaceCharOfValue(currentInputIndex, character)

        MUIOTPInputProps.onChange?.(newValue)

        const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            MUIOTPInputProps.onComplete?.(finalValue)
        }

        if (character !== '') {
            if (newValue.length - 1 < currentInputIndex) {
                selectInputByIndex(newValue.length)
            } else {
                manageCaretForNextInput(currentInputIndex)
            }
        } else if (initialChar === '' && newValue.length <= currentInputIndex) {
            selectInputByIndex(currentInputIndex - 1)
        }
    }

    const handleOneInputKeyDown = (
        event: React.KeyboardEvent<HTMLDivElement>
    ) => {
        const inputElement = event.target as HTMLInputElement
        const startPos = inputElement.selectionStart
        const endPos = inputElement.selectionEnd
        const currentInputIndex = getIndexByInputElement(inputElement)
        const isCaretBeforeChar = startPos === 0 && endPos === 0

        if (inputElement.value === event.key) {
            event.preventDefault()
            manageCaretForNextInput(currentInputIndex)
        } else if (KEYBOARD_KEY.backspace === event.key) {
            if (!inputElement.value) {
                event.preventDefault()

                selectInputByIndex(currentInputIndex - 1)
            } else if (isCaretBeforeChar) {
                event.preventDefault()

                const newValue = replaceCharOfValue(currentInputIndex, '')
                MUIOTPInputProps.onChange?.(newValue)

                if (newValue.length <= currentInputIndex) {
                    selectInputByIndex(currentInputIndex - 1)
                }
            }
        } else if (KEYBOARD_KEY.left === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex - 1)
        } else if (KEYBOARD_KEY.right === event.key) {
            event.preventDefault()
            selectInputByIndex(currentInputIndex + 1)
        } else if (KEYBOARD_KEY.home === event.key) {
            event.preventDefault()
            selectInputByIndex(0)
        } else if (KEYBOARD_KEY.end === event.key) {
            event.preventDefault()
            selectInputByIndex(valueSplitted.length - 1)
        }
    }

    const handleOneInputPaste = (
        event: React.ClipboardEvent<HTMLDivElement>
    ) => {
        const content = event.clipboardData.getData('text/plain')
        const inputElement = event.target as HTMLInputElement
        const currentInputIndex = valueSplitted.findIndex(
            ({ character, inputRef }) => {
                return character === '' || inputRef.current === inputElement
            }
        )
        const currentCharacter = getCharactersSplitted()

        const characters = mergeArrayStringFromIndex(
            currentCharacter,
            split(content),
            currentInputIndex
        ).map((character, index) => {
            return matchIsCharIsValid(character, index) ? character : ''
        })

        const newValue = joinArrayStrings(characters)
        MUIOTPInputProps.onChange?.(newValue)

        const { isCompleted, finalValue } = matchIsCompletedEvent(newValue)

        if (isCompleted) {
            MUIOTPInputProps.onComplete?.(finalValue)
            selectInputByIndex(length - 1)
        } else {
            selectInputByIndex(newValue.length)
        }
    }

    const handleBlur = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
    ) => {
        const anInputIsFocused = valueSplitted.some(({ inputRef }) => {
            return inputRef.current === event.relatedTarget
        })

        if (!anInputIsFocused) {
            const { isCompleted, finalValue } = matchIsCompletedEvent(MUIOTPInputProps.value)
            MUIOTPInputProps.onBlur?.(finalValue, isCompleted)
        }
    }


    return (
        <StatRoot ref={ref}>
            {valueSplitted.map(({ character, inputRef }, index) => {
                <Textfield />
            })}
        </StatRoot>
    );
});
export default MUIOTPInput