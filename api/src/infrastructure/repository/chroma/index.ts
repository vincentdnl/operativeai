import {ChromaClient, Collection} from "chromadb"

export interface RagDb {
    init: () => Promise<void>;
    addDocuments: (documents: Document[]) => Promise<void>;
    getDocuments: (documentIds: string[]) => Promise<string[]>;
    getIds: (documentIds: string[]) => Promise<string[]>;
    queryRag: (queryTexts: string[]) => Promise<string[]>;
    deleteCollection: () => Promise<void>;
}

interface Document {
    url: string,
    content: string
}

function checkInited(collection: Collection | undefined): collection is Collection {
    if (collection === undefined) throw new Error("Chroma not inited before calling function. Call the async \"init\" function first.")
    return true
}

export class Chroma implements RagDb {
    private readonly client
    private readonly collectionName: string
    public collection: Collection | undefined

    constructor(collectionName = "web_content", dbPath?: string) {
        this.collectionName = collectionName
        this.client = new ChromaClient(dbPath ? {path: dbPath} : {})
    }

    async init() {
        if (this.collection === undefined) {
            this.collection = await this.client.getOrCreateCollection({
                name: this.collectionName,
            })
        }
    }

    async addDocuments(documents: Document[]) {
        if (!checkInited(this.collection)) return
        if (documents.length === 0) {
            return
        }
        await this.collection.add({
            documents: documents.map((document) => document.content),
            ids: documents.map((document) => document.url),
        })
    }

    async getDocuments(documentIds?: string[]) {
        if (!checkInited(this.collection)) return []
        const queryResponse = await this.collection.get({
            ...(documentIds !== undefined && documentIds.length > 0 ? {ids: documentIds} : {})
        })
        return queryResponse.documents.filter((doc): doc is string => doc !== null)
    }

    async getIds(documentIds: string[]) {
        if (!checkInited(this.collection)) return []
        const queryResponse = await this.collection.get({
            ...(documentIds.length > 0 ? {ids: documentIds} : {})
        })
        return queryResponse.ids as string[]
    }


    async queryRag(queryTexts: string[]) {
        if (!checkInited(this.collection)) return []
        const queryResponse = await this.collection.query({
            queryTexts,
            nResults: 5,
        })
        return queryResponse.documents[0].filter((doc): doc is string => doc !== null)
    }

    async deleteCollection() {
        if (!checkInited(this.collection)) return
        await this.client.deleteCollection({name: this.collectionName})
        this.collection = undefined
    }
}
