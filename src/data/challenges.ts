export interface Challenge {
  id: string;
  title: string;
  description: string;
  outcome: string;
}

export interface ExecutiveSummaryData {
  commonApproach: string;
  differentApproach: string;
  accentWord?: string;
}

export const executiveSummary: ExecutiveSummaryData = {
  commonApproach:
    "Most developers reach for the Web Speech API, wrap it in a React hook, and call it done. When it fails silently on Edge or drops audio mid-call on Chrome, they shrug and blame the browser. For the AI coaching layer, they typically bolt on a GPT call after the meeting ends — missing the real-time window entirely.",
  differentApproach:
    "I'd build a resilient transcription pipeline with automatic browser fallback, a streaming AI coaching engine that generates suggestions during live speaker turns, and a meeting-type prompt system that makes the AI context-aware — not just a generic summarizer.",
  accentWord: "resilient transcription pipeline",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Cross-Browser Transcription Reliability",
    description:
      "Web Speech API coverage is inconsistent: Chrome has intermittent recognition drops under load, Edge has partial support, and Firefox has no implementation at all. A single-source transcription approach means users lose meeting context whenever the browser misbehaves.",
    outcome:
      "Could improve transcription availability from ~60% browser coverage to 95%+ with automatic fallback detection and a unified transcript stream across browsers.",
  },
  {
    id: "challenge-2",
    title: "Real-Time AI Coaching Engine",
    description:
      "Generating useful AI suggestions requires more than sending text to GPT. The challenge is managing a live context window — what was said 30 seconds ago matters, but 5 minutes ago usually doesn't. Suggestions that arrive 8+ seconds after a speaker turn are too late to be actionable.",
    outcome:
      "Could deliver contextual coaching suggestions within 2–3 seconds of speaker turns, enabling in-the-moment guidance during sales objections, interview questions, and presentation Q&As.",
  },
  {
    id: "challenge-3",
    title: "Meeting-Type Adaptive Prompting",
    description:
      "A one-size-fits-all AI prompt produces generic suggestions that feel misaligned — objection handlers during a 1:1 check-in, or empathy prompts during a sales demo. Without prompt routing by meeting type, the AI suggestion ignore rate stays high and users stop trusting the copilot.",
    outcome:
      "Could reduce ignored AI suggestions from ~40% to under 15% by routing to meeting-type-specific prompt templates that align the AI's focus with actual meeting goals.",
  },
];
