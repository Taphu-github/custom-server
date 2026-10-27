"use client";

// Shared building blocks for the public Dakzin pages:
// styles, header, footer, page hero, call-to-action band and the arrow icon.

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/app/AIDS_logo.png";
import { NAV, LOGIN_PATH, CONTACT, PAGE_PHOTOS, DETECTABLE_ANIMALS, TEAM_GROUPS } from "./site-content";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Source+Sans+3:wght@400;600&display=swap');

.dz {
      /* Project colours: read from the theme in app/globals.css (same as login & dashboard) */
      --dz-primary:hsl(var(--primary));            /* primary  — green #16A34A */
      --dz-primary-fg:hsl(var(--primary-foreground));
      --dz-alt:hsl(var(--secondary));               /* secondary — light grey #F4F4F5 */
      --dz-ink:hsl(var(--foreground));
      --dz-muted:hsl(var(--muted-foreground));
      --dz-bg:hsl(var(--background));
      --dz-line:hsl(var(--border));
      /* Shades of the same green (Tailwind green scale, as used on the dashboard) */
      --dz-brand-text:#15803D;   /* green-700: green text on white */
      --dz-brand-soft:#DCFCE7;   /* green-100: light green tints */
      --dz-dark:#14532D;         /* green-900: dark bands (header, call-to-action, footer) */
      --dz-dark-2:#166534;       /* green-800 */
      --dz-highlight:#4ADE80;    /* green-400: highlights on dark green */
      --dz-on-dark:#F0FDF4;      /* text on dark green */
      --dz-on-dark-muted:#BBF7D0;
      --dz-dark-line:rgba(255,255,255,.16);
      --dz-dark-line-strong:rgba(255,255,255,.38);
      font-family:'Source Sans 3',sans-serif; color:var(--dz-ink); background:var(--dz-bg);
      font-size:18px; line-height:1.6; width:100%; align-self:stretch; min-height:100vh;
      display:flex; flex-direction:column; }
.dz > .dz-main { flex:1 0 auto; }
.dz * { box-sizing:border-box; }
.dz h1,.dz h2,.dz h3,.dz .display { font-family:'Bricolage Grotesque',sans-serif; }
.dz a { color:inherit; text-decoration:none; }
.dz { --page-max:1680px; --gutter:clamp(16px, 2.5vw, 40px); }
.dz .wrap { max-width:var(--page-max); margin:0 auto; padding-left:var(--gutter); padding-right:var(--gutter); }
/* narrow sections stay aligned with the page edge; only their content width is limited */
.dz .narrow > * { max-width:880px; }
.dz .eyebrow { margin:0 0 12px; color:var(--dz-brand-text); font-weight:600; letter-spacing:.12em; text-transform:uppercase; font-size:14px; }
.dz .h2 { margin:0 0 32px; font-weight:700; font-size:clamp(30px, 3.2vw, 44px); line-height:1.1; letter-spacing:-.01em; }
.dz .btn { display:inline-block; font-weight:600; padding:14px 28px; border-radius:999px; }
.dz .btn-primary { background:var(--dz-primary); color:var(--dz-primary-fg); }
.dz .btn-primary:hover { background:var(--dz-brand-text); }
.dz .btn-ghost { border:1.5px solid var(--dz-dark-line-strong); color:var(--dz-bg); }
.dz .btn-ghost:hover { border-color:var(--dz-bg); }
.dz .btn-outline { border:1.5px solid var(--dz-brand-text); color:var(--dz-brand-text); }
.dz .btn-outline:hover { background:var(--dz-brand-text); color:#fff; }
.dz .btn-row { display:flex; flex-wrap:wrap; gap:16px; }
.dz .more { display:inline-flex; align-items:center; gap:8px; font-weight:600; color:var(--dz-brand-text); padding:10px 0; }
.dz .more:hover { color:#14532D; text-decoration:underline; text-underline-offset:4px; }
.dz :focus-visible { outline:2px solid var(--dz-highlight); outline-offset:3px; border-radius:4px; }

/* header + nav */
/* Light green header band (#90EE90): dark green text on it */
.dz .site-header { background:#90EE90; color:#0B2A17;
  --dz-on-dark:#0B2A17; --dz-on-dark-muted:#1F4D2E; --dz-highlight:#14532D;
  --dz-dark-line:rgba(20,83,45,.18); --dz-dark-line-strong:rgba(20,83,45,.4); }
/* logo left · page links centred · Log in at the far right */
.dz nav.top { display:grid; grid-template-columns:1fr auto 1fr; grid-template-areas:"logo links login"; align-items:center; gap:16px 24px; max-width:var(--page-max); margin:0 auto; padding:14px var(--gutter); }
.dz nav.top .logo { grid-area:logo; justify-self:start; }
.dz nav.top .nav-links { grid-area:links; justify-content:center; }
.dz nav.top .nav-login { grid-area:login; justify-self:end; padding:10px 22px; }
@media (max-width: 1180px) {
  .dz nav.top { grid-template-columns:1fr auto; grid-template-areas:"logo login" "links links"; }
  .dz nav.top .nav-links { gap:2px 4px; }
}
.dz .logo { display:flex; align-items:center; gap:10px; font-weight:800; font-size:24px; letter-spacing:0; }
.dz .logo-text { display:flex; flex-direction:column; line-height:1.1; }
.dz .logo-text small { margin-top:3px; font-family:'Source Sans 3',sans-serif; font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; white-space:nowrap; color:var(--dz-on-dark-muted); }
@media (max-width: 640px) { .dz .logo-text small { font-size:9px; letter-spacing:.03em; white-space:normal; } }
.dz .logo-img { width:40px; height:40px; border-radius:8px; background:#fff; padding:3px; object-fit:contain; box-shadow:none; }
.dz .nav-links { display:flex; flex-wrap:wrap; align-items:center; gap:4px 6px; font-size:16px; }
/* Dark green menu bar across the top of every page */
.dz .nav-band { background:#14532D; color:#fff; box-shadow:0 2px 14px rgba(0,0,0,.18);
  --dz-on-dark-muted:#BBF7D0; }
@media (min-width: 1181px) { .dz .nav-band { position:sticky; top:0; z-index:50; } }
.dz .nav-links a:not(.btn) { position:relative; color:#E7F8EC; padding:8px 12px; border-radius:999px; transition:color .2s, background .2s; }
.dz .nav-links a:not(.btn)::after { content:""; position:absolute; left:12px; right:12px; bottom:2px; height:2px; border-radius:2px; background:#4ADE80;
                                    transform:scaleX(0); transform-origin:left; transition:transform .25s ease; }
.dz .nav-links a:not(.btn):hover { color:#fff; background:rgba(255,255,255,.1); }
.dz .nav-links a:not(.btn):hover::after { transform:scaleX(1); }
.dz .nav-links a[aria-current="page"] { color:#fff; font-weight:600; background:rgba(255,255,255,.16); }
.dz .nav-links a[aria-current="page"]::after { transform:scaleX(1); }
.dz .logo { transition:opacity .2s; }
.dz .logo:hover { opacity:.8; }
.dz .logo-img { transition:transform .25s ease; }
.dz .logo:hover .logo-img { transform:rotate(-6deg) scale(1.05); }
.dz nav.top .nav-login { transition:background .2s, transform .2s, box-shadow .2s; }
.dz nav.top .nav-login { background:#4ADE80; color:#0B2A17; }
.dz nav.top .nav-login:hover { background:#86EFAC; transform:translateY(-1px); box-shadow:0 6px 16px rgba(74,222,128,.35); }

/* home hero */
.dz .hero { display:grid; grid-template-columns:minmax(0,1fr); align-items:start; gap:clamp(28px, 4vw, 64px); padding-top:clamp(24px, 3vw, 40px); padding-bottom:clamp(40px, 5vw, 64px); }
.dz .hero > div { min-width:0; }
@media (min-width: 960px) { .dz .hero { grid-template-columns:minmax(0,1fr) minmax(0,1.15fr); } .dz .hero > div:first-child { padding-top:clamp(8px, 1.5vw, 24px); } }
.dz .hero .eyebrow, .dz .page-hero .eyebrow { color:var(--dz-highlight); }
.dz .hero h1 { margin:0 0 24px; font-weight:800; font-size:clamp(22px, 2.42vw, 38px); line-height:1.05; letter-spacing:-.02em; }
.dz .hero p.lead, .dz .page-hero p.lead { margin:0 0 24px; color:var(--dz-on-dark-muted); font-size:20px; max-width:38rem; }
.dz .mock { background:var(--dz-dark-2); border:1px solid var(--dz-dark-line); border-radius:20px; padding:20px; }
.dz .feed { position:relative; height:clamp(240px, 28vw, 420px); border-radius:12px; background:#052E16; overflow:hidden; }
.dz .bbox-label { position:absolute; left:16px; top:16px; background:var(--dz-primary); color:var(--dz-primary-fg);
                  font-size:13px; font-weight:600; padding:4px 10px; border-radius:4px; }
.dz .alert { margin-top:16px; display:flex; align-items:center; gap:14px; background:var(--dz-dark); border-radius:12px; padding:14px 16px; font-size:15px; line-height:1.4; }

/* inner page hero */
.dz .page-hero { padding-top:clamp(24px, 3vw, 40px); padding-bottom:clamp(40px, 5vw, 56px); }
.dz .ph-text { min-width:0; }
.dz .page-hero h1 { margin:0 0 20px; font-weight:800; font-size:clamp(22px, 2.42vw, 38px); line-height:1.05; letter-spacing:-.02em; max-width:48rem; }
.dz .page-hero p.lead, .dz .hero p.lead { margin-bottom:0; }
.dz .crumbs { font-size:15px; color:var(--dz-on-dark-muted); margin:0 0 16px; }
.dz .crumbs a:hover { color:#14532D; text-decoration:underline; }

/* Inner page hero with a photo: full-width banner, photo behind, text on the left over a dark green shade */
.dz .ph-banner { position:relative; overflow:hidden; background:#14532D; min-height:clamp(320px, 34vw, 460px); display:flex; align-items:center; }
.dz .ph-banner .ph-bg { object-fit:cover; object-position:center; }
.dz .ph-shade { position:absolute; inset:0; background:linear-gradient(90deg, rgba(11,42,23,.94) 0%, rgba(20,83,45,.82) 36%, rgba(20,83,45,.35) 66%, rgba(20,83,45,0) 100%); }
.dz .ph-banner .page-hero { position:relative; z-index:1; width:100%; color:#fff;
  --dz-on-dark:#fff; --dz-on-dark-muted:#DCFCE7; --dz-highlight:#4ADE80; }
.dz .ph-banner .ph-text { max-width:40rem; }
.dz .ph-banner h1 { font-size:clamp(26px, 3vw, 44px); line-height:1.1; text-shadow:0 2px 12px rgba(0,0,0,.25); }
.dz .ph-banner p.lead { color:#E7F8EC; font-size:clamp(17px, 1.4vw, 20px); }
.dz .ph-banner .crumbs a:hover { color:#fff; }
@media (max-width: 760px) { .dz .ph-shade { background:linear-gradient(180deg, rgba(11,42,23,.55), rgba(11,42,23,.88)); } }

/* sections */
.dz .block { padding-top:clamp(48px, 6vw, 72px); padding-bottom:clamp(48px, 6vw, 72px); }
.dz .section-head { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:8px 24px; margin-bottom:32px; }
.dz .section-head .h2 { margin:0; }
.dz .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
.dz .card { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:32px; }
.dz .card .num { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:40px; color:var(--dz-brand-text); }
.dz .card h3 { margin:8px 0; font-size:24px; }
.dz .card p, .dz .feature p { margin:0; color:var(--dz-muted); }
.dz .sand { background:var(--dz-alt); }
.dz .features { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:32px 40px; }
.dz .feature h3 { margin:0 0 6px; font-size:22px; }

/* how-it-works detail */
.dz .step { display:grid; grid-template-columns:minmax(0,1fr); gap:16px 24px; padding:36px 0; border-top:1px solid var(--dz-line); }
.dz .step:first-child { border-top:0; padding-top:0; }
@media (min-width: 900px) { .dz .step { grid-template-columns:200px minmax(0,1fr) 280px; gap:48px; } }
.dz .step .num { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:72px; line-height:1; color:var(--dz-brand-text); }
.dz .step h2 { margin:0 0 4px; font-size:36px; line-height:1.1; }
.dz .step .lead2 { margin:0 0 16px; font-weight:600; color:var(--dz-brand-text); }
.dz .step p { margin:0 0 14px; color:var(--dz-muted); }
.dz .chips { list-style:none; margin:0; padding:24px; display:flex; flex-direction:column; gap:12px; background:#fff; border:1px solid var(--dz-line); border-radius:16px; align-self:start; }
.dz .chips li { display:flex; align-items:center; gap:10px; font-weight:600; font-size:16px; }
.dz .arch { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:16px; counter-reset:arch; }
.dz .arch-item { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:24px; }
.dz .arch-item h3 { margin:0 0 6px; font-size:20px; }
.dz .arch-item p { margin:0; color:var(--dz-muted); font-size:16px; }

/* features detail */
.dz .group { display:grid; grid-template-columns:minmax(0,1fr); gap:20px 48px; padding:36px 0; border-top:1px solid var(--dz-line); scroll-margin-top:24px; }
.dz .group:first-child { border-top:0; padding-top:0; }
@media (min-width: 900px) { .dz .group { grid-template-columns:320px minmax(0,1fr); } }
.dz .group h2 { margin:0 0 8px; font-size:34px; line-height:1.1; }
.dz .group .intro { margin:0; color:var(--dz-muted); }
.dz .group-items { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; }
.dz .group-item { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:24px; }
.dz .group-item h3 { margin:0 0 6px; font-size:20px; }
.dz .group-item p { margin:0; color:var(--dz-muted); font-size:16px; }
.dz .jump { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px; }
.dz .jump a { border:1.5px solid var(--dz-dark-line-strong); color:var(--dz-on-dark); border-radius:999px; padding:8px 16px; font-size:15px; font-weight:600; }
.dz .jump a:hover { border-color:var(--dz-highlight); color:#14532D; }


/* cta band */
.dz .cta { background:var(--dz-dark); color:var(--dz-bg); }
.dz .cta .inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px 32px; padding-top:clamp(20px, 2.4vw, 32px); padding-bottom:clamp(20px, 2.4vw, 32px); }
.dz .cta .inner > div:first-child { flex:1 1 480px; min-width:0; }
.dz .cta h2 { margin:0 0 6px; font-weight:700; font-size:32px; line-height:1.15; }
.dz .cta p { margin:0; color:var(--dz-on-dark-muted); }

/* about */
.dz .about-top { display:flex; flex-wrap:wrap; gap:24px 64px; margin-bottom:40px; }
.dz .about-top > div:first-child { flex:1 1 380px; min-width:0; }
.dz .about-top > div:last-child { flex:1 1 480px; min-width:0; color:var(--dz-muted); }
.dz .about-top .h2 { margin:0; }
.dz .partners { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-bottom:40px; }
.dz .partner { border:1px solid var(--dz-line); border-radius:12px; padding:18px 20px; font-weight:600; color:var(--dz-ink); background:var(--dz-alt); }
.dz .partner span { display:block; margin-top:6px; font-weight:400; color:var(--dz-muted); font-size:16px; }
.dz .team { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:24px; }
.dz .member { background:#fff; border:1px solid var(--dz-line); border-radius:16px; padding:24px; display:flex; flex-direction:column; align-items:flex-start; transition:border-color .15s, box-shadow .15s; }
.dz .member:hover { border-color:#86EFAC; box-shadow:0 8px 24px rgba(20,83,45,.08); }
.dz .avatar { width:96px; height:96px; flex-shrink:0; border-radius:50%; background:var(--dz-brand-soft); display:flex; align-items:center; justify-content:center; margin-bottom:16px; overflow:hidden;
              box-shadow:0 0 0 3px #fff, 0 0 0 5px #BBF7D0; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:30px; color:#14532D; }
.dz .avatar img { width:100%; height:100%; object-fit:cover; }
.dz .member h3 { margin:0 0 4px; font-size:19px; line-height:1.25; }
.dz .member p { margin:0; color:var(--dz-muted); font-size:16px; }
.dz .timeline { list-style:none; margin:0; padding:0; border-left:2px solid #BBF7D0; }
.dz .timeline li { position:relative; padding:0 0 40px 32px; }
.dz .timeline li:last-child { padding-bottom:0; }
.dz .timeline li::before { content:""; position:absolute; left:-9px; top:6px; width:16px; height:16px; border-radius:50%; background:var(--dz-brand-text); border:3px solid var(--dz-bg); }
.dz .timeline .year { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:20px; color:var(--dz-brand-text); }
.dz .timeline h3 { margin:2px 0 6px; font-size:24px; }
.dz .timeline p { margin:0; color:var(--dz-muted); }
.dz .pill-list { display:flex; flex-wrap:wrap; gap:12px; list-style:none; margin:0; padding:0; }
.dz .pill-list li { background:#fff; border:1px solid var(--dz-line); border-radius:999px; padding:10px 18px; font-weight:600; font-size:16px; }

/* footer */
.dz footer { background:var(--dz-dark); color:var(--dz-on-dark-muted); border-top:1px solid var(--dz-dark-line); }
.dz footer a:hover { color:#fff; }
.dz footer .base { display:flex; flex-wrap:wrap; justify-content:space-between; gap:4px 24px; padding-top:18px; padding-bottom:18px; font-size:14px; }

/* phones */
@media (max-width: 640px) {
  .dz .cta h2 { font-size:26px; }
  .dz .step .num { font-size:48px; }
}
`;

/* ───────────── Icons ───────────── */

export function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/* ───────────── Layout pieces ───────────── */

function SiteNav() {
  const pathname = usePathname();
  return (
    <div className="nav-band">
    <nav className="top" aria-label="Main">
      <Link href="/" className="logo display">
        <Image src={logo} alt="" className="logo-img" priority />
        <span className="logo-text">
          DakzinAI
          <small>Enabling human–wildlife coexistence in Bhutan</small>
        </span>
      </Link>
      <div className="nav-links">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </div>
      <Link href={LOGIN_PATH} className="btn btn-primary nav-login">Log in</Link>
    </nav>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="wrap base">
        <span>© 2025 DakzinAI · {CONTACT.org}</span>
        <span>{CONTACT.email} · {CONTACT.place}</span>
      </div>
    </footer>
  );
}

/**
 * Wraps every public page: styles, header (with optional hero content) and footer.
 * `hero` is rendered inside the dark header band.
 */
// Every photo used across the public pages. They are downloaded quietly in the background
// on the first page a visitor opens, so later pages show their photos instantly.
const ALL_PHOTOS = [
  ...Object.values(PAGE_PHOTOS).map((p) => p.src),
  ...DETECTABLE_ANIMALS.flatMap((a) => (a.photo ? [a.photo] : [])),
  ...TEAM_GROUPS.flatMap((g) => g.members.flatMap((m) => (m.photo ? [m.photo] : []))),
];

function usePreloadPhotos() {
  useEffect(() => {
    const load = () =>
      ALL_PHOTOS.forEach((src) => {
        const img = new window.Image();
        img.decoding = "async";
        img.src = src;
      });
    if (document.readyState === "complete") load();
    else window.addEventListener("load", load, { once: true });
    return () => window.removeEventListener("load", load);
  }, []);
}

export function SiteShell({ hero, children }: { hero?: ReactNode; children: ReactNode }) {
  usePreloadPhotos();
  return (
    <div className="dz">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="site-header">
        <SiteNav />
        {hero}
      </header>
      <main className="dz-main">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Hero at the top of inner pages: a full-width photo banner when the page has a photo in PAGE_PHOTOS. */
interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: string;
  crumb: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, lead, crumb, children }: PageHeroProps) {
  const photo = PAGE_PHOTOS[crumb];
  const text = (
    <div className="ph-text">
      <p className="crumbs">
        <Link href="/">Home</Link> / {crumb}
      </p>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </div>
  );

  if (!photo) return <section className="wrap page-hero">{text}</section>;

  // Full-width banner: the photo fills the band and the text sits on the left over a dark green shade.
  return (
    <section className="ph-banner">
      <Image className="ph-bg" src={photo.src} alt={photo.caption} fill unoptimized priority sizes="100vw" />
      <div className="ph-shade" aria-hidden="true" />
      <div className="wrap page-hero">{text}</div>
    </section>
  );
}

/** Closing call-to-action band. */
export function CtaBand({
  title = "Protect your crops from wildlife",
  text = "Talk to us about bringing DakzinAI to your farm or community.",
}: { title?: string; text?: string }) {
  return (
    <section className="cta">
      <div className="wrap inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          <a href={`mailto:${CONTACT.email}`} className="btn btn-primary">Contact us</a>
        </div>
      </div>
    </section>
  );
}

/** "Learn more →" link to a full page. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="more">
      {children} <ArrowIcon />
    </Link>
  );
}
