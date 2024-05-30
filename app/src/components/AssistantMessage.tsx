import {RichInterfaceResponse} from "../service/richInterface/types.ts"
import {displayRichInterface} from "../service/richInterface"
import {StatusDisplay} from "./StatusDisplay.tsx"
import {ellipsis} from "../helpers"
import {TripleDotLoading} from "../assets/TripleDotLoading.tsx"
import Markdown from "react-markdown"

export const AssistantMessage = ({text, richInterfaceResponses}: { text: string, richInterfaceResponses: RichInterfaceResponse[] }) => {
    const {"scraping_url": scrapingUrl, ...general} = displayRichInterface(richInterfaceResponses)

    return (
        <div className={"inline-flex flex-col bg-white bg-opacity-50 p-4 rounded-xl gap-6 shadow-sm"}>
            <div className={"flex flex-row gap-6 text-xs"}>
                <div>
                    {
                        Object.entries(general).map(([key, generalRichInterfaceResponse], index) => (
                            <div key={`richInterfaceResponse-${key}-${index}`}>
                                <StatusDisplay richInterfaceResponse={generalRichInterfaceResponse as RichInterfaceResponse}/>
                            </div>
                        ))
                    }
                </div>
                <div className={"flex flex-row gap-2"}>
                    {
                        Object.entries(scrapingUrl).map(([key, urlRichInterfaceResponse], index) => (
                            <a
                                key={`richInterfaceResponse-${key}-${index}`}
                                className={"flex flex-col bg-white p-2 rounded-md w-40 group cursor-pointer"}
                                href={urlRichInterfaceResponse.url}
                                target={"_blank"}
                            >
                                <p className={"font-bold group-hover:underline"}>{ellipsis(urlRichInterfaceResponse.title, 20)}</p>
                                {
                                    "abstract" in urlRichInterfaceResponse && <p className={"text-slate-500"}>{ellipsis(urlRichInterfaceResponse.abstract || "", 50)}</p>
                                }

                                <StatusDisplay richInterfaceResponse={urlRichInterfaceResponse as RichInterfaceResponse}/>
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className={"flex flex-col"}>
                {text === "..." ? <TripleDotLoading/> : <Markdown>{text}</Markdown>}
            </div>
        </div>
    )
}
