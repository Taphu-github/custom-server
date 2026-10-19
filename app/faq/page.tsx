import type { Metadata } from "next";
import { FaqPage } from "@/components/landing/pages";

export const metadata: Metadata = {
  title: "FAQ · Dakzin",
  description: "Frequently asked questions about the Dakzin animal intrusion detection system.",
};

export default function Page() {
  return <FaqPage />;
}
