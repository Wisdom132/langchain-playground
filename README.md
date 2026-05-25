# LangChain + Cerebras AI Playground

A hands-on JavaScript/TypeScript project for exploring **LangChain** concepts — chat models, prompt templates, output parsers, runnables, and AI agents — powered by [Cerebras AI](https://cerebras.ai) as the LLM backend and [Exa](https://exa.ai) for real-time web search.

---

## Features

- 🤖 **Chat Models** — Interact with Cerebras LLMs using LangChain message types (`HumanMessage`, `SystemMessage`, `AIMessage`)
- 📝 **Prompt Templates** — Build dynamic prompts with `ChatPromptTemplate` and chain them with the model
- 🔗 **Runnables** — Compose LangChain pipelines using the LCEL (LangChain Expression Language) `.pipe()` pattern
- 🧩 **Output Parsers** — Parse and structure raw LLM responses
- 🕵️ **AI Agent** — A tool-calling agent with:
  - Web search via Exa
  - Mock database user fetching
  - Custom middleware for lifecycle logging and tool monitoring

---

## Project Structure

```
langchain/
├── src/
│   ├── agent-1.js          # AI agent with tools and middleware
│   ├── chatmodels.js       # Basic chat model usage
│   ├── prompt-template.js  # Prompt chaining with ChatPromptTemplate
│   ├── output-parsers.js   # Output parsing examples
│   └── runnable.js         # LCEL runnable pipelines
├── .env.example            # Environment variable template
├── package.json
└── tsconfig.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A **Cerebras API Key** → [Get one at cerebras.ai](https://cloud.cerebras.ai)
- An **Exa Search API Key** → [Get one at exa.ai](https://exa.ai)

---

## Getting Started

**1. Clone the repo and install dependencies:**

```bash
npm install
```

**2. Set up environment variables:**

```bash
cp .env.example .env
```

Open `.env` and fill in your API keys:

```env
CEREBRAS_API_KEY=your_cerebras_api_key_here
EXA_SEARCH_API_KEY=your_exa_api_key_here
```

**3. Run a script:**

```bash
# Run the AI agent
node src/agent-1.js

# Run chat model examples
node src/chatmodels.js

# Run prompt template examples
node src/prompt-template.js
```

---

## API Key References

| Key                  | Description                                                    | Website                                        |
| -------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `CEREBRAS_API_KEY`   | Access to Cerebras ultra-fast LLM inference (Llama, GLM, etc.) | [cloud.cerebras.ai](https://cloud.cerebras.ai) |
| `EXA_SEARCH_API_KEY` | Real-time neural web search for AI agents                      | [exa.ai](https://exa.ai)                       |

---

## Dependencies

| Package                                                                    | Purpose                             |
| -------------------------------------------------------------------------- | ----------------------------------- |
| [`langchain`](https://www.npmjs.com/package/langchain)                     | Core LangChain framework            |
| [`@langchain/core`](https://www.npmjs.com/package/@langchain/core)         | Messages, prompts, tools, runnables |
| [`@langchain/cerebras`](https://www.npmjs.com/package/@langchain/cerebras) | Cerebras LLM integration            |
| [`@langchain/exa`](https://www.npmjs.com/package/@langchain/exa)           | Exa search tool integration         |
| [`exa-js`](https://www.npmjs.com/package/exa-js)                           | Exa JS client                       |
| [`dotenv`](https://www.npmjs.com/package/dotenv)                           | Environment variable loader         |
| [`zod`](https://www.npmjs.com/package/zod)                                 | Schema validation for tool inputs   |

---

## License

ISC
