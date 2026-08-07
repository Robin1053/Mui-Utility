import * as React from 'react';
import {
    styled,
    useThemeProps,
} from '@mui/material/styles';
import type { MUIOTPInputProps } from '@robineb/mui-utility';
import {
    KEYBOARD_KEY,
    mergeRefs,
    getFilledArray,
    updateIndex,
    joinArrayStrings,
    mergeArrayStringFromIndex,
    split,
} from '@robineb/mui-utility';
import {
    TextField,
    outlinedInputClasses,
} from '@mui/material';

const OtpInputRoot = styled('div', {
    name: 'MuiOtpInput',
    slot: 'root',
})(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

const OtpInputField = styled(TextField, {
    name: 'MuiOtpInput',
    slot: 'input',
})(({ theme }) => ({
    width: 48,
    [`& .${outlinedInputClasses.input}`]: {
        padding: theme.spacing(1, 0),
        textAlign: 'center',
    },
}));

const OtpInputSeparator = styled('div', {
    name: 'MuiOtpInput',
    slot: 'separator',
})(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const MuiOtpInput = React.forwardRef<HTMLDivElement, MUIOTPInputProps>(
    function MuiOtpInput(inProps, ref) {
        const {
            autoFocus = false,
            length = 4,
            loading = false,
            error = false,
            value,
            groups,
            separator = '-',
            onChange,
            validateChar,
            onComplete,
            onBlur,
            TextFieldsProps,
        } = useThemeProps({ props: inProps, name: 'MuiOtpInput' });

        const [internalValue, setInternalValue] = React.useState(() =>
            typeof value === 'string' ? value : '',
        );

        React.useEffect(() => {
            setInternalValue((prev) => (typeof value === 'string' && value !== prev ? value : prev));
        }, [value]);

        const currentValue = internalValue;

        const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);
        const containerRef = React.useRef<HTMLDivElement | null>(null);
        const rootRef = React.useMemo(() => mergeRefs([containerRef, ref]), [ref]);

        const chars = React.useMemo(
            () => getFilledArray(length, (_v, i) => currentValue[i] ?? ''),
            [currentValue, length],
        );

        React.useEffect(() => {
            if (autoFocus) {
                inputRefs.current[0]?.focus();
            }
            // Nur beim Mount fokussieren.
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        function requestFocus(index: number) {
            inputRefs.current[index]?.focus();
        }

        function commitValue(next: string) {
            setInternalValue(next);
            onChange?.(next);
            if (next.length >= length) {
                onComplete?.(next);
            }
        }

        function handleFieldChange(index: number, raw: string) {
            if (loading) {
                return;
            }

            if (raw.length === 0) {
                commitValue(joinArrayStrings(updateIndex(chars, index, '')));
                return;
            }

            const incoming = split(raw).filter(
                (char) => !validateChar || validateChar(char, index),
            );
            if (incoming.length === 0) {
                return;
            }

            const merged = mergeArrayStringFromIndex(chars, incoming, index);
            const consumed = Math.min(incoming.length, length - index);

            commitValue(joinArrayStrings(merged));
            requestFocus(Math.min(index + consumed, length - 1));
        }

        function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, index: number) {
            switch (event.key) {
                case KEYBOARD_KEY.backspace: {
                    if (chars[index]) {
                        event.preventDefault();
                        commitValue(joinArrayStrings(updateIndex(chars, index, '')));
                    } else if (index > 0) {
                        event.preventDefault();
                        commitValue(joinArrayStrings(updateIndex(chars, index - 1, '')));
                        requestFocus(index - 1);
                    }
                    return;
                }
                case KEYBOARD_KEY.left:
                    event.preventDefault();
                    requestFocus(Math.max(0, index - 1));
                    return;
                case KEYBOARD_KEY.right:
                    event.preventDefault();
                    requestFocus(Math.min(length - 1, index + 1));
                    return;
                case KEYBOARD_KEY.home:
                    event.preventDefault();
                    requestFocus(0);
                    return;
                case KEYBOARD_KEY.end:
                    event.preventDefault();
                    requestFocus(length - 1);
                    return;
                default:
                    if (event.key.length === 1 && validateChar && !validateChar(event.key, index)) {
                        event.preventDefault();
                    }
            }
        }

        function handleContainerBlur(event: React.FocusEvent<HTMLDivElement>) {
            const next = event.relatedTarget as Node | null;
            if (next && containerRef.current?.contains(next)) {
                return;
            }
            onBlur?.(currentValue, currentValue.length === length);
        }

        const groupSizes = React.useMemo(() => {
            if (!groups || groups <= 1) {
                return [length];
            }
            const base = Math.floor(length / groups);
            const remainder = length % groups;
            return Array.from({ length: groups }, (_, i) => base + (i < remainder ? 1 : 0));
        }, [groups, length]);

        const content: React.ReactNode[] = [];
        let fieldIndex = 0;
        groupSizes.forEach((size, groupIndex) => {
            for (let i = 0; i < size; i += 1) {
                const index = fieldIndex;
                fieldIndex += 1;
                const extraProps =
                    typeof TextFieldsProps === 'function' ? TextFieldsProps(index) : TextFieldsProps;

                content.push(
                    <OtpInputField
                        key={index}
                        inputRef={(el: HTMLInputElement | null) => {
                            inputRefs.current[index] = el;
                        }}
                        {...extraProps}
                        value={chars[index]}
                        error={!!error}
                        disabled={loading}
                        onFocus={(event) => {
                            event.target.select();
                            extraProps?.onFocus?.(event);
                        }}
                        onChange={(event) => handleFieldChange(index, event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        inputProps={{
                            inputMode: 'text',
                            'aria-label': `OTP Zeichen ${index + 1} von ${length}`,
                            ...extraProps?.inputProps,
                        }}
                    />,
                );
            }

            if (groupIndex < groupSizes.length - 1) {
                content.push(
                    <OtpInputSeparator key={`separator-${groupIndex}`}>{separator}</OtpInputSeparator>,
                );
            }
        });

        return (
            <OtpInputRoot
                ref={rootRef}
                role="group"
                aria-label="OTP Eingabe"
                aria-busy={loading}
                aria-invalid={!!error}
                onBlur={handleContainerBlur}
            >
                {content}
            </OtpInputRoot>
        );
    },
);

export default MuiOtpInput;
