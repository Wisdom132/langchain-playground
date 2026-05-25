import "dotenv/config";

import { ChatCerebras } from "@langchain/cerebras";
import * as z from "zod";
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

const animalSchema = z
  .object({
    animals: z.array(z.string()).describe("a list of wild animals"),
  })
  .describe("a list of animals");

const booleanSchema = z
  .object({
    val: z.boolean().describe("true or false"),
  })
  .describe("return true or false");

const structuredLlm = llm.withStructuredOutput(booleanSchema);

const result = await structuredLlm.invoke([
  new HumanMessage("return a list of users with letter z"),
]);

console.log(result);
