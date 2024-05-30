import {ChatHistory} from "../types.ts"
import {useState} from "react"
import {MenuItem} from "@headlessui/react"
import {ellipsis} from "../helpers"
import {PencilIcon, TrashIcon} from "@heroicons/react/24/solid"

export function ChatHistoryEntry({chatsHistories, setChatsHistories, chatHistoryIndex, setChatHistoryIndex, chatHistory, index}: { chatsHistories: ChatHistory[], setChatsHistories: (_: ChatHistory[]) => void, chatHistoryIndex: number | undefined, setChatHistoryIndex: (_: number) => void, chatHistory: ChatHistory, index: number }) {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(chatHistory.title)

    return <div
        className={"flex flex-row justify-between items-center w-72 bg-white hover:bg-blue-100"}
    >
        {
            isEditMode
                ? <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        setChatsHistories(chatsHistories.map((chatHistory, i) => {
                            if (i === index) {
                                return {
                                    ...chatHistory,
                                    title: value
                                }
                            }
                            return chatHistory
                        }))
                        setIsEditMode(false)
                    }}
                >
                    <input
                        type={"text"}
                        value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        className={"px-2 py-1"}
                        onKeyDown={(e) => {
                            const stopPropagationKeys = [
                                "Space",
                                "Enter",
                                "NumpadEnter"
                            ]
                            if (stopPropagationKeys.includes(e.code)) {
                                e.stopPropagation()
                            }
                        }}
                    />
                </form>
                : <MenuItem>
                    <button
                        className={"px-2 py-1 z-full text-left flex flex-row grow"}
                        onClick={() => {
                            setChatHistoryIndex(index)
                        }}
                        title={chatHistory.title}
                    >
                        {ellipsis(chatHistory.title, 25)}
                    </button>
                </MenuItem>
        }

        <div className={"flex flex-row"}>
            <button className={"flex flex-row shrink px-2 py-1"} onClick={() => {
                setIsEditMode(true)
            }}>
                <PencilIcon className={"h-3 w-3"}/>
            </button>
            <button className={"flex flex-row shrink px-2 py-1"} onClick={() => {
                setChatsHistories(chatsHistories.filter((_, i) => index !== i))
                setChatHistoryIndex(
                    Math.max((chatHistoryIndex || 0) - 1, 0)
                )
            }}>
                <TrashIcon className={"h-3 w-3"}/>
            </button>
        </div>
    </div>
}
