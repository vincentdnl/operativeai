import {useState} from "react"
import {ChatHistory, Message} from "./types.ts"
import {RichInterfaceResponse} from "./service/richInterface/types.ts"
import {splitJsonObjects} from "./helpers"
import environment from "./environment.ts"
import {NavBar} from "./components/NavBar.tsx"
import {useLocalStorage} from "usehooks-ts"
import {UserMessage} from "./components/UserMessage.tsx"
import {AssistantMessage} from "./components/AssistantMessage.tsx"

function App() {
    const [prompt, setPrompt] = useState<string>("")
    const [model] = useLocalStorage<string | undefined>("model", undefined)
    const [chatsHistories, setChatsHistories] = useLocalStorage<ChatHistory[]>("chatsHistories", [])
    const [chatHistoryIndex] = useLocalStorage<number>("chatHistoryIndex", 0)

    const updateCurrentChatHistory = (newChatHistory: ChatHistory) => {
        const newValue = chatsHistories.map((chatHistory, index) => {
            if (index === chatHistoryIndex) {
                return newChatHistory
            }
            return chatHistory
        })
        setChatsHistories(newValue)
    }

    const handleSubmit = async (prompt: string) => {
        const userRole = "user"
        const initMessages = chatsHistories?.[chatHistoryIndex]?.messages || []
        const newMessages = [
            ...initMessages,
            {
                role: "user" as typeof userRole,
                content: prompt,
            }
        ]
        const blankAssistantMessage: Message = {
            role: "assistant",
            content: "..."
        }
        const newChatHistory = {
            ...(chatsHistories[chatHistoryIndex] || {}),
            messages: [
                ...newMessages,
                blankAssistantMessage
            ]
        }
        updateCurrentChatHistory(newChatHistory)
        setPrompt("")
        if (model === undefined) throw new Error("Model is required")
        const response = await fetch(`${environment.VITE_SERVICE_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    ...newMessages,
                ]
            })
        })

        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        if (!response.body) {
            throw new Error("No body found")
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder("utf-8")

        let result
        const assistantMessage: Message = {
            role: "assistant",
            content: ""
        }
        let chatHistoryTemp: ChatHistory = {
            ...newChatHistory,
            richInterfaces: chatsHistories?.[chatHistoryIndex]?.richInterfaces
        }
        while (!result || !result.done) {
            result = await reader.read()
            const chunks = decoder.decode(result.value, {stream: true})
            const splitJson = splitJsonObjects(chunks)
            splitJson.map((chunk) => {
                try {
                    const jsonChunk = JSON.parse(chunk)
                    if (jsonChunk?.type === "rich_interface") {
                        const richInterfaceResponse = jsonChunk as RichInterfaceResponse
                        const currentKey = Object.keys(newMessages).length - 1
                        chatHistoryTemp = {
                            ...chatHistoryTemp,
                            richInterfaces: {
                                ...chatHistoryTemp.richInterfaces,
                                ...{
                                    [currentKey]: [
                                        ...chatHistoryTemp.richInterfaces?.[currentKey] || [],
                                        richInterfaceResponse
                                    ]
                                }
                            }
                        }
                    } else {
                        assistantMessage.content += jsonChunk.message.content
                        chatHistoryTemp = {
                            ...chatHistoryTemp,
                            messages: [
                                ...newMessages,
                                assistantMessage
                            ]
                        }
                    }
                    updateCurrentChatHistory(chatHistoryTemp)
                } catch (e) {
                    console.warn("> PARSE", e, chunk)
                }
            })
        }
        if (initMessages.length === 1) {
            const enrichedNewMessages = newMessages.map((message, index) => {
                if (index === newMessages.length - 1) {
                    return {
                        ...message,
                        content: `Create a concise, 3-5 word phrase as a header for the following query, strictly adhering to the 3-5 word limit and avoiding the use of the word 'title':
${message.content}`
                    }
                }
                return message
            })
            const titleRes = await fetch(`${environment.VITE_SERVICE_URL}/v1/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: model,
                    messages: enrichedNewMessages
                })
            })
            if (!titleRes.ok) {
                throw new Error("Network response was not ok")
            }
            if (!titleRes.body) {
                throw new Error("No body found")
            }

            const titleResJson = await titleRes.json()
            const title = (titleResJson?.choices?.[0]?.message?.content || "").replaceAll("\"", "")

            updateCurrentChatHistory({
                ...chatHistoryTemp,
                title
            })
        }
    }

    return (
        <div className={"custom-bg-gradient min-h-screen flex flex-col items-center p-6"}>
            <NavBar/>
            <main className={"flex flex-col bg-white bg-opacity-50 shadow-xl container grow p-6 justify-between gap-6 rounded-b-xl"}>
                <div className={"flex flex-col items-start gap-6"}>
                    {
                        (chatsHistories?.[chatHistoryIndex]?.messages || []).map((message, index) => {
                            const indexWithoutSystemPrompt = index - 1
                            if (message.role === "system") {
                                return null
                            }
                            if (message.role === "user") {
                                return <UserMessage text={message.content} key={`user-message-${index}`}/>
                            }
                            if (message.role === "assistant") {
                                return (
                                    <AssistantMessage text={message.content} richInterfaceResponses={chatsHistories?.[chatHistoryIndex]?.richInterfaces?.[indexWithoutSystemPrompt] || []}  key={`assistant-message-${index}`}/>
                                )
                            }
                        })
                    }
                </div>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handleSubmit(prompt)
                    }}
                    className={"shadow-sm"}
                >
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Prompt
                        </label>
                        <input
                            type="text"
                            name="prompt"
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="block w-full rounded-xl border-0 px-4 py-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                        />
                    </div>
                </form>
            </main>
        </div>
    )
}

export default App
