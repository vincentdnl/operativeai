/**
 *  npx ts-node -r tsconfig-paths/register src/scripts/deleteAllRag.ts
 */

import {Chroma} from "@/infrastructure/repository/chroma"

(async () => {
    const chroma = new Chroma("web_content", "http://host.docker.internal:8000")
    await chroma.init()
    await chroma.deleteCollection()
    await chroma.init()
    console.info(await chroma.getDocuments())
})().then()
