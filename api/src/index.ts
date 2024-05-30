import app from "@/app"

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.info(`[server]: Server is running at http://localhost:${PORT}`)
})
