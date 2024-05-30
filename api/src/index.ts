import app from "@/app"
import environment from "@/environment"

const PORT = environment.API_PORT || 4000

app.listen(PORT, () => {
    console.info(`[server]: Server is running at http://localhost:${PORT}`)
})
