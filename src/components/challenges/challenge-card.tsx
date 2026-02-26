"use client";

import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface ChallengeCardProps {
  index: number;
  title: string;
  description: string;
  outcome?: string;
  children?: ReactNode;
}

export function ChallengeCard({
  index,
  title,
  description,
  outcome,
  children,
}: ChallengeCardProps) {
  const stepNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      className="rounded-xl p-6 space-y-4"
      style={{
        background: "oklch(0.12 0.01 220)",
        border: "1px solid oklch(1 0 0 / 0.08)",
        boxShadow: "0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 0 oklch(1 0 0 / 0.08)",
        transition: "border-color 200ms, box-shadow 200ms",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "oklch(0.72 0.19 220 / 0.30)";
        el.style.boxShadow =
          "0 0 0 1px oklch(0.72 0.19 220 / 0.15), 0 4px 24px oklch(0.72 0.19 220 / 0.08)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "oklch(1 0 0 / 0.08)";
        el.style.boxShadow =
          "0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 0 oklch(1 0 0 / 0.08)";
      }}
    >
      {/* Header */}
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-sm font-medium shrink-0 tabular-nums"
          style={{ color: "oklch(0.72 0.19 220 / 0.80)" }}
        >
          {stepNumber}
        </span>
        <div>
          <h3 className="text-lg font-semibold" style={{ color: "oklch(0.92 0 0)" }}>
            {title}
          </h3>
          <p className="text-sm mt-1" style={{ color: "oklch(0.60 0 0)" }}>
            {description}
          </p>
        </div>
      </div>

      {/* Visualization slot */}
      {children && <div>{children}</div>}

      {/* Outcome statement */}
      {outcome && (
        <div
          className="flex items-start gap-2 rounded-lg px-3 py-2"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 8%, transparent)",
            border: "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
          }}
        >
          <TrendingUp
            className="h-4 w-4 mt-0.5 shrink-0"
            style={{ color: "var(--success)" }}
          />
          <p
            className="text-sm font-medium"
            style={{ color: "var(--success)" }}
          >
            {outcome}
          </p>
        </div>
      )}
    </div>
  );
}
