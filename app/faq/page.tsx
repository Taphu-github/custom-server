import { notFound } from "next/navigation";

// The FAQ page is switched off for now: /faq shows "page not found".
// To bring it back, replace this file's contents with:
//   import { FaqPage } from "@/components/landing/pages";
//   export default function Page() { return <FaqPage />; }
export default function Page() {
  notFound();
}
