import { Users, TrendingUp, Presentation, ArrowRight } from "lucide-react";

const MEETING_TYPES = [
  {
    id: "one-on-one",
    label: "1:1 Check-in",
    icon: Users,
    template: "1:1 Focus",
    suggestions: ["Active listening prompts", "Follow-up question cues", "Empathy signals"],
    ignoreRate: "12%",
    color: "oklch(0.62 0.19 145)",
  },
  {
    id: "sales-call",
    label: "Sales Call",
    icon: TrendingUp,
    template: "Sales Mode",
    suggestions: ["Objection handlers", "Value proposition cues", "Next-step prompts"],
    ignoreRate: "11%",
    color: "oklch(0.72 0.19 220)",
  },
  {
    id: "presentation",
    label: "Presentation",
    icon: Presentation,
    template: "Presenter Mode",
    suggestions: ["Pace + timing reminders", "Audience engagement cues", "Q&A prep signals"],
    ignoreRate: "14%",
    color: "oklch(0.75 0.18 85)",
  },
] as const;

export function AdaptivePromptingViz() {
  return (
    <div className="space-y-3">
      {/* Detection → routing header */}
      <div className="flex items-center gap-2">
        <div
          className="text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{
            background: "oklch(0.16 0.01 220)",
            border: "1px solid oklch(1 0 0 / 0.10)",
            color: "oklch(0.75 0 0)",
          }}
        >
          Meeting type detected
        </div>
        <ArrowRight className="w-3.5 h-3.5" style={{ color: "oklch(0.35 0 0)" }} />
        <div
          className="text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{
            background: "oklch(0.72 0.19 220 / 0.10)",
            border: "1px solid oklch(0.72 0.19 220 / 0.25)",
            color: "oklch(0.72 0.19 220)",
          }}
        >
          Prompt template selected
        </div>
        <ArrowRight className="w-3.5 h-3.5 hidden sm:block" style={{ color: "oklch(0.35 0 0)" }} />
        <div
          className="text-xs px-3 py-1.5 rounded-lg font-medium hidden sm:block"
          style={{
            background: "color-mix(in oklch, var(--success) 8%, transparent)",
            border: "1px solid color-mix(in oklch, var(--success) 20%, transparent)",
            color: "var(--success)",
          }}
        >
          Context-aware suggestions
        </div>
      </div>

      {/* Meeting type cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {MEETING_TYPES.map((mt) => {
          const Icon = mt.icon;
          return (
            <div
              key={mt.id}
              className="rounded-lg p-3 space-y-2"
              style={{
                background: "oklch(0.13 0.01 220)",
                border: "1px solid oklch(1 0 0 / 0.07)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: `color-mix(in oklch, ${mt.color} 15%, transparent)` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: mt.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-none" style={{ color: "oklch(0.88 0 0)" }}>
                    {mt.label}
                  </p>
                  <p className="text-[10px] mt-0.5 font-mono" style={{ color: mt.color }}>
                    {mt.template}
                  </p>
                </div>
              </div>

              {/* Suggestion types */}
              <ul className="space-y-1">
                {mt.suggestions.map((s) => (
                  <li key={s} className="flex items-start gap-1.5">
                    <span className="text-[10px] mt-0.5 shrink-0" style={{ color: mt.color }}>
                      ›
                    </span>
                    <span className="text-[10px]" style={{ color: "oklch(0.52 0 0)" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Projected ignore rate */}
              <div
                className="rounded px-2 py-1 text-[10px] font-mono text-center"
                style={{
                  background: "color-mix(in oklch, var(--success) 6%, transparent)",
                  color: "var(--success)",
                }}
              >
                projected ignore rate: {mt.ignoreRate}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
