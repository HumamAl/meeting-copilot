"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, ChevronRight, MessageSquare, Layers } from "lucide-react";

// ─── Inline data ──────────────────────────────────────────────────────────────

type Sentiment = "positive" | "neutral" | "negative" | "question";

interface TranscriptSegment {
  id: string;
  speaker: string;
  speakerRole: string;
  timestamp: string;
  text: string;
  confidence: number;
  sentiment: Sentiment;
}

interface TranscriptMeeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  participantCount: number;
  segments: TranscriptSegment[];
}

const MEETINGS: TranscriptMeeting[] = [
  {
    id: "tm-01",
    title: "Q1 Sales Strategy Review",
    date: "2026-02-24",
    duration: 62,
    participantCount: 4,
    segments: [
      {
        id: "s-01",
        speaker: "Marcus Reid",
        speakerRole: "VP Sales",
        timestamp: "00:00:14",
        text: "Thanks everyone for joining. Before we dive in, quick note — we're recording today for team members who couldn't make it.",
        confidence: 0.98,
        sentiment: "neutral",
      },
      {
        id: "s-02",
        speaker: "Priya Nair",
        speakerRole: "Account Executive",
        timestamp: "00:00:42",
        text: "Great. I've pulled the Q4 close rates and I have to say the numbers look better than expected — we're up 14% quarter over quarter.",
        confidence: 0.97,
        sentiment: "positive",
      },
      {
        id: "s-03",
        speaker: "Marcus Reid",
        speakerRole: "VP Sales",
        timestamp: "00:01:28",
        text: "That's encouraging. Where did the top deals come from? I want to understand if we're seeing consistency in enterprise or if this is mid-market driven.",
        confidence: 0.96,
        sentiment: "question",
      },
      {
        id: "s-04",
        speaker: "James Okafor",
        speakerRole: "Sales Engineer",
        timestamp: "00:02:05",
        text: "Honestly, the enterprise pipeline has stalled. Three of our largest prospects went dark after the technical evaluation. I think we need to rethink the evaluation structure.",
        confidence: 0.95,
        sentiment: "negative",
      },
      {
        id: "s-05",
        speaker: "Priya Nair",
        speakerRole: "Account Executive",
        timestamp: "00:03:18",
        text: "Agreed. Mid-market is carrying us right now. We closed seven new logos in January alone — all sub-$50K ARR. Not bad, but we need to land some enterprise anchors.",
        confidence: 0.98,
        sentiment: "neutral",
      },
      {
        id: "s-06",
        speaker: "Marcus Reid",
        speakerRole: "VP Sales",
        timestamp: "00:04:47",
        text: "What's the action plan for re-engaging the stalled enterprise accounts? James, can you own that with me?",
        confidence: 0.97,
        sentiment: "question",
      },
      {
        id: "s-07",
        speaker: "James Okafor",
        speakerRole: "Sales Engineer",
        timestamp: "00:05:10",
        text: "Absolutely. I'll set up revised sandbox environments for all three and get personalized technical briefs out by end of week.",
        confidence: 0.96,
        sentiment: "positive",
      },
    ],
  },
  {
    id: "tm-02",
    title: "Backend Engineer Interview — Round 2",
    date: "2026-02-21",
    duration: 55,
    participantCount: 3,
    segments: [
      {
        id: "s-08",
        speaker: "Rachel Kim",
        speakerRole: "Engineering Manager",
        timestamp: "00:00:30",
        text: "Welcome back. Round two is going to focus on systems design — how you approach scalability challenges. Ready?",
        confidence: 0.99,
        sentiment: "neutral",
      },
      {
        id: "s-09",
        speaker: "Candidate",
        speakerRole: "Interviewee",
        timestamp: "00:00:51",
        text: "Yes, definitely. Systems design is actually where I spend most of my time at my current role — distributed caching and queue orchestration specifically.",
        confidence: 0.96,
        sentiment: "positive",
      },
      {
        id: "s-10",
        speaker: "Rachel Kim",
        speakerRole: "Engineering Manager",
        timestamp: "00:01:30",
        text: "Good. Let's start with this: design a real-time notification system that needs to handle 10 million active users. Walk me through your thinking.",
        confidence: 0.98,
        sentiment: "question",
      },
      {
        id: "s-11",
        speaker: "Candidate",
        speakerRole: "Interviewee",
        timestamp: "00:02:15",
        text: "I'd start with a pub-sub model — Kafka at the ingestion layer, then WebSocket connections managed through a connection broker. For 10M users, horizontal scaling of the broker tier is the key challenge.",
        confidence: 0.94,
        sentiment: "neutral",
      },
      {
        id: "s-12",
        speaker: "Dev Patel",
        speakerRole: "Senior Engineer",
        timestamp: "00:04:40",
        text: "How do you handle message delivery guarantees? If the connection drops, what's your retry strategy?",
        confidence: 0.97,
        sentiment: "question",
      },
      {
        id: "s-13",
        speaker: "Candidate",
        speakerRole: "Interviewee",
        timestamp: "00:05:08",
        text: "At least-once delivery via Kafka consumer groups, with client-side deduplication using message IDs stored in Redis with a 24-hour TTL. Exactly-once is too expensive at this scale.",
        confidence: 0.95,
        sentiment: "positive",
      },
    ],
  },
  {
    id: "tm-03",
    title: "Enterprise Demo — Acme Corp",
    date: "2026-02-22",
    duration: 48,
    participantCount: 6,
    segments: [
      {
        id: "s-14",
        speaker: "Sarah Lin",
        speakerRole: "Account Executive",
        timestamp: "00:01:00",
        text: "Thanks for making time, everyone. I know your team has been evaluating three vendors — today I want to show you why our transcription accuracy in noisy environments is a differentiator.",
        confidence: 0.99,
        sentiment: "positive",
      },
      {
        id: "s-15",
        speaker: "Tom Bridges",
        speakerRole: "CTO, Acme Corp",
        timestamp: "00:01:45",
        text: "That's exactly what I want to see. Our meeting rooms have poor acoustics. The last tool we tried produced transcripts with 20% error rates — completely unusable.",
        confidence: 0.96,
        sentiment: "negative",
      },
      {
        id: "s-16",
        speaker: "Sarah Lin",
        speakerRole: "Account Executive",
        timestamp: "00:02:30",
        text: "I've got a recording from a customer in a similar environment — loud open office, multiple speakers. Our model averaged 96.3% accuracy on that session. Let me pull it up.",
        confidence: 0.98,
        sentiment: "positive",
      },
      {
        id: "s-17",
        speaker: "Tom Bridges",
        speakerRole: "CTO, Acme Corp",
        timestamp: "00:08:15",
        text: "Okay, that's genuinely impressive. What's the pricing model — per seat or per minute of transcription?",
        confidence: 0.97,
        sentiment: "question",
      },
      {
        id: "s-18",
        speaker: "Sarah Lin",
        speakerRole: "Account Executive",
        timestamp: "00:08:44",
        text: "Per seat, annually. For your team size we'd be looking at the Growth tier — flat $28 per seat per month with unlimited transcription minutes.",
        confidence: 0.99,
        sentiment: "neutral",
      },
    ],
  },
  {
    id: "tm-04",
    title: "Product Roadmap — Engineering Sync",
    date: "2026-02-23",
    duration: 34,
    participantCount: 2,
    segments: [
      {
        id: "s-19",
        speaker: "Aiko Tanaka",
        speakerRole: "Product Manager",
        timestamp: "00:00:20",
        text: "I want to walk through the Q2 roadmap and get your engineering read on feasibility before I take it to the board.",
        confidence: 0.98,
        sentiment: "neutral",
      },
      {
        id: "s-20",
        speaker: "Ben Harlow",
        speakerRole: "Lead Engineer",
        timestamp: "00:00:55",
        text: "Sure. I've looked at the feature list — the AI coaching module is doable in Q2 if we deprioritize the calendar integration. We can't do both with current headcount.",
        confidence: 0.97,
        sentiment: "neutral",
      },
      {
        id: "s-21",
        speaker: "Aiko Tanaka",
        speakerRole: "Product Manager",
        timestamp: "00:01:40",
        text: "That's a tough tradeoff. Calendar integration is a top request from enterprise customers. If we delay it, we might lose the Acme renewal.",
        confidence: 0.96,
        sentiment: "negative",
      },
      {
        id: "s-22",
        speaker: "Ben Harlow",
        speakerRole: "Lead Engineer",
        timestamp: "00:02:18",
        text: "What if we scope calendar integration to read-only for Q2 and add the write/scheduling layer in Q3? That's achievable and gives customers something tangible sooner.",
        confidence: 0.98,
        sentiment: "positive",
      },
    ],
  },
];

function SentimentDot({ sentiment }: { sentiment: Sentiment }) {
  const config = {
    positive: {
      color: "bg-[color:var(--success)]",
      title: "Positive",
    },
    neutral: {
      color: "bg-muted-foreground/40",
      title: "Neutral",
    },
    negative: {
      color: "bg-destructive/70",
      title: "Negative",
    },
    question: {
      color: "bg-[color:var(--warning)]",
      title: "Question",
    },
  }[sentiment];

  return (
    <span
      className={cn("inline-block w-2 h-2 rounded-full shrink-0 mt-1.5", config.color)}
      title={config.title}
    />
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const color =
    pct >= 97
      ? "bg-[color:var(--success)]"
      : pct >= 92
      ? "bg-[color:var(--warning)]"
      : "bg-destructive/70";

  return (
    <div className="flex items-center gap-1.5" title={`${pct}% ASR confidence`}>
      <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground">{pct}%</span>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TranscriptsPage() {
  const [selectedId, setSelectedId] = useState<string>(MEETINGS[0].id);
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [highlightsOnly, setHighlightsOnly] = useState(false);
  const [listSearch, setListSearch] = useState("");

  const selectedMeeting = MEETINGS.find((m) => m.id === selectedId)!;

  const filteredMeetings = useMemo(() => {
    const q = listSearch.toLowerCase();
    return MEETINGS.filter(
      (m) =>
        q === "" ||
        m.title.toLowerCase().includes(q) ||
        m.date.includes(q)
    );
  }, [listSearch]);

  const filteredSegments = useMemo(() => {
    let segs = selectedMeeting.segments;
    if (highlightsOnly) {
      segs = segs.filter(
        (s) => s.sentiment === "positive" || s.sentiment === "question"
      );
    }
    if (transcriptSearch.trim()) {
      const q = transcriptSearch.toLowerCase();
      segs = segs.filter(
        (s) =>
          s.text.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q)
      );
    }
    return segs;
  }, [selectedMeeting, highlightsOnly, transcriptSearch]);

  return (
    <div className="page-container">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Transcript Viewer
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Speaker-attributed transcripts with sentiment analysis
          </p>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-var(--tab-bar-height)-var(--header-height)-10rem)] min-h-[400px]">
        {/* Left panel — meeting list */}
        <div className="w-72 shrink-0 flex flex-col gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter meetings..."
              value={listSearch}
              onChange={(e) => setListSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredMeetings.length === 0 && (
              <p className="text-xs text-muted-foreground p-3">
                No meetings match this filter.
              </p>
            )}
            {filteredMeetings.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedId(m.id);
                  setTranscriptSearch("");
                  setHighlightsOnly(false);
                }}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2.5 transition-colors duration-100 border",
                  selectedId === m.id
                    ? "bg-primary/8 border-primary/20 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-[color:var(--surface-hover)] hover:text-foreground"
                )}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-medium leading-snug line-clamp-2">
                    {m.title}
                  </span>
                  <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 opacity-50" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatDate(m.date)}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">
                    &middot; {m.segments.length} segments
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel — transcript */}
        <div className="flex-1 flex flex-col min-w-0 aesthetic-card overflow-hidden">
          {/* Transcript toolbar */}
          <div className="flex items-center gap-3 p-3 border-b border-border/40 flex-wrap">
            <div className="relative flex-1 min-w-[160px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search transcript..."
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs gap-1.5",
                highlightsOnly && "bg-primary/8 text-primary border-primary/30"
              )}
              onClick={() => setHighlightsOnly(!highlightsOnly)}
            >
              <Layers className="w-3.5 h-3.5" />
              {highlightsOnly ? "All segments" : "Highlights only"}
            </Button>
            <span className="text-xs text-muted-foreground shrink-0">
              {filteredSegments.length} segments
            </span>
          </div>

          {/* Meeting title bar */}
          <div className="px-4 py-2.5 border-b border-border/30 bg-muted/20">
            <p className="text-sm font-semibold">{selectedMeeting.title}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(selectedMeeting.date)} &middot;{" "}
              {selectedMeeting.participantCount} participants &middot;{" "}
              {selectedMeeting.duration}m
            </p>
          </div>

          {/* Segments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredSegments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <MessageSquare className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">
                  No segments match this filter.
                </p>
              </div>
            ) : (
              filteredSegments.map((seg) => (
                <div key={seg.id} className="flex gap-3">
                  <SentimentDot sentiment={seg.sentiment} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-semibold text-foreground">
                        {seg.speaker}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] py-0 px-1.5 h-4 border-0 bg-primary/8 text-primary rounded-full"
                      >
                        {seg.speakerRole}
                      </Badge>
                      <span className="text-[10px] font-mono text-muted-foreground ml-auto">
                        {seg.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {seg.text}
                    </p>
                    <div className="mt-1.5">
                      <ConfidenceBar confidence={seg.confidence} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
