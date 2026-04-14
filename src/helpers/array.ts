function getFilledArray<T extends (v: number, k: number) => unknown>(
    range: number,
    mapfn: T
): ReturnType<T>[] {
    return range <= 0
        ? []
        : (Array.from({ length: range }, mapfn) as ReturnType<T>[])
}

function updateIndex<T extends unknown[]>(
    array: T,
    indexItem: number,
    item: T[keyof T]
): T {
    return array.map((chipItem, index) => {
        return indexItem === index ? item : chipItem
    }) as T
}

function joinArrayStrings(array: readonly string[]): string {
    return array.join('')
}

function append<T extends unknown[]>(array: T, item: T[keyof T]): T {
    return [...array, item] as T
}

function mergeArrayStringFromIndex(
    array: readonly string[],
    arrayToMerge: readonly string[],
    fromIndex: number
): string[] {
    return array.reduce(
        (accumulator, currentValue, index) => {
            const { characters, restArrayMerged } = accumulator

            if (index < fromIndex) {
                return {
                    restArrayMerged,
                    characters: append(characters, currentValue)
                }
            }

            const [firstCharacter, ...restArrayWithoutFirstCharacter] =
                restArrayMerged

            return {
                restArrayMerged: restArrayWithoutFirstCharacter,
                characters: append(characters, firstCharacter || '')
            }
        },
        {
            restArrayMerged: arrayToMerge,
            characters: [] as string[]
        }
    ).characters
}

export {
    getFilledArray,
    updateIndex,
    joinArrayStrings,
    mergeArrayStringFromIndex
}