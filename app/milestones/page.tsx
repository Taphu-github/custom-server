import type { Metadata } from "next";
import { MilestonesPage } from "@/components/landing/milestones";

export const metadata: Metadata = {
  title: "Project milestones · DakzinAI",
  description: "The DakzinAI journey: prototypes, funding, pilot sites and technology release.",
};

export default function Page() {
  return <MilestonesPage />;
}
