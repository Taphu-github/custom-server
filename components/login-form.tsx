"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Add this state
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    // Check if the user is already logged in
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); // Clear previous errors

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    console.log("Data", username, password);
    

    try {
      const response = await fetch("/api/auth/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Invalid login credentials");
        // toast.error(errorData.message || "Invalid login credentials");
        return;
      }

      const data = await response.json(); // Extract the JSON body
      const { user, token } = data;

      // Store user and token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setError("Login failed. Please try again.");

      // setError((prev) => {
      //   return (prev = "");
      // });

      // toast.error("Login failed. Please try again.");
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">User Name</Label>
          <Input
            id="username"
            name="username"
            placeholder="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>

        {error && (
          <Card className="flex justify-start items-center border-[1px] border-red-500 transition-all ease-in-out">
            <CardHeader className="text-red-500">
              <CircleAlert className="h-8 w-8" />
            </CardHeader>
            <div>
              <CardTitle className="text-red-500">Error</CardTitle>
              <p className="text-md text-red-500 text-center mt-2">{error}</p>
            </div>
          </Card>
        )}
        <>
          {/* Button trigger modal */}
          <button 
            type="button" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            onClick={openModal}
          >
            Click to know about the Dakzin Project
          </button>

          {/* Modal */}
          {isOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              {/* Modal Dialog */}
              <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Content */}
                <div className="flex flex-col">
                  
                  {/* Modal Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h5 className="text-lg font-semibold text-gray-900">
                      About Dakzin
                    </h5>
                    <button 
                      type="button" 
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold w-6 h-6 flex items-center justify-center"
                      onClick={closeModal}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  
                  {/* Modal Body */}
                  <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                    <p>{"This web app was developed as a part of AIoT-based Animal Intrusion Detection System. This system prototype was initially developed as the student project(2023-2024) by College of Science and Technology (CST), Royal University of Bhutan in collaboration with Agriculture Machinery and Technology Center (AMTC), Paro, Department of Agriculture /Ministry of Agriculture and Livestocks. The system is enhanced  through the project titled “ Smart Solution for Human-Wildlife Conflict: Implementing an Intrusion Detection System” funded by Bhutan Foundation, Thimphu and co-financed by AMTC and CST from 2024-2025.\n\nThis collaborative effort leverages CST's expertise in engineering and technology to create a solution that not only safeguards crops but also enabling harmonious coexistence between human and wildlife towards ensuring the sustainable food security of Bhutan. \n\nThis project was conceptualized by IT Department of the College of Science & Technology and started working on as the student project 2021."}</p>
                  </div>
                  
                  {/* Modal Footer
                  <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
                    <button 
                      type="button" 
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button 
                      type="button" 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={closeModal}
                    >
                      Got it!
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </>


      </div>
    </form>
  );
}
