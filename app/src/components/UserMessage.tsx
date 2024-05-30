export const UserMessage = ({text}: { text: string }) => {
    return (
        <div className={"inline-flex flex-col custom-button-bg-gradient text-white px-4 py-2 rounded-xl self-end shadow-sm"}>
            {text}
        </div>
    )
}
