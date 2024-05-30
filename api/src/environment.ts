import {z} from "zod"
import "dotenv/config"

const EnvSchema = z.object({
    OLLAMA_BASE_URL: z.string(),
})

export default EnvSchema.parse(process.env)
