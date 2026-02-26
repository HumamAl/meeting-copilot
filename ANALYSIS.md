# Analysis Brief — AI Meeting Assistant / Interview Copilot

**Job**: Full Stack Engineer AI Meeting Assistant/Interview Copilot Development
**Budget**: $700 Fixed-price
**Level**: Intermediate
**Type**: Ongoing project

---

## Structured Analysis Brief

```json
{
  "domain": "tech",
  "clientName": null,
  "features": [
    "live transcription feed with speaker identification",
    "real-time AI response suggestions panel",
    "meeting session manager (start/stop/pause recording)",
    "session history and transcript library",
    "meeting notes and action item extraction"
  ],
  "challenges": [
    {
      "title": "Cross-browser transcription API compatibility",
      "vizType": "before-after",
      "outcome": "Could restore transcription reliability on Edge and Chrome — eliminating the silent-failure bug where the Web Speech API initializes but never fires events"
    },
    {
      "title": "Real-time AI suggestion latency pipeline",
      "vizType": "flow-diagram",
      "outcome": "Could reduce suggestion round-trip from >2s to under 500ms by streaming completions instead of buffering full responses"
    },
    {
      "title": "Prompt engineering for contextual response coaching",
      "vizType": "architecture-sketch",
      "outcome": "Could increase suggestion relevance for 1:1s, sales calls, and presentations by routing each call type through a purpose-specific system prompt rather than a single generic one"
    }
  ],
  "portfolioProjects": [
    "WMF Agent Dashboard",
    "Data Intelligence Platform",
    "MedRecord AI",
    "Lead Intake CRM"
  ],
  "coverLetterHooks": [
    "transcription sometimes doesn't pick up on Google Chrome",
    "having some issues with picking up transcription on Edge browser",
    "previously working — it's a regression, not a greenfield bug",
    "live loom demo requested",
    "sensitive module — only experienced engineers"
  ],
  "screeningQuestion": null,
  "screeningAnswer": null,
  "aestheticProfile": {
    "aesthetic": "dark-premium",
    "mood": "focused, intelligent, ambient precision",
    "colorDirection": "electric indigo on near-black — oklch(0.65 0.20 265) primary on oklch(0.08 0.01 265) background",
    "densityPreference": "standard",
    "justification": "This is an AI-powered productivity tool used during high-stakes meetings and interviews — precisely the context where Dark Premium reads as 'professional AI software', not 'toy.' The client explicitly mentions prompt engineering as a required skill, and the product category (AI copilot, real-time inference, live audio processing) has strong visual conventions set by tools like Vapi.ai, Otter.ai Pro, and Fireflies. The job post language is technical and direct ('sensitive module', 'front/back end and prompt engineering', 'live transcription'), signaling a technically literate client who would recognize a Dark Premium interface as domain-appropriate. Consumer-wellness aesthetics or warm-organic would visually undermine the precision promise of an AI copilot."
  },
  "clientVocabulary": {
    "primaryEntities": ["meeting", "session", "transcript", "recording", "copilot"],
    "kpiLabels": ["sessions recorded", "transcription accuracy", "suggestions accepted", "avg session duration"],
    "statusLabels": ["Recording", "Processing", "Transcribed", "Reviewing", "Exported"],
    "workflowVerbs": ["transcribe", "record", "suggest", "respond", "coach", "flag"],
    "sidebarNavCandidates": ["Live Session", "Session History", "Transcript Library", "Meeting Notes", "Settings"],
    "industryTerms": ["live transcription", "interview copilot", "1:1 meeting", "sales call", "presentation call", "Web Speech API", "prompt engineering", "response suggestions"]
  },
  "designSignals": "The client's team uses or sells this tool during live high-stakes moments — job interviews, sales calls, 1:1 check-ins. Their mental reference is tools like Otter.ai, Fireflies.ai, or Notion AI — dark, focused, minimal UI that stays out of the way while audio plays. They would evaluate the demo by whether it looks like something they'd trust during a live call, not by whether it looks visually impressive in a portfolio. Functional precision signals competence here. Any warm, decorative, or cluttered aesthetic would reduce trust rather than build it.",
  "accentColor": "indigo",
  "signals": ["TECH_SPECIFIC", "REDESIGN", "DETAILED_SPEC"],
  "coverLetterVariant": "B",
  "domainResearcherFocus": "Focus on real-time browser audio API landscape: Web Speech API (SpeechRecognition interface), cross-browser compatibility differences between Chrome (webkitSpeechRecognition), Edge (sometimes requires policy flags), and Firefox (lacks native support). Jargon that signals expertise: 'recognition.continuous', 'interimResults', 'onresult event handler', 'AudioContext', 'MediaStream API'. For AI suggestion pipelines: streaming completions, system prompt routing, temperature settings for coaching vs. transcription. Realistic metric ranges: transcription accuracy 85-97% in clean audio; suggestion latency target under 500ms; session duration 15-90 minutes typical. Edge cases: background noise degrading recognition confidence scores, long silences causing stream reset, multi-speaker attribution errors. Real tools in this space: Otter.ai, Fireflies.ai, Krisp, Whisper API (OpenAI), AssemblyAI, Deepgram. The client's existing product is an interview copilot with a Chrome/Edge bug — the tech failure mode is specifically around the SpeechRecognition API not firing events after initialization, often caused by microphone permission race conditions or missing 'continuous' mode flags."
}
```

---

## Analysis Notes

### Domain Classification Rationale

Classified as `tech` (AI/SaaS developer tool) rather than `hr` or `education` because:
- The product is an AI productivity tool with a specific technical integration challenge
- The client is a developer/product owner building the tool, not an HR buyer
- The core deliverable is a software module (transcription + AI pipeline), not a domain-specific business workflow
- Industry aesthetic conventions align with AI dev tools (Vapi.ai, Resend, OpenAI Playground)

### Aesthetic Selection Rationale

`dark-premium` is the correct choice for this job. Reasoning:

1. **Product category signal**: AI copilot tools universally use dark interfaces — Otter.ai's focused mode, Fireflies.ai, Notion AI, Claude itself. A light theme would feel out-of-genre.
2. **Use context signal**: The product is used *during* high-stakes calls. A dark, minimal interface reduces cognitive load and stays ambient. Light UIs feel like active dashboards, not passive copilots.
3. **Technical client signal**: Client mentions "prompt engineering", "front/back end", "previously working" — language of a technically literate person who would associate Dark Premium with the AI product category.
4. **Industry routing confirmation**: `AI / ML Products` → Primary: `Dark Premium`. This is a direct match.

### Feature Selection Rationale

5 features chosen based on explicit mentions in the job post:
1. **Live transcription feed** — explicitly required ("live transcription and recording capabilities")
2. **AI response suggestions panel** — explicitly required ("help a user with what to say and how to respond")
3. **Meeting session manager** — implied by "recording capabilities" + start/stop workflow
4. **Session history and transcript library** — implied by "recording" + the need to review transcripts post-meeting
5. **Meeting notes and action item extraction** — implied by "Meeting Note Assistant" (in job title)

### Challenge Selection Rationale

3 challenges — this is a focused technical fix job, not a complex multi-domain integration. The challenges are:

1. **Cross-browser transcription** — the *stated* regression bug (Edge + Chrome). This is the highest-leverage hook because it shows the client I understand their specific bug, not a generic transcription challenge.
2. **AI suggestion latency** — the *implied* technical challenge of making suggestions feel real-time, not delayed. This is what separates a good copilot from a slow one.
3. **Prompt routing by call type** — the *explicit product differentiation* the client described ("1:1 meetings, Sales calls, Presentation calls"). Using separate prompts per meeting type is the right architecture and signals product thinking.

### Portfolio Project Selection Rationale

| Project | Match Reason |
|---|---|
| WMF Agent Dashboard (#1) | Closest: AI pipeline + prompt engineering + real client product. Primary pick for AI/automation jobs. |
| Data Intelligence Platform (#18) | Secondary: dashboard with real-time data, analytics — visual match for session tracking |
| MedRecord AI (#9) | AI document processing pipeline — closest structural match to transcript processing |
| Lead Intake CRM (#3) | Demonstrates end-to-end product building, real-time state management |

Note: No direct AI copilot / meeting tool in portfolio. WMF Agent Dashboard is the strongest signal — it demonstrates prompt engineering and Claude API usage in a production context.

### Cover Letter Variant Rationale

Variant **B** ("I Noticed") because:
- The job post reveals a *specific technical pain point* ("transcription sometimes doesn't pick up on Google Chrome / Edge")
- This is a regression bug, not a feature request — leading with "I noticed the issue is likely in the SpeechRecognition API's continuous mode initialization" signals immediate diagnostic capability
- The client explicitly wrote "only talented and experienced engineers should apply" — opening with a bug hypothesis, not generic credentials, is the credibility signal they're screening for

### Signals Detected

| Signal | Tag | Evidence |
|---|---|---|
| Tech stack specified | `TECH_SPECIFIC` | Python, React, JavaScript, API — all explicit |
| Existing product with regression | `REDESIGN` | "already built... having some issues... previously working" |
| Detailed technical spec | `DETAILED_SPEC` | Specific browser issues, call type categories, skill requirements |

Note: Budget at $700 is below the `HIGH_BUDGET` threshold ($1,000+). This is a focused fix/build job. Demo ROI is still strong because the client is filtering for "only talented and experienced engineers" — the demo is the proof mechanism.

### Cover Letter Hooks (Usage Priority)

1. **"Transcription sometimes doesn't pick up on Chrome/Edge"** — lead with this. Shows you read the bug report, not just the job title.
2. **"Previously working" regression framing** — signals this is a fixable bug, not a fundamental problem. Positions you as confident, not cautious.
3. **"Sensitive module"** — address directly in the cover letter. Say something like "I understand this is a live-session module — the demo I built handles the exact failure mode."
4. **Loom request** — client asked for "live loom demo". Mention Loom availability explicitly in the cover letter.
5. **3 call types (1:1, Sales, Presentation)** — name all three. Shows you read the full requirements, not just the headline.

### Done = Statement (for cover letter or follow-up)

> "Done = transcription firing reliably on both Chrome and Edge (tested with 3 concurrent sessions), AI suggestions appearing within 500ms of speaker pause, and call-type routing working for 1:1, sales, and presentation modes."

### Vocabulary Map (authoritative source for all downstream agents)

```json
{
  "entityNames": {
    "primary_record": "session",
    "customer": null,
    "worker": "participant",
    "id_field": "session ID",
    "content_unit": "transcript"
  },
  "statusWorkflow": ["Recording", "Processing", "Transcribed", "Reviewing", "Exported"],
  "kpiNames": ["Sessions Today", "Transcription Accuracy", "Avg Session Duration", "Suggestions Accepted"],
  "sidebarLabels": ["Live Session", "Session History", "Transcript Library", "Meeting Notes", "Settings"],
  "industryTerms": [
    "live transcription",
    "interview copilot",
    "response suggestions",
    "speaker identification",
    "Web Speech API",
    "1:1 meeting",
    "sales call",
    "presentation call",
    "prompt engineering",
    "action items"
  ],
  "complianceSignals": [],
  "painVocabulary": [
    "transcription doesn't pick up",
    "not picking up on Edge browser",
    "previously working",
    "sensitive module",
    "seamless user experience",
    "accuracy in transcription"
  ]
}
```

---

## Aesthetic Profile (Full — for Layout Builder)

```json
{
  "aesthetic": "dark-premium",
  "domain": "tech",
  "mood": "focused, intelligent, ambient precision",
  "colorDirection": "electric indigo — oklch(0.65 0.20 265)",
  "radiusProfile": "soft (0.75rem)",
  "densityProfile": "standard",
  "motionCharacter": "smooth (100-200ms ease-in-out)",
  "backgroundBase": "oklch(0.08 0.01 265)",
  "cardBase": "oklch(0.12 0.01 265)",
  "borderStyle": "border-white/8",
  "shadowStyle": "glow: 0 0 20px oklch(0.65 0.20 265 / 0.15)",
  "typographyStack": "Geist Sans + Geist Mono for data/timestamps",
  "chartAxisStyle": "fill='rgba(255,255,255,0.5)' gridStroke='rgba(255,255,255,0.08)'",
  "statCardStyle": "bg-white/8 border border-white/10"
}
```

### Key CSS Token Overrides for globals.css

```css
:root {
  --primary: oklch(0.65 0.20 265);
  --primary-h: 265;
  --primary-foreground: oklch(0.985 0 0);
  --accent: oklch(0.20 0.05 265);
  --accent-foreground: oklch(0.85 0 0);
  --background: oklch(0.08 0.01 265);
  --foreground: oklch(0.92 0 0);
  --card: oklch(0.12 0.01 265);
  --card-foreground: oklch(0.92 0 0);
  --muted: oklch(0.18 0.008 265);
  --muted-foreground: oklch(0.60 0 0);
  --border: oklch(1 0 0 / 0.1);
  --sidebar-bg: oklch(0.10 0.015 265);
  --sidebar-primary: oklch(0.65 0.20 265);
  --section-dark: oklch(0.06 0.015 265);
  --success: oklch(0.627 0.194 149.214);
  --warning: oklch(0.769 0.188 70.08);
  --ring: oklch(0.65 0.20 265);
  --radius: 0.75rem;
  --chart-1: oklch(0.65 0.20 265);
  --chart-2: oklch(0.60 0.16 295);
  --chart-3: oklch(0.55 0.18 245);
  --chart-4: oklch(0.70 0.14 325);
  --chart-5: oklch(0.50 0.15 225);
  --content-padding: 1.5rem;
  --card-padding: 1.5rem;
  --sidebar-width: 16rem;
  --header-height: 3.5rem;
}
```

---

## Dashboard Composition Guidance

This is an AI productivity tool, not a business analytics dashboard. The dashboard should feel like an **active workspace**, not a reporting interface.

### Recommended Dashboard Structure

```
Row 1: 4 stat cards — Sessions Today | Transcription Accuracy | Avg Session Duration | Suggestions Accepted
Row 2 Left (2/3): Live Session Panel — pulsing "Recording" indicator, live transcript feed with timestamps
Row 2 Right (1/3): AI Suggestions Panel — real-time coaching cards with "Accept" / "Dismiss" actions
Row 3: Recent Sessions table — session name, type (1:1 / Sales / Presentation), duration, date, status badge
```

This composition mirrors how Otter.ai and Fireflies.ai structure their interfaces — transcript feed is primary, not secondary. Do NOT put a generic line chart in the hero position.

### Feature Pages (5 pages)

1. **Live Session** (`/`) — the dashboard above; recording state machine with start/pause/stop
2. **Session History** (`/sessions`) — table of past sessions filterable by call type, date range, duration
3. **Transcript Library** (`/transcripts`) — searchable transcript viewer with speaker labels and timestamps
4. **Meeting Notes** (`/notes`) — extracted action items per session, editable note blocks
5. **Settings** (`/settings`) — browser permissions status (mic access, speech API support), call type configuration

---

## Cover Letter Draft (for Cover Letter Writer)

**Variant B — "I Noticed"**

```
The transcription issue on Chrome and Edge is almost certainly a Web Speech API initialization race condition — built a working copilot to show how I'd fix it: {VERCEL_URL}

The demo handles live transcription, real-time AI suggestions, and separate prompt routing for 1:1s, sales calls, and presentations — the three modes you described. Previously worked on an AI pipeline that replaced a 4-hour manual process with structured extraction and live approvals.

Is the recognition dropping silently (no error, just no output), or is it throwing a permission error? That narrows the fix considerably.

10-minute call or I can record a Loom walkthrough — your pick.

Humam
```

Word count: ~105 words. Under 120. Demo link in sentence 1 (the fix context naturally leads with the link). Does not start with "I". Embedded question is specific — can only be asked by someone who understands browser speech API failure modes. Binary CTA included.

---

## Quality Checklist Pre-Output

- [x] Domain is `tech` (most specific — AI/SaaS dev tool, not generic)
- [x] Aesthetic `dark-premium` actively chosen from signals (AI product category, use context, client technical language, industry routing)
- [x] Aesthetic justification references 3+ specific signals from the job post
- [x] Client vocabulary contains exact terms from the job post (`copilot`, `live transcription`, `1:1 meetings`, `sales call`, `presentation call`)
- [x] Sidebar nav candidates use client terminology (`Live Session`, `Session History`, `Transcript Library`)
- [x] Features list has 5 items with domain-specific names
- [x] Each challenge has title, vizType, AND outcome with qualifier language
- [x] Portfolio projects ranked by relevance (WMF Agent first — AI/prompt engineering match)
- [x] Cover letter hooks are specific phrases from the job post (not generic)
- [x] No screening question found → set to null
- [x] Domain researcher focus mentions jargon, API names, metric ranges, real tools, and edge cases
- [x] All JSON fields present and non-empty (except clientName, screeningQuestion, screeningAnswer = null)
