import {duckDuckScrape} from "@/infrastructure/api/duckDuckScrape"
import {SearchResult} from "@/domain/types"

export const duckDuckGoSearch = async (searchTerm: string) => {
    const duckDuckGoSearchResults = await duckDuckScrape(searchTerm)
    console.info("duckDuckGoSearchResults", duckDuckGoSearchResults)

    const res = await Promise.all(duckDuckGoSearchResults
        .results
        .map((result) => {
            return {
                title: result.title,
                url: result.url
            } as SearchResult
        })
        .slice(0, 5)
    )
    res.map((r) => {
        console.info(`- title: ${r.title} | url: ${r.url}`)
    })
    return res
}
