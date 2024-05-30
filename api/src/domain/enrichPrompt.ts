import {Message} from "@/infrastructure/api/ollama/types"

const _getSearchAbstract = (ragResults: string[]) => {
    return ragResults.join("\n")
}

export const enrichPromptWebSearch = (messages: Message[], ragResults: string[]): Message[] => {
    const lastUserIndex = messages.length - 1
    const lastUserValue = messages[lastUserIndex]
    const lastUserValueEnriched = {
        ...lastUserValue,
        content: `<context>
${_getSearchAbstract(ragResults)}
</context>

${lastUserValue.content}`
    }
    return Object.assign([], messages, {[lastUserIndex]: lastUserValueEnriched})
}
