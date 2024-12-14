"use client"
import { useEffect } from "react"
import LoginPage from "./login/page";
import { useRouter } from "next/navigation";

export default function AnimalIntrusionDashboard() {
  const router = useRouter();

  // List of protected routes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const protectedRoutes = ['/login', '/register'];


    // Redirect to login if trying to access protected routes without a token
    if (!token && !protectedRoutes.includes(router.pathname)) {
      router.push('/login');
    }
  }, [router]);
  return (
    <div className="w-full h-screen ">
    <LoginPage/>
    </div>
  )
}
