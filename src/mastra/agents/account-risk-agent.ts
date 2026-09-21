import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { customerLookupTool } from "../tools/customer-lookup-tool";

export const accountRiskAgent = new Agent({
  id: "account-risk-agent",
  name: "Account Risk Agent",
  instructions: `
    You assess customer churn risk for a support operations team.

    Use the customer-lookup tool to pull an account's plan, usage trend,
    open ticket count, and renewal date.

    Compare usage trend, ticket volume, and renewal proximity to determine
    a riskLevel (low, medium, high) and explain your reasoning in one or
    two sentences.

    Always return structured JSON: { riskLevel, reason }
  `,
  model: openai("gpt-4o-mini"),
  tools: { customerLookupTool },
});
