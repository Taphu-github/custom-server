"use client";

// Auto-sliding animal photos for the landing page hero.
// Same library, photos and timing as the login page carousel (components/carousel-plugin.tsx).

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { HERO_IMAGES } from "./site-content";

const CSS = `
.dz .hc { position:absolute; inset:0; overflow:hidden; }
.dz .hc-track { display:flex; height:100%; }
.dz .hc-slide { position:relative; flex:0 0 100%; min-width:0; height:100%; }
.dz .hc-slide img { filter:grayscale(1); }
.dz .hc-dots { position:absolute; left:0; right:0; bottom:12px; display:flex; justify-content:center; gap:4px; z-index:2; }
.dz .hc-dot { width:28px; height:28px; border:0; padding:0; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.dz .hc-dot span { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.6); transition:width .2s, background .2s; }
.dz .hc-dot[aria-current="true"] span { width:22px; border-radius:4px; background:#4ADE80; }
`;

export default function HeroCarousel() {
  // Changes photo every 3 seconds, and keeps going after a dot is clicked.
  const autoplay = useRef(
    Autoplay({ delay: 3000, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <>
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div className="hc" ref={emblaRef} aria-roledescription="carousel" aria-label="Animals detected by Dakzin">
      <div className="hc-track">
        {HERO_IMAGES.map((img, i) => (
          <div
            className="hc-slide"
            key={img.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${HERO_IMAGES.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 900px) 100vw, 560px"
              style={{ objectFit: "cover" }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      <div className="hc-dots">
        {HERO_IMAGES.map((img, i) => (
          <button
            type="button"
            className="hc-dot"
            key={img.src}
            aria-label={`Show photo ${i + 1}`}
            aria-current={selected === i}
            onClick={() => goTo(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
    </>
  );
}
