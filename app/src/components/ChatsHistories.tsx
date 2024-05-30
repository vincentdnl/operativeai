import {useLocalStorage} from "usehooks-ts"
import {ChatHistory} from "../types.ts"
import {useEffect} from "react"
import {Menu, MenuButton, MenuItems} from "@headlessui/react"
import {ellipsis} from "../helpers"
import {ChatHistoryEntry} from "./ChatHistoryEntry.tsx"
import {PlusCircleIcon} from "@heroicons/react/24/solid"

export const ChatsHistories = () => {
    const [chatsHistories, setChatsHistories] = useLocalStorage<ChatHistory[]>("chatsHistories", [])
    const [chatHistoryIndex, setChatHistoryIndex] = useLocalStorage<number | undefined>("chatHistoryIndex", undefined)

    useEffect(() => {
        if (chatsHistories.length === 0) {
            setChatsHistories([
                {
                    title: "New chat",
                    messages: [
                        {
                            role: "system",
                            content: "",
                        },
                    ],
                    richInterfaces: {}
                }
            ])
        }
        if (chatHistoryIndex === undefined) {
            setChatHistoryIndex(0)
        }

    }, [chatsHistories.length, setChatsHistories, setChatHistoryIndex, chatHistoryIndex])

    return (
        <div className={"flex flex-row gap-2"}>
            <Menu>
                <MenuButton
                    className={"px-2 py-1 rounded-xl w-72 text-left bg-white shadow-sm"} title={chatsHistories?.[chatHistoryIndex || 0]?.title}>{ellipsis(chatsHistories?.[chatHistoryIndex || 0]?.title || "", 25)}</MenuButton>
                <MenuItems anchor="bottom" className={"mt-1 rounded-xl divide-gray-300 divide-y shadow-sm"}>
                    {
                        chatsHistories.map((chatHistory, index) => {
                            return (
                                <ChatHistoryEntry key={`chat-history-${index}`} {...{chatsHistories, setChatsHistories, chatHistoryIndex, setChatHistoryIndex, chatHistory, index}}/>
                            )
                        })
                    }
                </MenuItems>
            </Menu>
            <button className={"cursor-pointer"} onClick={() => {
                setChatsHistories([
                    ...chatsHistories,
                    {
                        title: "New chat",
                        messages: [
                            {
                                role: "system",
                                content: "",
                            },
                        ],
                        richInterfaces: {}
                    }
                ])
                setChatHistoryIndex((chatHistoryIndex || 0) + 1)
            }}>
                <PlusCircleIcon className={"h-8 w-8"}/>
            </button>
        </div>
    )
}
