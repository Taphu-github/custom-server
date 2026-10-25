"use client";

// Home hero: an animated "night watch" feed of example alerts, the kind a farmer gets on their phone.
// These are illustrations of how alerts look, not real detection records.

import { useEffect, useState } from "react";

const EXAMPLES = [
  { animal: "Wild boar", place: "Zurphi, Zhemgang", time: "2:14 AM", action: "Lights & sound on" },
  { animal: "Monkey", place: "Beling, Trongsa", time: "6:40 AM", action: "Tiger doll moving" },
  { animal: "Deer", place: "Zurphi, Zhemgang", time: "11:52 PM", action: "Lights & sound on" },
  { animal: "Bear", place: "Beling, Trongsa", time: "3:05 AM", action: "SMS & call sent" },
  { animal: "Elephant", place: "Zurphi, Zhemgang", time: "1:27 AM", action: "Lights & sound on" },
];

const STEP_MS = 2600;
const SHOWN = 3;

const CSS = `
.dz .af { margin:24px 0 0; max-width:34rem; }
.dz .af-head { display:flex; align-items:baseline; justify-content:space-between; gap:12px; margin-bottom:10px; }
.dz .af-head p { margin:0; font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(18px, 1.6vw, 22px); color:#0B2A17; line-height:1.2; }
.dz .af-head span { font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:#1F4D2E; white-space:nowrap; }
.dz .af-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px; }
.dz .af-item { display:flex; align-items:center; gap:12px; background:#fff; border-radius:14px; padding:10px 14px;
               box-shadow:0 6px 18px rgba(20,83,45,.12); animation:af-in .5s ease both; }
.dz .af-item:nth-child(2) { opacity:.8; }
.dz .af-item:nth-child(3) { opacity:.55; }
.dz .af-icon { flex-shrink:0; width:36px; height:36px; border-radius:10px; background:#14532D; color:#4ADE80; display:flex; align-items:center; justify-content:center; }
.dz .af-main { min-width:0; flex:1; }
.dz .af-main b { display:block; font-size:15px; color:#0B2A17; }
.dz .af-main span { display:block; font-size:13px; color:#4A5650; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dz .af-act { flex-shrink:0; font-size:12px; font-weight:600; padding:3px 9px; border-radius:999px; background:#DCFCE7; color:#14532D; white-space:nowrap; }
.dz .af-foot { margin:12px 0 0; font-size:15px; font-weight:600; color:#14532D; }
@keyframes af-in { from { opacity:0; transform:translateY(-10px); } }
@media (max-width: 480px) { .dz .af-act { display:none; } }
@media (prefers-reduced-motion: reduce) { .dz .af-item { animation:none; } }
`;

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

export default function AlertFeed() {
  const [start, setStart] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStart((s) => (s + 1) % EXAMPLES.length), STEP_MS);
    return () => clearInterval(t);
  }, []);

  const shown = Array.from({ length: SHOWN }, (_, i) => EXAMPLES[(start - i + EXAMPLES.length) % EXAMPLES.length]);

  return (
    <div className="af">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="af-head">
        <p>While you sleep, Dakzin keeps watch.</p>
        <span>Example alerts</span>
      </div>
      <ul className="af-list" aria-label="Example alerts">
        {shown.map((a, i) => (
          <li className="af-item" key={`${start}-${i}`}>
            <span className="af-icon"><BellIcon /></span>
            <span className="af-main">
              <b>{a.animal} detected</b>
              <span>{a.place} · {a.time}</span>
            </span>
            <span className="af-act">{a.action}</span>
          </li>
        ))}
      </ul>
      <p className="af-foot">No more sleepless nights guarding the field.</p>
    </div>
  );
}
