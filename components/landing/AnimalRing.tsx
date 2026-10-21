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
/* card behind the ring */
.dz .ar-wrap { --ar-card:#FFFFFF; width:100%; margin:0; background:var(--ar-card);
               border:1px solid rgba(20,83,45,.12); border-radius:28px; padding:clamp(14px, 2vw, 22px) clamp(16px, 2.5vw, 28px);
               box-shadow:0 20px 50px rgba(20,83,45,.18); }
.dz .ar-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:4px; }
.dz .ar-head span { white-space:nowrap; font-size:clamp(10px, 2.4vw, 13px); font-weight:600; letter-spacing:.12em; text-transform:uppercase; color:var(--dz-highlight); }
.dz .ar-head i { white-space:nowrap; font-style:normal; display:inline-flex; align-items:center; gap:6px; font-size:clamp(10px, 2.4vw, 13px); font-weight:600; color:var(--dz-on-dark-muted); }
.dz .ar-head i::before { content:""; width:8px; height:8px; border-radius:50%; background:#16A34A; box-shadow:0 0 0 4px rgba(22,163,74,.18); }
.dz .ar { position:relative; width:100%; aspect-ratio:1/1; list-style:none; margin:0; padding:0; }
/* the card fills its column; the ring inside stays a comfortable size */
.dz .ar-sizer { container-type:inline-size; width:100%; max-width:clamp(260px, calc(100svh - 360px), 400px); margin:0 auto; }
.dz .ar-orbit { position:absolute; inset:${50 - RADIUS}%; border:2px dashed var(--dz-dark-line-strong); border-radius:50%; }
.dz .ar-centre { position:absolute; left:50%; top:50%; width:38%; aspect-ratio:1/1; transform:translate(-50%,-50%); border-radius:50%;
                 background:#F7FAF8; box-shadow:0 0 0 8px rgba(20,83,45,.05), 0 0 0 1px rgba(20,83,45,.15) inset;
                 display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:6%; gap:4px; }
.dz .ar-centre .big { font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(24px, 11cqw, 58px); line-height:1; color:#16A34A; }
.dz .ar-centre .txt { font-weight:600; font-size:clamp(9px, 2.7cqw, 15px); line-height:1.25; color:var(--dz-on-dark); }
.dz .ar-centre .now { margin-top:6px; font-size:clamp(8px, 2.2cqw, 13px); font-weight:600; padding:0.5cqw 1.8cqw; border-radius:999px;
                      background:var(--dz-primary); color:var(--dz-primary-fg); white-space:nowrap; }
.dz .ar-item { position:absolute; width:${ITEM}%; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; }
.dz .ar-photo { position:relative; width:100%; aspect-ratio:1/1; border-radius:50%; overflow:hidden; background:#EEF2EF;
                box-shadow:0 0 0 3px var(--ar-card), 0 0 0 5px var(--dz-dark-line-strong); transition:box-shadow .35s, transform .35s; }
.dz .ar-photo img { width:100%; height:100%; object-fit:cover; }
.dz .ar-initial { position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
                  font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:clamp(16px, 7cqw, 38px); color:var(--dz-on-dark-muted); }
.dz .ar-item.on .ar-photo { transform:scale(1.1); box-shadow:0 0 0 3px var(--ar-card), 0 0 0 6px #16A34A, 0 0 24px rgba(22,163,74,.45); }
.dz .ar-label { position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%); white-space:nowrap; text-align:center; line-height:1.15;
                 background:var(--ar-card); padding:0.4cqw 1.6cqw; border-radius:999px; z-index:1; }
.dz .ar-label b { display:block; font-size:clamp(9px, 2.7cqw, 15px); color:var(--dz-on-dark); }
.dz .ar-label span { display:block; font-size:clamp(7px, 1.75cqw, 10px); font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--dz-on-dark-muted); }
.dz .ar-item.on .ar-label b { color:#15803D; }
@media (max-width: 640px) {
  .dz .ar-centre { width:34%; padding:4%; }
}
.dz .ar-note { margin:10px auto 0; max-width:34rem; text-align:center; font-size:14px; line-height:1.45; color:var(--dz-on-dark-muted); }
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
      <div className="ar-head">
        <span>What Dakzin recognises</span>
        <i>Live detection</i>
      </div>
      <div className="ar-sizer">
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
      </div>
      <p className="ar-note">
        Five crop-raiding wild animals, plus cattle and horses so livestock aren&apos;t mistaken for wildlife.
      </p>
    </div>
  );
}
