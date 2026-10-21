import { useState } from "react";

/*
  DAKZIN AI — Landing page
  Single-file React component. Drop it into any React app (Vite, CRA, Next.js)
  and render <DakzinLanding />. No extra libraries needed.
  Replace every [BRACKETED] placeholder with your real details.
*/

const FAQS = [
  {
    q: "What is DAKZIN AI?",
    a: "DAKZIN AI is an animal intrusion detection system. It uses cameras and artificial intelligence to spot wild animals entering farms or settlements and warns you right away, so you can act before crops or property are damaged.",
  },
  {
    q: "How does it detect animals?",
    a: "Cameras around your field send images to an AI model that has been trained to recognise animals. When it finds one, it records what it saw, where and when, and triggers an alert.",
  },
  {
    q: "Which animals can it recognise?",
    a: "It is designed for common crop raiders such as wild boar, deer, monkeys, bears and elephants. [Confirm the species your model is trained on.]",
  },
  {
    q: "How will I be alerted?",
    a: "You receive a notification by [SMS / mobile app / siren] with the type of animal, the camera location and the time, usually within seconds of detection.",
  },
  {
    q: "Does it work at night or in bad weather?",
    a: "Yes. Infrared cameras let the system see in the dark, and the hardware is housed in weatherproof enclosures for rain and fog. [Add your rated operating conditions.]",
  },
  {
    q: "Will it harm the animals?",
    a: "No. DAKZIN AI only detects and deters. Optional lights and sounds encourage animals to leave without traps, poison or electric shocks, supporting peaceful coexistence with wildlife.",
  },
  {
    q: "Does it need electricity or internet?",
    a: "The unit can run on [solar power with battery backup] and sends alerts over [mobile network / LoRa / Wi-Fi]. Detection runs on the device itself, so it keeps working if the connection drops.",
  },
  {
    q: "How accurate is it?",
    a: "In our field tests the system reached [YOUR ACCURACY FIGURE] detection accuracy. It is built to tell animals apart from people and livestock to keep false alarms low.",
  },
  {
    q: "Will it record people? What about privacy?",
    a: "The system is focused on detecting animals. [Describe how images of people are handled, for example: not stored, blurred, or deleted after X days.]",
  },
  {
    q: "How much does it cost and how is it installed?",
    a: "Pricing starts at [YOUR PRICE]. Our team installs the cameras, sets up alerts on your phone and shows you how to use it. [Add warranty and maintenance details.]",
  },
  {
    q: "Who built DAKZIN AI?",
    a: "DAKZIN AI was developed by [YOUR TEAM / INSTITUTION] to help farmers reduce losses from human–wildlife conflict.",
  },
];

const STEPS = [
  { n: "01", title: "Watch", text: "Cameras placed around your field capture movement, including at night with infrared." },
  { n: "02", title: "Recognise", text: "An AI model identifies whether it is a wild animal, and which one, so people and pets don't set off false alarms." },
  { n: "03", title: "Alert & deter", text: "You get an instant alert, and optional lights or sound gently drive the animal away." },
];

const FEATURES = [
  { title: "Day & night", text: "Infrared vision keeps watch after dark, when most crop raids happen." },
  { title: "Species recognition", text: "Tells wild animals apart from people, livestock and pets." },
  { title: "Instant alerts", text: "Notifications by [SMS / app / siren] with the animal, place and time." },
  { title: "Humane deterrence", text: "Light and sound scare animals off. No traps, no harm." },
  { title: "Off-grid ready", text: "[Solar-powered with battery backup] for remote fields." },
  { title: "Intrusion history", text: "See when and where animals visit, to plan fencing and patrols." },
];

const TEAM = [
  { name: "[Team member name]", role: "[Role, e.g. Project lead]", photo: null },
  { name: "[Team member name]", role: "[Role, e.g. AI / ML engineer]", photo: null },
  { name: "[Team member name]", role: "[Role, e.g. Hardware & IoT]", photo: null },
  { name: "[Team member name]", role: "[Role, e.g. Mobile & web]", photo: null },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Source+Sans+3:wght@400;600&display=swap');

.dz { --ink:#1B2420; --muted:#4A5650; --ground:#F4F2EC; --sand:#E8E4D8; --line:#DDD8CC;
      --forest:#0F2A1E; --forest-2:#163A2A; --leaf:#2E6B4E; --amber:#F2B84B;
      font-family:'Source Sans 3',sans-serif; color:var(--ink); background:var(--ground);
      font-size:18px; line-height:1.6; }
.dz * { box-sizing:border-box; }
.dz h1,.dz h2,.dz h3,.dz .display { font-family:'Bricolage Grotesque',sans-serif; }
.dz a { color:inherit; text-decoration:none; }
.dz .wrap { max-width:1200px; margin:0 auto; padding:0 24px; }
.dz .eyebrow { margin:0 0 12px; color:var(--leaf); font-weight:600; letter-spacing:.12em; text-transform:uppercase; font-size:14px; }
.dz .h2 { margin:0 0 48px; font-weight:700; font-size:44px; line-height:1.1; letter-spacing:-.01em; }
.dz .btn { display:inline-block; font-weight:600; padding:14px 28px; border-radius:999px; }
.dz .btn-primary { background:var(--amber); color:#1B1508; }
.dz .btn-primary:hover { background:#E5A92F; }
.dz .btn-ghost { border:1.5px solid #6F8A7B; color:var(--ground); }
.dz .btn-ghost:hover { border-color:var(--ground); }

/* header + nav */
.dz header { background:var(--forest); color:var(--ground); }
.dz nav { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px; padding-top:20px; padding-bottom:20px; }
.dz .logo { display:flex; align-items:center; gap:10px; font-weight:800; font-size:24px; letter-spacing:.02em; }
.dz .nav-links { display:flex; flex-wrap:wrap; align-items:center; gap:8px 28px; font-size:16px; }
.dz .nav-links a:not(.btn) { color:#D9E2DC; padding:10px 0; }
.dz .nav-links a:not(.btn):hover { color:#fff; }
.dz .nav-links .btn { padding:10px 20px; }

/* hero */
.dz .hero { display:flex; flex-wrap:wrap; align-items:center; gap:56px; padding-top:72px; padding-bottom:96px; }
.dz .hero > div { flex:1 1 440px; min-width:0; }
.dz .hero .eyebrow { color:var(--amber); }
.dz .hero h1 { margin:0 0 24px; font-weight:800; font-size:64px; line-height:1.05; letter-spacing:-.02em; }
.dz .hero p.lead { margin:0 0 36px; color:#C9D4CD; font-size:20px; max-width:34rem; }
.dz .btn-row { display:flex; flex-wrap:wrap; gap:16px; }
.dz .mock { background:var(--forest-2); border:1px solid #2A5240; border-radius:20px; padding:20px; }
.dz .feed { position:relative; height:300px; border-radius:12px; background:#0A1C14; overflow:hidden;
            display:flex; align-items:center; justify-content:center; color:#6F8A7B; font-size:15px; }
.dz .feed img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.dz .bbox { position:absolute; left:22%; top:30%; width:38%; height:44%; border:2px solid var(--amber); border-radius:6px; }
.dz .bbox-label { position:absolute; left:22%; top:calc(30% - 30px); background:var(--amber); color:#1B1508;
                  font-size:13px; font-weight:600; padding:4px 10px; border-radius:4px; }
.dz .alert { margin-top:16px; display:flex; align-items:center; gap:14px; background:var(--forest); border-radius:12px; padding:14px 16px; font-size:15px; line-height:1.4; }

/* sections */
.dz section.block { padding-top:96px; padding-bottom:96px; }
.dz .cards { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:24px; }
.dz .card { background:#fff; border:1px solid var(--line); border-radius:16px; padding:32px; }
.dz .card .num { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:40px; color:var(--leaf); }
.dz .card h3 { margin:8px 0; font-size:24px; }
.dz .card p, .dz .feature p { margin:0; color:var(--muted); }
.dz .features-bg { background:var(--sand); }
.dz .features { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:32px 40px; }
.dz .feature h3 { margin:0 0 6px; font-size:22px; }

/* faq */
.dz .faq { max-width:880px; }
.dz .faq .h2 { margin-bottom:40px; }
.dz .faq-list { border-top:1px solid #CFC9BA; }
.dz .faq-item { border-bottom:1px solid #CFC9BA; }
.dz .faq-q { width:100%; min-height:64px; display:flex; align-items:center; justify-content:space-between; gap:24px;
             background:none; border:0; padding:20px 0; text-align:left; cursor:pointer;
             font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:21px; color:var(--ink); }
.dz .faq-q:focus-visible { outline:2px solid var(--leaf); outline-offset:4px; border-radius:4px; }
.dz .faq-icon { display:flex; flex-shrink:0; transition:transform .2s; }
.dz .faq-icon.open { transform:rotate(45deg); }
.dz .faq-a { margin:0; padding:0 48px 24px 0; color:var(--muted); }

/* contact */
.dz .contact { background:var(--forest); color:var(--ground); }
.dz .contact .inner { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:32px; padding-top:88px; padding-bottom:88px; }
.dz .contact .inner > div:first-child { flex:1 1 480px; min-width:0; }
.dz .contact h2 { margin:0 0 12px; font-weight:700; font-size:44px; line-height:1.1; }
.dz .contact p { margin:0; color:#C9D4CD; }

/* about */
.dz .about-top { display:flex; flex-wrap:wrap; gap:48px 64px; margin-bottom:56px; }
.dz .about-top > div:first-child { flex:1 1 380px; min-width:0; }
.dz .about-top > div:last-child { flex:1 1 480px; min-width:0; color:var(--muted); }
.dz .about-top .h2 { margin:0; }
.dz .team { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:24px; }
.dz .member { background:#fff; border:1px solid var(--line); border-radius:16px; padding:24px; }
.dz .avatar { width:72px; height:72px; border-radius:50%; background:#DCE6DF; display:flex; align-items:center; justify-content:center; margin-bottom:16px; overflow:hidden; }
.dz .avatar img { width:100%; height:100%; object-fit:cover; }
.dz .member h3 { margin:0 0 4px; font-size:20px; }
.dz .member p { margin:0; color:var(--muted); font-size:16px; }

/* footer */
.dz footer { background:var(--forest); border-top:1px solid #234A38; }
.dz footer .inner { display:flex; flex-wrap:wrap; justify-content:space-between; gap:12px; padding-top:24px; padding-bottom:24px; font-size:15px; color:#9FB2A7; }

/* phones */
@media (max-width: 640px) {
  .dz .hero h1 { font-size:42px; }
  .dz .h2, .dz .contact h2 { font-size:32px; }
  .dz section.block { padding-top:64px; padding-bottom:64px; }
  .dz .faq-q { font-size:18px; }
  .dz .faq-a { padding-right:0; }
}
`;

function LogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#F2B84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="13" />
      <circle cx="16" cy="16" r="6" />
      <circle cx="16" cy="16" r="1.5" fill="#F2B84B" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F2B84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2E6B4E" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2E6B4E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function FaqItem({ item, index, open, onToggle }) {
  const id = `faq-${index}`;
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        aria-controls={`${id}-a`}
        id={`${id}-q`}
        onClick={onToggle}
      >
        <span>{item.q}</span>
        <span className={`faq-icon${open ? " open" : ""}`}>
          <PlusIcon />
        </span>
      </button>
      {open && (
        <p className="faq-a" id={`${id}-a`} role="region" aria-labelledby={`${id}-q`}>
          {item.a}
        </p>
      )}
    </div>
  );
}

export default function DakzinLanding() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="dz">
      <style>{CSS}</style>

      {/* ───── Header + Hero ───── */}
      <header>
        <nav className="wrap">
          <a href="#top" className="logo display">
            <LogoMark />
            DAKZIN AI
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#faq">FAQ</a>
            <a href="#about">About</a>
            <a href="#contact" className="btn btn-primary">Request a demo</a>
          </div>
        </nav>

        <section id="top" className="wrap hero">
          <div>
            <p className="eyebrow">Animal intrusion detection system</p>
            <h1>Know the moment wildlife enters your field.</h1>
            <p className="lead">
              DAKZIN AI watches your farm day and night, recognises the animal, and alerts you in
              seconds, so you can protect your crops without harming wildlife.
            </p>
            <div className="btn-row">
              <a href="#contact" className="btn btn-primary">Request a demo</a>
              <a href="#how" className="btn btn-ghost">See how it works</a>
            </div>
          </div>

          <div>
            <div className="mock">
              <div className="feed">
                {/* Replace with: <img src="/your-photo.jpg" alt="Camera view of a field" /> */}
                <span>[Camera feed / product photo]</span>
                <div className="bbox" />
                <div className="bbox-label">Wild boar detected</div>
              </div>
              <div className="alert">
                <BellIcon />
                <div>
                  <strong>Alert sent to your phone</strong>
                  <br />
                  <span style={{ color: "#9FB2A7" }}>North field, Camera 2 · just now</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>

      {/* ───── How it works ───── */}
      <section id="how" className="wrap block">
        <p className="eyebrow">How it works</p>
        <h2 className="h2" style={{ maxWidth: "40rem" }}>Three steps from movement to alert</h2>
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
      <section id="features" className="features-bg">
        <div className="wrap block">
          <p className="eyebrow">Features</p>
          <h2 className="h2">Built for farms and villages</h2>
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

      {/* ───── FAQ ───── */}
      <section id="faq" className="wrap block faq">
        <p className="eyebrow">FAQ</p>
        <h2 className="h2">Questions, answered</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </section>

      {/* ───── Contact / CTA ───── */}
      <section id="contact" className="contact">
        <div className="wrap inner">
          <div>
            <h2>Protect your harvest this season.</h2>
            <p>Talk to us about a pilot for your farm or community.</p>
          </div>
          <div className="btn-row">
            <a href="mailto:[YOUR EMAIL]" className="btn btn-primary">Request a demo</a>
            <a href="tel:[YOUR PHONE]" className="btn btn-ghost">Call [YOUR PHONE]</a>
          </div>
        </div>
      </section>

      {/* ───── About us ───── */}
      <section id="about" className="wrap block">
        <div className="about-top">
          <div>
            <p className="eyebrow">About us</p>
            <h2 className="h2">Helping farmers and wildlife live side by side</h2>
          </div>
          <div>
            <p style={{ margin: "0 0 16px" }}>
              Every season, farmers lose crops and sleep guarding their fields from wild animals.
              DAKZIN AI started as a way to give them an early warning, using technology that
              protects both their harvest and the animals.
            </p>
            <p style={{ margin: 0 }}>
              We are [YOUR TEAM / INSTITUTION], a team of [students / engineers / researchers]
              working on practical AI for rural communities. [Add a line about how the project
              started or who supports it.]
            </p>
          </div>
        </div>
        <div className="team">
          {TEAM.map((m, i) => (
            <div className="member" key={i}>
              <div className="avatar">
                {m.photo ? <img src={m.photo} alt={m.name} /> : <PersonIcon />}
              </div>
              <h3>{m.name}</h3>
              <p>{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Footer ───── */}
      <footer>
        <div className="wrap inner">
          <span>© {new Date().getFullYear()} DAKZIN AI · [YOUR TEAM / INSTITUTION]</span>
          <span>[YOUR EMAIL] · [YOUR LOCATION]</span>
        </div>
      </footer>
    </div>
  );
}
