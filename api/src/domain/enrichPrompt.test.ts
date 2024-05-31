import {enrichPromptWebSearch} from "./enrichPrompt"

describe("Enrich prompt with web search", () => {
    test("nominal", () => {
        expect(enrichPromptWebSearch([
            {
                role: "user",
                content: "test1"
            },
            {
                role: "assistant",
                content: "It looks like you might have accidentally sent a blank message. If you meant to test something, feel free to try again or ask me a question, and I'll do my best to help!"
            },
            {
                role: "user",
                content: "test2"
            },
            {
                role: "assistant",
                content: ""
            }
        ], [
            "Content number 1",
            "Content number 2",
            "Content number 3",
            "Content number 4",
            "Content number 5",
        ])).toEqual([
            {
                role: "user",
                content: "test1"
            },
            {
                role: "assistant",
                content: "It looks like you might have accidentally sent a blank message. If you meant to test something, feel free to try again or ask me a question, and I'll do my best to help!"
            },
            {
                role: "user",
                content: `context:
Content number 1
Content number 2
Content number 3
Content number 4
Content number 5

test2`
            },
            {
                role: "assistant",
                content: ""
            }
        ])
    })
})
