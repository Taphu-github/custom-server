"use client";

// Animated Dakzin architecture diagram.
// The base picture is /public/pages/architecture-base.jpg (the diagram with the tiger blanked out).
// On top of it, in the same 1018 × 566 coordinate space:
//   • the tiger (/public/pages/architecture-tiger.png) runs back and forth inside the repellent box,
//   • the bulb glows and the speakers send out sound waves,
//   • every connection shows data flowing along it, in the direction of the arrows.

const W = 1018;
const H = 566;

// Each connection: path in diagram pixels, and a delay so the flow ripples outwards from the cameras.
const LINKS = [
  { id: "cam-top", d: "M262 118 L478 192", delay: 0 },
  { id: "cam-bottom", d: "M245 396 L478 330", delay: 0 },
  { id: "to-repellent", d: "M478 266 L414 266", delay: 0.9 },
  { id: "to-server", d: "M668 268 L748 268", delay: 0.9 },
  { id: "to-sms", d: "M566 364 L566 424", delay: 0.9 },
  { id: "to-app", d: "M860 312 L860 414", delay: 1.8 },
  { id: "admin-a", d: "M797 162 L797 218", delay: 1.8 },
  { id: "admin-b", d: "M890 218 L890 162", delay: 1.8 },
];

const TIGER = { x: 293, y: 244, w: 114, h: 55 };

const CSS = `
.dz .ad { position:relative; width:100%; aspect-ratio:${W}/${H}; border-radius:12px; overflow:hidden; background:#fdfdfd; }
.dz .ad > img.base { position:absolute; inset:0; width:100%; height:100%; display:block; }
.dz .ad svg { position:absolute; inset:0; width:100%; height:100%; overflow:visible; }
.dz .ad .flow { fill:none; stroke:#16A34A; stroke-width:4; stroke-linecap:round; stroke-dasharray:10 14; animation:ad-flow 1.2s linear infinite; opacity:.9; }
.dz .ad .pkt { fill:#16A34A; filter:drop-shadow(0 0 4px rgba(22,163,74,.9)); }
.dz .ad .tiger { position:absolute; left:${(TIGER.x / W) * 100}%; top:${(TIGER.y / H) * 100}%;
                 width:${(TIGER.w / W) * 100}%; height:${(TIGER.h / H) * 100}%; animation:ad-run 2.4s ease-in-out infinite; transform-origin:60% 90%; }
.dz .ad .tiger img { width:100%; height:100%; display:block; animation:ad-bob .3s ease-in-out infinite alternate; }
.dz .ad .bulb { fill:#FDE047; animation:ad-glow 1.2s ease-in-out infinite; }
.dz .ad .wave { fill:none; stroke:#16A34A; stroke-width:2.5; stroke-linecap:round; animation:ad-wave 1.4s ease-out infinite; }
.dz .ad .wave.w2 { animation-delay:.45s; }
@keyframes ad-flow { to { stroke-dashoffset:-24; } }
@keyframes ad-run { 0%,100% { transform:translateX(0) } 45% { transform:translateX(-10%) } 55% { transform:translateX(-10%) scaleX(1) } }
@keyframes ad-bob { from { transform:translateY(0) rotate(0deg) } to { transform:translateY(-6%) rotate(-2deg) } }
@keyframes ad-glow { 0%,100% { opacity:.15 } 50% { opacity:.75 } }
@keyframes ad-wave { from { opacity:.9; transform:scale(.6) } to { opacity:0; transform:scale(1.4) } }
@media (prefers-reduced-motion: reduce) {
  .dz .ad .flow, .dz .ad .tiger, .dz .ad .tiger img, .dz .ad .bulb, .dz .ad .wave { animation:none; }
  .dz .ad .pkt { display:none; }
}
`;

export default function ArchitectureDiagram() {
  return (
    <div className="ad" role="img" aria-label="Dakzin system architecture: field cameras feed the Dakzin unit, which drives the repellent system (lights, sound and a tiger doll) and sends detections over the Internet to the Dakzin server; farmers are notified on the mobile app or by SMS and call, and admins manage the system from the dashboard.">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="base" src="/pages/architecture-base.jpg" alt="" />

      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {/* bulb glow */}
        <circle className="bulb" cx="263" cy="263" r="20" />

        {/* speaker sound waves */}
        {[
          { x: 270, y: 208, r: -1 },
          { x: 272, y: 318, r: -1 },
        ].map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y})`}>
            <path className="wave" d="M8 -10 Q16 0 8 10" style={{ transformOrigin: "0 0", transformBox: "view-box" }} />
            <path className="wave w2" d="M14 -16 Q26 0 14 16" style={{ transformOrigin: "0 0", transformBox: "view-box" }} />
          </g>
        ))}

        {/* flowing connections with a moving data packet */}
        {LINKS.map((l) => (
          <g key={l.id}>
            <path className="flow" d={l.d} style={{ animationDelay: `${l.delay}s` }} />
            <circle className="pkt" r="6">
              <animateMotion dur="2.7s" repeatCount="indefinite" path={l.d} begin={`${l.delay}s`} />
            </circle>
          </g>
        ))}
      </svg>

      <div className="tiger" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pages/architecture-tiger.png" alt="" />
      </div>
    </div>
  );
}
