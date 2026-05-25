import "dotenv/config";

import { ChatCerebras } from "@langchain/cerebras";

import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";

const llm = new ChatCerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
  maxTokens: undefined,
  temperature: 0,
  model: "llama3.1-8b",
});

// const messages = [
//   new AIMessage("How can I assist you today?"),
//   new HumanMessage("I need help with quantum computing"),
// ];

const messages = [
  new SystemMessage(
    "you are a helpful assistant, respond to the user if they need help. if they need help in another language, respond in that language.",
  ),
  new HumanMessage("Bawo ni o ṣe wa loni"),
];

const result = await llm.invoke(messages);

console.log(result);
