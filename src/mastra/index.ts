import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { createContentSimilarityScorer } from "@mastra/evals/scorers/code";

import { supportTriageAgent } from "./agents/support-triage-agent";
import { releaseSummaryAgent } from "./agents/release-summary-agent";
import { accountRiskAgent } from "./agents/account-risk-agent";

import { supportEscalationWorkflow } from "./workflows/support-escalation-workflow";
import { releaseCommunicationWorkflow } from "./workflows/release-communication-workflow";
import { renewalReviewWorkflow } from "./workflows/renewal-review-workflow";

export const mastra = new Mastra({
  agents: { supportTriageAgent, releaseSummaryAgent, accountRiskAgent },
  workflows: {
    supportEscalationWorkflow,
    releaseCommunicationWorkflow,
    renewalReviewWorkflow,
  },
  storage: new LibSQLStore({ id: "main-storage", url: "file:mastra.db" }),
  scorers: {
    contentSimilarity: createContentSimilarityScorer(),
  },
});
