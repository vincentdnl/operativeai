import { z } from "zod"

const Environment = z.object({
    VITE_SERVICE_URL: z.string()
})

const env = Environment.parse(import.meta.env)

export default env
