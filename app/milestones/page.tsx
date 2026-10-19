import type { Metadata } from "next";
import { MilestonesPage } from "@/components/landing/milestones";

export const metadata: Metadata = {
  title: "Project milestones · Dakzin",
  description: "The Dakzin project timeline, partners, funding and pilot sites.",
};

export default function Page() {
  return <MilestonesPage />;
}
