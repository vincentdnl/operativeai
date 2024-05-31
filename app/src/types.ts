import {RichInterfaceResponse} from "./service/richInterface/types.ts"

export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
    images?: string[];
}

export interface ChatHistory {
    title: string,
    messages: Message[]
    richInterfaces: { [index: number]: RichInterfaceResponse[] }
}