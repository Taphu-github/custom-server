import type { Metadata } from "next";
import { NewsPage } from "@/components/landing/news";

export const metadata: Metadata = {
  title: "News · DakzinAI",
  description: "News from the DakzinAI project: recognition, development, field work and technology release.",
};

export default function Page() {
  return <NewsPage />;
}
