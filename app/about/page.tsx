import type { Metadata } from "next";
import { AboutPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "About · Dakzin",
  description: "The story, partners and team behind Dakzin.",
};

export default function Page() {
  return <AboutPage />;
}
