import {RichInterfaceResponse} from "../service/richInterface/types.ts"
import {LoadingIcon} from "../assets/LoadingIcon.tsx"
import {SuccessIcon} from "../assets/SuccessIcon.tsx"
import {ErrorIcon} from "../assets/ErrorIcon.tsx"

export const StatusDisplay = ({richInterfaceResponse}: { richInterfaceResponse: RichInterfaceResponse }) => {
    return (
        <p className={"flex gap-1 items-center"}>
            <span className={"inline-flex h-3 w-3"}>
                {richInterfaceResponse.status === "progress" && <LoadingIcon/>}
                {richInterfaceResponse.status === "done" && <SuccessIcon/>}
                {richInterfaceResponse.status === "error" && <ErrorIcon/>}
            </span>
            <span className={"inline-flex"}>{richInterfaceResponse.message}</span>
        </p>
    )
}
