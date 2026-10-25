"use client";

// /news — DakzinAI project news & updates. Stories are edited in ./news-content.ts.
// Layout: the latest story is featured at the top; the rest are grouped by year on a timeline.

import { useEffect, useState } from "react";
import { SiteShell, PageHero, CtaBand, MoreLink } from "./site";
import { NEWS_INTRO, NEWS_ITEMS, NEWS_CATEGORIES, type NewsCategory, type NewsItem } from "./news-content";

const CSS = `
/* filter */
.dz .nf-filter { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
.dz .nf-filter button { min-height:40px; display:inline-flex; align-items:center; gap:8px; border:1.5px solid var(--dz-dark-line-strong); background:none;
                        color:var(--dz-on-dark); border-radius:999px; padding:6px 16px; font:inherit; font-size:15px; font-weight:600; cursor:pointer; }
.dz .nf-filter button:hover { border-color:var(--dz-highlight); }
.dz .nf-filter button[aria-pressed="true"] { background:var(--dz-primary); border-color:var(--dz-primary); color:var(--dz-primary-fg); }
.dz .nf-filter .count { font-size:13px; opacity:.8; }

/* shared story parts */
.dz .ns-meta { display:flex; flex-wrap:wrap; align-items:center; gap:6px 14px; font-size:14px; color:var(--dz-muted); }
.dz .ns-tag { font-size:13px; font-weight:600; padding:3px 10px; border-radius:999px; background:var(--dz-brand-soft); color:#14532D; }
.dz .ns-place { display:inline-flex; align-items:center; gap:5px; }
.dz .ns-lead { margin:0; color:var(--dz-ink); }
.dz .ns-body p { margin:0 0 12px; color:var(--dz-muted); }
.dz .ns-body p:last-child { margin-bottom:0; }
.dz .ns-facts { margin:0; display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1px; background:var(--dz-line);
                border:1px solid var(--dz-line); border-radius:12px; overflow:hidden; }
.dz .ns-facts div { background:var(--dz-alt); padding:12px 14px; }
.dz .ns-facts dt { font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--dz-brand-text); margin:0 0 2px; }
.dz .ns-facts dd { margin:0; font-size:15px; font-weight:600; color:var(--dz-ink); line-height:1.4; }
.dz .ns-toggle { align-self:flex-start; display:inline-flex; align-items:center; gap:8px; min-height:44px; padding:0; border:0; background:none;
                 font:inherit; font-weight:600; color:var(--dz-brand-text); cursor:pointer; }
.dz .ns-toggle:hover { text-decoration:underline; text-underline-offset:4px; }
.dz .ns-toggle svg { transition:transform .2s; }
.dz .ns-toggle[aria-expanded="true"] svg { transform:rotate(180deg); }
.dz .ns-img { width:100%; height:240px; object-fit:cover; border-radius:12px; display:block; }

/* featured (latest) story */
.dz .nf-feature { display:grid; grid-template-columns:minmax(0,1fr); background:#fff; border:1px solid var(--dz-line); border-radius:20px; overflow:hidden; scroll-margin-top:24px; }
@media (min-width: 900px) { .dz .nf-feature { grid-template-columns:300px minmax(0,1fr); } .dz .nf-feature.has-img { grid-template-columns:minmax(0,1.05fr) minmax(0,1fr); } }
/* when the story has a picture, it replaces the dark green panel */
.dz .nf-side.img { position:relative; padding:0; background:#0E3A73; justify-content:flex-start; gap:0; }
.dz .nf-side.img .pic { width:100%; aspect-ratio:718/405; background-size:cover; background-position:center; }

.dz .nf-side.img .over { position:relative; display:flex; flex-wrap:wrap; align-items:center; gap:8px 14px; padding:16px 22px 20px; color:#fff; flex:1; align-content:flex-start; }
.dz .nf-side.img .label { color:#86EFAC; }
.dz .nf-side.img .date { font-size:clamp(18px, 1.8vw, 24px); }
.dz .nf-side.img .place { color:#E5E7EB; font-size:14px; flex-basis:100%; }
.dz .nf-side { background:var(--dz-dark); color:var(--dz-on-dark); padding:28px; display:flex; flex-direction:column; gap:12px; }
.dz .nf-side .label { font-size:13px; font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--dz-highlight); }
.dz .nf-side .date { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(28px, 3vw, 40px); line-height:1.05; }
.dz .nf-side .place { display:flex; align-items:flex-start; gap:6px; color:var(--dz-on-dark-muted); font-size:15px; }
.dz .nf-side .ns-tag { align-self:flex-start; background:var(--dz-primary); color:var(--dz-primary-fg); }
.dz .nf-main { padding:28px clamp(20px, 3vw, 40px); display:flex; flex-direction:column; gap:16px; }
.dz .nf-main h2 { margin:0; font-size:clamp(24px, 2.4vw, 32px); line-height:1.15; }

/* year timeline */
.dz .ny { display:grid; grid-template-columns:minmax(0,1fr); gap:12px 40px; margin-top:56px; }
@media (min-width: 900px) { .dz .ny { grid-template-columns:140px minmax(0,1fr); } }
.dz .ny-year { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(32px, 4vw, 48px); line-height:1; color:var(--dz-brand-text); }
@media (min-width: 900px) { .dz .ny-year { position:sticky; top:24px; align-self:start; } }
.dz .ny-list { list-style:none; margin:0; padding:0 0 0 28px; border-left:3px solid #BBF7D0; display:flex; flex-direction:column; gap:20px; }
.dz .ny-list > li { position:relative; }
.dz .ny-list > li::before { content:""; position:absolute; left:-37px; top:26px; width:15px; height:15px; border-radius:50%; background:var(--dz-primary); box-shadow:0 0 0 4px var(--dz-bg); }
.dz .ns { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:22px 24px; display:flex; flex-direction:column; gap:12px; scroll-margin-top:24px; }
.dz .ns h3 { margin:0; font-size:22px; line-height:1.25; }
.dz .ns:target, .dz .nf-feature:target { outline:3px solid #86EFAC; outline-offset:2px; }

.dz .n-empty { color:var(--dz-muted); }
`;

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

interface StoryPartsProps {
  item: NewsItem;
  open: boolean;
  onToggle: () => void;
}

function Facts({ item }: { item: NewsItem }) {
  return (
    <dl className="ns-facts">
      {item.facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function MoreText({ item, open, onToggle }: StoryPartsProps) {
  if (item.body.length === 0) return null;
  const bodyId = `${item.id}-more`;
  return (
    <>
      {open && (
        <div className="ns-body" id={bodyId}>
          {item.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
      <button type="button" className="ns-toggle" aria-expanded={open} aria-controls={bodyId} onClick={onToggle}>
        {open ? "Show less" : "Read full story"} <ChevronIcon />
      </button>
    </>
  );
}

function FeaturedStory(props: StoryPartsProps) {
  const { item } = props;
  return (
    <article className={`nf-feature${item.image ? " has-img" : ""}`} id={item.id} aria-labelledby={`${item.id}-title`}>
      {item.image ? (
        <div className="nf-side img">
          <div className="pic" style={{ backgroundImage: `url(${item.image})` }} role="img" aria-label={item.title} />
          <div className="over">
            <span className="label">Latest</span>
            <span className="ns-tag">{item.category}</span>
            <time className="date">{item.date}</time>
            <span className="place">
              <PinIcon /> {item.place}
            </span>
          </div>
        </div>
      ) : (
        <div className="nf-side">
          <span className="label">Latest</span>
          <span className="ns-tag">{item.category}</span>
          <time className="date">{item.date}</time>
          <span className="place">
            <PinIcon /> {item.place}
          </span>
        </div>
      )}
      <div className="nf-main">
        <h2 id={`${item.id}-title`}>{item.title}</h2>
        <p className="ns-lead">{item.lead}</p>
        <Facts item={item} />
        <MoreText {...props} />
      </div>
    </article>
  );
}

function Story(props: StoryPartsProps) {
  const { item } = props;
  return (
    <article className="ns" id={item.id} aria-labelledby={`${item.id}-title`}>
      <div className="ns-meta">
        <span className="ns-tag">{item.category}</span>
        <time>{item.date}</time>
        <span className="ns-place">
          <PinIcon /> {item.place}
        </span>
      </div>
      <h3 id={`${item.id}-title`}>{item.title}</h3>
      {item.image && <img className="ns-img" src={item.image} alt="" />}
      <p className="ns-lead">{item.lead}</p>
      <Facts item={item} />
      <MoreText {...props} />
    </article>
  );
}

export function NewsPage() {
  const [filter, setFilter] = useState<NewsCategory | "All">("All");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  // Opening /news#some-story expands that story and scrolls to it.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !NEWS_ITEMS.some((n) => n.id === id)) return;
    setOpenIds(new Set([id]));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
  }, []);

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const shown = filter === "All" ? NEWS_ITEMS : NEWS_ITEMS.filter((n) => n.category === filter);
  const [featured, ...rest] = shown;

  const groups = new Map<number, NewsItem[]>();
  rest.forEach((n) => groups.set(n.year, [...(groups.get(n.year) ?? []), n]));
  const years = Array.from(groups.entries());

  const counts = (c: NewsCategory | "All") => (c === "All" ? NEWS_ITEMS.length : NEWS_ITEMS.filter((n) => n.category === c).length);
  const categories = NEWS_CATEGORIES.filter((c) => counts(c) > 0);

  return (
    <SiteShell
      hero={
        <PageHero crumb="News" eyebrow="News & updates" title={NEWS_INTRO.title} lead={NEWS_INTRO.lead}>
          <div className="nf-filter" role="group" aria-label="Filter news by category">
            {(["All", ...categories] as const).map((c) => (
              <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {c} <span className="count">{counts(c)}</span>
              </button>
            ))}
          </div>
        </PageHero>
      }
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="wrap block">
        {!featured ? (
          <p className="n-empty">No updates in this category yet.</p>
        ) : (
          <>
            <FeaturedStory item={featured} open={openIds.has(featured.id)} onToggle={() => toggle(featured.id)} />

            {years.map(([year, items]) => (
              <section className="ny" key={year} aria-label={`${year} news`}>
                <h2 className="ny-year">{year}</h2>
                <ol className="ny-list">
                  {items.map((n) => (
                    <li key={n.id}>
                      <Story item={n} open={openIds.has(n.id)} onToggle={() => toggle(n.id)} />
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </>
        )}

        <div style={{ marginTop: 40 }}>
          <MoreLink href="/milestones">See the project phases in Project milestones</MoreLink>
        </div>
      </section>

      <CtaBand />
    </SiteShell>
  );
}
