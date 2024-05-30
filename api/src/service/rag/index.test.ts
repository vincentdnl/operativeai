import {splitter} from "@/service/rag/index"

describe("Splitter", () => {
    test("nominal", async () => {
        const res = await splitter([
            {
                url: "https://example.com",
                title: "Example Title",
                content: `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`,
            },
            {
                url: "https://example2.com",
                title: "Example 2 title",
                content: `Hi.\n\nI'm John.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`,
            }
        ], {chunkSize: 10, chunkOverlap: 1})
        expect(res).toEqual([
            {
                title: "Example Title",
                content: "Hi.",
                url: "https://example.com_0",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "I'm",
                url: "https://example.com_1",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "Harrison.",
                url: "https://example.com_2",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "How? Are?",
                url: "https://example.com_3",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "You?",
                url: "https://example.com_4",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "Okay then",
                url: "https://example.com_5",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "f f f f.",
                url: "https://example.com_6",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "This is a",
                url: "https://example.com_7",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "weird",
                url: "https://example.com_8",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "text to",
                url: "https://example.com_9",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "write,",
                url: "https://example.com_10",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "but gotta",
                url: "https://example.com_11",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "test the",
                url: "https://example.com_12",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "splitting",
                url: "https://example.com_13",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "gggg",
                url: "https://example.com_14",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "some how.",
                url: "https://example.com_15",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "Bye!",
                url: "https://example.com_16",
                metadata: expect.any(Object)
            },
            {
                title: "Example Title",
                content: "-H.",
                url: "https://example.com_17",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "Hi.",
                url: "https://example2.com_0",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "I'm John.",
                url: "https://example2.com_1",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "How? Are?",
                url: "https://example2.com_2",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "You?",
                url: "https://example2.com_3",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "Okay then",
                url: "https://example2.com_4",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "f f f f.",
                url: "https://example2.com_5",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "This is a",
                url: "https://example2.com_6",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "weird",
                url: "https://example2.com_7",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "text to",
                url: "https://example2.com_8",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "write,",
                url: "https://example2.com_9",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "but gotta",
                url: "https://example2.com_10",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "test the",
                url: "https://example2.com_11",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "splitting",
                url: "https://example2.com_12",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "gggg",
                url: "https://example2.com_13",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "some how.",
                url: "https://example2.com_14",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "Bye!",
                url: "https://example2.com_15",
                metadata: expect.any(Object)
            },
            {
                title: "Example 2 title",
                content: "-H.",
                url: "https://example2.com_16",
                metadata: expect.any(Object)
            }
        ])
    })
})
