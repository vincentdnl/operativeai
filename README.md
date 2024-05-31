![operativeai-splash](https://github.com/vincentdnl/operativeai/assets/6394786/7234931f-372a-464e-90c0-0bea478f547e)

# OperativeAI

Private search with RAG on a local LLM.

## The project

### Why this project?

AI and LLMs have been under the spotlight recently. Most solutions rely on proprietary models. Local LLMs are a great alternative for privacy which is a big concern. A lot of people are sending private sensitive information to other companies and who knows how they might use it in the future?

While local LLMs are great, they often lack up-to-date information about the real world. I created OperativeAI to have a simple tool that would research the web and enrich a local LLM using a local RAG database.

**This project aims to be an open-source privacy-focused answer engine that will let you leverage AI without giving away your data!**

### The tech stack

OperativeAI is built using the following tools:

- Typescript
- Node.js (ts-node)
- Express
- Docker (with docker-compose)
- React (with Vite)
- Chromadb
- The Langchain Text Splitter
- DuckDuckGo (for search)
- Puppeteer (for scraping)

## Getting started

### Requirements

This project uses **Docker**. This is the only system requirement!

You can follow these instructions to install Docker: https://docs.docker.com/engine/install/

### Ollama

This project uses Ollama for the local models. To get Ollama running, run the following command:

```bash
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

_I didn't add it to the docker-compose file because most people already have Ollama installed with their own models downloaded._

Then pull some models:

```bash
docker exec ollama ollama pull llama3
docker exec ollama ollama pull phi3
```

### Starting the project
Start the project with docker-compose:

```bash
# In the project folder:
docker compose up
```

Go to: http://host.docker.internal:3000/

Your containers should look like this:

![operativeai-containers](https://github.com/vincentdnl/operativeai/assets/6394786/d37ee12d-e75b-49aa-a3ea-ee93b88e495a)

If you want to override the default urls and ports, create a `.env` file using the `.env.default` file. `.env` values will override `.env.default` values. It can be useful if you want to use something else than Ollama for example.

## Future of the project

### How can I contribute now?

If you want to contribute to the project, that's great! Here are a few things that I want to improve now:

- [ ] **Better prompts**: I'm not an expert in designing prompts. I think the result could be better if the prompt template for providing context (`api/src/domain/enrichPrompt.ts`) would better explain to the LLM how to use the context to create an answer to the question. Any suggestion and discussion is welcome!
- [ ] **Better RAG splitting strategy**: If you have any expertise on how RAG work, you can help me get better default values for the RAG (`api/src/service/rag/index.ts`), or maybe suggest a different RAG solution?
- [ ] **Handling errors**: For this project, I went for the "happy path" most of the time.
- [ ] **Better flow**: I think some additional prompts to check whether the content is relevant to the prompt can be added to make the result in the end!
- [ ] **Testing**: Some high level tests on endpoints, with mocks, could make it more resilient to refactor and change!
- [ ] **Propose features**: What would you like to see in this project? Create an issue and let's discuss!

### Vision

Depending on what direction the project is heading, here are a few things I want to improve:

- Optional TOR or a Proxy for further search query anonymisation
- Adding local folders to the RAG / reading the content of PDF documents
