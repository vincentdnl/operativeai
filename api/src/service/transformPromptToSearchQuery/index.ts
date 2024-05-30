import {getTextFromChatResponse} from "@/infrastructure/api/ollama/helpers"
import {searchText} from "@/infrastructure/api/ollama/searchText"

export const transformPromptToSearchQuery = async (model: string, prompt: string) => {
    const searchTerms = getTextFromChatResponse(await searchText(model, prompt))
    console.info(`Search terms extracted from prompt: "${searchTerms}"`)
    return searchTerms
}
