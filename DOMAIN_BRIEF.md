# Domain Knowledge Brief — AI Meeting Copilot / Meeting Intelligence SaaS

## Sub-Domain Classification

AI-powered meeting assistant and interview copilot platform (B2B SaaS, individual + team tier). Core capability: live transcription with real-time AI coaching overlays, post-meeting intelligence, and meeting library management. Serves three distinct meeting types: 1:1 check-ins, sales calls (discovery, demo, negotiation), and presentation/pitch calls. Closest comparables: Otter.ai, Fathom, tl;dv, Fireflies.ai, Gong Engage, Avoma.

---

## Job Analyst Vocabulary — Confirmed and Extended

The following vocabulary is confirmed for this sub-domain based on research across Otter.ai, Fathom, Fireflies, Gong, Avoma, and interview copilot tools (Final Round AI, LockedIn AI, Sensei AI).

### Confirmed Primary Entity Names

These are the words that must appear in every UI label — sidebar nav, table headers, KPI card titles, status badges, search placeholders.

- Primary record type: **recording** (not "meeting", not "call" — though "meeting" is acceptable in display prose)
- Secondary record type: **transcript** (the text artifact of a recording)
- People roles: **host** (not "user"), **participant** (not "attendee"), **speaker** (in transcript context)
- Meeting types: **1:1**, **Sales Call**, **Presentation**, **Interview** (these are first-class categories)
- AI output entities: **summary**, **action items**, **key moments**, **coaching insights**, **follow-up email**
- Coaching layer: **copilot suggestions**, **coaching prompts**, **live nudges**, **talk-time alerts**

### Expanded KPI Vocabulary

| KPI Name | What It Measures | Typical Format |
|---|---|---|
| Meetings Recorded | Total recordings in library | count (e.g., 47) |
| Hours Transcribed | Total audio processed | hours (e.g., 86.4h) |
| Action Items Captured | AI-extracted tasks from all meetings | count (e.g., 124) |
| Talk-to-Listen Ratio | Speaker's talk time vs. listening time | % (e.g., 62% / 38%) |
| Avg. Meeting Duration | Mean length of recorded sessions | minutes (e.g., 43 min) |
| Transcription Accuracy | Word Error Rate inverted (accuracy %) | % (e.g., 94.7%) |
| AI Suggestions Accepted | Live copilot prompts acted on vs. dismissed | % acceptance rate |
| Follow-ups Sent | Post-meeting emails drafted and sent | count |
| Coaching Score | Composite: talk ratio + filler words + pacing | 0-100 score |
| Topics Detected | Distinct subject clusters identified in session | count per meeting |
| Questions Asked | Prospecting / discovery questions by speaker | count per meeting |
| Engagement Score | Sentiment + response length + back-channels | 0-100 score |

### Status Label Vocabulary

Exact status strings used in this industry — these go directly into data tables, badges, and filter dropdowns.

- Active states: **Recording**, **Live**, **Transcribing**, **Processing**
- Queued states: **Scheduled**, **Pending**
- Ready states: **Ready**, **Completed**, **Reviewed**
- Problem states: **Failed**, **Poor Audio**, **Incomplete**, **Paused**
- Terminal states: **Archived**, **Deleted**
- Coaching states (live overlay): **On Track**, **Talk Too Much**, **Slow Down**, **Ask a Question**

### Workflow and Action Vocabulary

Verbs used in this domain — these become button labels, action menu items, and empty state messages.

- Primary actions: **record**, **transcribe**, **summarize**, **share**, **export**
- Coaching actions: **coach**, **prompt**, **nudge**, **flag**, **highlight**
- Library actions: **search transcripts**, **clip**, **bookmark**, **tag**, **annotate**
- CRM actions: **sync to CRM**, **push to HubSpot**, **log call**, **create task**
- Secondary actions: **re-process**, **rename speaker**, **merge recordings**, **trim**

### Sidebar Navigation Candidates

5-8 navigation items using domain vocabulary — not generic labels.

- **My Recordings** (meeting library — the primary view)
- **Live Copilot** (active session overlay/control panel)
- **Transcripts** (full-text search across all recordings)
- **Action Items** (extracted tasks across all meetings)
- **Coaching Insights** (per-session and trend coaching analytics)
- **Meeting Analytics** (aggregate stats, trends, talk time)
- **Integrations** (CRM sync, calendar, Slack)
- **Templates** (meeting types, summary formats, coaching profiles)

---

## Design Context — Visual Language of This Industry

### What "Premium" Looks Like in This Domain

AI meeting tools live at the intersection of productivity SaaS and AI tooling. The premium signal in this space comes from three design conventions practitioners have internalized:

First, the transcript panel is the hero. Every serious tool in this space puts the scrollable, speaker-labeled transcript front and center with timestamps on the left margin. Anything that buries or minimizes the transcript reads as a step-down product. The transcript is not a secondary feature — it is the primary artifact.

Second, the coaching/AI layer uses a distinct visual treatment — either a floating overlay panel, a persistent right rail, or inline suggestion chips within the transcript. The key is that AI suggestions are visually separate from the transcript itself. They feel like a second layer of intelligence sitting on top of the base record. Tools that merge these two layers confuse users. Tools that keep them separate (Gong's right-side coaching panel, Otter's summary sidebar) read as more sophisticated.

Third, color-coded speaker attribution is a baseline expectation. Every participant gets a unique color dot/stripe beside their transcript segments. Practitioners see this in every tool they use daily — if it's absent, the demo reads as unfinished. Status badges for recording states (Live, Processing, Ready) should use color semantically: red for live/recording, amber for processing, green for ready.

### Real-World Apps Clients Would Recognize as "Premium"

1. **Fathom** — Considered the cleanest UX in this space by individual users (not teams). Very light, minimal chrome, high-contrast text. The recording view has a video panel top-left, transcript right side with speaker labels, summary panel collapsible. Clean white/off-white backgrounds with a teal/purple accent. Beloved for its "get out of the way" design philosophy.

2. **Otter.ai** — The category-defining product. Light sidebar on left with recording list, main content area shows transcript with animated waveform during live recording. Purple as primary brand color. Channels and workspaces for teams. Users expect the familiar "live transcript streaming in real-time" pattern from Otter — it's the mental model for the category.

3. **Fireflies.ai** — Darker overall palette than Fathom, more feature-dense dashboard. Transcript view with colorized speaker blocks. Notable for its "AskFred" AI chat interface alongside transcripts. Users consider it powerful but slightly overwhelming. Represents the "power user" end of the spectrum.

4. **Gong** — Enterprise sales coaching standard. Not primarily a transcript tool — it's a revenue intelligence platform. But its call review view (timeline scrubber with topic markers, coaching moments flagged in the scrub bar, split transcript/video layout) is the reference for sales call copilot UX. If this demo is positioned toward sales teams, any patterns borrowed from Gong will read as premium.

### Aesthetic Validation

- **Job Analyst likely chose**: SaaS Modern or Dark Premium
- **Domain validation**: SaaS Modern is the right primary choice. This is a productivity B2B SaaS tool used by sales reps, recruiters, and managers during work hours on laptops. The dominant tools in this space (Otter, Fathom, tl;dv) are all light-mode, clean, moderate density. Dark Premium can work for the copilot/AI overlay panel specifically (as a visual metaphor for the AI layer sitting above normal work), but the main interface should be light/SaaS Modern. A mixed-mode approach (light base + dark coaching panel) is actually the most authentic pattern in this space.
- **One adjustment**: Lean into purple as the primary hue — it's the category color for AI tools in 2025 and Otter.ai (the category leader) uses purple. Violet-to-indigo range (`oklch(0.55 0.22 280-295)`) reads as "AI-native". Avoid generic blue which reads as generic SaaS.

### Density and Layout Expectations

**Standard density** is appropriate. This is not a dense ops tool (unlike logistics or DevOps monitoring). Users interact during meetings (occasional glance + click) and post-meeting (reviewing, editing, sharing). The transcript view itself is inherently text-dense but the overall layout should be airy.

The layout is **strongly list/table-oriented for the library view** (meeting list with date, duration, status, participants) and **split-panel for the individual recording view** (transcript left, summary/AI right). The dashboard/analytics view tends toward **card-based KPI stats + area/line charts for trends**.

---

## Entity Names (10+ realistic names)

### Companies / Organizations (clients or workspace names)

- Meridian Sales Group
- Northfield Recruiting Partners
- Vantage Point Consulting
- Cascade Revenue Team
- Brightline Advisory
- Summit Interview Prep
- Apex Growth Partners
- Clearwater Staffing
- Irongate Capital
- Riverview SDR Team
- Focal Point Coaching

### People Names (hosts, participants, speakers)

- Jordan Patel (Sales Rep / Host)
- Maya Chen (Account Executive)
- Devon Okafor (SDR)
- Priya Nair (Recruiter)
- Marcus Webb (Hiring Manager)
- Chloe Steinberg (Customer Success)
- Alex Romero (Prospect / Interviewee)
- Sam Whitfield (Team Lead)
- Kenji Tanaka (Product Manager)
- Tara Sullivan (VP Sales)

### Meeting Titles / Recording Names

- "Q4 Discovery Call — Meridian Sales Group"
- "Interview Loop: Senior Engineer (Round 2)"
- "Weekly 1:1 — Jordan & Sam"
- "Product Demo — Cascade Revenue Team"
- "Sales Negotiation — Brightline Q1 Renewal"
- "Mock Interview Session #4"
- "Outbound Discovery — Alex Romero"
- "Quarterly Business Review — Vantage Point"
- "Pitch Deck Walkthrough — Apex Growth"
- "Coaching Session — Talk Time Calibration"
- "Panel Interview — UX Designer Candidate"
- "Executive Check-in — Weekly Sync"

---

## Realistic Metric Ranges

| Metric | Low | Typical | High | Notes |
|--------|-----|---------|------|-------|
| Meeting duration | 8 min | 43 min | 87 min | 1:1s shorter, QBRs longer |
| Talk-to-listen ratio (sales rep) | 38% | 57% | 78% | Gong research: 43% ideal for discovery |
| Transcription accuracy (WER inverted) | 82% | 93% | 97% | Affected by audio quality, accent |
| Action items per meeting | 1 | 4.3 | 12 | Discovery calls generate more |
| Meetings per week (active user) | 3 | 8 | 18 | Executives average 12+/week |
| Hours transcribed per month | 6h | 28h | 94h | Heavy users = sales teams |
| Coaching score (0-100) | 42 | 71 | 89 | Composite: filler words, pace, ratio |
| Filler words per minute | 0.4 | 2.1 | 6.8 | "Um", "uh", "like", "you know" |
| Questions asked per sales call | 3 | 8 | 19 | Discovery: 15+ is expert level |
| Sentiment score | -0.3 | 0.42 | 0.91 | -1 to +1, prospect-side |
| Processing time post-call | 45 sec | 4 min | 18 min | Depends on length + queue |
| AI suggestions per session | 2 | 7 | 21 | More for sales/interview modes |

---

## Industry Terminology Glossary

| Term | Definition | Usage Context |
|------|-----------|---------------|
| WER (Word Error Rate) | % of words incorrectly transcribed; lower = better | Tech/accuracy settings, status indicators |
| Speaker Diarization | AI process of attributing transcript segments to individual speakers | Transcript view, speaker labeling |
| DER (Diarization Error Rate) | % of time a wrong speaker label is applied | Quality metrics, error states |
| Talk-to-Listen Ratio | % of call time a specific speaker was talking | Coaching panel, post-call analytics |
| Filler Word Count | Count of um/uh/like/you know per session | Coaching insights, speech quality |
| Monologue Alert | Live prompt triggered when one speaker talks 60+ seconds uninterrupted | Live copilot overlay |
| Action Item | AI-extracted task commitment from the conversation | Action Items page, summary |
| Key Moment | Timestamped transcript segment flagged as important | Bookmarks, highlight reel |
| Hot Topic | Recurring subject cluster detected across meetings | Transcript search, analytics |
| Discovery Call | First structured sales call to identify prospect needs/fit | Meeting type tag |
| Coaching Prompt | AI-generated suggestion shown live during a session | Copilot overlay |
| Transcript Search | Full-text search across all recorded transcripts | Transcripts page |
| Meeting Summary | AI-generated narrative recap of a session | Summary tab, post-meeting email |
| Engagement Score | Composite metric: sentiment + response cadence + participation balance | Analytics dashboard |
| Follow-up Draft | AI-generated post-meeting email with action items and recap | Post-meeting workflow |
| Clipping | Extracting a short timestamp segment from a recording to share | Sharing features |
| Bot-free Recording | Recording without adding a visible bot participant to the call | Privacy-sensitive settings |
| Real-time Transcription | Transcript that streams word-by-word during active recording | Live view |
| Batch Transcription | Processing pre-recorded audio files after the fact | Upload/import flow |
| Objection Signal | AI-detected moment when prospect expresses hesitation/resistance | Sales mode coaching |

---

## Common Workflows

### Workflow 1: Sales Discovery Call (Live Copilot Mode)

1. Rep opens copilot panel before joining Zoom/Meet call
2. Selects meeting type: "Sales — Discovery"
3. Joins call; transcription starts automatically via audio capture
4. Live transcript streams in left panel with speaker labels
5. Copilot panel shows real-time suggestions: "Ask about budget", "Prospect silent 30s — check in"
6. Talk-time monitor shows rep at 68% — copilot nudge: "Listen more"
7. Call ends; system begins post-processing (2-5 min)
8. Summary generated: key topics, pain points discovered, prospect questions asked
9. Action items extracted: follow-up demo scheduled, pricing deck to send
10. Follow-up email draft generated — rep reviews and sends
11. Notes pushed to HubSpot/Salesforce opportunity record

### Workflow 2: Interview Copilot Session

1. Candidate opens interview copilot in browser tab before call
2. Uploads resume + job description to context panel
3. Starts session; copilot listens via system audio
4. Interviewer asks question — transcription shows question in real-time
5. Copilot surfaces relevant talking points from resume + common answers
6. Candidate answers; copilot shows: "Mention the leadership example from your last role"
7. Response quality indicators: pacing, clarity, filler word count
8. Post-interview: full transcript with timestamps saved to library
9. Coaching report: strongest answers, improvement areas, filler word trends
10. Next session scheduled with focus areas flagged from this session

### Workflow 3: Post-Meeting Review and Share

1. Recording appears in library with status "Processing"
2. Status updates to "Ready" (4-8 minutes after call)
3. User opens recording — split view: video/audio top, transcript below
4. User scans AI summary on right panel — edits if needed
5. User bookmarks 2 key moments (timestamps)
6. Shares meeting recap with team via Slack integration
7. Action items pushed to project management tool (Notion, Asana)
8. Recording archived after 90 days (or per workspace retention policy)

---

## Common Edge Cases

1. **Poor audio quality** — Background noise, bad microphone, or poor internet causes transcription accuracy to drop to 70-80%. Status shows "Poor Audio" badge. Transcript has [inaudible] segments.
2. **Speaker mislabeling** — Diarization error: two speakers' voices merged, or a third person in the room picked up as a new speaker. User must manually re-assign speaker labels.
3. **Failed recording** — Permission denied for microphone, or browser tab closed before recording saved. Status: "Failed". No transcript available.
4. **Very short meeting** — Meeting under 2 minutes (e.g., quick scheduling check). System generates minimal summary, 0 action items. Edge case for empty states.
5. **Overdue action items** — Action items from 14+ days ago not marked complete. Should display warning indicator and due-date overdue label.
6. **High talk-time outlier** — Rep speaks 85%+ of the call. Copilot coaching score drops significantly. Red indicator in analytics.
7. **Processing queue backlog** — Multiple simultaneous recordings queued. Status "Processing" for 15+ minutes. User-facing message: "Transcription may take longer than usual."
8. **Accent/multilingual edge** — Non-native English speaker causes WER spike to 15-20%. Confidence score shown beside transcript segments.

---

## What Would Impress a Domain Expert

1. **Talk-to-listen ratio at the 43% threshold** — Gong's landmark research found 43% talk time is the ideal for discovery calls. Including a reference to this benchmark (e.g., "Expert range: 40-50%") signals deep industry knowledge. Most generic demos just show a generic number.

2. **Filler word tracking with specific categories** — Not just "filler words: 12". Breaking it down: "um: 4, uh: 3, like: 5" is what tools like Gong, Chorus, and Spiky actually display. This level of granularity signals real understanding of the space.

3. **Speaker diarization with color-coded segments** — Every serious tool in this space attributes each transcript line to a speaker with a unique color (not just a name label). If the demo's transcript view doesn't have speaker-specific color coding, it looks like it was built without using the actual product.

4. **Post-meeting email draft as a first-class feature** — Not just "export" or "share" — generating a draft follow-up email with action items inline is a marquee feature of tools like Fireflies and Fathom. Having it as a distinct UI state (not buried in a menu) signals product understanding.

5. **Meeting type templates** — Different meeting types produce different summary structures. A discovery call summary has "Pain Points Discovered", "Budget Signals", "Next Steps". A 1:1 has "Topics Covered", "Blockers", "Commitments". Showing that the system applies different AI templates by meeting type is a very specific, practitioner-level detail.

---

## Common Systems and Tools Used

| Tool | Usage in This Domain |
|---|---|
| Zoom / Google Meet | Primary meeting platforms; copilot integrates via audio capture or bot |
| HubSpot | CRM where call notes and action items are pushed post-meeting |
| Salesforce | Enterprise CRM; Gong/Chorus/Avoma all have native Salesforce integrations |
| Slack | Where meeting summaries and key moments are shared to channels |
| Notion / Confluence | Where meeting notes land for team knowledge bases |
| Calendly / Google Calendar | Source for scheduled meeting metadata |
| OpenAI Whisper | Common underlying transcription model (via API) |
| AssemblyAI | Third-party transcription API used by smaller copilot products |
| Deepgram | Low-latency transcription API used for real-time streaming transcription |
| Chrome (Web Speech API) | Browser-native transcription (lower accuracy, no cloud dependency) |

---

## Geographic / Cultural Considerations

No specific geographic constraints. This is a global B2B SaaS product. English transcription accuracy is the primary focus based on job context. If the product supports multiple languages, note that WER varies significantly by language — French and Spanish transcription accuracy with Whisper is typically within 2-3% of English, while accented English (Indian English, AAVE) can see 8-12% accuracy degradation on standard models.

Time zones are relevant for the meeting library (all timestamps should display in user's local timezone). Meeting duration in minutes (not hours) is the industry standard display format for sub-90-minute calls.

---

## Data Architect Notes

Specific instructions for the Data Architect based on this research:

- **Primary entities**: `Recording`, `Transcript`, `TranscriptSegment`, `Speaker`, `ActionItem`, `KeyMoment`, `CoachingInsight`
- **Meeting types**: use string union `"1:1" | "Sales Call" | "Presentation" | "Interview"` — these are the exact labels
- **Recording status**: `"Scheduled" | "Recording" | "Processing" | "Ready" | "Failed" | "Poor Audio" | "Archived"` — not generic active/inactive
- **Duration**: store in seconds, display as "43 min" not "0:43:00"
- **Talk ratio**: store as float 0-1 for host (e.g., 0.57 = host spoke 57% of the time)
- **Transcription accuracy**: store as float 0-1 (e.g., 0.947 = 94.7% WER inverted)
- **Action items**: must have `dueDate`, `assignee`, `status: "open" | "completed" | "overdue"`, `meetingId`
- **Coaching score**: integer 0-100, computed from talk ratio + filler word density + question count
- **Edge cases to include**: at least 2 "Failed" recordings, 1 "Poor Audio" recording, 3+ overdue action items, 1 very-short meeting (< 5 min), 1 high talk-ratio recording (> 80%)
- **Chart data**: 12-month series of `meetingsRecorded`, `hoursTranscribed`, `avgCoachingScore` per month
- **Speaker segments**: each TranscriptSegment needs `speakerId`, `startTime` (seconds), `endTime`, `text`, optional `isFlagged: boolean`
- **Names**: use the people names from the Entity Names section — Jordan Patel, Maya Chen, etc. — not "User 1"
- **Company names**: use workspace/company names from Entity Names section

## Layout Builder Notes

- **Recommended density**: Standard (not compact). Meeting library + transcript views have inherent density from text; the surrounding chrome should breathe.
- **Sidebar width**: Standard 16rem. Navigation labels are short enough (My Recordings, Transcripts, Action Items, Coaching) that 16rem is sufficient.
- **Primary color**: Purple-indigo range — `oklch(0.55 0.22 285)` approximately. This is the category-defining color (Otter.ai uses purple, AI tools broadly trend purple in 2025). Avoid blue.
- **Transcript panels**: Use a slightly tinted background for transcript segments, alternating by speaker, with a subtle left-border color strip per speaker. This is the industry-standard pattern and absence of it will flag the demo as generic.
- **Status badge colors**: Red for "Recording" / "Live", Amber for "Processing" / "Transcribing", Green for "Ready" / "Completed", Red-muted for "Failed", Gray for "Archived"
- **Coaching overlay**: If showing a live copilot panel, give it a slightly elevated visual treatment — subtle glow or stronger border — to distinguish it as the "AI layer" separate from the base transcript. Dark Premium tokens applied locally to this component (even if the overall aesthetic is SaaS Modern) is the authentic pattern.
- **No hard shadows**: This space uses flat or very subtle `shadow-sm` shadows, not dramatic card shadows.

## Dashboard Builder Notes

- **Most important metric (lead card)**: "Meetings Recorded" total count is the most common primary stat in this space, but for a copilot app, "Coaching Score" trend (showing improvement over time) is more compelling and differentiating. Consider leading with Coaching Score or Talk-to-Listen Ratio as the hero metric.
- **Primary chart type**: Area chart for "Hours Transcribed over 12 months" — shows compounding value. This is the standard trend visualization in this space.
- **Second chart**: Stacked bar for meeting types breakdown per month (1:1 vs Sales Calls vs Interviews) — shows usage breadth.
- **One domain-specific panel that would impress**: A "Recent Action Items" feed showing the last 5-8 action items with meeting source, assignee, due date, and status — this is the value delivery mechanism practitioners care about. Including this as a live-updating panel (click to mark complete) would read as deeply product-aware.
- **Coaching trend**: A simple sparkline or small line chart showing coaching score week-over-week (e.g., "Your coaching score: 71 — up 8 pts from last month") would be a strong secondary KPI card.
- **Talk ratio visualization**: A horizontal bar showing host vs. average participant talk percentage (similar to Gong's "Talk Ratio" card) is instantly recognizable to anyone who has used tools in this space.
