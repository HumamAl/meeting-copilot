import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline:
    "Full-stack developer specializing in AI-powered real-time applications — from live transcription pipelines to intelligent meeting assistants.",
  bio: "I build AI-integrated web apps that solve real problems — meeting intelligence tools, document processing pipelines, and data dashboards. My approach: understand the architecture, build something that works, ship it fast.",
  approach: [
    {
      title: "Audit the Existing Codebase",
      description:
        "Start with the transcription module — reproduce the Edge/Chrome bugs, map the audio pipeline architecture, and identify exactly where the browser compatibility breaks down.",
    },
    {
      title: "Fix the Foundation",
      description:
        "Resolve browser compatibility issues first. Implement fallback transcription providers so the app works reliably across Chrome, Edge, Firefox, and Safari — not just one engine.",
    },
    {
      title: "Build the AI Layer",
      description:
        "Add the coaching engine — context-aware prompts, meeting-type detection, and real-time suggestion delivery timed to the conversation, not delivered after the fact.",
    },
    {
      title: "Ship & Monitor",
      description:
        "Deploy with structured logging for transcription accuracy, suggestion usage rates, and per-browser error tracking — so you can see exactly how it performs in production.",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Web Speech API",
        "WebSocket",
      ],
    },
    {
      name: "AI & NLP",
      skills: [
        "Claude API",
        "OpenAI API",
        "Prompt Engineering",
        "Speech-to-Text",
        "Real-time Streaming",
      ],
    },
    {
      name: "Backend",
      skills: [
        "Python",
        "Node.js",
        "REST APIs",
        "WebSocket Servers",
        "Audio Processing",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "WMF Agent Dashboard",
    description:
      "AI-powered email classification and structured data extraction for a manufacturing client. Built an automated pipeline that ingests emails, classifies intent, extracts structured fields with confidence scoring, and routes to a human-in-the-loop approval workflow.",
    outcome:
      "Replaced a 4-hour manual quote review process with a 20-minute structured extraction and approval flow",
    tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
    liveUrl: "https://wmf-agent-dashboard.vercel.app",
    relevance:
      "Real production AI pipeline — same prompt engineering and structured output patterns apply to your coaching engine.",
  },
  {
    id: "medrecord-ai",
    title: "MedRecord AI",
    description:
      "AI document processing pipeline that extracts key clinical data, diagnoses, medications, and treatment timelines from unstructured patient records. Handles variable document formats and produces a consistent structured output.",
    outcome:
      "Document processing pipeline that extracts structured clinical data and generates a readable timeline summary",
    tech: ["Next.js", "TypeScript", "AI extraction pipeline"],
    liveUrl: "https://medrecord-ai-delta.vercel.app",
    relevance:
      "Unstructured text in, structured insight out — exactly the transformation your transcription-to-coaching pipeline needs.",
  },
  {
    id: "data-intelligence",
    title: "Data Intelligence Platform",
    description:
      "Multi-source analytics dashboard with real-time data aggregation, interactive chart components, and filterable insights across multiple dimensions. Built with Next.js App Router and Recharts.",
    outcome:
      "Unified analytics dashboard pulling data from multiple sources with interactive charts and filterable insights",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    liveUrl: "https://data-intelligence-platform-sandy.vercel.app",
    relevance:
      "Meeting analytics, accuracy trends, and coaching metrics all live here — same dashboard architecture applied to your domain.",
  },
];
