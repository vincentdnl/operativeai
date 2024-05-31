import {splitJsonObjects} from "./index.ts"

describe("splitJsonObjects", () => {
    test("splitJsonObjects", () => {
        expect(splitJsonObjects(`{"model":"llama3","created_at":"2024-05-23T08:50:42.353865269Z","message":{"role":"assistant","content":" ("},"done":false}
{"model":"llama3","created_at":"2024-05-23T08:50:42.377827381Z","message":{"role":"assistant","content":"164"},"done":false}`)).toEqual([
            "{\"model\":\"llama3\",\"created_at\":\"2024-05-23T08:50:42.353865269Z\",\"message\":{\"role\":\"assistant\",\"content\":\" (\"},\"done\":false}",
            "{\"model\":\"llama3\",\"created_at\":\"2024-05-23T08:50:42.377827381Z\",\"message\":{\"role\":\"assistant\",\"content\":\"164\"},\"done\":false}"
        ])
    })
    test("splitJsonObjects one entry", () => {
        expect(splitJsonObjects("{\"model\":\"llama3\",\"created_at\":\"2024-05-23T08:50:42.353865269Z\",\"message\":{\"role\":\"assistant\",\"content\":\" (\"},\"done\":false}")).toEqual([
            "{\"model\":\"llama3\",\"created_at\":\"2024-05-23T08:50:42.353865269Z\",\"message\":{\"role\":\"assistant\",\"content\":\" (\"},\"done\":false}" 
        ])
    })
})
