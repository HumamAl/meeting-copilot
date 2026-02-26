"use client";

import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

const BEFORE_DATA = [
  { browser: "Chrome", coverage: 72, status: "warning" as const, note: "Drops under load" },
  { browser: "Edge", coverage: 38, status: "failing" as const, note: "Partial support only" },
  { browser: "Firefox", coverage: 0, status: "failing" as const, note: "No Web Speech API" },
  { browser: "Safari", coverage: 55, status: "warning" as const, note: "Inconsistent mobile" },
];

const AFTER_DATA = [
  { browser: "Chrome", coverage: 98, status: "good" as const, note: "Web Speech + Deepgram fallback" },
  { browser: "Edge", coverage: 97, status: "good" as const, note: "Deepgram WebSocket primary" },
  { browser: "Firefox", coverage: 96, status: "good" as const, note: "Deepgram WebSocket primary" },
  { browser: "Safari", coverage: 95, status: "good" as const, note: "Hybrid pipeline + fallback" },
];

type StatusType = "good" | "warning" | "failing";

const statusConfig: Record<StatusType, { icon: typeof CheckCircle; color: string; bg: string; border: string }> = {
  good: {
    icon: CheckCircle,
    color: "var(--success)",
    bg: "color-mix(in oklch, var(--success) 10%, transparent)",
    border: "color-mix(in oklch, var(--success) 22%, transparent)",
  },
  warning: {
    icon: AlertCircle,
    color: "var(--warning)",
    bg: "color-mix(in oklch, var(--warning) 10%, transparent)",
    border: "color-mix(in oklch, var(--warning) 22%, transparent)",
  },
  failing: {
    icon: XCircle,
    color: "var(--destructive)",
    bg: "color-mix(in oklch, var(--destructive) 10%, transparent)",
    border: "color-mix(in oklch, var(--destructive) 22%, transparent)",
  },
};

export function TranscriptionReliabilityViz() {
  const [showSolution, setShowSolution] = useState(false);
  const data = showSolution ? AFTER_DATA : BEFORE_DATA;

  return (
    <div className="space-y-3">
      {/* Toggle row */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowSolution(false)}
          className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
          style={{
            background: !showSolution
              ? "color-mix(in oklch, var(--destructive) 14%, transparent)"
              : "oklch(1 0 0 / 0.04)",
            color: !showSolution ? "var(--destructive)" : "oklch(0.60 0 0)",
            border: !showSolution
              ? "1px solid color-mix(in oklch, var(--destructive) 28%, transparent)"
              : "1px solid oklch(1 0 0 / 0.08)",
            transitionDuration: "200ms",
          }}
        >
          Current State
        </button>
        <button
          onClick={() => setShowSolution(true)}
          className="text-xs px-3 py-1.5 rounded-md font-medium transition-all"
          style={{
            background: showSolution
              ? "color-mix(in oklch, var(--success) 14%, transparent)"
              : "oklch(1 0 0 / 0.04)",
            color: showSolution ? "var(--success)" : "oklch(0.60 0 0)",
            border: showSolution
              ? "1px solid color-mix(in oklch, var(--success) 28%, transparent)"
              : "1px solid oklch(1 0 0 / 0.08)",
            transitionDuration: "200ms",
          }}
        >
          With Hybrid Pipeline
        </button>
      </div>

      {/* Browser coverage grid */}
      <div className="grid grid-cols-2 gap-2">
        {data.map((row) => {
          const cfg = statusConfig[row.status];
          const Icon = cfg.icon;
          return (
            <div
              key={row.browser}
              className="rounded-lg p-3 space-y-1.5"
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                transition: "background 200ms, border-color 200ms",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: cfg.color }} />
                  <span className="text-xs font-semibold" style={{ color: "oklch(0.88 0 0)" }}>
                    {row.browser}
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: cfg.color }}
                >
                  {row.coverage}%
                </span>
              </div>
              {/* Mini bar */}
              <div
                className="h-1 rounded-full"
                style={{ background: "oklch(1 0 0 / 0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${row.coverage}%`,
                    background: cfg.color,
                    transition: "width 300ms ease-in-out",
                  }}
                />
              </div>
              <p className="text-[10px]" style={{ color: "oklch(0.55 0 0)" }}>
                {row.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Architecture note */}
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{
          background: "oklch(0.72 0.19 220 / 0.06)",
          border: "1px solid oklch(0.72 0.19 220 / 0.14)",
          color: "oklch(0.72 0.19 220)",
        }}
      >
        {showSolution
          ? "Hybrid: Web Speech API primary → Deepgram/AssemblyAI WebSocket fallback → unified transcript stream"
          : "Single source: Web Speech API only — no fallback, no failover, browser-dependent"}
      </div>
    </div>
  );
}
