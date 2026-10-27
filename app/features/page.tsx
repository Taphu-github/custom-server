import type { Metadata } from "next";
import { FeaturesPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "Features · DakzinAI",
  description: "Detection, alerts, the Animal Repellent System and the DakzinAI dashboard.",
};

export default function Page() {
  return <FeaturesPage />;
}
