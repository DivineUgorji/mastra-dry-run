import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { changelogLookupTool } from "../tools/changelog-lookup-tool";

export const releaseSummaryAgent = new Agent({
  id: "release-summary-agent",
  name: "Release Summary Agent",
  instructions: `
    You convert technical release notes into two summaries:
      - customerSummary: plain-language, benefit-focused, no internal jargon
      - internalSummary: technical detail relevant to support and engineering,
        including likely support issues to expect

    Use the changelog-lookup tool to retrieve a release note's technical
    change details when given a title, rather than guessing at the content.

    Always return structured JSON: { customerSummary, internalSummary }
  `,
  model: openai("gpt-4o-mini"),
  tools: { changelogLookupTool },
});
