import {RichInterfaceResponse} from "./types.ts"
import {displayRichInterface} from "./index.ts"

const richInterfaceResponses: RichInterfaceResponse[] = [
    {
        "type": "rich_interface",
        "id": "searching_web",
        "message": "Searching the web...",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "searching_web",
        "message": "Web search done!",
        "status": "done"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Scraping URL...",
        "title": "Pierre Bourdieu&#x27;s Distinction and Beyond | SpringerLink",
        "url": "https://link.springer.com/referenceworkentry/10.1007/978-3-030-61510-9_44-1",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Scraping URL...",
        "title": "Pierre Bourdieu - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Pierre_Bourdieu",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Scraping URL...",
        "title": "Denis Diderot - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Denis_Diderot",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Scraping URL...",
        "title": "A Review of Symbolic Violence: Conversations With Bourdieu",
        "url": "https://academic.oup.com/sf/article-abstract/99/1/e9/5781193",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Scraping URL...",
        "title": "Cultural Capital Theory Of Pierre Bourdieu - Simply Psychology",
        "url": "https://www.simplypsychology.org/cultural-capital-theory-of-pierre-bourdieu.html",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "updating_rag",
        "message": "Updating the RAG...",
        "status": "progress"
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "Error scraping URL.",
        "title": "Pierre Bourdieu - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Pierre_Bourdieu",
        "status": "error",
        "abstract": "",
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "URL scraped!",
        "title": "Denis Diderot - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Denis_Diderot",
        "status": "done",
        "abstract": "Toggle the table of contents\nFrom Wikipedia, the f..."
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "URL scraped!",
        "title": "A Review of Symbolic Violence: Conversations With Bourdieu",
        "url": "https://academic.oup.com/sf/article-abstract/99/1/e9/5781193",
        "status": "done",
        "abstract": "A Review of Symbolic Violence: Conversations With ..."
    },
    {
        "type": "rich_interface",
        "id": "scraping_url",
        "message": "URL scraped!",
        "title": "Cultural Capital Theory Of Pierre Bourdieu - Simply Psychology",
        "url": "https://www.simplypsychology.org/cultural-capital-theory-of-pierre-bourdieu.html",
        "status": "done",
        "abstract": "Psychology » Sociology\nCultural Capital Theory Of ..."
    }
]

describe("Processing rich interface responses", () => {
    test("nominal", () => {
        expect(displayRichInterface(richInterfaceResponses)).toEqual({
            "scraping_url": {
                "https://academic.oup.com/sf/article-abstract/99/1/e9/5781193": {
                    "abstract": "A Review of Symbolic Violence: Conversations With ...",
                    "id": "scraping_url",
                    "message": "URL scraped!",
                    "status": "done",
                    "title": "A Review of Symbolic Violence: Conversations With Bourdieu",
                    "type": "rich_interface",
                    "url": "https://academic.oup.com/sf/article-abstract/99/1/e9/5781193"
                },
                "https://en.wikipedia.org/wiki/Denis_Diderot": {
                    "abstract": "Toggle the table of contents\nFrom Wikipedia, the f...",
                    "id": "scraping_url",
                    "message": "URL scraped!",
                    "status": "done",
                    "title": "Denis Diderot - Wikipedia",
                    "type": "rich_interface",
                    "url": "https://en.wikipedia.org/wiki/Denis_Diderot"
                },
                "https://en.wikipedia.org/wiki/Pierre_Bourdieu": {
                    "abstract": "",
                    "id": "scraping_url",
                    "message": "Error scraping URL.",
                    "status": "error",
                    "title": "Pierre Bourdieu - Wikipedia",
                    "type": "rich_interface",
                    "url": "https://en.wikipedia.org/wiki/Pierre_Bourdieu"
                },
                "https://link.springer.com/referenceworkentry/10.1007/978-3-030-61510-9_44-1": {
                    "id": "scraping_url",
                    "message": "Scraping URL...",
                    "status": "progress",
                    "title": "Pierre Bourdieu&#x27;s Distinction and Beyond | SpringerLink",
                    "type": "rich_interface",
                    "url": "https://link.springer.com/referenceworkentry/10.1007/978-3-030-61510-9_44-1"
                },
                "https://www.simplypsychology.org/cultural-capital-theory-of-pierre-bourdieu.html": {
                    "abstract": "Psychology » Sociology\nCultural Capital Theory Of ...",
                    "id": "scraping_url",
                    "message": "URL scraped!",
                    "status": "done",
                    "title": "Cultural Capital Theory Of Pierre Bourdieu - Simply Psychology",
                    "type": "rich_interface",
                    "url": "https://www.simplypsychology.org/cultural-capital-theory-of-pierre-bourdieu.html"
                }
            },
            "searching_web": {
                "id": "searching_web",
                "message": "Web search done!",
                "status": "done",
                "type": "rich_interface"
            },
            "updating_rag": {
                "id": "updating_rag",
                "message": "Updating the RAG...",
                "status": "progress",
                "type": "rich_interface"
            }
        })
    })
})
