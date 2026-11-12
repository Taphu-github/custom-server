"use client";

// Home hero: "The Problem" card, in the project's own wording.

const CSS = `
.dz .hs { margin:20px 0 0; max-width:38rem; }
.dz .hs-problem { background:#fff; border-radius:18px; padding:16px 20px; box-shadow:0 8px 24px rgba(20,83,45,.12); border-left:5px solid #14532D; }
.dz .hs-label { margin:0 0 6px; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#14532D; }
.dz .hs-problem p.txt { margin:0; font-size:15px; line-height:1.55; color:#3F4A44; }
.dz .hs-problem p.txt strong { color:#14532D; }
`;

export default function HeroSummary() {
  return (
    <div className="hs">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hs-problem">
        <p className="hs-label">The Problem</p>
        <p className="txt">
          HWC, particularly wildlife intrusion into agricultural fields, threatens farmers&apos;
          livelihoods, food security and productive time in Bhutan. Existing approaches have
          limitations. Electric fencing requires high maintenance costs, while chain-link fencing
          needs substantial installation cost and is unsuitable for smallholder farms and climbing
          animals. The timer-based repellent system lacks animal detection and causes animal
          habituation. <strong>DakzinAI addresses these gaps as an intelligent &ldquo;virtual fence&rdquo;.</strong>
        </p>
      </div>
    </div>
  );
}
