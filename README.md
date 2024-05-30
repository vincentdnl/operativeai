![operativeai-splash](https://github.com/vincentdnl/operativeai/assets/6394786/7234931f-372a-464e-90c0-0bea478f547e)

# OperativeAI

Private search with RAG on a local LLM.

## Getting started

Get Ollama running:

```bash
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
```

Start the project with docker-compose:

```bash
# In the project folder:
docker compose up
```

Pull some models:

```bash
docker exec ollama ollama pull llama3
docker exec ollama ollama pull phi3
```

Go to: http://host.docker.internal:3000/

Your containers should look like this:

![operativeai-containers](https://github.com/vincentdnl/operativeai/assets/6394786/d37ee12d-e75b-49aa-a3ea-ee93b88e495a)
