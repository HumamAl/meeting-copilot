"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Mic,
  Clock,
  CheckSquare,
  Sparkles,
  Radio,
  Users,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  meetings,
  weeklyMeetingTrend,
  meetingAnalytics,
} from "@/data/mock-data";
import type { Meeting, MeetingType } from "@/lib/types";

// ── SSR-safe chart ────────────────────────────────────────────────────────────
const MeetingActivityChart = dynamic(
  () =>
    import("@/components/dashboard/meeting-activity-chart").then(
      (m) => m.MeetingActivityChart
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[280px] rounded-lg animate-pulse"
        style={{ background: "oklch(1 0 0 / 0.04)" }}
      />
    ),
  }
);

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Live Meeting Duration Counter ─────────────────────────────────────────────
function useLiveDuration(startIso: string) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const compute = () => {
      const diff = Math.floor((Date.now() - new Date(startIso).getTime()) / 1000);
      setSeconds(diff);
    };
    compute();
    const id = setInterval(compute, 1000);
    return () => clearInterval(id);
  }, [startIso]);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function meetingTypeLabel(type: MeetingType): string {
  switch (type) {
    case "one-on-one":    return "1:1";
    case "sales-call":    return "Sales Call";
    case "presentation":  return "Presentation";
    case "interview":     return "Interview";
    case "team-standup":  return "Standup";
  }
}

function statusColor(status: Meeting["status"]): string {
  switch (status) {
    case "live":         return "var(--destructive)";
    case "recording":    return "var(--warning)";
    case "transcribing": return "var(--warning)";
    case "processing":   return "var(--warning)";
    case "ready":        return "var(--success)";
    case "failed":       return "oklch(0.60 0 0)";
  }
}

function statusLabel(status: Meeting["status"]): string {
  switch (status) {
    case "live":         return "Live";
    case "recording":    return "Recording";
    case "transcribing": return "Transcribing";
    case "processing":   return "Processing";
    case "ready":        return "Transcript Ready";
    case "failed":       return "Failed";
  }
}

function typeColor(type: MeetingType): string {
  switch (type) {
    case "sales-call":   return "var(--primary)";
    case "interview":    return "var(--chart-2)";
    case "one-on-one":   return "var(--chart-3)";
    case "presentation": return "var(--chart-4)";
    case "team-standup": return "var(--chart-5)";
  }
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return `${Math.floor(diffMs / 60000)}m ago`;
  if (diffH < 24) return `${diffH}h ago`;
  if (diffH < 48) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  target,
  suffix,
  change,
  description,
  index,
}: {
  icon: React.ElementType;
  label: string;
  target: number;
  suffix?: string;
  change: number;
  description: string;
  index: number;
}) {
  const { count, ref } = useCountUp(target);
  const isPositive = change >= 0;

  return (
    <div
      ref={ref}
      className="aesthetic-card p-5 animate-fade-up-in"
      style={{ animationDelay: `${index * 50}ms`, animationDuration: "150ms", animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-2 rounded-lg"
          style={{ background: "var(--primary)", opacity: 0.15 }}
        />
        <div
          className="p-2 rounded-lg absolute"
          style={{ background: "var(--primary)", opacity: 0.12 }}
        />
        <div
          className="p-2 rounded-lg"
          style={{ background: "oklch(1 0 0 / 0.06)" }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: "var(--primary)" }}
          />
        </div>
        <div
          className={cn("flex items-center gap-1 text-xs font-mono")}
          style={{ color: isPositive ? "var(--success)" : "var(--destructive)" }}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}{change}%
        </div>
      </div>

      <p
        className="text-3xl font-bold font-mono tabular-nums tracking-tight"
        style={{ color: "var(--primary)" }}
      >
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-xs font-medium mt-1" style={{ color: "var(--foreground)" }}>
        {label}
      </p>
      <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
        {description}
      </p>
    </div>
  );
}

function LiveBanner({ meeting }: { meeting: Meeting }) {
  const duration = useLiveDuration(meeting.date);

  return (
    <div
      className="rounded-xl border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-up-in"
      style={{
        background: "oklch(0.12 0.02 var(--primary-h, 250))",
        borderColor: "oklch(0.577 0.245 27.325 / 0.3)",
        animationDelay: "200ms",
        animationDuration: "200ms",
        animationFillMode: "both",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex shrink-0">
          <span
            className="absolute inline-flex h-3 w-3 rounded-full animate-ping"
            style={{ background: "var(--destructive)", opacity: 0.6 }}
          />
          <span
            className="relative inline-flex h-3 w-3 rounded-full"
            style={{ background: "var(--destructive)" }}
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--destructive)" }}
            >
              Live Session
            </span>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{ background: "oklch(1 0 0 / 0.06)", color: "var(--foreground)" }}
            >
              {duration}
            </span>
          </div>
          <p className="text-sm font-semibold mt-0.5" style={{ color: "var(--foreground)" }}>
            {meeting.title}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <Users className="w-3.5 h-3.5" />
          {meeting.participants.length} participants
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <Radio className="w-3.5 h-3.5" style={{ color: "var(--primary)" }} />
          AI listening
        </div>
        <a
          href="/live"
          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-100"
          style={{
            background: "var(--destructive)",
            color: "#fff",
          }}
        >
          View Live <ChevronRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function AccuracyBar({ value }: { value: number }) {
  const color =
    value >= 97 ? "var(--success)" : value >= 90 ? "var(--warning)" : "var(--destructive)";
  return (
    <div className="flex items-center gap-2 min-w-[100px]">
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ background: "oklch(1 0 0 / 0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span
        className="text-xs font-mono w-12 text-right tabular-nums"
        style={{ color: "var(--muted-foreground)" }}
      >
        {value.toFixed(1)}%
      </span>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const MEETING_TYPES: { value: "all" | MeetingType; label: string }[] = [
  { value: "all",           label: "All Types" },
  { value: "sales-call",    label: "Sales Calls" },
  { value: "interview",     label: "Interviews" },
  { value: "one-on-one",    label: "1:1 Check-ins" },
  { value: "presentation",  label: "Presentations" },
  { value: "team-standup",  label: "Standups" },
];

const CHART_VIEWS: { value: "meetings" | "hours" | "suggestions"; label: string }[] = [
  { value: "meetings",    label: "Sessions" },
  { value: "hours",       label: "Hours" },
  { value: "suggestions", label: "AI Suggestions" },
];

export default function DashboardPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | MeetingType>("all");
  const [chartView, setChartView] = useState<"meetings" | "hours" | "suggestions">("meetings");
  const [chartPeriod, setChartPeriod] = useState<"4w" | "8w" | "12w">("8w");

  // Live meeting (first one with status "live")
  const liveMeeting = meetings.find((m) => m.status === "live");

  // Filtered meetings for the table
  const filteredMeetings = useMemo(() => {
    const base = meetings.filter((m) => m.status !== "live");
    if (typeFilter === "all") return base.slice(0, 10);
    return base.filter((m) => m.type === typeFilter).slice(0, 10);
  }, [typeFilter]);

  // Filtered chart data by period
  const chartData = useMemo(() => {
    const weeks = chartPeriod === "4w" ? 4 : chartPeriod === "8w" ? 8 : 12;
    return weeklyMeetingTrend.slice(-weeks);
  }, [chartPeriod]);

  const stats = [
    {
      icon: Mic,
      label: "Sessions Transcribed",
      target: meetingAnalytics.totalMeetings,
      change: meetingAnalytics.totalMeetingsChange,
      description: `+${Math.round(meetingAnalytics.totalMeetings * 0.124)} this month · 31 this week`,
    },
    {
      icon: Clock,
      label: "Hours Transcribed",
      target: meetingAnalytics.hoursTranscribed,
      suffix: "h",
      change: meetingAnalytics.hoursTranscribedChange,
      description: "Avg 97.2% accuracy · 45 min avg session",
    },
    {
      icon: CheckSquare,
      label: "Action Items Captured",
      target: meetingAnalytics.actionItemsCaptured,
      change: meetingAnalytics.actionItemsChange,
      description: "134 this week · 12 overdue flagged",
    },
    {
      icon: Sparkles,
      label: "AI Suggestions Generated",
      target: meetingAnalytics.aiSuggestionsGenerated,
      change: meetingAnalytics.suggestionsChange,
      description: "68% utilization rate · top: objection handlers",
    },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="animate-fade-up-in" style={{ animationDuration: "120ms", animationFillMode: "both" }}>
        <h1
          className="text-2xl font-semibold tracking-tight"
          style={{ color: "var(--foreground)", letterSpacing: "var(--heading-tracking)" }}
        >
          Transcription Overview
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Real-time session monitoring, transcript accuracy, and AI coaching across all meeting types.
        </p>
      </div>

      {/* ── KPI Stat Cards ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* ── Live Session Banner ──────────────────────────────────────────── */}
      {liveMeeting && <LiveBanner meeting={liveMeeting} />}

      {/* ── Meeting Activity Chart ───────────────────────────────────────── */}
      <div
        className="aesthetic-card p-5 animate-fade-up-in"
        style={{ animationDelay: "250ms", animationDuration: "150ms", animationFillMode: "both" }}
      >
        {/* Chart header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              Meeting Activity
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              Session volume and downstream outputs over time
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Chart view switcher */}
            <div
              className="flex rounded-lg overflow-hidden border"
              style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
            >
              {CHART_VIEWS.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setChartView(v.value)}
                  className="px-3 py-1.5 text-xs font-medium transition-colors duration-100"
                  style={{
                    background: chartView === v.value ? "var(--primary)" : "transparent",
                    color: chartView === v.value ? "oklch(0.08 0.01 250)" : "var(--muted-foreground)",
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
            {/* Period selector */}
            <div
              className="flex rounded-lg overflow-hidden border"
              style={{ borderColor: "oklch(1 0 0 / 0.1)" }}
            >
              {(["4w", "8w", "12w"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className="px-2.5 py-1.5 text-xs transition-colors duration-100"
                  style={{
                    background: chartPeriod === p ? "oklch(1 0 0 / 0.08)" : "transparent",
                    color: chartPeriod === p ? "var(--foreground)" : "var(--muted-foreground)",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <MeetingActivityChart data={chartData} view={chartView} />
      </div>

      {/* ── Recent Sessions Table ────────────────────────────────────────── */}
      <div
        className="aesthetic-card animate-fade-up-in"
        style={{ animationDelay: "300ms", animationDuration: "150ms", animationFillMode: "both" }}
      >
        {/* Table header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 pb-3">
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              Recent Sessions
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {filteredMeetings.length} sessions
              {typeFilter !== "all" ? ` · filtered by ${meetingTypeLabel(typeFilter as MeetingType)}` : ""}
            </p>
          </div>
          {/* Type filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {MEETING_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setTypeFilter(t.value)}
                className="px-2.5 py-1 text-xs rounded-full border transition-colors duration-100"
                style={{
                  background: typeFilter === t.value ? "var(--primary)" : "transparent",
                  borderColor:
                    typeFilter === t.value ? "var(--primary)" : "oklch(1 0 0 / 0.12)",
                  color:
                    typeFilter === t.value
                      ? "oklch(0.08 0.01 250)"
                      : "var(--muted-foreground)",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: "1px solid oklch(1 0 0 / 0.06)" }}>
                {["Session", "Type", "Duration", "Participants", "Accuracy", "Action Items", "Status"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left px-5 py-2.5 font-medium uppercase tracking-wider"
                      style={{ color: "var(--muted-foreground)", fontSize: "10px" }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center" style={{ color: "var(--muted-foreground)" }}>
                    No sessions found for this filter.
                  </td>
                </tr>
              ) : (
                filteredMeetings.map((m, i) => (
                  <tr
                    key={m.id}
                    className="aesthetic-hover"
                    style={{
                      borderBottom:
                        i < filteredMeetings.length - 1
                          ? "1px solid oklch(1 0 0 / 0.04)"
                          : "none",
                    }}
                  >
                    {/* Session title */}
                    <td className="px-5 py-3 max-w-[200px]">
                      <div>
                        <p
                          className="font-medium truncate"
                          style={{ color: "var(--foreground)", maxWidth: "200px" }}
                        >
                          {m.title}
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                          {formatDate(m.date)}
                        </p>
                      </div>
                    </td>

                    {/* Type badge */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: `${typeColor(m.type)}1a`,
                          color: typeColor(m.type),
                          border: `1px solid ${typeColor(m.type)}33`,
                        }}
                      >
                        {meetingTypeLabel(m.type)}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="px-5 py-3 font-mono whitespace-nowrap" style={{ color: "var(--foreground)" }}>
                      {formatDuration(m.duration)}
                    </td>

                    {/* Participants */}
                    <td className="px-5 py-3 whitespace-nowrap" style={{ color: "var(--muted-foreground)" }}>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {m.participants.length}
                      </div>
                    </td>

                    {/* Transcription accuracy */}
                    <td className="px-5 py-3">
                      {m.status === "failed" ? (
                        <div className="flex items-center gap-1.5" style={{ color: "var(--destructive)" }}>
                          <AlertTriangle className="w-3 h-3" />
                          <span className="text-[10px]">Failed</span>
                        </div>
                      ) : (
                        <AccuracyBar value={m.transcriptionAccuracy} />
                      )}
                    </td>

                    {/* Action items */}
                    <td className="px-5 py-3 font-mono tabular-nums" style={{ color: "var(--foreground)" }}>
                      {m.actionItemsCount > 0 ? (
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                          style={{
                            background: "oklch(1 0 0 / 0.06)",
                            color: "var(--foreground)",
                          }}
                        >
                          <CheckSquare className="w-2.5 h-2.5" style={{ color: "var(--primary)" }} />
                          {m.actionItemsCount}
                        </span>
                      ) : (
                        <span style={{ color: "var(--muted-foreground)" }}>—</span>
                      )}
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-3 whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: `${statusColor(m.status)}1a`,
                          color: statusColor(m.status),
                          border: `1px solid ${statusColor(m.status)}33`,
                        }}
                      >
                        {(m.status === "transcribing" || m.status === "processing") && (
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ background: statusColor(m.status) }}
                          />
                        )}
                        {statusLabel(m.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Proposal Banner ───────────────────────────────────────────────── */}
      <div
        className="rounded-xl border p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          background: "oklch(0.10 0.02 var(--primary-h, 250))",
          borderColor: "oklch(1 0 0 / 0.08)",
        }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            This is a live demo built for{" "}
            <span style={{ color: "var(--primary)" }}>
              {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
            </span>
          </p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs transition-colors duration-100"
            style={{ color: "var(--muted-foreground)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-foreground)")}
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors duration-100"
            style={{
              background: "var(--primary)",
              color: "oklch(0.08 0.01 250)",
            }}
          >
            Work with me
          </a>
        </div>
      </div>

    </div>
  );
}
