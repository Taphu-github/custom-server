"use client";
import logo from "../AIDS_logo.png";
import photo from "../login-bg.jpg";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "../../components/login-form";

// Dark green page (#14532D, same as the landing header) with one card:
// field-site photo on the left, login on the right.
// On phones the photo becomes a strip across the top of the card.
export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-screen items-center justify-center bg-[#14532D] p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        {/* Photo */}
        <div className="relative h-52 sm:h-72 lg:h-auto lg:min-h-[600px]">
          <Image
            src={photo}
            alt="The Dakzin team at a pilot site, with the tiger doll and speaker of the repellent system"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 512px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              In the field
            </span>
            <p className="mt-2 text-sm font-medium text-white sm:text-base">
              The Dakzin team at a pilot site, with the repellent system&apos;s tiger doll and speaker.
            </p>
          </div>
        </div>

        {/* Login */}
        <div className="flex flex-col justify-center gap-8 p-6 sm:p-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-border">
              <Image src={logo} width={200} height={200} alt="Dakzin logo" />
            </div>
            <div>
              <p className="font-bold leading-tight">Dakzin: AI-powered Animal Intrusion Detection System</p>
              <p className="text-sm text-muted-foreground">Enabling Human-Wildlife Co-existence in Bhutan</p>
            </div>
          </Link>

          <LoginForm />

          <Link href="/" className="text-center text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
