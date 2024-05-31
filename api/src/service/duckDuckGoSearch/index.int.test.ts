import {duckDuckGoSearch} from "@/service/duckDuckGoSearch/index"

describe("duckDuckGoSearch with actual DuckDuckGo query", () => {
    beforeEach((): void => {
        jest.setTimeout(60000)
    })

    test("nominal", async () => {
        expect(await duckDuckGoSearch("Typescript DuckDuckGo scrape")).toEqual(Array(5).fill(
            {
                "content": expect.any(String),
                "title": expect.any(String),
                "url": expect.any(String)
            }))
    })
})
