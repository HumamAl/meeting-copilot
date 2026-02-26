"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { WeeklyMeetingTrend } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border p-3 text-xs shadow-lg"
      style={{
        background: "var(--card)",
        borderColor: "oklch(1 0 0 / 0.12)",
        color: "var(--card-foreground)",
      }}
    >
      <p className="font-semibold mb-2 text-sm" style={{ color: "var(--foreground)" }}>
        Week of {label}
      </p>
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 mb-0.5" style={{ color: "var(--muted-foreground)" }}>
          <span
            className="inline-block w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color as string }}
          />
          <span>{entry.name}:</span>
          <span className="font-mono font-semibold" style={{ color: "var(--foreground)" }}>
            {entry.name === "Hours Recorded" ? `${entry.value}h` : entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

interface MeetingActivityChartProps {
  data: WeeklyMeetingTrend[];
  view: "meetings" | "hours" | "suggestions";
}

export function MeetingActivityChart({ data, view }: MeetingActivityChartProps) {
  const barKey = view === "meetings" ? "meetings" : view === "hours" ? "hoursRecorded" : "suggestionsUsed";
  const barLabel =
    view === "meetings" ? "Sessions" : view === "hours" ? "Hours Recorded" : "AI Suggestions Used";
  const lineKey = view === "meetings" ? "actionItems" : view === "hours" ? "meetings" : "actionItems";
  const lineLabel =
    view === "meetings" ? "Action Items" : view === "hours" ? "Sessions" : "Action Items";

  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="oklch(1 0 0 / 0.06)"
          vertical={false}
        />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          interval={1}
        />
        <YAxis
          yAxisId="left"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
        <Legend
          wrapperStyle={{
            fontSize: 11,
            color: "var(--muted-foreground)",
            paddingTop: "12px",
          }}
        />
        <Bar
          yAxisId="left"
          dataKey={barKey}
          name={barLabel}
          fill="url(#barGradient)"
          radius={[3, 3, 0, 0]}
          maxBarSize={28}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={lineKey}
          name={lineLabel}
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "var(--chart-2)", strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
