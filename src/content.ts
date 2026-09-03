export const content = {
  nav: {
    logo: "Prism",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Live audit", href: "#live-audit" },
      { label: "Accuracy", href: "#accuracy" },
      { label: "Method", href: "#method" },
      { label: "Limitations", href: "#limitations" },
      { label: "Blog", href: "/blog/prism-v1" },
      { label: "GitHub", href: "https://github.com/i-mouse/prism" },
    ],
    cta: "Audit a paper — no account"
  },
  hero: {
    headlineStart: "The only tool that tells you what a paper ",
    headlineHighlight: "doesn't prove.",
    subhead: "Prism audits a paper's claims, finds the evidence, and refuses to affirm what the paper doesn't support."
  },
  liveAuditDemo: {
    header: "LIVE AUDIT DEMO",
    examples: [
      {
        claimNum: "1 of 3",
        claimText: "ReAct overcomes prevalent issues of hallucination and error propagation in chain-of-thought reasoning",
        auditorText: "Searching for direct evidence in the paper... Table 2 shows ReAct eliminates CoT's hallucination failure mode (56% -> 0%) but increases reasoning errors (16% -> 47%). Overall HotpotQA accuracy is lower than CoT (27.4 vs 29.4 EM). Evidence is incomplete.",
        auditorHighlight: "Evidence is incomplete.",
        verdict: "PARTIALLY SUPPORTED",
        verdictColor: "partial",
        ref: "Section 3.3 · Table 1 · Table 2",
      },
      {
        claimNum: "2 of 3",
        claimText: "prompting a PaLM 540B with just eight chain-of-thought exemplars achieves state-of-the-art accuracy on the GSM8K benchmark, surpassing even finetuned GPT-3 with a verifier",
        auditorText: "Checking Table 1 for GSM8K results... PaLM 540B with CoT scores 56.9% on GSM8K, beating the prior best of 55% (fine-tuned GPT-3). Direct evidence in the table confirms the claim.",
        auditorHighlight: "Direct evidence in the table confirms the claim.",
        verdict: "SUPPORTED",
        verdictColor: "supported",
        ref: "Section 3.2 · Table 1",
      },
      {
        claimNum: "3 of 3",
        claimText: "Reflexion is more sample-efficient than traditional reinforcement learning methods",
        auditorText: "Scanning experiments section for RL baseline comparisons... Paper only compares Reflexion against other frozen-LLM prompting techniques (ReAct, CoT). No traditional RL agent is benchmarked. Claim not supported by experimental evidence.",
        auditorHighlight: "Claim not supported by experimental evidence.",
        verdict: "NOT SUPPORTED",
        verdictColor: "refused",
        ref: "Abstract vs Section 4",
      }
    ]
  },
  wedge: [
    { title: "Elicit / Consensus", desc: "Finds papers across the literature.", type: "normal" },
    { title: "Scite", desc: "Counts how a paper has been cited.", type: "normal" },
    { title: "Prism", desc: "Audits the paper you're already reading.", type: "brand" }
  ],
  stats: {
    mainNumberParts: ["10", " / ", "14"],
    subtext: "correct-refusal rate on adversarial cases.",
    metrics: [
      "16 / 23    positive hits",
      "1 / 23     false rejections",
      "37         hand-authored golden rows across 3 papers"
    ],
    linkText: "Eval set and CI run — see the commit →",
    linkHref: "https://github.com/i-mouse/prism/tree/main/docs/evals"
  },
  howItWorks: {
    eyebrow: "HOW IT WORKS",
    heading: "See the audit happen.",
    subhead: "Scroll to watch Prism reason through a paper.",
    steps: [
      { num: 1, title: "Extractor pulls a claim", desc: "Claims are identified from the paper.", color: "rose" },
      { num: 2, title: "Auditor reasons with evidence", desc: "The auditor looks for direct support.", color: "gray" },
      { num: 3, title: "Structurer returns structured result", desc: "A clear label and citation are produced.", color: "gray" }
    ],
    link: "Read about our three-call architecture →",
    paperHeader: "3.3 ReAct Prompting",
    paperTextStart: "Table 1 shows ",
    paperHighlight: "outperforms Act (25.7 EM) on HotpotQA",
    paperTextEnd: " under PaLM-540B.",
    verdictCards: [
      { verdict: "SUPPORTED", color: "supported", ref: "Section 3.3 · Table 1", text: "ReAct outperforms Act baseline on HotpotQA (27.4 vs 25.7 EM)" },
      { verdict: "PARTIALLY SUPPORTED", color: "partial", ref: "Section 4 · Table 3", text: "ReAct beats ReAct-IM overall (71 vs 53) but loses on Clean task" },
      { verdict: "NOT SUPPORTED", color: "refused", ref: "Abstract vs Table 1", text: "Abstract claims 'effectiveness over SOTA baselines' but supervised SoTA scores 67.5 EM vs ReAct 27.4 EM on HotpotQA" }
    ]
  },
  upload: {
    eyebrow: "LIVE AUDIT",
    heading: "Audit a paper right now.",
    subhead: "Upload a PDF and get a claim-by-claim audit in minutes. No account. No credit card.",
    dropzoneMain: "Drop your PDF here",
    dropzoneSub: "or click to browse",
    dropzoneNote: "Up to 50MB · PDF only",
    linkHref: "https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/"
  },
  wontDo: {
    eyebrow: "WHAT PRISM WON'T DO",
    heading: "Prism refuses to affirm claims a paper doesn't support.",
    items: [
      "We won't summarize papers.",
      "We won't compare across a corpus.",
      "We won't recommend citations.",
      "We won't generate content you can't trace to the paper."
    ],
    paragraph: "That's a different job. Prism is for auditing the paper you're already reading."
  },
  limitations: {
    eyebrow: "LIMITATIONS",
    heading: "What this number doesn't prove.",
    blocks: [
      "The three eval papers are well known and likely in the model's training data. Correct refusal here may partly reflect memorisation. A held-out post-cutoff paper with sealed rows is the fix.",
      "Refusal rate fell from 93% to 71% after a grounding change. The cause was better coverage, not worse grounding: the extractor now surfaces trap claims instead of silently skipping them. The lower number is the more honest one.",
      "Fourteen negative cases is a seed probe, not a benchmark."
    ]
  },
  engineering: [
    {
      icon: "code",
      eyebrow: "BUILT FOR CORRECT-REFUSAL",
      heading: "Every prompt change runs against 14 adversarial cases in CI. We ship when the number holds.",
      linkText: "See the eval harness →",
      linkHref: "https://github.com/i-mouse/prism/tree/main/docs/evals"
    },
    {
      icon: "network",
      eyebrow: "THREE-CALL ARCHITECTURE",
      heading: "Extractor → Auditor → Structurer. Separation of concerns. Observable. Reliable.",
      linkText: "Read the engineering blog →",
      linkHref: "https://github.com/i-mouse/prism"
    },
    {
      icon: "github",
      eyebrow: "OPEN & REPRODUCIBLE",
      heading: "Prompts, evals, and results are public.",
      linkText: "View on GitHub →",
      linkHref: "https://github.com/i-mouse/prism"
    }
  ],
  footer: {
    taglines: ["Built for researchers.", "Built for truth."],
    copyright: "© 2026 Prism",
    columns: [
      { title: "Product", links: ["Live audit", "Accuracy", "How it works"] },
      { title: "Resources", links: ["Eval set", "Documentation"] },
      { title: "Company", links: ["About", "Privacy", "Terms"] }
    ]
  }
};
