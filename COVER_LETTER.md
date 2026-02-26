Hi,

Your transcription dropping on Edge — and intermittently on Chrome — is almost always a Web Speech API lifecycle issue (the recognition object silently dying between silence gaps). I built a working version of this before reaching out: https://meeting-copilot-taupe.vercel.app

The demo shows live transcription with real-time AI response suggestions across 1:1 meetings, sales calls, and presentations — the three call types you named.

Previously built an AI pipeline that cut a 4-hour manual process to 20 minutes (WMF Agent Dashboard — Claude API + structured output).

Is your current transcription using the browser's native Web Speech API or a third-party like Deepgram/AssemblyAI? That determines whether this is a lifecycle fix or a provider swap.

10-minute call or I can send a 2-slide plan — your pick.

P.S. You asked for a Loom — happy to record a 60-second walkthrough once we connect.

Humam
