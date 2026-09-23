import Link from 'next/link';

export const metadata = {
  title: 'Prism v1.0: Autonomous Empirical Claim-Auditing Engine',
  description: 'Technical writeup of Prism v1.0 architecture, evaluation, and engineering decisions.',
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-300 py-24 px-6 font-sans">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
          <Link href="/" className="text-brand border-b border-brand pb-0.5 hover:text-orange-400 hover:border-orange-400 transition-colors mb-8 inline-block font-mono text-sm">
            ← Back to Prism
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold font-mono leading-tight mb-6 text-zinc-900 dark:text-zinc-100">
            Prism v1.0: Why "Correct Refusal" is the Only Metric That Matters
          </h1>
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-sm">
            <time dateTime="2026-09-03">September 3, 2026</time>
            <span>·</span>
            <span>Updated <time dateTime="2026-09-23">September 23</time></span>
          </div>
        </header>

        <div className="space-y-8 text-lg leading-relaxed">
          {/* 1. Hook */}
          <section className="space-y-4">
            <p>
              Tools like Elicit, Consensus, and Scite have successfully solved literature discovery. They help you find papers across a massive corpus, summarize their abstracts, and track citation graphs. But they deliberately do not perform the peer-reviewer's core job: auditing whether a single paper's headline claims are actually supported by its own experimental evidence.
            </p>
            <p>
              Nobody is programmatically checking if the results table in Section 4 actually backs up the sweeping generalization made in the abstract. That is the reviewer's job. Prism does that.
            </p>
          </section>

          {/* 2. The Wedge */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">The Engineering Bet: Correct Refusal</h2>
            <p>
              A claim-auditing tool that fabricates evidence or hallucinated support is worse than having no tool at all. The core engineering bet of Prism rests entirely on "correct refusal". When a paper makes a claim but provides no data to back it up, Prism must refuse to affirm the claim. It should loudly declare that the paper provides no evidence, rather than hallucinating support just to appear helpful.
            </p>
            <p>
              Because of this, the core measurement of Prism's success is not its raw extraction volume. The single most important metric we track is the correct-refusal rate on known grounding-negative adversarial cases. If the tool cannot correctly reject an unsupported claim, the entire architecture fails its primary objective.
            </p>
          </section>

          {/* 3. How it works */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">How It Works</h2>
            <p>
              Prism operates on a three-call extraction pipeline: <strong>Extractor → Auditor → Structurer</strong>. This strict separation of concerns exists because early prototypes revealed that a single schema-constrained LLM call forces the model to commit to a label before it has generated reasoning tokens. By splitting the pipeline, the auditor can reason in free text against the extracted spans before the structurer parses and commits to a final structured verdict.
            </p>
            <p>
              Our two-stage grounding process uses a RapidFuzz threshold for verbatim semantic matching, followed by a multi-model LLM audit. The LLM audit uses a strict 3-tier Pass/Partial/Fail rubric to evaluate the evidence. To prevent false rejections caused by overly narrow text slices, we implemented context widening: the auditor receives 500-1500 characters of surrounding context snapped to paragraph boundaries.
            </p>
            <p>
              Finally, Prism provides a paper-scoped chat interface embedded alongside the audit matrix. It uses dual concurrent retrieval over both structured paper claims (via Postgres Full-Text Search) and dense semantic chunks (stored in Qdrant), ensuring that conversational responses are firmly grounded in the paper's actual text and explicitly extracted claims.
            </p>
          </section>

          {/* 4. The eval, and the number */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">The Eval and The Number</h2>
            <p>
              Our golden set consists of 14 grounding-negative cases (out of 37 total claims) manually authored across three foundational LLM agent papers: Reflexion, Chain-of-Thought, and ReAct. We chose these papers because they are dense with empirical claims and represent the exact type of architecture literature our target audience reads.
            </p>
            <p>
              The golden set focuses heavily on trap claims—statements the authors make in the abstract or introduction that are explicitly contradicted or completely unsupported by their own data tables later in the text. For instance, a paper might claim in the abstract that its method generalizes to "any task that humans can solve via language," but the results section only tests arithmetic and simple coin-flip tasks. If Prism extracts that generalization claim and labels it "Supported," it has failed the audit.
            </p>
            <p>
              Consider this specific trap claim from the ReAct paper (REACT-M13):
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-sm my-6">
              <p className="mb-2 text-rose-500 font-bold">Trap Claim Text:</p>
              <p className="mb-4">"We apply our approach, named ReAct... and demonstrate its effectiveness over state-of-the-art baselines"</p>
              <p className="mb-2 text-brand font-bold">Expected Refusal Rationale:</p>
              <p className="mb-4">Matches Pattern 5 (Superiority claim vs a class failed against). While ReAct outperforms certain few-shot prompting baselines, Table 1 explicitly shows ReAct (27.4 EM) being crushed by the 'Supervised SoTA' (67.5 EM) on HotpotQA. The abstract inflates the claim.</p>
              <p className="mb-2 text-zinc-500 font-bold">Prism Verdict:</p>
              <p>NOT SUPPORTED. Prism correctly catches that the abstract's broad superiority claim is refuted by the specific results table, and refuses to affirm it.</p>
            </div>
            <p>
              Across two live runs on September 23 against the production Azure Postgres database, with all three papers extracted, our correct-refusal rate on these traps was <strong>12/14 (86%) refusal-family</strong> in both runs. Run 1 broke down as 6 explicit <strong>by_label</strong> refusals, 4 <strong>by_omission</strong> (extractor never surfaced the trap), and 2 <strong>by_grounding_reject</strong>; Run 2 as 5 / 5 / 2. In both runs, <strong>4/14 (29%)</strong> were strict-label matches that landed on the exact expected tier. Both numbers matter: 86% is our safety property, while the gap to 29% represents ongoing work to make refusals precise instead of accidental.
            </p>
            <p>
              This evaluation suite acts as a strict CI gate for the repository. Any prompt, model, or retrieval change runs against this golden set before and after. A single grounding-negative FAIL blocks the change. 
            </p>
            <p>
              This discipline matters because it actively prevents tuning-to-pass—the failure mode of most LLM evaluations where coverage and positive hits are bought at the expense of correct refusal. It is trivially easy to make an LLM extract more claims by widening its extraction prompt. But doing so usually causes the grounder to become more permissive, letting unsupported claims slip through. By locking our CI to the correct-refusal metric, we guarantee that coverage improvements never come at the cost of the system's core integrity.
            </p>
          </section>

          {/* 4b. Two runs, and what the numbers don't say */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Two Runs, and What the Numbers Don't Say</h2>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-sm my-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-zinc-500">
                    <th className="pr-4 pb-2 font-bold">Metric</th>
                    <th className="pr-4 pb-2 font-bold">Run 1 (10:42Z)</th>
                    <th className="pb-2 font-bold">Run 2 (11:22Z)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="pr-4 py-1">Refusal-family</td><td className="pr-4">12/14 (86%)</td><td>12/14 (86%)</td></tr>
                  <tr><td className="pr-4 py-1">label / omission / grounding</td><td className="pr-4">6 / 4 / 2</td><td>5 / 5 / 2</td></tr>
                  <tr><td className="pr-4 py-1">Strict-label</td><td className="pr-4">4/14 (29%)</td><td>4/14 (29%)</td></tr>
                  <tr><td className="pr-4 py-1">Positive hits</td><td className="pr-4">14/23 (61%)</td><td>15/23 (65%)</td></tr>
                  <tr><td className="pr-4 py-1">False rejection</td><td className="pr-4">0/23 (0%)</td><td>0/23 (0%)</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              "Refusal-family" counts a trap as correctly handled if Prism did not affirm it, and there are three different ways that can happen. A <strong>by_label</strong> refusal means the auditor read the claim against the paper and reasoned to <code>partially_supported</code> or <code>not_supported</code>. That is the product working as designed. A <strong>by_omission</strong> refusal means the extractor never surfaced the claim at all, so it was never affirmed, but it was never flagged either. The user sees nothing. A <strong>by_grounding_reject</strong> means the auditor affirmed the claim, but the downstream grounding checker failed its cited evidence, so it is not shown as supported. Only the first is a refusal the user can actually read. The 86% is a safety floor; the by_label count is the number that has to grow.
            </p>
            <p>
              The number I watch most closely is the false-rejection rate: 0/23 in both runs. Across every positive claim in the golden set, Prism never told a user that a supported claim was unsupported. A refusal-first system has an obvious degenerate solution, which is to refuse everything. A 0% false-rejection rate is the evidence that the refusals come from reading the paper, not from a bias toward saying no.
            </p>
            <p>
              I'm reporting both runs rather than the better one because they differ. The refusal rate, strict-label rate, and false-rejection rate were identical across both. Positive hits moved from 14/23 to 15/23. The eval matcher that pairs golden rows with extracted claims is itself an LLM call, and it is not perfectly deterministic. Inside the refusal breakdown, one trap claim shifted from by_label to by_omission between runs; the total held at 12. A single run would have hidden that variance, so the honest figure is a range: 61–65% positive hits, 86% refusal-family.
            </p>

            <h3 className="text-xl font-bold font-mono text-zinc-800 dark:text-zinc-200 mt-8 mb-2">Known Limitations</h3>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                {/* TODO: replace with the confirmed react.pdf ALFWorld example (exact specifics pending) */}
                <strong>RapidFuzz vs. table citations.</strong> Grounding starts with a lexical RapidFuzz match between the cited quote and the paper text. PDF parsing flattens tables, losing layout and spacing, so a correct quote from a results table can fail the lexical stage even when the auditor cited the right numbers. The react.pdf ALFWorld results are the confirmed case.
              </li>
              <li>
                {/* TODO: replace with the confirmed reflexion.pdf claim 7 example (exact specifics pending) */}
                <strong>Scope-tightening is blunt on definitional claims.</strong> The auditor requires evidence from experimental results, data, or proofs, not just a restatement in the Abstract or Introduction. That rule catches generalization traps, but it also penalizes claims that are definitional, where the paper describing its own method is the evidence. Reflexion claim 7 is the confirmed case.
              </li>
              <li>
                <strong><code>stance: refutes</code> has never been observed.</strong> The span-level grounding audit emits a stance (supports / refutes / neutral) for each evidence span. Across 200+ grounded spans in the production database, confirmed by direct query, the count of <code>refutes</code> is zero. Nothing downstream consumes stance yet, so this does not affect any label or number above. But until it fires at least once on a genuinely contradicting quote, the field is not a trustworthy signal.
              </li>
              <li>
                <strong>PDF ligature mojibake.</strong> PyMuPDF sometimes emits ligature glyphs (ﬁ, ﬂ) in place of the letters they represent, which breaks exact string matching. The eval matcher normalizes these with NFKC; the grounding stage does not.
              </li>
              <li>
                <strong>No held-out paper yet.</strong> Reflexion, Chain-of-Thought, and ReAct are well known and almost certainly in the model's training data. Some correct refusals may reflect memorization rather than reading. A held-out, post-training-cutoff paper with sealed golden rows is the fix, and it is not built yet. Fourteen negative cases is a seed probe, not a benchmark.
              </li>
            </ul>
          </section>

          {/* 5. Three things that broke */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Three Things That Broke (And What They Taught)</h2>
            
            <h3 className="text-xl font-bold font-mono text-zinc-800 dark:text-zinc-200 mt-8 mb-2">1. Answer-Before-Reasoning Collapse</h3>
            <p>
              During an initial live run with a new open-weight model, our structured audit output was failing wildly, returning 12 out of 13 claims as completely unsupported. I initially thought the context window was the problem, or the model was too weak. The actual issue was JSON schema decoding. The schema forced the model to commit to the <code>verdict</code> field before generating its reasoning tokens. This is classic "answer-before-reasoning collapse" documented in recent constraint-inversion literature. I fixed it by making the audit call output the reasoning field first, ensuring the model generates reasoning tokens before committing to a verdict. The fix taught me that schema ordering is fundamentally a prompting construct, not just a data shape.
            </p>

            <h3 className="text-xl font-bold font-mono text-zinc-800 dark:text-zinc-200 mt-8 mb-2">2. Aspire Deploy Deadlock</h3>
            <p>
              While deploying the full stack to Azure Container Apps, the <code>aspire deploy</code> command hung indefinitely on the React UI build step. Zero Docker process activity. I initially suspected a Docker environment issue or a permissions failure with Azure Container Registry. I reproduced the hang across three different code paths (AddNpmApp, AddDockerfile, AddJavaScriptApp). The root cause was an Aspire CLI orchestration deadlock triggered specifically when using <code>WithBuildArg</code> during publish mode. It's an unresolved upstream bug. The fix taught me that orchestration abstractions leak heavily during deployment, and having manual CLI fallback paths is mandatory when adopting new framework versions.
            </p>

            <h3 className="text-xl font-bold font-mono text-zinc-800 dark:text-zinc-200 mt-8 mb-2">3. Postgres Entra Auth for Python</h3>
            <p>
              Migrating to Entra ID for service-to-database Managed Identity auth on Azure Postgres worked seamlessly for the C# API, which auto-detected the identity and acquired tokens automatically. The Python worker, however, crashed on startup complaining about missing passwords. I assumed `psycopg` would handle token injection similarly to EF Core, but Python's raw `psycopg` connection requires the `PRISM_DB_USERNAME` to be explicitly set to the Entra principal name. The fix taught me that cross-language orchestration on Azure requires understanding exactly where the identity abstractions stop. We ported the fix by passing explicit `AddAzureUserAssignedIdentity` parameters down to the Python worker containers in our AppHost.
            </p>
          </section>

          {/* 6. What v1.0 ships */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Prism v1.0</h2>
            <p>
              Prism v1.0 is live. The tech stack is .NET 10 Aspire, C# API Gateway, Python FastAPI worker, React 19 frontend, all running on Azure Container Apps. 
            </p>
            <p>
              When a user uploads a paper, they watch real-time SignalR progress as the async pipeline extracts claims, audits evidence, and streams results. The output is a three-panel Claim-Support Matrix. You get an immediate visual assessment of which claims are supported, partially supported, or correctly refused, alongside an interactive evidence drawer and a paper-scoped chat to interrogate the text further.
            </p>
          </section>

          {/* 7. What's next */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">What's Next</h2>
            <p>
              Our roadmap is focused on stability and expanding rigor. We are prioritizing user-facing Entra ID login rollout (distinct from our completed database auth) and React UI deployment pipeline cleanup for v1.0.1. After that, we'll extend the golden eval harness with completely held-out, post-training-cutoff papers to ensure our refusal rates generalize and aren't benefiting from memorization. Down the line, we plan to explore multi-paper synthesis to audit claims consistently across the broader literature.
            </p>
          </section>

          {/* 8. CTA */}
          <section className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-12">
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mb-4">Try It Out</h2>
            <div className="flex gap-4">
              <a href="https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/" className="bg-brand text-zinc-950 font-semibold px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors">
                Run a Live Audit
              </a>
              <a href="https://github.com/i-mouse/prism" className="border border-zinc-300 dark:border-zinc-700 font-semibold px-6 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                View Source on GitHub
              </a>
            </div>
            <p className="text-sm text-zinc-500 mt-8 italic">
              Note: This post is the canonical source for the Prism v1.0 announcement.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
