import {findLast} from "lodash"
import {Message} from "@/infrastructure/api/ollama/types"

export const ellipsis = (text: string, length = 50) => {
    if (text.length > length) {
        return `${text.substring(0, length).trim()}...`
    } else {
        return text
    }
}

export const getLatestPrompt = (messages: Message[]) => {
    return findLast(messages, function (m) {return m.role === "user"})?.content || ""
}
