import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ─── Meeting Copilot Domain Types ─────────────────────────────────────────────

export type MeetingType =
  | "one-on-one"
  | "sales-call"
  | "presentation"
  | "interview"
  | "team-standup";

export type MeetingStatus =
  | "live"
  | "recording"
  | "transcribing"
  | "processing"
  | "ready"
  | "failed";

export interface Participant {
  id: string;
  name: string;
  role: string;
  email: string;
  /** Percentage of total meeting talk time (0-100); participants in a meeting should sum to ~100 */
  talkTimePercent: number;
  avatar?: string;
}

export interface Meeting {
  id: string;
  title: string;
  type: MeetingType;
  status: MeetingStatus;
  /** ISO date string of when the meeting started or is scheduled */
  date: string;
  /** Meeting duration in minutes */
  duration: number;
  participants: Participant[];
  /** Transcription accuracy score (0-100) from speaker diarization engine */
  transcriptionAccuracy: number;
  actionItemsCount: number;
  aiSuggestionsCount: number;
  recordingUrl?: string;
}

export interface TranscriptSegment {
  id: string;
  meetingId: string;
  speaker: string;
  speakerRole: string;
  /** Human-readable timestamp in HH:MM:SS format, e.g. "00:02:34" */
  timestamp: string;
  text: string;
  /** ASR confidence score from speech recognition engine (0-1) */
  confidence: number;
  sentiment: "positive" | "neutral" | "negative" | "question";
}

export type SuggestionType =
  | "talking-point"
  | "objection-handler"
  | "follow-up"
  | "coaching-tip"
  | "question-prompt";

export interface AISuggestion {
  id: string;
  meetingId: string;
  type: SuggestionType;
  text: string;
  /** The conversation context that triggered this suggestion */
  context: string;
  priority: "high" | "medium" | "low";
  /** Whether the user clicked to use or dismissed this suggestion */
  usedByUser: boolean;
}

export type ActionItemStatus = "pending" | "in-progress" | "completed" | "overdue";

export interface ActionItem {
  id: string;
  meetingId: string;
  assignee: string;
  text: string;
  dueDate: string;
  status: ActionItemStatus;
  priority: "high" | "medium" | "low";
  createdAt: string;
}

export interface MeetingAnalytics {
  totalMeetings: number;
  /** Change vs. prior period, as percentage */
  totalMeetingsChange: number;
  hoursTranscribed: number;
  hoursTranscribedChange: number;
  actionItemsCaptured: number;
  actionItemsChange: number;
  avgTranscriptionAccuracy: number;
  accuracyChange: number;
  aiSuggestionsGenerated: number;
  suggestionsChange: number;
  /** Average talk-to-listen ratio across all recorded meetings (1.0 = equal) */
  avgTalkListenRatio: number;
}

export interface WeeklyStats {
  /** ISO week label, e.g. "Feb 3" */
  week: string;
  meetings: number;
  hoursRecorded: number;
  actionItems: number;
  suggestionsUsed: number;
}

export type CoachingCategory =
  | "pace"
  | "filler-words"
  | "engagement"
  | "question-ratio"
  | "monologue-alert";

export interface CoachingInsight {
  id: string;
  meetingId: string;
  category: CoachingCategory;
  message: string;
  /** Score for this dimension (0-100, higher = better) */
  score: number;
  recommendation: string;
}

// ─── Chart / Analytics Data Shapes ────────────────────────────────────────────

export interface WeeklyMeetingTrend {
  week: string;
  meetings: number;
  hoursRecorded: number;
  actionItems: number;
  suggestionsUsed: number;
}

export interface MeetingTypeBreakdown {
  type: string;
  count: number;
  avgAccuracy: number;
}

export interface TranscriptionAccuracyTrend {
  week: string;
  avgAccuracy: number;
  edgeChromeAccuracy: number;
  otherBrowserAccuracy: number;
}
