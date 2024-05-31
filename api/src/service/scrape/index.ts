import {SearchResult, SearchResultWithContent} from "@/domain/types"
import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import AnonymizeUAPlugin from "puppeteer-extra-plugin-anonymize-ua"
import {getErrorMessage} from "@/helpers/error"
import {cleanContent} from "@/infrastructure/api/ollama/cleanContent"
import {ScrapingError, SearchResultWithError} from "@/service/scrape/types"

puppeteer.use(StealthPlugin())
puppeteer.use(AnonymizeUAPlugin())

const preCleanContent = (content: string): string => {
    return content.split("\n").filter((line) => line.length > 20).join("\n")
}

const getContent = async (url: string) => {
    console.info(`- SCRAPING URL: "${url}"`)

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        headless: true, // Run in headless mode
        args: ["--no-sandbox", "--disable-setuid-sandbox"] // Necessary for running in many Docker environments
    })
    const page = await browser.newPage()

    // Navigate the page to a URL
    await page.goto(url)

    const content = await page.evaluate(() => {
        return document.body.innerText
    })
    await browser.close()

    console.info(`-- CONTENT SCRAPED FOR URL: "${url}"`)

    return content
}

export const getContentsForSearchResults = async (searchResults: SearchResult[]): Promise<(SearchResultWithContent | SearchResultWithError)[]> => {
    return await Promise.all(searchResults.map(async (searchResult) => {
        try {
            const content = await getContent(searchResult.url)
            const preparedContent = preCleanContent(content)
            console.info(`- url: "${searchResult.url}" | content: "${preparedContent.substring(0, 100)}..."`)

            return {
                ...searchResult,
                content: preparedContent
            } as SearchResultWithContent
        } catch (e) {
            const scrapingError = {
                type: "scrapingError",
                message: getErrorMessage(e)
            } as ScrapingError
            console.error(`${scrapingError.type}: ${scrapingError.message}`)
            return {
                ...searchResult,
                content: "",
                error: scrapingError
            } as SearchResultWithError
        }
    }))
}

export const cleanPageContent = async (searchResultsWithContents: SearchResultWithContent[]): Promise<SearchResultWithContent[]> => {
    return await Promise.all(searchResultsWithContents.map(async (searchResultWithContent) => {
        const cleanedContent = (await cleanContent(searchResultWithContent.content)).message.content
        console.info(`- url: "${searchResultWithContent.url}" | content: "${cleanedContent.substring(0, 100)}..."`)
        return {
            ...searchResultWithContent,
            content: preCleanContent(cleanedContent)
        }
    }))
}
