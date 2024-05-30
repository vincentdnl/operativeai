import {getTextFromChatResponse} from "@/infrastructure/api/ollama/helpers"
import {searchText} from "@/infrastructure/api/ollama/searchText"

export const transformPromptToSearchQuery = async (prompt: string) => {
    const searchTerms = getTextFromChatResponse(await searchText(prompt))
    console.info(`Search terms extracted from prompt: "${searchTerms}"`)
    return searchTerms
}
