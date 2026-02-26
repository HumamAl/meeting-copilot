"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Search, Users, Clock, Download, Mic, VideoIcon } from "lucide-react";

// ─── Inline data (until mock-data.ts is fully populated) ─────────────────────

type RecordingStatus = "ready" | "processing" | "failed";
type MeetingType = "one-on-one" | "sales-call" | "presentation" | "interview" | "team-standup";

interface Recording {
  id: string;
  title: string;
  type: MeetingType;
  date: string;
  duration: number; // minutes
  participantCount: number;
  status: RecordingStatus;
  transcriptionAccuracy: number;
  fileSize: string;
}

const recordings: Recording[] = [
  {
    id: "rec-01",
    title: "Q1 Sales Strategy Review",
    type: "sales-call",
    date: "2026-02-24",
    duration: 62,
    participantCount: 4,
    status: "ready",
    transcriptionAccuracy: 97,
    fileSize: "214 MB",
  },
  {
    id: "rec-02",
    title: "Product Roadmap — Engineering Sync",
    type: "one-on-one",
    date: "2026-02-23",
    duration: 34,
    participantCount: 2,
    status: "ready",
    transcriptionAccuracy: 98,
    fileSize: "118 MB",
  },
  {
    id: "rec-03",
    title: "Enterprise Demo — Acme Corp",
    type: "presentation",
    date: "2026-02-22",
    duration: 48,
    participantCount: 6,
    status: "ready",
    transcriptionAccuracy: 95,
    fileSize: "166 MB",
  },
  {
    id: "rec-04",
    title: "Backend Engineer Interview — Round 2",
    type: "interview",
    date: "2026-02-21",
    duration: 55,
    participantCount: 3,
    status: "ready",
    transcriptionAccuracy: 96,
    fileSize: "190 MB",
  },
  {
    id: "rec-05",
    title: "Daily Standup — Feb 20",
    type: "team-standup",
    date: "2026-02-20",
    duration: 14,
    participantCount: 8,
    status: "ready",
    transcriptionAccuracy: 94,
    fileSize: "48 MB",
  },
  {
    id: "rec-06",
    title: "Mid-Year Performance Review — Alex Chen",
    type: "one-on-one",
    date: "2026-02-19",
    duration: 41,
    participantCount: 2,
    status: "ready",
    transcriptionAccuracy: 99,
    fileSize: "142 MB",
  },
  {
    id: "rec-07",
    title: "Investor Update Call — Series B",
    type: "presentation",
    date: "2026-02-18",
    duration: 73,
    participantCount: 9,
    status: "processing",
    transcriptionAccuracy: 0,
    fileSize: "252 MB",
  },
  {
    id: "rec-08",
    title: "Partnership Discovery — GlobalTech",
    type: "sales-call",
    date: "2026-02-17",
    duration: 29,
    participantCount: 3,
    status: "ready",
    transcriptionAccuracy: 97,
    fileSize: "100 MB",
  },
  {
    id: "rec-09",
    title: "Senior Designer Interview",
    type: "interview",
    date: "2026-02-16",
    duration: 47,
    participantCount: 3,
    status: "ready",
    transcriptionAccuracy: 95,
    fileSize: "162 MB",
  },
  {
    id: "rec-10",
    title: "Customer Success Weekly",
    type: "team-standup",
    date: "2026-02-15",
    duration: 22,
    participantCount: 5,
    status: "failed",
    transcriptionAccuracy: 0,
    fileSize: "—",
  },
  {
    id: "rec-11",
    title: "Upsell Discovery — RetailBase",
    type: "sales-call",
    date: "2026-02-14",
    duration: 38,
    participantCount: 2,
    status: "ready",
    transcriptionAccuracy: 98,
    fileSize: "131 MB",
  },
  {
    id: "rec-12",
    title: "Frontend Lead Interview — Final Round",
    type: "interview",
    date: "2026-02-13",
    duration: 60,
    participantCount: 4,
    status: "ready",
    transcriptionAccuracy: 96,
    fileSize: "207 MB",
  },
  {
    id: "rec-13",
    title: "Board Demo — AI Features Showcase",
    type: "presentation",
    date: "2026-02-11",
    duration: 55,
    participantCount: 11,
    status: "ready",
    transcriptionAccuracy: 94,
    fileSize: "190 MB",
  },
  {
    id: "rec-14",
    title: "New Hire Onboarding — Jordan Park",
    type: "one-on-one",
    date: "2026-02-10",
    duration: 26,
    participantCount: 2,
    status: "ready",
    transcriptionAccuracy: 99,
    fileSize: "89 MB",
  },
  {
    id: "rec-15",
    title: "Weekly Engineering Standup",
    type: "team-standup",
    date: "2026-02-09",
    duration: 18,
    participantCount: 7,
    status: "processing",
    transcriptionAccuracy: 0,
    fileSize: "62 MB",
  },
];

const TYPE_LABELS: Record<MeetingType, string> = {
  "one-on-one": "1-on-1",
  "sales-call": "Sales Call",
  presentation: "Presentation",
  interview: "Interview",
  "team-standup": "Standup",
};

function StatusBadge({ status }: { status: RecordingStatus }) {
  const config = {
    ready: {
      label: "Ready",
      className:
        "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
    },
    processing: {
      label: "Processing",
      className:
        "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
    },
    failed: {
      label: "Failed",
      className: "text-destructive bg-destructive/10 border-0",
    },
  }[status];

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full", config.className)}
    >
      {config.label}
    </Badge>
  );
}

function TypeBadge({ type }: { type: MeetingType }) {
  return (
    <Badge
      variant="outline"
      className="text-xs font-medium rounded-full border-0 bg-primary/8 text-primary"
    >
      {TYPE_LABELS[type]}
    </Badge>
  );
}

/** CSS waveform bar — static but visually distinctive per recording */
function WaveformViz({ id, status }: { id: string; status: RecordingStatus }) {
  if (status !== "ready") {
    return (
      <div className="flex items-center justify-center h-8 gap-px">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-muted-foreground/20"
            style={{ height: "8px" }}
          />
        ))}
      </div>
    );
  }

  // Deterministic heights based on id character codes
  const seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const bars = Array.from({ length: 20 }, (_, i) => {
    const h = 4 + ((seed * (i + 7) * 31) % 24);
    return Math.max(4, Math.min(28, h));
  });

  return (
    <div className="flex items-center justify-center h-8 gap-px">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full bg-primary/40"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

const STATUS_OPTIONS: { value: RecordingStatus | "all"; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "ready", label: "Ready" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
];

const TYPE_OPTIONS: { value: MeetingType | "all"; label: string }[] = [
  { value: "all", label: "All meeting types" },
  { value: "sales-call", label: "Sales Call" },
  { value: "interview", label: "Interview" },
  { value: "presentation", label: "Presentation" },
  { value: "one-on-one", label: "1-on-1" },
  { value: "team-standup", label: "Standup" },
];

export default function RecordingsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RecordingStatus | "all">(
    "all"
  );
  const [typeFilter, setTypeFilter] = useState<MeetingType | "all">("all");

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return recordings.filter((r) => {
      const matchesSearch =
        q === "" ||
        r.title.toLowerCase().includes(q) ||
        TYPE_LABELS[r.type].toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || r.status === statusFilter;
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  const readyCount = recordings.filter((r) => r.status === "ready").length;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Recordings Library
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {readyCount} recordings ready &middot; {recordings.length} total
            sessions captured
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search recordings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(v) => setTypeFilter(v as MeetingType | "all")}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All meeting types" />
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as RecordingStatus | "all")}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {recordings.length}
        </span>
      </div>

      {/* Card grid */}
      {displayed.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <Mic className="w-8 h-8 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            No recordings match this filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayed.map((rec, i) => (
            <div
              key={rec.id}
              className="aesthetic-card p-4 space-y-3 cursor-default"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-snug line-clamp-2">
                    {rec.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDate(rec.date)}
                  </p>
                </div>
                <StatusBadge status={rec.status} />
              </div>

              {/* Waveform */}
              <WaveformViz id={rec.id} status={rec.status} />

              {/* Meta row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <TypeBadge type={rec.type} />
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(rec.duration)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {rec.participantCount}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-border/40">
                {rec.status === "ready" ? (
                  <span className="text-xs text-muted-foreground font-mono">
                    {rec.transcriptionAccuracy}% accuracy &middot; {rec.fileSize}
                  </span>
                ) : rec.status === "processing" ? (
                  <span className="text-xs text-[color:var(--warning)] flex items-center gap-1">
                    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--warning)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[color:var(--warning)]" />
                    </span>
                    Transcribing...
                  </span>
                ) : (
                  <span className="text-xs text-destructive">
                    Transcription failed
                  </span>
                )}
                {rec.status === "ready" && (
                  <VideoIcon className="w-3.5 h-3.5 text-muted-foreground/50" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
