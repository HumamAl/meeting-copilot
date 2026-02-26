import {
  Mic,
  FileText,
  Brain,
  Zap,
  Layers,
  MonitorSmartphone,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    id: "audio",
    label: "Audio Stream",
    description: "Live capture",
    icon: Mic,
    highlight: false,
  },
  {
    id: "transcription",
    label: "Transcription",
    description: "Real-time ASR",
    icon: FileText,
    highlight: false,
  },
  {
    id: "buffer",
    label: "Context Buffer",
    description: "Last 60s window",
    icon: Layers,
    highlight: false,
  },
  {
    id: "prompt",
    label: "LLM Prompt",
    description: "Streaming context",
    icon: Brain,
    highlight: true,
  },
  {
    id: "suggestion",
    label: "Suggestion",
    description: "< 3s latency",
    icon: Zap,
    highlight: false,
  },
  {
    id: "overlay",
    label: "Coach Overlay",
    description: "In-meeting UI",
    icon: MonitorSmartphone,
    highlight: false,
  },
] as const;

export function CoachingEngineViz() {
  return (
    <div className="space-y-3">
      {/* Flow steps — wrap on mobile */}
      <div className="flex flex-wrap gap-2 items-center">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={
                  step.highlight
                    ? {
                        background: "oklch(0.72 0.19 220 / 0.12)",
                        border: "1px solid oklch(0.72 0.19 220 / 0.40)",
                        boxShadow: "0 0 8px oklch(0.72 0.19 220 / 0.15)",
                      }
                    : {
                        background: "oklch(0.15 0.01 220)",
                        border: "1px solid oklch(1 0 0 / 0.08)",
                      }
                }
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{
                    color: step.highlight ? "oklch(0.72 0.19 220)" : "oklch(0.55 0 0)",
                  }}
                />
                <div>
                  <p
                    className="text-xs font-semibold leading-none"
                    style={{
                      color: step.highlight ? "oklch(0.92 0 0)" : "oklch(0.78 0 0)",
                    }}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "oklch(0.50 0 0)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight
                  className="w-3.5 h-3.5 shrink-0 hidden sm:block"
                  style={{ color: "oklch(0.35 0 0)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Key complexity callout */}
      <div
        className="rounded-lg px-3 py-2"
        style={{
          background: "oklch(0.72 0.19 220 / 0.06)",
          border: "1px solid oklch(0.72 0.19 220 / 0.14)",
        }}
      >
        <p className="text-xs font-medium" style={{ color: "oklch(0.72 0.19 220)" }}>
          Hard part: LLM Prompt step
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "oklch(0.55 0 0)" }}>
          Streaming context window management — include enough transcript for relevance without
          blowing token limits. Rolling 60-second buffer with speaker-turn boundaries prevents
          stale context while keeping latency under 3 seconds.
        </p>
      </div>
    </div>
  );
}
