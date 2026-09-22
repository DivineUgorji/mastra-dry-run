// import { Mastra } from "@mastra/core/mastra";

// import { supportTriageAgent } from "./agents/support-triage-agent";
// import { releaseSummaryAgent } from "./agents/release-summary-agent";
// import { accountRiskAgent } from "./agents/account-risk-agent";

// import { supportEscalationWorkflow } from "./workflows/support-escalation-workflow";
// import { releaseCommunicationWorkflow } from "./workflows/release-communication-workflow";
// import { renewalReviewWorkflow } from "./workflows/renewal-review-workflow";

// import { changelogLookupTool } from "./tools/changelog-lookup-tool";
// import { customerLookupTool } from "./tools/customer-lookup-tool";
// import { slaCalculatorTool } from "./tools/sla-calculator-tool";

// export const mastra = new Mastra({
//   agents: { supportTriageAgent, releaseSummaryAgent, accountRiskAgent },
//   workflows: {
//     supportEscalationWorkflow,
//     releaseCommunicationWorkflow,
//     renewalReviewWorkflow,
//   },
//   tools: { changelogLookupTool, customerLookupTool, slaCalculatorTool },
// });
///////////////////////////
import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";

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
});
