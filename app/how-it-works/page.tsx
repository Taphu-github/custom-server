import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "How it works · Dakzin",
  description: "How Dakzin detects animals, alerts farmers and repels wildlife.",
};

export default function Page() {
  return <HowItWorksPage />;
}
