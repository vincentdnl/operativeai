import { z } from "zod"

const Environment = z.object({
    VITE_SERVICE_URL: z.string()
})

const environment = Environment.parse(import.meta.env)

export default environment
