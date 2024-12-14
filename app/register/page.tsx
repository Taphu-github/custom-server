import { RegisterForm } from "../../components/register-form"
import Image from 'next/image'
import logo from '../AIDS_logo.png'
import sideImage from '../deer.jpg'

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 w-screen">
       <div className="relative hidden bg-muted lg:block">
      <Image
          src={sideImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary-foreground">
            <Image src={logo} width={300} height={300} alt="Image" />
            </div>
            <p className='font-bold text-xl'>Animal Intrusion Detection System</p>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
     
    </div>
  )
}

