"use client";

// Home hero: the 7 animals the AI model recognises, arranged in a circle.
// Each animal lights up in turn, like a detection. Edit the list in ./site-content.ts.

import { useEffect, useState } from "react";
import Image from "next/image";
import { DETECTABLE_ANIMALS } from "./site-content";

const STEP_MS = 1800;
const RADIUS = 38; // % of the ring's width, from the centre to each photo
const ITEM = 19; // % of the ring's width, size of each photo

const CSS = `
.dz .ar-wrap { width:100%; max-width:560px; margin:0 auto; }
.dz .ar { position:relative; width:100%; aspect-ratio:1/1; list-style:none; margin:0; padding:0; }
.dz .ar-orbit { position:absolute; inset:${50 - RADIUS}%; border:2px dashed var(--dz-dark-line-strong); border-radius:50%; }
.dz .ar-centre { position:absolute; left:50%; top:50%; width:38%; aspect-ratio:1/1; transform:translate(-50%,-50%); border-radius:50%;
                 background:var(--dz-dark-2); box-shadow:0 0 0 8px rgba(255,255,255,.05), 0 0 0 1px var(--dz-dark-line-strong) inset;
                 display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:6%; gap:4px; }
.dz .ar-centre .big { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(32px, 6vw, 58px); line-height:1; color:var(--dz-highlight); }
.dz .ar-centre .txt { font-weight:600; font-size:clamp(11px, 1.5vw, 15px); line-height:1.25; color:var(--dz-on-dark); }
.dz .ar-centre .now { margin-top:6px; font-size:clamp(11px, 1.3vw, 13px); font-weight:600; padding:3px 10px; border-radius:999px;
                      background:var(--dz-primary); color:var(--dz-primary-fg); white-space:nowrap; }
.dz .ar-item { position:absolute; width:${ITEM}%; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; }
.dz .ar-photo { position:relative; width:100%; aspect-ratio:1/1; border-radius:50%; overflow:hidden; background:var(--dz-dark-2);
                box-shadow:0 0 0 3px var(--dz-dark), 0 0 0 5px var(--dz-dark-line-strong); transition:box-shadow .35s, transform .35s; }
.dz .ar-photo img { width:100%; height:100%; object-fit:cover; }
.dz .ar-initial { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
                  font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(22px, 4vw, 38px); color:var(--dz-on-dark-muted); }
.dz .ar-item.on .ar-photo { transform:scale(1.1); box-shadow:0 0 0 3px var(--dz-dark), 0 0 0 6px var(--dz-highlight), 0 0 28px rgba(74,222,128,.55); }
.dz .ar-label { position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%); white-space:nowrap; text-align:center; line-height:1.15;
                 background:rgba(20,83,45,.92); padding:3px 9px; border-radius:999px; z-index:1; }
.dz .ar-label b { display:block; font-size:clamp(12px, 1.5vw, 15px); color:var(--dz-on-dark); }
.dz .ar-label span { display:block; font-size:10px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--dz-on-dark-muted); }
.dz .ar-item.on .ar-label b { color:var(--dz-highlight); }
@media (max-width: 640px) {
  .dz .ar-centre { width:33%; padding:4%; }
  .dz .ar-centre .now { font-size:10px; padding:2px 7px; }
  .dz .ar-label { padding:2px 7px; }
  .dz .ar-label b { font-size:11px; }
  .dz .ar-label span { font-size:9px; }
}
.dz .ar-note { margin:28px auto 0; max-width:30rem; text-align:center; font-size:15px; color:var(--dz-on-dark-muted); }
`;

export default function AnimalRing() {
  const [active, setActive] = useState(0);
  const n = DETECTABLE_ANIMALS.length;

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % n), STEP_MS);
    return () => clearInterval(t);
  }, [n]);

  const current = DETECTABLE_ANIMALS[active];

  return (
    <div className="ar-wrap">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ar" role="group" aria-label={`The ${n} animals the system can detect`}>
        <div className="ar-orbit" aria-hidden="true" />

        <div className="ar-centre">
          <span className="big">{n}</span>
          <span className="txt">animals the system can detect</span>
          <span className="now" aria-live="polite">
            Spotted: {current.name}
          </span>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {DETECTABLE_ANIMALS.map((a, i) => {
            const angle = (2 * Math.PI * i) / n;
            const left = 50 + RADIUS * Math.sin(angle);
            const top = 50 - RADIUS * Math.cos(angle);
            return (
              <li key={a.name} className={`ar-item${i === active ? " on" : ""}`} style={{ left: `${left}%`, top: `${top}%` }}>
                <div className="ar-photo">
                  {a.photo ? (
                    <Image src={a.photo} alt={a.name} fill sizes="140px" style={{ objectFit: "cover" }} />
                  ) : (
                    <span className="ar-initial" aria-hidden="true">{a.name[0]}</span>
                  )}
                </div>
                <div className="ar-label">
                  <b>{a.name}</b>
                  {a.kind === "Livestock" && <span>Livestock</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="ar-note">
        Five crop-raiding wild animals, plus cattle and horses so livestock aren&apos;t mistaken for wildlife.
      </p>
    </div>
  );
}
