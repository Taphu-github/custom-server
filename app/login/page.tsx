'use client';
import logo from "../AIDS_logo.png";
import sideImage from "../elephant.jpg";

import Image from "next/image";
import { LoginForm } from "../../components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-screen">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary-foreground">
              <Image src={logo} width={200} height={200} alt="Image" />
            </div>
            <p className='font-bold text-xl'>Animal Intrusion Detection System</p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={sideImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}