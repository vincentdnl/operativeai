import {SafeSearchType, search} from "duck-duck-scrape"

export const duckDuckScrape = async (searchTerms: string) => {
    return await search(searchTerms, {
        safeSearch: SafeSearchType.STRICT,
    })
}
