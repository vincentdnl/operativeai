import {z} from "zod"
import "dotenv/config"

const EnvSchema = z.object({
    API_PORT: z.coerce.number(),
    OLLAMA_BASE_URL: z.string(),
})

const environment = EnvSchema.parse(process.env)

export default environment
