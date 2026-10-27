"use client";

// /milestones — the project timeline and where the system is piloted.
// Partners and team live on /about; the system itself on /how-it-works.

import { SiteShell, PageHero, CtaBand, MoreLink } from "./site";
import { MILESTONE_CARDS as MILESTONES, PILOT_SITE_DETAILS as PILOT_SITES } from "./journey-content";

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
.dz .road-card { background:#fff; border:1px solid var(--dz-line); border-radius:16px; overflow:hidden; display:flex; flex-direction:column;
                 transition:transform .25s, box-shadow .25s, border-color .25s; }
.dz .road-card:hover { transform:translateY(-3px); box-shadow:0 14px 32px rgba(20,83,45,.12); border-color:#86EFAC; }
.dz .road-pic { aspect-ratio:16/10; background-size:cover; background-position:center; background-color:#14532D; }
.dz .road-ill { aspect-ratio:16/10; overflow:hidden; display:flex; align-items:center; justify-content:center; padding:14px; color:#14532D;
                background:radial-gradient(circle at 30% 30%, #BBF7D0, #DCFCE7 45%, #F0FDF4); }
.dz .road-ill img { display:block; max-width:88%; max-height:100%; border-radius:10px; border:5px solid #fff; box-shadow:0 10px 24px rgba(20,83,45,.25); transform:rotate(-2deg); }
.dz .idea-art { display:block; width:100%; max-width:300px; max-height:100%; height:auto; min-height:0; overflow:visible; filter:drop-shadow(0 10px 18px rgba(20,83,45,.25)); }
.dz .idea-scanline { animation:idea-scan 3s ease-in-out infinite alternate; }
.dz .idea-rec { animation:idea-blink 1.2s steps(2) infinite; }
@keyframes idea-scan { from { transform:translateY(14px); } to { transform:translateY(106px); } }
@keyframes idea-blink { 50% { opacity:.2; } }
.dz .road-body { padding:20px 22px 22px; }
.dz .road-points { list-style:none; margin:14px 0 0; padding:14px 0 0; border-top:1px solid var(--dz-line); display:flex; flex-direction:column; gap:10px; }
.dz .road-points li { position:relative; padding-left:16px; font-size:15px; line-height:1.4; color:var(--dz-ink); }
.dz .road-points li::before { content:""; position:absolute; left:0; top:7px; width:7px; height:7px; border-radius:50%; background:#16A34A; }
.dz .road-points b { display:block; font-size:13px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; color:var(--dz-brand-text); }
.dz .road-when { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:24px; line-height:1; color:var(--dz-brand-text); }
.dz .road-tag { display:inline-block; margin-left:10px; vertical-align:middle; font-size:13px; font-weight:600; padding:3px 10px; border-radius:999px; background:var(--dz-brand-soft); color:#14532D; }
.dz .road-item.now .road-tag { background:#BBF7D0; }
.dz .road-card h3 { margin:10px 0 6px; font-size:21px; }
.dz .road-card p { margin:0; color:var(--dz-muted); font-size:15px; line-height:1.5; }
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

/** Card 1 illustration: the idea, an AI camera spotting a wild boar in the field. */
function IdeaArt() {
  return (
    <svg className="idea-art" viewBox="0 0 240 150" role="img" aria-label="Illustration: an AI camera detecting a wild boar in a field">
      <defs>
        <clipPath id="idea-scr"><rect x="20" y="14" width="200" height="122" rx="14" /></clipPath>
        <linearGradient id="idea-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0B2A17" /><stop offset="1" stopColor="#14532D" /></linearGradient>
        <linearGradient id="idea-scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ADE80" stopOpacity="0" /><stop offset="1" stopColor="#4ADE80" stopOpacity=".45" /></linearGradient>
      </defs>
      <rect x="20" y="14" width="200" height="122" rx="14" fill="url(#idea-sky)" />
      <g clipPath="url(#idea-scr)">
        <circle cx="186" cy="40" r="9" fill="#F0FDF4" opacity=".9" />
        <path d="M20 104 L62 70 L92 92 L128 60 L170 96 L198 78 L220 92 V136 H20Z" fill="#166534" />
        <path d="M20 118 Q80 100 130 112 T220 108 V136 H20Z" fill="#15803D" />
        <g fill="#BBF7D0">
          <ellipse cx="128" cy="106" rx="24" ry="12" />
          <path d="M106 98 L90 104 Q86 106 88 109 L92 111 L106 112Z" />
          <path d="M104 97 L100 90 L108 95Z" />
          <rect x="110" y="112" width="4" height="10" rx="1.5" />
          <rect x="118" y="113" width="4" height="9" rx="1.5" />
          <rect x="134" y="113" width="4" height="9" rx="1.5" />
          <rect x="142" y="112" width="4" height="10" rx="1.5" />
        </g>
        <path d="M152 102 q6 -2 5 4" stroke="#BBF7D0" strokeWidth="1.6" fill="none" />
        <path d="M93 107 q-3 -3 -1 -6" stroke="#F0FDF4" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="99" cy="101" r="1.3" fill="#0B2A17" />
        <g stroke="#4ADE80" strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M82 92 v-8 h10" /><path d="M152 84 h10 v8" /><path d="M82 118 v8 h10" /><path d="M162 118 v8 h-10" />
        </g>
        <rect x="82" y="72" width="54" height="11" rx="3" fill="#4ADE80" />
        <text x="86" y="80.5" fontFamily="Arial, sans-serif" fontSize="7.5" fontWeight="700" fill="#0B2A17">Wild boar</text>
        <g className="idea-scanline">
          <rect x="20" y="0" width="200" height="30" fill="url(#idea-scan)" />
          <path d="M20 30 H220" stroke="#4ADE80" strokeWidth="1.2" />
        </g>
        <circle className="idea-rec" cx="34" cy="28" r="3.2" fill="#EF4444" />
        <text x="41" y="31" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700" fill="#F0FDF4">AI · LIVE</text>
      </g>
      <g transform="translate(208 18)">
        <circle r="14" fill="#FDE047" />
        <path d="M-4 5 h8 M-3 8 h6" stroke="#14532D" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M0 -8 a6 6 0 0 0 -3.5 10.8 v1.6 h7 v-1.6 A6 6 0 0 0 0 -8z" fill="none" stroke="#14532D" strokeWidth="1.8" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

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
          title="The DakzinAI journey, from idea to field pilot"
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
                {m.image ? (
                  <div className="road-pic" style={{ backgroundImage: `url(${m.image})` }} role="img" aria-label={m.title} />
                ) : m.inset ? (
                  <div className="road-ill">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.inset} alt={m.title} />
                  </div>
                ) : (
                  <div className="road-ill">
                    <IdeaArt />
                  </div>
                )}
                <div className="road-body">
                  <div>
                    <span className="road-when">{m.when}</span>
                    <span className="road-tag">{m.tag}</span>
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                  <ul className="road-points">
                    {m.points.map((pt) => (
                      <li key={pt.date + pt.text}>
                        <b>{pt.date}</b>
                        {pt.text}
                      </li>
                    ))}
                  </ul>
                </div>
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
