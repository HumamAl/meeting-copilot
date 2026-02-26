import type { Metadata } from "next";
import { challenges, executiveSummary } from "@/data/challenges";
import { ExecutiveSummary } from "@/components/challenges/executive-summary";
import { ChallengePageContent } from "@/components/challenges/challenge-page-content";
import { CtaCloser } from "@/components/challenges/cta-closer";

export const metadata: Metadata = {
  title: "My Approach | Meeting Copilot Demo",
};

export default function ChallengesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 space-y-8">

        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "oklch(0.92 0 0)" }}>
            My Engineering Approach
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.55 0 0)" }}>
            How I&apos;d solve the transcription reliability, real-time coaching, and meeting-type
            adaptation problems in your product
          </p>
        </div>

        {/* Executive summary — dark hero banner */}
        <ExecutiveSummary
          commonApproach={executiveSummary.commonApproach}
          differentApproach={executiveSummary.differentApproach}
          accentWord={executiveSummary.accentWord}
        />

        {/* Challenge cards with visualizations */}
        <ChallengePageContent challenges={challenges} />

        {/* CTA closer */}
        <CtaCloser />

      </div>
    </div>
  );
}
