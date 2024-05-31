export const ellipsis = (text: string, length = 50) => {
    if (text.length > length) {
        return `${text.substring(0, length).trim()}...`
    } else {
        return text
    }
}

export function splitJsonObjects(input: string): string[] {
    return input.split("\n").filter((s) => s.length > 0)
}
