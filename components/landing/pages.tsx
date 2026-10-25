"use client";

// The detail pages: /how-it-works, /features, /faq and /about.
// Each page covers its own topic only and links to the others instead of repeating them.

import Image from "next/image";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { SiteShell, PageHero, CtaBand, MoreLink, FaqList } from "./site";
import { STEPS_DETAIL, FEATURE_GROUPS, FAQ_GROUPS, PARTNER_DETAILS, RELATED_PROJECTS, TEAM_GROUPS } from "./site-content";

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
      <section className="wrap block" style={{ paddingBottom: 0 }}>
        <p className="eyebrow">System architecture</p>
        <h2 className="h2" style={{ marginBottom: 12 }}>How the parts connect</h2>
        <p style={{ margin: "0 0 24px", color: "var(--dz-muted)", maxWidth: "48rem" }}>
          Cameras at the field edge feed the Dakzin unit, which drives the repellent system and
          sends each detection over the Internet to the Dakzin server.
          Farmers are notified on the mobile app, or by SMS and call when the Internet is down,
          while administrators manage everything from the dashboard.
        </p>
        <figure className="arch-fig">
          <a href="/pages/architecture.jpg" target="_blank" rel="noopener noreferrer" aria-label="Open the architecture diagram full size" style={{ cursor: "zoom-in" }}>
            <ArchitectureDiagram />
          </a>
          <figcaption>Dakzin system architecture overview · click to open full size</figcaption>
        </figure>
        <style
          dangerouslySetInnerHTML={{
            __html: `.dz .step:first-of-type { border-top:0; padding-top:8px; }
.dz .arch-fig { margin:0; max-width:1060px; background:#fff; border:1px solid var(--dz-line); border-radius:20px; padding:clamp(10px, 2vw, 20px); box-shadow:0 12px 32px rgba(20,83,45,.10); }
.dz .arch-fig a { display:block; border-radius:12px; overflow:hidden; cursor:zoom-in; }
.dz .arch-fig figcaption { margin-top:10px; font-size:14px; color:var(--dz-muted); text-align:center; }`,
          }}
        />
      </section>

      <section className="wrap block">
        <p className="eyebrow">Step by step</p>
        {STEPS_DETAIL.map((s) => (
          <article className="step" key={s.n}>
            <div className="num">{s.n}</div>
            <div>
              <h2>{s.title}</h2>
              <p className="lead2">{s.lead}</p>
              {s.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>
        ))}
        <div style={{ marginTop: 16 }}>
          <MoreLink href="/features">What else Dakzin does</MoreLink>
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

/* ───────────── /faq ───────────── */

export function FaqPage() {
  return (
    <SiteShell
      hero={
        <PageHero
          crumb="FAQ"
          eyebrow="FAQ"
          title="Frequently asked questions"
          lead="Looking for how the system works, who built it or where it is used? See How it works, About and Project milestones."
        >
          <div className="jump">
            {FAQ_GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`}>{g.title}</a>
            ))}
          </div>
        </PageHero>
      }
    >
      <section className="wrap narrow block">
        {FAQ_GROUPS.map((g, gi) => (
          <div className="faq-group" id={g.id} key={g.id}>
            <h2>{g.title}</h2>
            <FaqList items={g.items} idPrefix={`faq-${g.id}`} firstOpen={gi === 0} />
          </div>
        ))}
      </section>

      <CtaBand title="Still have a question?" text="Get in touch with the Dakzin team." />
    </SiteShell>
  );
}

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
        {TEAM_GROUPS.map((g) => (
          <div key={g.title} style={{ marginBottom: 40 }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 22 }}>{g.title}</h3>
            <div className="team">
              {g.members.map((m) => (
                <div className="member" key={g.title + m.name}>
                  <div className="avatar">
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} width={192} height={192} unoptimized />
                    ) : (
                      <span aria-hidden="true">{initials(m.name)}</span>
                    )}
                  </div>
                  <h3>{m.name}</h3>
                  {m.role && <p>{m.role}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
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
