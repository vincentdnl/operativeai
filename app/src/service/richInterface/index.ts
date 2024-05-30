import {RichInterfaceResponse, RichInterfaceResponseUrlStatus} from "./types.ts"
import {groupBy, isEmpty} from "lodash"

interface Display {
    "scraping_url": RichInterfaceResponseUrlStatus[]
    "searching_web": RichInterfaceResponse
    "querying_rag": RichInterfaceResponse
    "updating_rag": RichInterfaceResponse
}

export const displayRichInterface = (richInterfaceResponses: RichInterfaceResponse[]): Display => {
    const withGroupedIds = groupBy(richInterfaceResponses, (r) => r.id)
    const {"scraping_url": scrapingUrl, ...general} = {
        ...withGroupedIds,
        "scraping_url": groupBy(withGroupedIds["scraping_url"], (su: RichInterfaceResponseUrlStatus) => su.url)
    }

    const generalRes = Object.entries(general).map(([id, richInterfaceResponses]) => {
        return [
            [id],
            (richInterfaceResponses as RichInterfaceResponse[]).reduce((acc, currentValue) => {
                if (isEmpty(acc)) return currentValue
                if (currentValue.status === "done" || currentValue.status === "error") return currentValue
                return acc
            }, {} as RichInterfaceResponse)
        ]
    })

    const scrapingUrlRes = Object.entries(scrapingUrl).map(([id, richInterfaceResponses]) => {
        return [
            [id],
            (richInterfaceResponses as RichInterfaceResponse[]).reduce((acc, currentValue) => {
                if (isEmpty(acc)) return currentValue
                if (currentValue.status === "done" || currentValue.status === "error") return currentValue
                return acc
            }, {} as RichInterfaceResponse)
        ]
    })

    return {
        ...Object.fromEntries(generalRes),
        "scraping_url": Object.fromEntries(scrapingUrlRes)
    }
}