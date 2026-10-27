"use client";

// Home page ("/"): a scrolling overview. Each section links to its full page.

import Link from "next/link";
import Image from "next/image";
import AnimalRing from "./AnimalRing";
import HeroSummary from "./HeroSummary";
import { SiteShell, CtaBand, MoreLink } from "./site";
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

const HOME_HERO_CSS = `
.dz .home-banner { align-items:stretch; }
.dz .home-banner .ph-bg { object-position:center 45%; }
.dz .home-banner .ph-shade { background:linear-gradient(90deg, rgba(11,42,23,.93) 0%, rgba(20,83,45,.82) 40%, rgba(20,83,45,.45) 70%, rgba(20,83,45,.25) 100%); }
@media (max-width: 960px) { .dz .home-banner .ph-shade { background:linear-gradient(180deg, rgba(11,42,23,.6), rgba(11,42,23,.88)); } }
.dz .home-banner .hero { position:relative; z-index:1; width:100%; padding-bottom:clamp(40px, 5vw, 64px); }
.dz .home-banner .hero > div:first-child { color:#fff; --dz-on-dark:#fff; --dz-on-dark-muted:#DCFCE7; --dz-highlight:#4ADE80; }
.dz .home-banner .hero h1 { color:#fff; text-shadow:0 2px 12px rgba(0,0,0,.25); }
.dz .home-banner .hero p.lead { color:#E7F8EC; }
`;

function HomeHero() {
  return (
    <section className="ph-banner home-banner">
      <style dangerouslySetInnerHTML={{ __html: HOME_HERO_CSS }} />
      {/* Background photo: the Dakzin system installed at the Zurphi pilot site */}
      <Image className="ph-bg" src="/pages/home-station.jpg" alt="The Dakzin system installed at the pilot site in Zurphi, Trong, Zhemgang" fill unoptimized priority sizes="100vw" />
      <div className="ph-shade" aria-hidden="true" />
      <div className="wrap hero">
        <div>
          <p className="eyebrow">AI-powered virtual fence</p>
          <h1>Know the moment wildlife enters your field.</h1>
          <p className="lead" style={{ fontSize: 17, lineHeight: 1.6 }}>
            DakzinAI is a locally developed, field-tested AI-powered Animal Intrusion Detection &amp;
            Intervention System designed to mitigate human-wildlife conflict (HWC) and promote
            human-wildlife coexistence in Bhutan. It is a smart &ldquo;virtual fence&rdquo; leveraging AI,
            computer vision and IoT technologies. The successful pilot demonstrates strong potential as a
            low-cost, scalable, community-based alternative or complement to chain-link and electric
            fencing.
          </p>
          <HeroSummary />
        </div>

        <div>
          <AnimalRing />
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
