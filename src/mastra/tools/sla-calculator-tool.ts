import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const SLA_HOURS_BY_SEVERITY: Record<string, number> = {
  critical: 1,
  high: 4,
  medium: 24,
  low: 72,
};

export const slaCalculatorTool = createTool({
  id: "sla-calculator",
  description:
    "Calculates a response deadline from a ticket's severity and submission time.",
  inputSchema: z.object({
    severity: z.enum(["low", "medium", "high", "critical"]),
    submittedAt: z
      .string()
      .describe("ISO 8601 timestamp of when the ticket was submitted"),
  }),
  outputSchema: z.object({
    slaHours: z.number(),
    deadline: z.string(),
  }),
  execute: async ({ severity, submittedAt }) => {
    const hours = SLA_HOURS_BY_SEVERITY[severity];
    const submitted = new Date(submittedAt);
    const deadline = new Date(submitted.getTime() + hours * 60 * 60 * 1000);
    return { slaHours: hours, deadline: deadline.toISOString() };
  },
});
