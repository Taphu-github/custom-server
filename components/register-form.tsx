import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 ", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="user_id">User ID</Label>
          <Input id="user_id" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cid">CID</Label>
          <Input id="cid" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input id="full_name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dzongkhag">Dzongkhag</Label>
          <Select>
            <SelectTrigger id="dzongkhag">
              <SelectValue placeholder="Select Dzongkhag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thimphu">Thimphu</SelectItem>
              <SelectItem value="paro">Paro</SelectItem>
              {/* Add more Dzongkhags as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gewog">Gewog</Label>
          <Select>
            <SelectTrigger id="gewog">
              <SelectValue placeholder="Select Gewog" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gewog1">Gewog 1</SelectItem>
              <SelectItem value="gewog2">Gewog 2</SelectItem>
              {/* Add more Gewogs as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="village">Village</Label>
          <Input id="village" required />
        </div>
        <Button type="submit" className="w-full col-span-2">
          Register
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </form>
  )
}

