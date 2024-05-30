import environment from "../environment.ts"
import {Models} from "./Models.tsx"
import {ChatsHistories} from "./ChatsHistories.tsx"

export const NavBar = () => {
    return (
        <div className={"flex flex-col container gap-1 shadow-xl"}>
            <div className={"text-white opacity-70 text-right"}>
                <span>{environment.VITE_SERVICE_URL}</span>
            </div>
            <div className={"flex bg-white bg-opacity-70 justify-between px-6 py-2 rounded-t-xl"}>
                <div className={"flex flex-row items-center gap-6"}>
                    <ChatsHistories/>
                </div>
                <Models/>
            </div>
        </div>
    )
}
