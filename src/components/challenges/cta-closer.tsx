"use client";

import Link from "next/link";

export function CtaCloser() {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "oklch(0.10 0.015 220)",
        border: "1px solid oklch(0.72 0.19 220 / 0.20)",
        boxShadow: "0 0 24px oklch(0.72 0.19 220 / 0.06)",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <h3
            className="text-base font-semibold"
            style={{ color: "oklch(0.92 0 0)" }}
          >
            Ready to discuss the approach?
          </h3>
          <p className="text-sm mt-1" style={{ color: "oklch(0.55 0 0)" }}>
            I&apos;ve thought through the hard parts — the transcription fallback, the context
            window management, the prompt routing. Happy to walk through any of this on a call.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/proposal"
            className="text-sm transition-colors"
            style={{ color: "oklch(0.55 0 0)", transitionDuration: "200ms" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.80 0 0)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.55 0 0)";
            }}
          >
            See the proposal →
          </Link>
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-lg"
            style={{
              background: "oklch(0.72 0.19 220 / 0.12)",
              border: "1px solid oklch(0.72 0.19 220 / 0.30)",
              color: "oklch(0.72 0.19 220)",
            }}
          >
            Reply on Upwork to start
          </span>
        </div>
      </div>
    </div>
  );
}
