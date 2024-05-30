import express from "express"
import {pipeline} from "node:stream/promises"
import environment from "environment"
import {ChatRequest} from "@/infrastructure/api/ollama/types"
import {Pipeline} from "@/service/pipeline"
import {Chroma} from "@/infrastructure/repository/chroma"
import {RagService} from "@/service/rag"
import cors from "cors"
import {RichInterface} from "@/service/richInterface"
import {omit} from "lodash"


const app = express()

app.use(cors())
app.use((req, res, next) => {
    if (!req.headers["content-type"]) {
        req.headers["content-type"] = "application/json"
    }
    express.json()(req, res, next)
})

app.get("/api/version", async function (req, res) {
    const response = await fetch(`${environment.OLLAMA_BASE_URL}/api/version`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const responseJson = await response.json()
    return res.json(responseJson)
})

app.get("/api/tags", async function (req, res) {
    const response = await fetch(`${environment.OLLAMA_BASE_URL}/api/tags`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
    const responseJson = await response.json()
    return res.json(responseJson)
})

app.post("/api/chat", async function (req, res) {
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Transfer-Encoding", "chunked")
    
    const body: ChatRequest = req.body

    // ---

    const enrichPipeline = new Pipeline(
        new RagService(new Chroma("web_content", "http://host.docker.internal:8000")),
        new RichInterface(res)
    )
    await enrichPipeline.ragService.ragDb.init()
    const enrichedMessages = await enrichPipeline.process(body.messages)
    // const enrichedMessages = body.messages
    console.info("------------ FINAL PROMPT ------------")
    console.info(enrichedMessages?.[enrichedMessages.length - 1]?.content)
    console.info("---------- END FINAL PROMPT ----------")

    // ---

    const newPayload = {
        ...body,
        messages: enrichedMessages
    } as ChatRequest
    const payloadString = JSON.stringify(newPayload)
    const buffer = Buffer.from(payloadString, "utf-8")
    const contentLength = Buffer.byteLength(buffer)

    console.log("AAAAA", JSON.stringify(newPayload))
    const response = await fetch(`${environment.OLLAMA_BASE_URL}/api/chat`, {
        method: "POST",
        //@ts-ignore
        headers: omit({
            ...req.headers,
            "Content-Type": "application/json",
            "content-length": contentLength
        }, ["referer", "origin"]),
        body: JSON.stringify(newPayload)
    })

    if (!response.body) throw new Error("No body in response")

    //@ts-ignore
    await pipeline(response.body, res)
})

app.post("/v1/chat/completions", async function (req, res) {
    const body: ChatRequest = req.body

    // ---

    const enrichedMessages = body.messages

    // ---

    const newPayload = {
        ...body,
        messages: enrichedMessages
    } as ChatRequest
    const payloadString = JSON.stringify(newPayload)
    const buffer = Buffer.from(payloadString, "utf-8")
    const contentLength = Buffer.byteLength(buffer)

    const response = await fetch(`${environment.OLLAMA_BASE_URL}/v1/chat/completions`, {
        method: "POST",
        //@ts-ignore
        headers: {
            ...req.headers,
            "Content-Type": "application/json",
            "content-length": contentLength
        },
        body: JSON.stringify(newPayload)
    })

    if (!response.body) throw new Error("No body in response")

    //@ts-ignore
    await pipeline(response.body, res)
})

app.all("*", async function (req, res) {
    console.warn("Catch-all request", req.method, req.url, req.body, req.headers)

    return res.json({})
})

export default app
