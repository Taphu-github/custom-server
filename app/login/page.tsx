"use client";
import { useEffect, useState } from "react";
import logo from "../AIDS_logo.png";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../../components/login-form";

// Split screen: sliding field photos on the left, login form on the right.
// On phones the photos become a strip across the top.
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
  // pos runs 0..SLIDES.length; the extra last position is a copy of the first photo,
  // so the slideshow keeps sliding left and then jumps back invisibly.
  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const active = pos % SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => {
      setAnimate(true);
      setPos((p) => p + 1);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (pos !== SLIDES.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setPos(0);
    }, 1000);
    return () => clearTimeout(t);
  }, [pos]);

  const goTo = (i: number) => {
    setAnimate(true);
    setPos(i);
  };

  return (
    <div className="grid min-h-svh w-screen bg-white lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      {/* Left: photo slideshow */}
      <div className="relative h-56 overflow-hidden bg-[#14532D] sm:h-72 lg:h-auto">
        <div
          className="flex h-full"
          style={{
            transform: `translateX(-${pos * 100}%)`,
            transition: animate ? "transform 1000ms ease-in-out" : "none",
          }}
          aria-hidden="true"
        >
          {[...SLIDES, SLIDES[0]].map((s, i) => (
            <div key={i} className="relative h-full w-full flex-shrink-0">
              <Image src={s.src} alt="" fill priority={i === 0} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>

        {/* Caption and dots on a soft bottom fade */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-7">
          <span className="inline-block rounded-full bg-[#16A34A] px-3 py-1 text-xs font-semibold text-white">
            In the field
          </span>
          <p className="mt-2 max-w-lg text-sm font-medium text-white sm:text-base" aria-live="polite">
            {SLIDES[active].caption}
          </p>
          <div className="mt-3 flex gap-1">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active}
                className="flex h-7 w-7 items-center justify-center"
              >
                <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#4ADE80]" : "w-2 bg-white/70"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: login */}
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-3 self-start">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-border">
            <Image src={logo} width={200} height={200} alt="Dakzin logo" />
          </div>
          <div>
            <p className="font-bold leading-tight">Dakzin</p>
            <p className="text-sm text-muted-foreground">AI-powered Animal Intrusion Detection System</p>
          </div>
        </Link>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            ← Back to home
          </Link>
          <span>Enabling Human-Wildlife Co-existence in Bhutan</span>
        </div>
      </div>
    </div>
  );
}
