import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
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

    If the ticket mentions a customer/account name, use the customer-lookup
    tool to pull their account context before deciding severity.

    Once severity is known, use the sla-calculator tool with the ticket's
    submission time to compute a response deadline.

    Always return your final answer as structured JSON matching:
    { category, severity, owner, nextAction, slaDeadline }
  `,
  model: openai("gpt-4o-mini"),
  tools: { customerLookupTool, slaCalculatorTool },
});
