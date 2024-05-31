import environment from "@/environment"
import {ChatRequest, ChatResponse} from "@/infrastructure/api/ollama/types"

const content = `You are a content analyser tasked with cleaning the content of a web page to only keep relevant information.
Remove navigation. 
Your output must be only the result. 
Don't add anything else. 
Don't invent new content.
`

export const cleanContent = async (prompt: string) => {
    const response = await fetch(`${environment.OLLAMA_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "llama3",
            stream: false,
            options: {
                temperature: 0,
            },
            messages: [
                {
                    role: "system",
                    content
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        } satisfies ChatRequest)
    })
    return await response.json() as ChatResponse
}
