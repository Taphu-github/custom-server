import type { Metadata } from "next";
import { NewsPage } from "@/components/landing/news";

export const metadata: Metadata = {
  title: "News · Dakzin",
  description: "Updates from the Dakzin project: collaborations, site setups and field work.",
};

export default function Page() {
  return <NewsPage />;
}
