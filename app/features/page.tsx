import type { Metadata } from "next";
import { FeaturesPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "Features · Dakzin",
  description: "Detection, alerts, the Animal Repellent System and the Dakzin dashboard.",
};

export default function Page() {
  return <FeaturesPage />;
}
