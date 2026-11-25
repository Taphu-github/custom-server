"use client";

// The detail pages: /how-it-works, /features and /about.
// Each page covers its own topic only and links to the others instead of repeating them.

import Image from "next/image";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { SiteShell, PageHero, CtaBand, MoreLink } from "./site";
import { STEPS_DETAIL, FEATURE_GROUPS, PARTNER_DETAILS, RELATED_PROJECTS, TEAM_GROUPS } from "./site-content";

/** "Mr. Karma Wangchuk" → "KW" (honorifics are skipped). */
function initials(name: string) {
  return name
    .replace(/^(Mr|Mrs|Ms|Miss|Dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/* ───────────── /how-it-works ───────────── */

export function HowItWorksPage() {
  return (
    <SiteShell
      hero={
        <PageHero
          crumb="How it works"
          eyebrow="How it works"
          title="From movement in the field to an alert on your phone"
          lead="Four steps, all within moments of an animal entering the farm."
        />
      }
    >
      <section className="wrap hw" style={{ paddingTop: 28, paddingBottom: 40 }}>
        <style
          dangerouslySetInnerHTML={{
            __html: `.dz .hw-grid { display:grid; grid-template-columns:minmax(0,1fr); gap:28px 40px; align-items:start; }
@media (min-width: 1000px) { .dz .hw-grid { grid-template-columns:minmax(0,1.25fr) minmax(0,1fr); } .dz .hw-left { position:sticky; top:96px; } .dz .hw .eyebrow { margin-bottom:6px; } }
.dz .hw-left .h2 { margin:0 0 6px; font-size:clamp(24px, 2.2vw, 30px); }
.dz .hw-left p.intro { margin:0 0 12px; color:var(--dz-muted); font-size:14.5px; line-height:1.5; }
.dz .arch-fig { margin:0; background:#fff; border:1px solid var(--dz-line); border-radius:20px; padding:clamp(8px, 1.5vw, 14px); box-shadow:0 12px 32px rgba(20,83,45,.10); }
.dz .arch-fig a { display:block; border-radius:12px; overflow:hidden; cursor:zoom-in; }
.dz .arch-fig figcaption { margin-top:8px; font-size:13px; color:var(--dz-muted); text-align:center; }
.dz .hw-steps { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
.dz .hw-step { display:grid; grid-template-columns:40px minmax(0,1fr); gap:12px; background:#fff; border:1px solid var(--dz-line); border-radius:14px; padding:10px 14px;
               transition:border-color .2s, box-shadow .2s; }
.dz .hw-step:hover { border-color:#86EFAC; box-shadow:0 8px 20px rgba(20,83,45,.08); }
.dz .hw-n { width:40px; height:40px; border-radius:12px; background:#14532D; color:#4ADE80; display:flex; align-items:center; justify-content:center;
            font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:18px; }
.dz .hw-step h3 { margin:0; font-size:17px; line-height:1.2; }
.dz .hw-step .lead2 { margin:1px 0 3px; font-weight:600; font-size:14px; color:var(--dz-brand-text); }
.dz .hw-step p.b { margin:0 0 2px; font-size:13.5px; line-height:1.45; color:var(--dz-muted); }`,
          }}
        />
        <div className="hw-grid">
          <div className="hw-left">
            <p className="eyebrow">System architecture</p>
            <h2 className="h2">How the parts connect</h2>
            <p className="intro">
              Cameras at the field edge feed the Dakzin unit, which drives the repellent system and
              sends each detection over the Internet to the Dakzin server. Farmers are notified on the
              mobile app, or by SMS and call when the Internet is down, while administrators manage
              everything from the dashboard.
            </p>
            <figure className="arch-fig">
              <a href="/pages/architecture.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the architecture diagram full size">
                <ArchitectureDiagram />
              </a>
              <figcaption>Click the diagram to open it full size</figcaption>
            </figure>
          </div>

          <div>
            <p className="eyebrow">Step by step</p>
            <ol className="hw-steps">
              {STEPS_DETAIL.map((s) => (
                <li className="hw-step" key={s.n}>
                  <span className="hw-n" aria-hidden="true">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p className="lead2">{s.lead}</p>
                    {s.body.map((para, i) => (
                      <p className="b" key={i}>{para}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 6 }}>
              <MoreLink href="/features">What else Dakzin does</MoreLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}

/* ───────────── /features ───────────── */

export function FeaturesPage() {
  return (
    <SiteShell
      hero={
        <PageHero
          crumb="Features"
          eyebrow="Features"
          title="More than an alarm"
          lead="Beyond detecting, alerting and repelling, Dakzin helps farmers and administrators make sense of every intrusion."
        />
      }
    >
      <section className="wrap block">
        {FEATURE_GROUPS.map((g) => (
          <div className="group" id={g.id} key={g.id}>
            <div>
              <h2>{g.title}</h2>
              <p className="intro">{g.intro}</p>
            </div>
            <div className="group-items">
              {g.items.map((it) => (
                <div className="group-item" key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <MoreLink href="/how-it-works">How detection, alerts and the repellent work</MoreLink>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}

/* Each team (newest first) gets its own colour scheme. */
const TEAM_THEMES = [
  { a: "#16A34A", soft: "#F0FDF4", ink: "#14532D", line: "#BBF7D0" }, // green
  { a: "#0D9488", soft: "#F0FDFA", ink: "#134E4A", line: "#99F6E4" }, // teal
  { a: "#2563EB", soft: "#EFF6FF", ink: "#1E3A8A", line: "#BFDBFE" }, // blue
  { a: "#D97706", soft: "#FFFBEB", ink: "#78350F", line: "#FDE68A" }, // amber
];
const TEAM_CSS = `
.dz .tm-group { margin-bottom:44px; padding:24px; border-radius:24px; background:var(--tm-soft); border:1px solid var(--tm-line); }
.dz .tm-head { display:flex; flex-wrap:wrap; align-items:center; gap:10px 14px; margin:0 0 20px; }
.dz .tm-head h3 { margin:0; font-size:22px; color:var(--tm-ink); }
.dz .tm-year { display:inline-block; padding:6px 14px; border-radius:999px; background:var(--tm-a); color:#fff; font-weight:700; font-size:15px; letter-spacing:.02em; }
.dz .tm-note { font-size:15px; font-style:italic; color:var(--tm-ink); opacity:.8; }
.dz .tm-card { position:relative; overflow:hidden; border-color:var(--tm-line); }
.dz .tm-card::before { content:""; position:absolute; left:0; right:0; top:0; height:5px; background:var(--tm-a); }
.dz .tm-card:hover { border-color:var(--tm-a); box-shadow:0 10px 26px rgba(0,0,0,.08); }
.dz .tm-card .avatar { background:var(--tm-soft); color:var(--tm-ink); box-shadow:0 0 0 3px #fff, 0 0 0 5px var(--tm-a); }
.dz .tm-card p { color:var(--tm-ink); opacity:.75; }
@media (max-width: 640px) { .dz .tm-group { padding:16px; } }
`;

/* ───────────── /about ───────────── */

export function AboutPage() {
  return (
    <SiteShell
      hero={
        <PageHero
          crumb="About"
          eyebrow="About us"
          title="Helping farmers and wildlife live side by side"
          lead="A smart agri-tech solution to human–wildlife conflict in Bhutan's farmland."
        />
      }
    >
      <section className="wrap block">
        <div className="about-top" style={{ marginBottom: 0 }}>
          <div>
            <p className="eyebrow">Our mission</p>
            <h2 className="h2">Protecting harvests without harming wildlife</h2>
          </div>
          <div>
            <p style={{ margin: "0 0 16px" }}>
              Crop raids by wild animals are a serious challenge for farmers in Bhutan. Dakzin brings
              Artificial Intelligence, the Internet of Things and computer vision to the field to give
              farmers an early warning and to repel animals humanely.
            </p>
            <MoreLink href="/milestones">How the project grew</MoreLink>
          </div>
        </div>
      </section>

      <section className="sand">
        <div className="wrap block">
          <p className="eyebrow">Partners</p>
          <h2 className="h2">Who makes Dakzin possible</h2>
          <div className="partners" style={{ marginBottom: 0 }}>
            {PARTNER_DETAILS.map((p) => (
              <div className="partner" key={p.name} style={{ background: "#fff" }}>
                {p.name}
                <span>{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap block">
        <p className="eyebrow">Our team</p>
        <h2 className="h2">The people behind Dakzin</h2>
        <style dangerouslySetInnerHTML={{ __html: TEAM_CSS }} />
        {TEAM_GROUPS.map((g, gi) => {
          const th = TEAM_THEMES[gi % TEAM_THEMES.length];
          const m = g.title.match(/^(.*?)\s*\(([^)]+)\)(.*)$/);
          const label = m ? m[1] : g.title;
          const years = m ? m[2] : "";
          const note = m ? m[3].replace(/^[:\s–-]+/, "") : "";
          return (
            <div key={g.title} className="tm-group" style={{ ["--tm-a" as string]: th.a, ["--tm-soft" as string]: th.soft, ["--tm-ink" as string]: th.ink, ["--tm-line" as string]: th.line }}>
              <div className="tm-head">
                {years && <span className="tm-year">{years}</span>}
                <h3>{label}</h3>
                {note && <span className="tm-note">{note}</span>}
              </div>
              <div className="team">
                {g.members.map((mem) => (
                  <div className="member tm-card" key={g.title + mem.name}>
                    <div className="avatar">
                      {mem.photo ? (
                        <Image src={mem.photo} alt={mem.name} width={192} height={192} unoptimized />
                      ) : (
                        <span aria-hidden="true">{initials(mem.name)}</span>
                      )}
                    </div>
                    <h3>{mem.name}</h3>
                    {mem.role && <p>{mem.role}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="sand">
        <div className="wrap block">
          <p className="eyebrow">Beyond Dakzin</p>
          <h2 className="h2" style={{ marginBottom: 16 }}>Other joint CST–AMTC projects</h2>
          <p style={{ margin: "0 0 24px", color: "var(--dz-muted)", maxWidth: "48rem" }}>
            The collaboration between CST/RUB and AMTC/DoA/MoAL creates climate-smart agri-tech
            solutions for sustainable food security in Bhutan.
          </p>
          <ul className="pill-list">
            {RELATED_PROJECTS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
