import environment from "@/environment"
import {ChatRequest, ChatResponse} from "@/infrastructure/api/ollama/types"

// const content = `You are a searched assistant tasked with creating a short search query for a search engine from a prompt given by the user. Extract only the main keywords. Don't answer the prompt. Only give the search query you created.
//
// Examples:
//
// prompt: Can you help me create a SAML auth on a Nestjs API with passport.js?
// expected: SAML auth Nestjs API passport.js
//
// prompt: Simply explain to me what a Lagrange point is?
// expected: Lagrange point
//
// prompt: What is Nihilism?
// expected: Nihilism
//
// prompt: Help me study vocabulary: write a sentence for me to fill in the blank, and I'll try to pick the correct option.
// expected: study vocabulary sentence fill blank
// `

const content = `You are a search assistant tasked with creating a short search query for a search engine from a prompt given by the user. You must create a search query related to the given prompt. Don't answer the prompt. Only give the search query you created. Don't add other sentences that are not the search query you created.

Examples:

prompt: Can you help me create a SAML auth on a Nestjs API with passport.js?
expected: SAML auth Nestjs API passport.js

prompt: Simply explain to me what a Lagrange point is?
expected: Lagrange point

prompt: What is Nihilism?
expected: Nihilism

prompt: Help me study vocabulary: write a sentence for me to fill in the blank, and I'll try to pick the correct option.
expected: study vocabulary sentence fill blank
`

export const searchText = async (prompt: string) => {
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
