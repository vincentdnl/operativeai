import {SearchResultWithContent} from "@/domain/types"

export interface ScrapingError extends Error {
    message: string
    type: "scrapingError"
}

export interface SearchResultWithError extends SearchResultWithContent {
    error: ScrapingError
}
