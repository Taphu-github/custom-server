'use client';
import localFont from "next/font/local";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <main className="flex justify-center items-center w-full">
            {children}
          </main>
        </SidebarProvider>
  );
}
