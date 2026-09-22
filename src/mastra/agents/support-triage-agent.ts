// import { Agent } from "@mastra/core/agent";
// import { openai } from "@ai-sdk/openai";
// import { customerLookupTool } from "../tools/customer-lookup-tool";
// import { slaCalculatorTool } from "../tools/sla-calculator-tool";

// export const supportTriageAgent = new Agent({
//   id: "support-triage-agent",
//   name: "Support Triage Agent",
//   instructions: `
//     You classify incoming support tickets for a support operations team.
//     For each ticket, determine:
//       - category (e.g. login_failure, duplicate_invoice, service_outage)
//       - severity (low, medium, high, critical)
//       - owner (the team that should handle it)
//       - nextAction (a concrete next step)

//     If the ticket mentions a customer/account name, use the customer-lookup
//     tool to pull their account context before deciding severity.

//     Once severity is known, use the sla-calculator tool with the ticket's
//     submission time to compute a response deadline.

//     Always return your final answer as structured JSON matching:
//     { category, severity, owner, nextAction, slaDeadline }
//   `,
//   model: openai("gpt-4o-mini"),
//   tools: { customerLookupTool, slaCalculatorTool },
// });
////////////////////////////////////
// import { Agent } from "@mastra/core/agent";
// import { openai } from "@ai-sdk/openai";
// import { customerLookupTool } from "../tools/customer-lookup-tool";
// import { slaCalculatorTool } from "../tools/sla-calculator-tool";
// import { supportCasesTool } from "../tools/support-cases-tool";

// export const supportTriageAgent = new Agent({
//   id: "support-triage-agent",
//   name: "Support Triage Agent",
//   instructions: `
// You are the Support Triage Agent for a support operations team.

// Your job is to classify incoming support tickets and return a clear, actionable triage decision.

// CRITICAL BEHAVIOR RULES:
// - ALWAYS use the available tools when they can provide useful information. Never ask the user for account names, customer details, open tickets, or data that the tools can return.
// - If a ticket mentions (or implies) a customer/account, immediately call the customer-lookup tool first.
// - After determining severity, always call the sla-calculator tool using the ticket's submission time (or current time if not provided) to get the response deadline.
// - Only ask clarifying questions if the tools return no useful data or the request is truly ambiguous after tool results are available.

// For every ticket determine:
// - category (e.g. login_failure, duplicate_invoice, service_outage, billing, other)
// - severity (low | medium | high | critical)
// - owner (the team that should handle it)
// - nextAction (a concrete, specific next step)
// - slaDeadline (from the sla-calculator tool)

// Always return your final answer as structured JSON exactly in this shape:
// {
//   "category": "...",
//   "severity": "...",
//   "owner": "...",
//   "nextAction": "...",
//   "slaDeadline": "..."
// }
// `,
//   model: openai("gpt-4o-mini"),
//   tools: { customerLookupTool, slaCalculatorTool, supportCasesTool },
// });
///////////////////////////////
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { openai } from "@ai-sdk/openai";
// import { createSlackAdapter } from "@chat-adapter/slack";
import { customerLookupTool } from "../tools/customer-lookup-tool";
import { slaCalculatorTool } from "../tools/sla-calculator-tool";

export const supportTriageAgent = new Agent({
  id: "support-triage-agent",
  name: "Support Triage Agent",
  instructions: `
    You classify incoming support tickets for a support operations team.
    For each ticket, determine:
      - category (e.g. login_failure, duplicate_invoice, service_outage)
      - severity (low, medium, high, critical)
      - owner (the team that should handle it)
      - nextAction (a concrete next step)
      - reason (one or two sentences explaining why you classified it this way)
      - confidence (a number from 0 to 1 representing your confidence in this classification)

    If the ticket mentions a customer/account name, use the customer-lookup
    tool to pull their account context before deciding severity.

    Once severity is known, use the sla-calculator tool with the ticket's
    submission time to compute a response deadline.

    Keep every field's value concise — one short sentence or fewer for
    reason, a few words for nextAction and owner. Format your final JSON
    with each field on its own line (2-space indentation), not as a
    single unbroken line.

    Always return your final answer as structured JSON matching:
    { category, severity, owner, nextAction, slaDeadline, reason, confidence }
  `,
  model: openai("gpt-4o-mini"),
  tools: { customerLookupTool, slaCalculatorTool },
  memory: new Memory({
    options: { lastMessages: 20 },
  }),
  channels: {
    adapters: {
      // slack: createSlackAdapter(),
    },
  },
});
