import {Response} from "express"
import {RichInterfaceResponse} from "@/service/richInterface/types"

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))


export class RichInterface {
    private res
    constructor(res: Response) {
        this.res = res
    }

    async write(richInterfaceResponse: RichInterfaceResponse) {
        console.info(`[richInterface]: ${JSON.stringify(richInterfaceResponse)}`)
        this.res.write(JSON.stringify(richInterfaceResponse) + "\n")
    }
}
