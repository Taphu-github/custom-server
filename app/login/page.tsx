"use client";
import { useEffect, useState } from "react";
import logo from "../AIDS_logo.png";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../../components/login-form";

// Full-screen slideshow of field photos behind a centred login card.
// Photos live in /public/login. To change them, edit this list.
const SLIDES = [
  { src: "/login/launch-banner.jpg", caption: "Dakzin System Launch · Trongsa & Zhemgang, September 2025" },
  { src: "/login/site-team.jpg", caption: "The team at a Dakzin repellent station" },
  { src: "/login/user-training.jpg", caption: "Hands-on user training with farmers" },
  { src: "/login/launch-community.jpg", caption: "Launching the system with the local community" },
  { src: "/login/inauguration.jpg", caption: "Inaugurating the system at a pilot site" },
];

const SLIDE_MS = 6000;

export default function LoginPage() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex min-h-svh w-screen items-center justify-center overflow-hidden bg-[#14532D] p-4 sm:p-8">
      {/* Background slideshow: photos cross-fade with a slow zoom */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover transition-[opacity,transform] ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "scale(1.08)" : "scale(1)",
              transitionDuration: `1500ms, ${SLIDE_MS + 1500}ms`,
            }}
          />
        ))}
        {/* Soft shade so the card and caption stand out on any photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/65" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white/95 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-border">
            <Image src={logo} width={200} height={200} alt="Dakzin logo" />
          </div>
          <div>
            <p className="font-bold leading-tight">Dakzin: AI-powered Animal Intrusion Detection System</p>
            <p className="text-sm text-muted-foreground">Enabling Human-Wildlife Co-existence in Bhutan</p>
          </div>
        </Link>

        <LoginForm />

        <Link href="/" className="mt-8 block text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
          ← Back to home
        </Link>
      </div>

      {/* Caption + slide dots */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
        <p className="text-sm font-medium text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.7)]" aria-live="polite">
          {SLIDES[active].caption}
        </p>
        <div className="flex gap-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === active}
              className="flex h-7 w-7 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#4ADE80]" : "w-2 bg-white/70"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
