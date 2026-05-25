import "dotenv/config";

import { ChatCerebras } from "@langchain/cerebras";
import * as z from "zod";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { tool } from "@langchain/core/tools";

const llm = new ChatCerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
  maxTokens: undefined,
  temperature: 0,
  model: "llama3.1-8b",
});

const prompt1 = ChatPromptTemplate.fromMessages([
  [
    "system",
    `Summarize this chat history provided here.


    `,
  ],

  [
    "human",
    `
    here's the chat history:  {chatHistory}
    `,
  ],
]);

const chain = prompt1.pipe(llm);

const result = await chain.invoke({
  chatHistory: "user: hello, ai: how can i help you today",
});

console.log(result);

// const prompts = ChatPromptTemplate.fromMessages([
//   new SystemMessage(`you are a senior customer support AI agent for a SaaS company
//     Your job:
//     - Understand the user's issue in a conversational context
//     - Decide the next best action to take
//     - Execute the action and provide a clear and concise response

//     Rules:
//     - Always respond in the user's language
//     - If the user asks for help, provide a helpful response
//     - If the user asks for clarification, ask for more details
//     - If the user asks for a solution, provide a clear and concise solution
//     `),

//   new SystemMessage(`
//       Conversation context
//       - user plan: {plan}
//       - Previous issue: {previousIssue}
//       - Account Status: {accountStatus}
//     `),
//   new HumanMessage(`{input}`),
// ]);

// const supportDecisionScheman = z.object({
//   intent: z.enum([
//     "billingIssue",
//     "technicalIssue",
//     "generalQuestion",
//     "other",
//   ]),
//   urgency: z.enum(["low", "medium", "high"]),
//   action: z.enum(["resolve", "redirect", "inform", "defer"]),
//   reply: z.string().describe("Message shown to the user"),
// });

// const structuredLlm = llm.withStructuredOutput(supportDecisionScheman);

// const chain = prompts.pipe(structuredLlm);

// const result = await chain.invoke({
//   plan: "Free",
//   previousIssue: "billingIssue",
//   accountStatus: "active",
//   input: "Why is my billing not working?",
// });

// console.log(result);
