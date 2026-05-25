import "dotenv/config";
import * as z from "zod";

import { ChatCerebras } from "@langchain/cerebras";
import { createAgent, tool, createMiddleware } from "langchain";

import { HumanMessage } from "@langchain/core/messages";

import Exa from "exa-js";
import { ExaSearchResults } from "@langchain/exa";

const model = new ChatCerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
  temperature: 0,
  // model: "llama3.1-8b",
  model: "zai-glm-4.7",
});

const client = new Exa(process.env.EXA_SEARCH_API_KEY);

const exaTool = new ExaSearchResults({
  client,
  searchArgs: {
    numResults: 1,
    type: "keyword",
  },
});

const modelMiddleware = createMiddleware({
  name: "modelMiddleware",
  beforeModel: (state) => {
    console.log("state before model is called");
  },
  beforeAgent: (state) => {
    console.log("state before agent is called");
  },

  afterAgent: (state) => {
    console.log("state after agent is called");
  },
  afterModel: (state) => {
    console.log("state after model is called");
  },
});

const toolMonitoringMiddleware = createMiddleware({
  name: "toolMonitoringMiddleware",
  wrapToolCall: async (request, handler) => {
    console.log(request.toolCall.name);
    try {
      const result = await handler(request);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});

const retryMiddleware = (maxRetries = 3) => {
  return createMiddleware({
    name: "retryMiddleware",
    wrapModelCall: async (request, handler) => {
      for (let attempts = 0; attempts < maxRetries; attempts++) {
        try {
          return await handler(request);
        } catch (error) {
          console.error(error);
        }
      }
      throw new Error("Max retries exceeded");
    },
  });
};
const searchTool = tool(
  async ({ query }) => {
    const results = await exaTool.invoke(query);
    return JSON.stringify(results);
  },
  {
    name: "search_web",
    description: "Search the web for real time information",
    schema: z.object({
      query: z.string(),
    }),
  },
);

const fetchListOfUsers = tool(
  async () => {
    const users = ["Wisdom", "Tom", "James", "Timothy", "Candle"];
    return users;
  },
  {
    name: "fetch_user",
    description:
      "Fetch and return the complete list of all users from the database",
    schema: z.object({}),
  },
);

const agent = createAgent({
  model,
  tools: [searchTool, fetchListOfUsers],
  middleware: [retryMiddleware(3), modelMiddleware, toolMonitoringMiddleware],
  systemPrompt: `You are an AI assistant with access to tools.

  Always use tools when the user requests:
  - database information
  - user lists
  - external information
  - web searches

  Do not answer from assumptions when tools are available.`,
});

const result = await agent.invoke({
  messages: [new HumanMessage("fetch me the list of users in the database")],
});

// console.log(result.messages[result.messages.length - 1].content);
// console.log(result);
