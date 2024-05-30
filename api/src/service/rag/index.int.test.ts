import {RagService} from "@/service/rag/index"
import {Chroma} from "@/infrastructure/repository/chroma"

describe("RAG with actual db queries", () => {
    let ragService: RagService

    beforeAll(() => {
        ragService = new RagService(new Chroma("web_content_test"))
    })

    beforeEach(async (): Promise<void> => {
        jest.setTimeout(60000)
        await ragService.ragDb.init()
        await ragService.deleteAll()

        const originalImplementation = Array.isArray
        // @ts-ignore
        Array.isArray = jest.fn((type) => {
            if (type.constructor && (type.constructor.name === "Float32Array" || type.constructor.name === "BigInt64Array")) {
                return true
            }

            return originalImplementation(type)
        })
    })

    test("addDocumentsToRag", async () => {
        await ragService.addDocumentsToRag([
            {
                url: "http://example.com",
                title: "Document 1",
                content: "This is a sample document"
            }
        ])
    })

    test("checkDocumentAlreadyInRag", async () => {
        expect(await ragService.getDocumentsNotInRag(["http://example.com", "http://example2.com"])).toEqual(["http://example2.com"])
    })

    test("queryRag", async () => {
        expect((await ragService.queryRag("test prompt")).length).toEqual(1)
    })
})
