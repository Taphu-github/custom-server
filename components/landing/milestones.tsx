"use client";

// /milestones — the project timeline and where the system is piloted.
// Partners and team live on /about; the system itself on /how-it-works.

import { SiteShell, PageHero, CtaBand, MoreLink } from "./site";
import { MILESTONES, PILOT_SITES } from "./site-content";

const CSS = `
/* roadmap */
.dz .road { position:relative; display:grid; grid-template-columns:minmax(0,1fr); gap:0; list-style:none; margin:0; padding:0; }
.dz .road-item { position:relative; display:grid; grid-template-columns:48px minmax(0,1fr); gap:20px; padding-bottom:40px; }
.dz .road-item:last-child { padding-bottom:0; }
.dz .road-item::before { content:""; position:absolute; left:23px; top:48px; bottom:0; width:3px; background:#BBF7D0; }
.dz .road-item:last-child::before { display:none; }
.dz .road-dot { width:48px; height:48px; border-radius:50%; background:var(--dz-brand-text); color:#fff; display:flex; align-items:center; justify-content:center;
                font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:18px; position:relative; z-index:1; box-shadow:0 0 0 6px var(--dz-bg); }
.dz .road-item.now .road-dot { background:var(--dz-primary); color:var(--dz-primary-fg); box-shadow:0 0 0 6px var(--dz-bg), 0 0 0 9px #86EFAC; }
.dz .road-card { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:24px; }
.dz .road-when { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:28px; line-height:1; color:var(--dz-brand-text); }
.dz .road-tag { display:inline-block; margin-left:10px; vertical-align:middle; font-size:13px; font-weight:600; padding:3px 10px; border-radius:999px; background:var(--dz-brand-soft); color:#14532D; }
.dz .road-item.now .road-tag { background:#BBF7D0; }
.dz .road-card h3 { margin:10px 0 8px; font-size:22px; }
.dz .road-card p { margin:0; color:var(--dz-muted); font-size:16px; }
@media (min-width: 1000px) {
  .dz .road { grid-template-columns:repeat(4, minmax(0,1fr)); gap:24px; }
  .dz .road-item { grid-template-columns:minmax(0,1fr); grid-template-rows:auto 1fr; gap:24px; padding-bottom:0; }
  .dz .road-item::before { left:48px; right:-24px; top:23px; bottom:auto; width:auto; height:3px; }
  .dz .road-card { height:100%; }
}

/* pilot sites */
.dz .sites { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; max-width:720px; }
.dz .site-node { background:#fff; border:2px solid var(--dz-brand-text); border-radius:16px; padding:20px; display:flex; align-items:center; gap:14px; }
.dz .site-node b { display:block; font-family:'Bricolage Grotesque',sans-serif; font-size:26px; line-height:1.1; }
.dz .site-node span { color:var(--dz-muted); font-size:16px; }
`;

function PinIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function MilestonesPage() {
  return (
    <SiteShell
      hero={
        <PageHero
          crumb="Project milestones"
          eyebrow="Project milestones"
          title="The Dakzin journey, from idea to field pilot"
          lead="How a student project at the College of Science and Technology became a funded, field-tested system."
        />
      }
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="wrap block">
        <p className="eyebrow">Timeline</p>
        <h2 className="h2">Milestones so far</h2>
        <ol className="road">
          {MILESTONES.map((m, i) => (
            <li className={`road-item${i === MILESTONES.length - 1 ? " now" : ""}`} key={m.id}>
              <div className="road-dot">{i + 1}</div>
              <div className="road-card">
                <div>
                  <span className="road-when">{m.when}</span>
                  <span className="road-tag">{m.tag}</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="sand">
        <div className="wrap block">
          <p className="eyebrow">Pilot sites</p>
          <h2 className="h2" style={{ marginBottom: 16 }}>Where Dakzin is running today</h2>
          <p style={{ margin: "0 0 32px", color: "var(--dz-muted)", maxWidth: "44rem" }}>
            Both sites were chosen through a feasibility study and stakeholder consultations.
          </p>
          <div className="sites">
            {PILOT_SITES.map((s) => (
              <div className="site-node" key={s.place}>
                <PinIcon />
                <div>
                  <b>{s.place}</b>
                  <span>{s.dzongkhag} Dzongkhag</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <MoreLink href="/about">Partners and team</MoreLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
