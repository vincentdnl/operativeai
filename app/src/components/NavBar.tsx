import environment from "../environment.ts"
import {Models} from "./Models.tsx"
import {ChatsHistories} from "./ChatsHistories.tsx"

export const NavBar = () => {
    return (
        <div className={"flex flex-col container gap-1"}>
            <div className={"flex flex-row justify-between"}>
                <div>
                    <p className={"text-white font-black flex flex-row items-center gap-1"}>
                        <img className={"inline h-4 w-4"} src={"/favicon.svg"} alt={"icon"}/>
                        <span>OperativeAI</span>
                    </p>
                </div>
                <div className={"text-white opacity-70"}>
                    <span>{environment.VITE_SERVICE_URL}</span>
                </div>
            </div>
            <div className={"flex bg-white bg-opacity-70 justify-between px-6 py-2 rounded-t-xl shadow-xl"}>
                <div className={"flex flex-row items-center gap-6"}>
                    <ChatsHistories/>
                </div>
                <Models/>
            </div>
        </div>
    )
}
