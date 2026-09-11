# How I built a correct-refusal rate into an AI system

Most "AI accuracy" numbers on a portfolio project are unfalsifiable — a demo that looks good on the one input you tried. I wanted Prism, a research-paper claim-auditing system, to ship with a number that could be wrong in public: a **correct-refusal rate** on a hand-authored, adversarial eval set, run as a CI regression gate.

This post is about that number, why it's split into two parts instead of one, and the pipeline architecture that made honest refusal possible at all.

## The problem: a claim-auditor that hallucinates support is worse than no auditor

Prism reads a research paper and, for every empirical claim it finds, decides: is this actually backed by the paper's own data, or does the paper's rhetoric outrun its evidence? That second case — comparative claims made without a comparison being run, generalization claims tested only on a toy subset, superiority claims contradicted by the paper's own tables — is the entire point of the product. A tool like Elicit or Consensus helps you find and summarize papers. Prism does the reviewer's job: auditing one paper against itself.

The failure mode that matters most isn't missing a real claim. It's **inventing support for a claim that isn't there** — telling a reader "yes, this is backed by Table 3" when it isn't. So the engineering bet, from day one, was: build the eval before the pipeline, and measure refusal, not accuracy.

## The eval: 37 claims, 14 built to be refused

`docs/evals/matrix_eval.json` covers 37 claims across three foundational agent papers (Reflexion, Chain-of-Thought, ReAct). 14 of those 37 are **grounding-negative by design** — claims that sound plausible, are phrased the way the paper itself phrases them, and are *not* actually supported by the paper's evidence. They fall into three recurring rhetorical patterns:

- **Comparative claims without the comparison** — "Reflexion avoids the cost of traditional RL fine-tuning" when the paper never actually benchmarks against a traditional RL baseline.
- **Generalization claims without the generalization test** — "applicable to any task humans can solve via language" when the experiments cover three narrow, pre-configured task types.
- **Superiority claims against a baseline the method loses to** — an abstract claiming to beat "state-of-the-art baselines" when the paper's own table shows it losing badly to supervised SOTA.

These patterns aren't specific to these three papers — they're common rhetorical moves in ML papers generally, which is why the refusal rate is meant to generalize rather than be memorized to three fixed PDFs. (Known limitation, documented honestly: Reflexion/CoT/ReAct are heavily represented in Gemini's training data, and I personally read every row during prompt design — so there's implicit test-set leakage. A held-out, sealed, post-cutoff paper is the fix, deliberately not built yet.)

## The architecture: why refusal required breaking one call into three

The first version of extraction was a single structured-output call: extract claims and label them in one shot. It never once emitted a `not_supported` or `partially_supported` label — across three separate prompt rewrites, escalating instructions, and few-shot examples. `by_label` refusals stayed at zero.

The root cause was architectural, not a wording problem: Gemini's structured-output mode (`response_schema`) forces the model to commit to the `label` field *before* it generates any reasoning tokens. Schema-constrained generation collapses reasoning into a guess, and a helpfulness-tuned model's default guess under uncertainty is "supported."

The fix was to split one call into three:

1. **Extractor** — lists claims verbatim, no labels, no judgment. No schema pressure to decide anything.
2. **Auditor** — per claim, free-text reasoning that ends in a `VERDICT:` line plus `QUOTE:`/`SECTION:` evidence pairs. Deliberately *no* `response_schema` here — this is the one call in the pipeline where the model is allowed to think before it commits.
3. **Structurer** — parses the auditor's prose into the final typed schema. This is the only call using `response_schema` in the claims path.

This is the single most consequential decision in the pipeline: **never put `response_schema` on the reasoning step.** Everywhere else, structured output is a feature. On the step where the model has to decide "is this actually true," it's a trap.

A second, independent grounding stage runs after extraction: RapidFuzz string matching (fast, deterministic, catches hallucinated quotes for free) followed by an LLM audit on surviving spans, with a widened, paragraph-snapped context window (500–1500 chars, up from a too-narrow 200-char slice that was causing false rejections). The grounding checker's job is not "does this quote support the claim" — it's "does this quote justify *this specific verdict*." Refuting evidence for a claim the extractor already labeled `not_supported` should be graded as a correct grounding pass, not a failure.

## The honest number, and why it's two numbers

As of the latest fixture-frozen eval run, on the 14-row grounding-negative set:

**11/14 (79%) refusal-family** — the system did not affirm 11 of the 14 trap claims as fully supported. This is the number that matters for the product's safety property: did Prism avoid telling a reader something false is true. It breaks down as:
- 5 **by_label** — the auditor explicitly reasoned to a refusal-family verdict (`not_supported` or `partially_supported`)
- 6 **by_omission** — the extractor never surfaced the trap claim at all, so it was never affirmed but also never flagged
- 0 **by_grounding_reject** — the downstream grounding checker vetoed a claim the auditor had affirmed

**3/14 (21%) strict-label** — of the 5 explicit refusals, only 3 landed on the *exact* expected tier. The other 2 were refusal-family-correct but tier-wrong — e.g. labeled `not_supported` when the golden set expected `partially_supported`. Getting the direction right (don't affirm this) is a lower bar than getting the nuance right (affirm this much, no more).

I'm reporting all three counts, not collapsing them into one flattering percentage. They're not the same engineering achievement. Omission is a blind spot that happens to be safe today and might not be tomorrow — the model never engaged with the claim at all. An explicit but tier-wrong label means the model engaged, reasoned, and landed close but not exact. A strict match means it got the whole judgment right. The gap between 79% and 21% *is* the roadmap: prompt iteration (v4.1, not yet shipped) targets converting `by_omission` cases into explicit `by_label` cases first, then tightening `by_label` cases into `strict` matches — making refusals visible and precise instead of accidental.

## The discipline that keeps the number honest

Two rules, enforced from the start:

- **Never tune the prompt to make the number on `matrix_eval.json` go up.** That's overfitting to the eval, not fixing the model. If the number needs to move, either the pipeline gets better or the eval gets harder (more adversarial rows, a held-out paper) — never both aimed at each other.
- **The eval is a CI regression gate, not a one-off report.** `eval/matrix_runner.py` runs on fixture data with zero LLM calls and zero external dependencies (frozen matcher output, hash-locked to the current prompt files) — so a grounding-negative regression fails the build before it ships, not after.

## What's next

Extractor prompt v4.1 is the next lever: pattern-based instructions targeting the specific rhetorical shapes above, aimed at converting omission-refusals into label-refusals without inflating false rejections on the 23 legitimately-supported claims in the same set. After that: a sealed, held-out paper the prompt was never iterated against, scored separately, to answer the memorization-vs-grounding question honestly.

---
*Prism is live at [Azure Container Apps](https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/). The eval harness, prompts, and full decision log are in the repo.*
