import { ExternalLink, TrendingUp } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";
import { HoverLink } from "@/components/proposal/hover-link";

const heroStats = [
  { value: "24+", label: "Projects Shipped" },
  { value: "< 48hr", label: "Demo Turnaround" },
  { value: "15+", label: "Industries" },
];

export default function ProposalPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">

      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden"
        style={{ background: "oklch(0.06 0.02 var(--primary-h, 220))" }}
      >
        {/* Radial highlight — subtle cyan bloom at top */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 40% at 50% 0%, oklch(0.72 0.19 220 / 0.12), transparent 70%)",
          }}
        />

        <div className="relative z-10 px-8 pt-10 pb-8 md:px-12 md:pt-12">
          {/* Effort badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-medium border text-white/70 px-3 py-1 rounded-full mb-6"
            style={{
              background: "oklch(1 0 0 / 0.06)",
              borderColor: "oklch(1 0 0 / 0.10)",
            }}
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            Built this demo for your project
          </span>

          {/* Role prefix */}
          <p className="font-mono text-xs tracking-widest uppercase text-white/40 mb-4">
            Full-Stack Developer · AI & Real-Time Applications
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl tracking-tight leading-none mb-5">
            <span className="font-light text-white/70">Hi, I&apos;m</span>{" "}
            <span className="font-black text-white">{profile.name}</span>
          </h1>

          {/* Value prop — tailored to this job */}
          <p
            className="text-lg md:text-xl leading-relaxed mb-2 max-w-2xl"
            style={{ color: "oklch(0.78 0 0)" }}
          >
            I build AI meeting tools with real transcription pipelines and live
            coaching engines — and I&apos;ve already built one for your review
            in Tab 1.
          </p>
          <p
            className="text-sm leading-relaxed max-w-2xl"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            {profile.bio}
          </p>
        </div>

        {/* Stats shelf */}
        <div
          className="relative z-10 px-8 md:px-12 py-5"
          style={{
            borderTop: "1px solid oklch(1 0 0 / 0.08)",
            background: "oklch(1 0 0 / 0.03)",
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "oklch(0.55 0 0)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work ─────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Proof of Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Relevant Projects
          </h2>
        </div>

        <div className="grid gap-4">
          {portfolioProjects.map((project) => (
            <div key={project.id} className="aesthetic-card p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">
                  {project.title}
                </h3>
                {project.liveUrl && (
                  <HoverLink
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                    defaultColor="var(--muted-foreground)"
                    hoverColor="var(--primary)"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </HoverLink>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Outcome */}
              {project.outcome && (
                <div className="flex items-start gap-2 text-sm">
                  <TrendingUp
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--success)" }}
                  />
                  <span style={{ color: "var(--success)" }}>
                    {project.outcome}
                  </span>
                </div>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono"
                    style={{
                      background: "color-mix(in oklch, var(--primary) 10%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Relevance note */}
              {project.relevance && (
                <p
                  className="text-xs italic"
                  style={{
                    color: "color-mix(in oklch, var(--primary) 70%, transparent)",
                  }}
                >
                  {project.relevance}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work ─────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Process
          </p>
          <h2 className="text-2xl font-bold tracking-tight">How I Work</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profile.approach.map((step, i) => (
            <div key={step.title} className="aesthetic-card p-5 space-y-2">
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: "var(--primary)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: Skills ─────────────────────────────────── */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Tech Stack
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            What I Build With
          </h2>
        </div>

        <div className="space-y-3">
          {profile.skillCategories.map((category) => (
            <div key={category.name} className="aesthetic-card p-4 space-y-2">
              <p
                className="text-xs font-mono tracking-wider uppercase"
                style={{ color: "var(--muted-foreground)" }}
              >
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-sm font-mono"
                    style={{
                      border: "1px solid color-mix(in oklch, var(--border), transparent 20%)",
                      background: "var(--muted)",
                      color: "var(--foreground)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA ───────────────────────────────────── */}
      <section
        className="relative rounded-2xl overflow-hidden text-center"
        style={{ background: "oklch(0.06 0.02 var(--primary-h, 220))" }}
      >
        {/* Glow from below — dark premium signature */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 100%, oklch(0.72 0.19 220 / 0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10 px-8 py-12 md:px-12 space-y-5">
          {/* Pulsing availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span
              className="text-sm"
              style={{
                color: "color-mix(in oklch, var(--success) 80%, white)",
              }}
            >
              Currently available for new projects
            </span>
          </div>

          {/* CTA headline — specific to this project */}
          <h2 className="text-2xl font-bold text-white">
            Ready to fix the transcription bugs and ship the AI coaching layer.
          </h2>

          {/* CTA body — references the demo */}
          <p
            className="max-w-lg mx-auto leading-relaxed text-sm"
            style={{ color: "oklch(0.60 0 0)" }}
          >
            I built this demo to show you what the product could feel like —
            live transcription, real-time coaching prompts, meeting-type
            detection. The production version for {APP_CONFIG.projectName}{" "}
            starts with fixing the foundation and builds from there.
          </p>

          {/* Primary action — text, not a dead-end button */}
          <p className="text-lg font-semibold text-white pt-2">
            Reply on Upwork to start
          </p>

          {/* Back to demo link */}
          <HoverLink
            href="/"
            className="inline-flex items-center gap-1 text-sm"
            defaultColor="oklch(0.42 0 0)"
            hoverColor="oklch(0.62 0 0)"
          >
            ← Back to the demo
          </HoverLink>

          {/* Signature */}
          <p
            className="text-sm"
            style={{
              color: "oklch(0.35 0 0)",
              borderTop: "1px solid oklch(1 0 0 / 0.08)",
              paddingTop: "1rem",
              marginTop: "0.5rem",
            }}
          >
            — Humam
          </p>
        </div>
      </section>
    </div>
  );
}
