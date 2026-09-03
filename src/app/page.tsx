import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { WedgeSection } from "@/components/sections/wedge-section";
import { StatsSection } from "@/components/sections/stats-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ScopeLimitationsSection } from "@/components/sections/scope-limitations-section";
import { LiveAuditUpload } from "@/components/sections/live-audit-upload";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main id="top" className="min-h-screen font-sans">
      <Navbar />
      <HeroSection />
      <WedgeSection />
      <StatsSection />
      <HowItWorksSection />
      <ScopeLimitationsSection />
      <LiveAuditUpload />
      <FooterSection />
    </main>
  );
}
