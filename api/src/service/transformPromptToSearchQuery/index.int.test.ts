import {transformPromptToSearchQuery} from "@/service/transformPromptToSearchQuery/index"

describe("transformPromptToSearchQuery with actual Ollama queries", () => {
    beforeEach((): void => {
        jest.setTimeout(60000)
    })

    test("nominal", async () => {
        expect(await transformPromptToSearchQuery("Can you help me find a Typescript lib that uses duckduckgo and returns search results as JSON?")).toEqual(expect.any(String))
    })
})
