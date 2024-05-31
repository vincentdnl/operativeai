import {RagDb} from "@/infrastructure/repository/chroma"
import {difference, flatten} from "lodash"
import {SearchResultWithContent} from "@/domain/types"
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"

export class RagService {
    public ragDb: RagDb

    constructor(ragDb: RagDb) {
        this.ragDb = ragDb
    }

    async addDocumentsToRag (searchResultWithContents: SearchResultWithContent[]) {
        console.info(`Adding documents to RAG: ${JSON.stringify(searchResultWithContents)}`)
        await this.ragDb.addDocuments(searchResultWithContents)
    }

    async getDocumentsNotInRag(urls: string[]): Promise<string[]> {
        const documents = await this.ragDb.getIds(urls)
        const res = difference(urls, documents)
        console.info(`Documents not in RAG: ${JSON.stringify(res)}`)
        return res
    }

    async queryRag(prompt: string): Promise<string[]> {
        const res = await this.ragDb.queryRag([prompt])
        console.info(`Response from RAG for query "${prompt.substring(0, 20)}...": ${JSON.stringify(res)}`)
        return res
    }

    async deleteAll(): Promise<void> {
        return await this.ragDb.deleteCollection()
    }
}

interface SearchResultWithContentWithMeta extends SearchResultWithContent {
    metadata: Record<string, any>
}

export const splitter = async (searchResultsWithContent: SearchResultWithContent[], defaultConfig = {
    chunkSize: 1000,
    chunkOverlap: 200,
}): Promise<SearchResultWithContentWithMeta[]> => {
    const textSplitter = new RecursiveCharacterTextSplitter(defaultConfig)
    const res = await Promise.all(searchResultsWithContent.map(async (searchResultWithContent) => {
        const documents = await textSplitter.createDocuments([searchResultWithContent.content])
        return documents.map((document, index) => {
            return {
                title: searchResultWithContent.title,
                content: document.pageContent,
                url: `${searchResultWithContent.url}_${index}`,
                metadata: document.metadata
            } satisfies SearchResultWithContentWithMeta
        })
    }))

    return flatten(res)
}
