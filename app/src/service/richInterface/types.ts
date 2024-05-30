interface BaseRichInterfaceResponse {
    type: "rich_interface"
    id: string,
    message: string,
    status: "progress" | "done" | "error"
}

interface RichInterfaceResponseStatus extends BaseRichInterfaceResponse {
    id: "searching_web" | "updating_rag" | "querying_rag"
}

export interface RichInterfaceResponseUrlStatus extends BaseRichInterfaceResponse {
    id: "scraping_url"
    url: string,
    title: string,
    abstract?: string
}

export type RichInterfaceResponse = RichInterfaceResponseStatus | RichInterfaceResponseUrlStatus;
