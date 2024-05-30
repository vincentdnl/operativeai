import {ChatResponse} from "@/infrastructure/api/ollama/types"

export const getTextFromChatResponse = (chatResponse: ChatResponse) => {
    return chatResponse.message.content.replace("\"", "")
}
