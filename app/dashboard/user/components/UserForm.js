"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import data from "../../../dzongkhag.json";

// Form field configuration
const formFields = [
  { id: "username", label: "Username", type: "text" },
  { id: "cid", label: "CID", type: "text" },
  { id: "full_name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "phone", label: "Phone", type: "text" },
  // { id: "dzongkhag", label: "Dzongkhag", type: "text" },
  // { id: "gewog", label: "Gewog", type: "text" },
  // { id: "village", label: "Village", type: "text" },
];

const PasswordInput = ({
  showPassword,
  setShowPassword,
  id,
  name,
  placeholder,
}) => (
  <div className="relative">
    <Input
      type={showPassword ? "text" : "password"}
      id={id}
      name={name}
      placeholder={placeholder}
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
);

const RoleSelect = ({ defaultValue = "user" }) => (
  <Select name="role" defaultValue={defaultValue}>
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select Role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="user">User</SelectItem>
    </SelectContent>
  </Select>
);

const FormField = ({ field, value }) => (
  <div className="space-y-2">
    <Label htmlFor={field.id}>{field.label}</Label>
    <Input
      id={field.id}
      name={field.id}
      type={field.type}
      defaultValue={value}
      required
    />
  </div>
);

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Remove the toast-related code and simplify the handlers
export default function UserForm({ currentUser, setIsDialogOpen, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [selectedDzongkhag, setSelectedDzongkhag] = useState("");
  const [selectedGewog, setSelectedGewog] = useState("");
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = async (data) => {
    try {
      const url = currentUser ? `/api/users/${currentUser._id}` : "/api/users";
      const method = currentUser ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok)
        throw new Error(`Failed to ${currentUser ? "update" : "create"} user`);

      setIsDialogOpen(false);
      onSuccess(); // Refresh the user table
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPassword = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`/api/users/${currentUser._id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      if (!response.ok) throw new Error(`Failed to update password`);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    // Phone validation
    const phone = userData.phone;
    if (phone && !/^\d{8}$/.test(phone)) {
      alert("Phone number must be exactly 8 digits");
      return;
    }

    // Email formatting
    if (userData.email) {
      userData.email = userData.email.toLowerCase();
    }

    setFormData(userData);
  };

  // Update the phone input field with maxLength
  const FormField = ({ field, value }) => (
    <div className="space-y-2">
      <Label htmlFor={field.id}>{field.label}</Label>
      <Input
        id={field.id}
        name={field.id}
        type={field.type}
        defaultValue={value}
        required
        maxLength={field.id === "phone" ? 8 : undefined}
        pattern={field.id === "phone" ? "[0-9]{8}" : undefined}
        onInput={
          field.id === "phone"
            ? (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 8);
              }
            : undefined
        }
      />
    </div>
  );

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {formFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            value={currentUser?.[field.id]}
          />
        ))}
        {!currentUser && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              id="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
        )}
        <div className="space-y-2">
          <Label>Dzongkhag</Label>
          <Select
            name="dzongkhag"
            value={selectedDzongkhag}
            onValueChange={(value) => {
              setSelectedDzongkhag(value);
              setSelectedGewog(""); // Reset gewog when dzongkhag changes
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Dzongkhag" />
            </SelectTrigger>
            <SelectContent>
              {data.map((d) => (
                <SelectItem key={d.dzongkhag} value={d.dzongkhag}>
                  {d.dzongkhag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gewog Dropdown */}
        <div className="space-y-2">
          <Label>Gewog</Label>
          <Select
            name="gewog"
            value={selectedGewog}
            onValueChange={setSelectedGewog}
            disabled={!selectedDzongkhag}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gewog" />
            </SelectTrigger>
            <SelectContent>
              {data
                .find((d) => d.dzongkhag === selectedDzongkhag)
                ?.gewogs.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        {/* Village Dropdown */}
        <FormField
          key={"village"}
          field={{ id: "village", label: "Village", type: "text" }}
          value={currentUser?.["village"]}
        />
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <RoleSelect defaultValue={currentUser?.role || "user"} />
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="submit">
            {currentUser ? "Save changes" : "Create User"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {currentUser
                ? "This will update the user's information."
                : "This will create a new user account."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => formData && handleFormSubmit(formData)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );

  if (!currentUser) {
    return (
      <>
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            Fill in the details to create a new user account.
          </CardDescription>
        </CardHeader>
        <CardContent>{renderForm()}</CardContent>
      </>
    );
  }

  return (
    <Tabs defaultValue="account" className="w-full max-w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account Details</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Details</CardTitle>
            <CardDescription>
              Make changes to user account details here.
            </CardDescription>
          </CardHeader>
          <CardContent>{renderForm()}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Password</CardTitle>
            <CardDescription>
              Change the user&apos;s password here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="password-form"
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  id="new-password"
                  name="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <PasswordInput
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                />
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
              <Button type="submit">Update password</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
