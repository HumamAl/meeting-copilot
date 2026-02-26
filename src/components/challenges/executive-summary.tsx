"use client";

import Link from "next/link";

interface ExecutiveSummaryProps {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export function ExecutiveSummary({
  commonApproach,
  differentApproach,
  accentWord,
}: ExecutiveSummaryProps) {
  const renderDifferentApproach = () => {
    if (!accentWord) return <span>{differentApproach}</span>;
    const escaped = accentWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = differentApproach.split(new RegExp(`(${escaped})`, "i"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === accentWord.toLowerCase() ? (
            <span key={i} className="font-semibold" style={{ color: "oklch(0.72 0.19 220)" }}>
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl p-6 md:p-8"
      style={{
        background: "oklch(0.08 0.02 220)",
        backgroundImage:
          "radial-gradient(ellipse at 30% 50%, oklch(0.72 0.19 220 / 0.06), transparent 70%)",
        border: "1px solid oklch(1 0 0 / 0.08)",
      }}
    >
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: "oklch(0.48 0 0)" }}
      >
        {commonApproach}
      </p>
      <hr
        className="my-4"
        style={{ borderColor: "oklch(1 0 0 / 0.08)" }}
      />
      <p
        className="text-base md:text-lg leading-relaxed font-medium"
        style={{ color: "oklch(0.88 0 0)" }}
      >
        {renderDifferentApproach()}
      </p>
      <p className="text-xs mt-3" style={{ color: "oklch(0.38 0 0)" }}>
        ←{" "}
        <Link
          href="/"
          className="underline underline-offset-2 transition-colors"
          style={{ transitionDuration: "200ms" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.60 0 0)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.38 0 0)";
          }}
        >
          Back to the live demo
        </Link>
      </p>
    </div>
  );
}
