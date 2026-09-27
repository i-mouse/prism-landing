import Link from 'next/link';

export const metadata = {
  title: 'Prism v2.0: Identity, Chat Resiliency, and Production Deployments',
  description: 'Technical writeup of Prism v2.0 updates: CIAM auth, guest access, chat reliability, and deployment hardening.',
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
            Prism v2.0: Identity, Chat Resiliency, and Production Deployments
          </h1>
          <div className="flex items-center gap-4 text-zinc-500 font-mono text-sm">
            <time dateTime="2026-09-27">September 27, 2026</time>
          </div>
        </header>

        <div className="space-y-8 text-lg leading-relaxed">
          {/* 1. Hook */}
          <section className="space-y-4">
            <p>
              Prism v1.0 proved the core engineering bet: an autonomous engine capable of auditing empirical claims against a paper's own evidence with an uncompromising, measurable "correct refusal" safety floor. But proving an engine works in a sterile CI harness is only half the battle. 
            </p>
            <p>
              Prism v2.0 (and the immediate v2.0.1 patch) transitions Prism from a functional prototype into a stable, production-ready platform. These releases ship hardened Entra CIAM authentication, a fully resilient chat state machine, and battle-tested Azure Container Apps deployment configurations. Crucially, none of these are features in their own right; this infrastructure exists entirely to make the underlying claim-auditing engine usable, demoable, and trustworthy for real reviewers interacting with the product in the wild.
            </p>
          </section>

          {/* 2. Auth, CIAM, and Guest Hardening */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Auth, CIAM, and Guest Hardening</h2>
            <p>
              We've shipped production-grade identity using Entra External ID (CIAM), complete with Google Sign-In integration. This wasn't without its edge cases—we resolved a silent CIAM authority mismatch that was breaking sign-ins outright for new users, restored the <code>.default</code> scope for API token acquisition, and mapped the missing name and email claims from Google's IdP through the Entra user flow.
            </p>
            <p>
              Because Prism needs to be immediately demoable, we built a highly robust Guest Access tier alongside authenticated accounts. To make this safe, we implemented strict session limits, closed four specific IDOR (Insecure Direct Object Reference) vulnerabilities, and built a cross-user paper deduplication system so identical paper uploads share the same extracted claim cache, saving significant backend compute.
            </p>
          </section>

          {/* 3. Chat & Extraction Reliability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Chat & Extraction Reliability</h2>
            <p>
              The embedded paper-scoped chat is how users interrogate the extraction matrix. In v2.0, we rebuilt its state machine to handle the chaos of real-world usage.
            </p>
            <p>
              We implemented full chat stream recovery, preventing answers from getting permanently stuck if a user switches papers mid-stream, and fixed an issue where canceled requests would leave orphaned questions polluting the chat history. To minimize redundant work, chat files and completed-paper claims are now aggressively cached per session—revisiting a paper results in zero redundant backend requests.
            </p>
            <p>
              We also tightened the extraction pipeline itself. The cache-hit logic now explicitly respects extraction success and failure states, eliminating scenarios where a failed extraction could mask as a completed one. On the UI side, we fixed citation crowding on multi-claim sentences and added an identity disclosure guard to keep the chat agent tightly scoped.
            </p>
          </section>

          {/* 4. UI: The Paper-Theme Redesign */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">UI: The Paper-Theme Redesign</h2>
            <p>
              Reading an academic paper and auditing its claims requires visual focus. We completely overhauled the interface, introducing a new "paper-theme" redesign that dramatically improves reading ergonomics. Paired with a modernized login flow, a new logo, and comprehensive layout fixes, the application now gets out of the way, keeping the user focused squarely on the evidence.
            </p>
          </section>

          {/* 5. Deployment Hardening */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-12 mb-4">Deployment Hardening (The v1.0 Deadlock Resolved)</h2>
            <p>
              In our v1.0 writeup, we detailed an Aspire deploy deadlock that forced us to rely on manual CLI fallback paths for the React UI. With v2.0.1, we have definitively hardened our Azure deployments.
            </p>
            <p>
              The manual Azure <code>az</code> production patches have been systematically folded into our <code>AppHost.cs</code> infrastructure-as-code definitions. We caught and resolved a silent ingress port-drift bug that was sporadically breaking the live frontend deploy, and we moved our deployment strategy to use immutable git-SHA image tags. Rollbacks are now fully deterministic, and our production environments are stable.
            </p>
          </section>

          {/* 6. CTA */}
          <section className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-12">
            <h2 className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mb-4">Try It Out</h2>
            <p className="mb-6">
              A rigorous evaluation metric only matters if users can actually interact with the engine. With our hardened Guest Access and resilient chat, it is easier than ever to test Prism's refusal contract yourself.
            </p>
            <div className="flex gap-4">
              <a href="https://prism-ai-reactui.nicesky-c6f0b846.centralindia.azurecontainerapps.io/" className="bg-brand text-zinc-950 font-semibold px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors">
                Run a Live Audit
              </a>
              <a href="https://github.com/i-mouse/prism" className="border border-zinc-300 dark:border-zinc-700 font-semibold px-6 py-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                View Source on GitHub
              </a>
            </div>
            <div className="mt-8">
              <Link href="/blog/prism-v1" className="text-brand border-b border-brand pb-0.5 hover:text-orange-400 hover:border-orange-400 transition-colors font-mono text-sm">
                Read the original v1.0 launch post →
              </Link>
            </div>
            <p className="text-sm text-zinc-500 mt-8 italic">
              Note: This post is the canonical source for the Prism v2.0 announcement.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
