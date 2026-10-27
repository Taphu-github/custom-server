import type { Metadata } from "next";
import { AboutPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "About · DakzinAI",
  description: "The story, partners and team behind DakzinAI.",
};

export default function Page() {
  return <AboutPage />;
}
