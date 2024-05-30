import {RagService, splitter} from "@/service/rag"
import {Message} from "@/infrastructure/api/ollama/types"
import {duckDuckGoSearch} from "@/service/duckDuckGoSearch"
import {transformPromptToSearchQuery} from "@/service/transformPromptToSearchQuery"
import {getContentsForSearchResults} from "@/service/scrape"
import {find, findLast} from "lodash"
import {SearchResult} from "@/domain/types"
import {enrichPromptWebSearch} from "@/domain/enrichPrompt"
import {RichInterface} from "@/service/richInterface"
import {ellipsis, getLatestPrompt} from "@/helpers"
import {SearchResultWithError} from "@/service/scrape/types"

export class Pipeline {
    public ragService
    public richInterfaceService

    constructor(ragService: RagService, richInterfaceService: RichInterface) {
        this.ragService = ragService
        this.richInterfaceService = richInterfaceService
    }

    async process(messages: Message[]): Promise<Message[]> {
        const latestPrompt = getLatestPrompt(messages)
        const mergedPrompts = Pipeline.getMergedPrompts(messages)
        console.info(`Merged prompts: ${mergedPrompts}`)
        await this.richInterfaceService.write({
            type: "rich_interface",
            id: "searching_web",
            message: "Searching the web...",
            status: "progress"
        })
        const searchTerms = await transformPromptToSearchQuery(mergedPrompts)
        const searchResults = await duckDuckGoSearch(searchTerms)
        if (searchResults.length > 0) {
            await this.richInterfaceService.write({
                type: "rich_interface",
                id: "searching_web",
                message: "Web search done!",
                status: "done"
            })
        } else {
            await this.richInterfaceService.write({
                type: "rich_interface",
                id: "searching_web",
                message: "No results from DuckDuckGo",
                status: "error"
            })
        }
        for await (const searchResult of searchResults) {
            await this.richInterfaceService.write({
                type: "rich_interface",
                id: "scraping_url",
                message: "Scraping URL...",
                title: searchResult.title,
                url: searchResult.url,
                status: "progress"
            })
        }
        await this.richInterfaceService.write({
            type: "rich_interface",
            id: "updating_rag",
            message: "Updating the RAG...",
            status: "progress"
        })
        const searchResultsNotInRagUrls = await this.ragService.getDocumentsNotInRag(searchResults.map((sr) => sr.url))
        const newSearchResults =
            searchResultsNotInRagUrls
                .map((searchResultsNotInRag) => find(searchResults, (o) => o.url === searchResultsNotInRag))
                .filter((sr): sr is SearchResult => sr !== undefined)
        const newSearchResultsWithContent = await getContentsForSearchResults(newSearchResults)
        for await (const searchResultWithContent of newSearchResultsWithContent) {
            if (Object.prototype.hasOwnProperty.call(searchResultWithContent, "error") && (searchResultWithContent as SearchResultWithError).error.type === "scrapingError") {
                await this.richInterfaceService.write({
                    type: "rich_interface",
                    id: "scraping_url",
                    message: "Error scraping URL.",
                    title: searchResultWithContent.title,
                    url: searchResultWithContent.url,
                    status: "error",
                    abstract: ellipsis(searchResultWithContent.content)
                })
            }
            if (searchResultWithContent) {
                await this.richInterfaceService.write({
                    type: "rich_interface",
                    id: "scraping_url",
                    message: "URL scraped!",
                    title: searchResultWithContent.title,
                    url: searchResultWithContent.url,
                    status: "done",
                    abstract: ellipsis(searchResultWithContent.content)
                })
            }
        }
        // const newSearchResultsWithCleanedContent = await cleanPageContent(newSearchResultsWithContent)
        const splitNewSearchResultsWithCleanedContent = await splitter(newSearchResultsWithContent)
        await this.ragService.addDocumentsToRag(splitNewSearchResultsWithCleanedContent)
        await this.richInterfaceService.write({
            type: "rich_interface",
            id: "updating_rag",
            message: "RAG updated!",
            status: "done"
        })
        await this.richInterfaceService.write({
            type: "rich_interface",
            id: "querying_rag",
            message: "Querying the RAG...",
            status: "progress"
        })
        const ragResults = await this.ragService.queryRag(latestPrompt)
        await this.richInterfaceService.write({
            type: "rich_interface",
            id: "querying_rag",
            message: "RAG queried!",
            status: "done"
        })
        return enrichPromptWebSearch(messages, ragResults)
    }

    private static getMergedPrompts(messages: Message[]): string {
        return messages
            .filter((message) => message.role === "user")
            .map((message) => message.content)
            .join("\n")
    }
}
