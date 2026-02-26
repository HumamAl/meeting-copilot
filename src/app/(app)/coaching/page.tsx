"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Brain,
  TrendingUp,
  Clock,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Star,
} from "lucide-react";

// ─── Inline data ──────────────────────────────────────────────────────────────

type CoachingCategory =
  | "pace"
  | "filler-words"
  | "engagement"
  | "question-ratio"
  | "monologue-alert";

type SuggestionType =
  | "talking-point"
  | "objection-handler"
  | "follow-up"
  | "coaching-tip"
  | "question-prompt";

interface CoachingInsight {
  id: string;
  meetingTitle: string;
  meetingDate: string;
  category: CoachingCategory;
  score: number;
  message: string;
  recommendation: string;
}

interface AISuggestion {
  id: string;
  meetingTitle: string;
  type: SuggestionType;
  text: string;
  context: string;
  priority: "high" | "medium" | "low";
  usedByUser: boolean;
}

const INSIGHTS: CoachingInsight[] = [
  {
    id: "ci-01",
    meetingTitle: "Q1 Sales Strategy Review",
    meetingDate: "2026-02-24",
    category: "pace",
    score: 74,
    message: "Your speech pace averaged 158 WPM — slightly above the ideal range.",
    recommendation: "Pause for 1-2 seconds after presenting key data points to let information land.",
  },
  {
    id: "ci-02",
    meetingTitle: "Q1 Sales Strategy Review",
    meetingDate: "2026-02-24",
    category: "filler-words",
    score: 62,
    message: "38 filler words detected in 62 minutes ('um', 'you know', 'basically').",
    recommendation: "Replace filler pauses with a 1-second silence. Practice transitional phrases like 'Let me put it this way'.",
  },
  {
    id: "ci-03",
    meetingTitle: "Enterprise Demo — Acme Corp",
    meetingDate: "2026-02-22",
    category: "engagement",
    score: 89,
    message: "Strong back-and-forth — participants spoke for 61% of the session.",
    recommendation: "Keep maintaining this balance. Try open-ended questions to draw out quieter attendees.",
  },
  {
    id: "ci-04",
    meetingTitle: "Enterprise Demo — Acme Corp",
    meetingDate: "2026-02-22",
    category: "question-ratio",
    score: 81,
    message: "You asked 9 questions — 5 were high-quality discovery questions.",
    recommendation: "Excellent question ratio. Focus more questions on budget authority and decision timelines.",
  },
  {
    id: "ci-05",
    meetingTitle: "Backend Engineer Interview — Round 2",
    meetingDate: "2026-02-21",
    category: "monologue-alert",
    score: 55,
    message: "One monologue ran 4 minutes 12 seconds without interruption.",
    recommendation: "Break up long explanations at 90-second intervals with a check-in question like 'Does this architecture make sense so far?'",
  },
  {
    id: "ci-06",
    meetingTitle: "Partnership Discovery — GlobalTech",
    meetingDate: "2026-02-17",
    category: "pace",
    score: 88,
    message: "Pacing was excellent throughout — averaged 143 WPM with natural variation.",
    recommendation: "Maintain this pace pattern. The slight slowdown in your closing remarks was effective.",
  },
  {
    id: "ci-07",
    meetingTitle: "Product Roadmap Sync",
    meetingDate: "2026-02-23",
    category: "filler-words",
    score: 78,
    message: "19 filler words in 34 minutes — improvement of 32% from your previous session.",
    recommendation: "You're trending in the right direction. Focus on eliminating 'basically' — it appeared 11 times.",
  },
  {
    id: "ci-08",
    meetingTitle: "Upsell Discovery — RetailBase",
    meetingDate: "2026-02-14",
    category: "engagement",
    score: 72,
    message: "You dominated 68% of talk time. The prospect had limited opportunity to articulate concerns.",
    recommendation: "After every solution pitch, pause and ask 'How does that land for your team?'",
  },
];

const SUGGESTIONS: AISuggestion[] = [
  {
    id: "ai-01",
    meetingTitle: "Q1 Sales Strategy Review",
    type: "talking-point",
    text: "Reference the 14% QoQ improvement when opening the enterprise re-engagement pitch — it anchors optimism.",
    context: "Discussed Q4 close rate improvement",
    priority: "high",
    usedByUser: true,
  },
  {
    id: "ai-02",
    meetingTitle: "Q1 Sales Strategy Review",
    type: "objection-handler",
    text: "When enterprise prospects go dark after technical evaluation, lead with a simplified integration story before scheduling a follow-up.",
    context: "Three enterprise prospects went dark post-eval",
    priority: "high",
    usedByUser: false,
  },
  {
    id: "ai-03",
    meetingTitle: "Enterprise Demo — Acme Corp",
    type: "follow-up",
    text: "Send Tom Bridges the noisy-environment accuracy benchmark as a one-pager within 24 hours. He flagged it as a key decision factor.",
    context: "Tom highlighted accuracy in poor acoustics",
    priority: "high",
    usedByUser: true,
  },
  {
    id: "ai-04",
    meetingTitle: "Enterprise Demo — Acme Corp",
    type: "question-prompt",
    text: "Next session: ask 'Who else is involved in the final vendor decision?' — you haven't confirmed the full buying committee yet.",
    context: "Pricing discussed, decision process unclear",
    priority: "medium",
    usedByUser: false,
  },
  {
    id: "ai-05",
    meetingTitle: "Backend Engineer Interview — Round 2",
    type: "coaching-tip",
    text: "The candidate's Redis deduplication answer was sophisticated — probe their experience with exactly-once semantics next time to test depth.",
    context: "Strong answer on message delivery guarantees",
    priority: "medium",
    usedByUser: false,
  },
  {
    id: "ai-06",
    meetingTitle: "Product Roadmap Sync",
    type: "talking-point",
    text: "Ben's read-only calendar integration compromise is a strong Q2 anchor — position it as 'calendar visibility' in customer messaging.",
    context: "Scoped calendar integration to read-only for Q2",
    priority: "medium",
    usedByUser: true,
  },
  {
    id: "ai-07",
    meetingTitle: "Upsell Discovery — RetailBase",
    type: "follow-up",
    text: "Send a case study from a retail customer with similar transaction volumes before the next call.",
    context: "RetailBase has high-volume seasonal transaction patterns",
    priority: "low",
    usedByUser: false,
  },
  {
    id: "ai-08",
    meetingTitle: "Partnership Discovery — GlobalTech",
    type: "objection-handler",
    text: "If GlobalTech raises procurement timeline concerns, propose a pilot agreement as an interim step rather than the full contract.",
    context: "Discussed long enterprise procurement cycles",
    priority: "low",
    usedByUser: false,
  },
];

const CATEGORY_META: Record<
  CoachingCategory,
  { label: string; icon: React.ElementType; color: string }
> = {
  pace: {
    label: "Speaking Pace",
    icon: Clock,
    color: "text-[color:var(--chart-1)]",
  },
  "filler-words": {
    label: "Filler Words",
    icon: MessageCircle,
    color: "text-[color:var(--chart-4)]",
  },
  engagement: {
    label: "Engagement",
    icon: TrendingUp,
    color: "text-[color:var(--success)]",
  },
  "question-ratio": {
    label: "Question Ratio",
    icon: HelpCircle,
    color: "text-[color:var(--chart-2)]",
  },
  "monologue-alert": {
    label: "Monologue Alert",
    icon: AlertTriangle,
    color: "text-[color:var(--warning)]",
  },
};

const SUGGESTION_TYPE_META: Record<
  SuggestionType,
  { label: string; className: string }
> = {
  "talking-point": {
    label: "Talking Point",
    className: "bg-primary/10 text-primary border-0",
  },
  "objection-handler": {
    label: "Objection Handler",
    className: "bg-destructive/10 text-destructive border-0",
  },
  "follow-up": {
    label: "Follow-Up",
    className: "bg-[color:var(--success)]/10 text-[color:var(--success)] border-0",
  },
  "coaching-tip": {
    label: "Coaching Tip",
    className: "bg-[color:var(--chart-2)]/10 text-[color:var(--chart-2)] border-0",
  },
  "question-prompt": {
    label: "Question Prompt",
    className: "bg-[color:var(--warning)]/10 text-[color:var(--warning)] border-0",
  },
};

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-[color:var(--success)]"
      : score >= 65
      ? "bg-[color:var(--warning)]"
      : "bg-destructive/70";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-mono font-medium text-foreground w-8 text-right">
        {score}
      </span>
    </div>
  );
}

function avgScore(insights: CoachingInsight[]) {
  if (!insights.length) return 0;
  return Math.round(insights.reduce((s, i) => s + i.score, 0) / insights.length);
}

function categoryAvg(insights: CoachingInsight[], cat: CoachingCategory) {
  const catInsights = insights.filter((i) => i.category === cat);
  return catInsights.length ? avgScore(catInsights) : null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function CoachingPage() {
  const [localSuggestions, setLocalSuggestions] = useState(SUGGESTIONS);
  const [categoryFilter, setCategoryFilter] = useState<
    CoachingCategory | "all"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "high" | "medium" | "low" | "all"
  >("all");

  const filteredInsights = useMemo(() => {
    return INSIGHTS.filter(
      (i) => categoryFilter === "all" || i.category === categoryFilter
    );
  }, [categoryFilter]);

  const filteredSuggestions = useMemo(() => {
    return localSuggestions.filter(
      (s) => priorityFilter === "all" || s.priority === priorityFilter
    );
  }, [localSuggestions, priorityFilter]);

  function toggleSuggestion(id: string) {
    setLocalSuggestions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, usedByUser: !s.usedByUser } : s
      )
    );
  }

  const overallAvg = avgScore(INSIGHTS);
  const usedCount = localSuggestions.filter((s) => s.usedByUser).length;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Coaching</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Communication analysis and real-time suggestions from your sessions
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="aesthetic-card p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Overall Score
          </p>
          <p className="text-3xl font-bold text-foreground mt-1 font-mono">
            {overallAvg}
          </p>
          <p className="text-xs text-muted-foreground mt-1">/ 100 average</p>
        </div>
        <div className="aesthetic-card p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Sessions Analyzed
          </p>
          <p className="text-3xl font-bold text-foreground mt-1 font-mono">
            {new Set(INSIGHTS.map((i) => i.meetingTitle)).size}
          </p>
          <p className="text-xs text-muted-foreground mt-1">meetings this month</p>
        </div>
        <div className="aesthetic-card p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Suggestions Generated
          </p>
          <p className="text-3xl font-bold text-foreground mt-1 font-mono">
            {SUGGESTIONS.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">AI coaching tips</p>
        </div>
        <div className="aesthetic-card p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Suggestions Applied
          </p>
          <p className="text-3xl font-bold text-[color:var(--success)] mt-1 font-mono">
            {usedCount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            of {SUGGESTIONS.length} marked used
          </p>
        </div>
      </div>

      {/* Category scores summary */}
      <div className="aesthetic-card p-4">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-4 h-4 text-primary" />
          Category Averages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {(Object.keys(CATEGORY_META) as CoachingCategory[]).map((cat) => {
            const meta = CATEGORY_META[cat];
            const avg = categoryAvg(INSIGHTS, cat);
            const Icon = meta.icon;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className={cn("w-3.5 h-3.5", meta.color)} />
                  <span className="text-xs text-muted-foreground">
                    {meta.label}
                  </span>
                  {avg === null && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      —
                    </span>
                  )}
                </div>
                {avg !== null && <ScoreBar score={avg} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Coaching insights */}
      <div>
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <h2 className="text-lg font-semibold">Coaching Insights</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Filter:</span>
            <div className="flex gap-1 flex-wrap">
              {(["all", ...Object.keys(CATEGORY_META)] as (CoachingCategory | "all")[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-100",
                      categoryFilter === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-[color:var(--surface-hover)]"
                    )}
                  >
                    {cat === "all" ? "All" : CATEGORY_META[cat].label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filteredInsights.length === 0 ? (
            <div className="aesthetic-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No coaching insights for this category.
              </p>
            </div>
          ) : (
            filteredInsights.map((insight) => {
              const meta = CATEGORY_META[insight.category];
              const Icon = meta.icon;
              return (
                <div key={insight.id} className="aesthetic-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className={cn("w-4 h-4", meta.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">
                            {meta.label}
                          </span>
                          <span className="text-xs text-muted-foreground/60 mx-1.5">
                            &middot;
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {insight.meetingTitle}
                          </span>
                          <span className="text-xs text-muted-foreground/60 mx-1.5">
                            &middot;
                          </span>
                          <span className="text-xs font-mono text-muted-foreground">
                            {formatDate(insight.meetingDate)}
                          </span>
                        </div>
                        <div className="w-24 shrink-0">
                          <ScoreBar score={insight.score} />
                        </div>
                      </div>
                      <p className="text-sm text-foreground/90 mb-1.5">
                        {insight.message}
                      </p>
                      <div className="flex items-start gap-1.5">
                        <Star className="w-3 h-3 text-[color:var(--warning)] shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* AI Suggestions panel */}
      <div>
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <h2 className="text-lg font-semibold">AI Suggestions</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Priority:</span>
            <div className="flex gap-1">
              {(["all", "high", "medium", "low"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-colors duration-100",
                    priorityFilter === p
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-[color:var(--surface-hover)]"
                  )}
                >
                  {p === "all" ? "All" : p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {filteredSuggestions.length === 0 ? (
            <div className="aesthetic-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No suggestions for this priority level.
              </p>
            </div>
          ) : (
            filteredSuggestions.map((sug) => {
              const typeMeta = SUGGESTION_TYPE_META[sug.type];
              const priorityColor =
                sug.priority === "high"
                  ? "text-destructive"
                  : sug.priority === "medium"
                  ? "text-[color:var(--warning)]"
                  : "text-muted-foreground";

              return (
                <div
                  key={sug.id}
                  className={cn(
                    "aesthetic-card p-4 transition-opacity duration-150",
                    sug.usedByUser && "opacity-60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleSuggestion(sug.id)}
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-100",
                        sug.usedByUser
                          ? "bg-[color:var(--success)] border-[color:var(--success)] text-white"
                          : "border-border hover:border-primary"
                      )}
                      title={sug.usedByUser ? "Mark as unused" : "Mark as used"}
                    >
                      {sug.usedByUser && (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] py-0 px-2 h-5 rounded-full",
                            typeMeta.className
                          )}
                        >
                          {typeMeta.label}
                        </Badge>
                        <span
                          className={cn(
                            "text-[10px] font-medium capitalize",
                            priorityColor
                          )}
                        >
                          {sug.priority} priority
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 ml-auto truncate">
                          {sug.meetingTitle}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 mb-1">
                        {sug.text}
                      </p>
                      <p className="text-xs text-muted-foreground italic">
                        Context: {sug.context}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
