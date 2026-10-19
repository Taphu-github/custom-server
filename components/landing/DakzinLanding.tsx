"use client";

// Home page ("/"): a scrolling overview. Each section links to its full page.

import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import { SiteShell, CtaBand, MoreLink, BellIcon } from "./site";
import { STEPS, FEATURES } from "./site-content";
import { NEWS_ITEMS } from "./news-content";

// Headlines only — the full stories live on /news.
const LATEST_NEWS = NEWS_ITEMS.slice(0, 3);

const NEWS_CSS = `
.dz .hn { list-style:none; margin:0; padding:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:20px; }
.dz .hn a { display:flex; flex-direction:column; gap:10px; height:100%; background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:22px 24px;
            transition:border-color .15s, box-shadow .15s, transform .15s; }
.dz .hn a:hover { border-color:#86EFAC; box-shadow:0 8px 24px rgba(20,83,45,.10); transform:translateY(-2px); }
.dz .hn .meta { display:flex; flex-wrap:wrap; align-items:center; gap:6px 12px; font-size:14px; color:var(--dz-muted); }
.dz .hn .tag { font-size:13px; font-weight:600; padding:3px 10px; border-radius:999px; background:var(--dz-brand-soft); color:#14532D; }
.dz .hn h3 { margin:0; font-size:20px; line-height:1.3; }
.dz .hn .place { margin-top:auto; font-size:15px; color:var(--dz-muted); }
.dz .hn .go { font-weight:600; color:var(--dz-brand-text); font-size:15px; }
`;

function HomeHero() {
  return (
    <section className="wrap hero">
      <div>
        <p className="eyebrow">Enabling human–wildlife coexistence in Bhutan</p>
        <h1>Know the moment wildlife enters your field.</h1>
        <p className="lead">
          Dakzin is an AI-powered animal intrusion detection system. It spots wild animals
          entering your field, alerts you in real time and drives them away without harm.
        </p>
      </div>

      <div>
        <div className="mock">
          <div className="feed">
            <HeroCarousel />
            <div className="bbox-label" style={{ zIndex: 2 }}>Animal detected</div>
          </div>
          <div className="alert">
            <BellIcon />
            <div>
              <strong>Alert sent to farm owner</strong>
              <br />
              <span style={{ color: "var(--dz-on-dark-muted)" }}>Mobile app notification · just now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DakzinLanding() {
  return (
    <SiteShell hero={<HomeHero />}>
      {/* ───── How it works ───── */}
      <section id="how" className="wrap block">
        <p className="eyebrow">How it works</p>
        <div className="section-head">
          <h2 className="h2" style={{ maxWidth: "40rem" }}>Detect, alert, repel</h2>
          <MoreLink href="/how-it-works">Full walkthrough</MoreLink>
        </div>
        <div className="cards">
          {STEPS.map((s) => (
            <div className="card" key={s.n}>
              <div className="num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Features ───── */}
      <section id="features" className="sand">
        <div className="wrap block">
          <p className="eyebrow">Features</p>
          <div className="section-head">
            <h2 className="h2">More than an alarm</h2>
            <MoreLink href="/features">All features</MoreLink>
          </div>
          <div className="features">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Latest news ───── */}
      <section id="news" className="wrap block">
        <style dangerouslySetInnerHTML={{ __html: NEWS_CSS }} />
        <p className="eyebrow">Latest news</p>
        <div className="section-head">
          <h2 className="h2">From the field and beyond</h2>
          <MoreLink href="/news">All news</MoreLink>
        </div>
        <ul className="hn">
          {LATEST_NEWS.map((n) => (
            <li key={n.id}>
              <Link href={`/news#${n.id}`}>
                <span className="meta">
                  <span className="tag">{n.category}</span>
                  <time>{n.date}</time>
                </span>
                <h3>{n.title}</h3>
                <span className="place">{n.place}</span>
                <span className="go">Read story →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── About ───── */}
      <section id="about" className="sand">
        <div className="wrap block">
          <div className="about-top" style={{ marginBottom: 0 }}>
            <div>
              <p className="eyebrow">About us</p>
              <h2 className="h2">Who we are</h2>
            </div>
            <div>
              <p style={{ margin: "0 0 16px" }}>
                Dakzin is developed by the IT Department of the College of Science and Technology,
                Royal University of Bhutan, together with AMTC Paro and the Department of Agriculture.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0 32px" }}>
                <MoreLink href="/about">Partners and team</MoreLink>
                <MoreLink href="/milestones">Project milestones</MoreLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
