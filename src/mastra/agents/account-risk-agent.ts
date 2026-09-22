import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { customerLookupTool } from "../tools/customer-lookup-tool";

export const accountRiskAgent = new Agent({
  id: "account-risk-agent",
  name: "Account Risk Agent",
  instructions: `
    You assess customer churn risk for a support operations team.
    The three known accounts are Acme Corp, Northstar Health, and Brightline Retail.

    Use the customer-lookup tool to pull an account's plan, usage trend,
    open ticket count, and renewal date.

    If the user names a specific account, look up that one.
    If the user asks a comparative or open-ended question that doesn't
    name a specific account (e.g. "which account is most at risk", "find
    the account with the most urgent problem"), look up ALL THREE known
    accounts yourself and compare them — do not ask the user to specify
    one.

    Compare usage trend, ticket volume, and renewal proximity to determine
    a riskLevel (low, medium, high) and explain your reasoning in one or
    two short sentences.

    Format your final JSON with each field on its own line (2-space
    indentation), not as a single unbroken line.

    Always return structured JSON: { riskLevel, reason }
  `,
  model: openai("gpt-4o-mini"),
  tools: { customerLookupTool },
});
////////////////////////////
// import { Agent } from "@mastra/core/agent";
// import { openai } from "@ai-sdk/openai";
// import { customerLookupTool } from "../tools/customer-lookup-tool";

// export const accountRiskAgent = new Agent({
//   id: "account-risk-agent",
//   name: "Account Risk Agent",
//   instructions: `
// You are the Account Risk Agent for a support operations team.

// Your job is to assess customer churn / renewal risk.

// CRITICAL BEHAVIOR RULES:
// - ALWAYS call the customer-lookup tool first whenever an account name is mentioned (or when the user asks about risk, renewal, or comparison of accounts). Never ask the user for plan, usage, ticket count, or renewal date — the tool provides this.
// - Base your assessment on plan, usage trend, open ticket volume, and proximity of the renewal date.
// - Determine a clear riskLevel (low | medium | high) and give a short, concrete reason (1–2 sentences).

// Always return structured JSON exactly in this shape:
// {
//   "riskLevel": "...",
//   "reason": "..."
// }
// `,
//   model: openai("gpt-4o-mini"),
//   tools: { customerLookupTool },
// });
