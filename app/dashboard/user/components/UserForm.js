"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import dzongkhagData from "../../../dzongkhag.json";

// Reusable password input
const PasswordInput = ({
  id,
  name,
  value,
  show,
  setShow,
  onChange,
  placeholder,
}) => (
  <div className="relative">
    <Input
      type={show ? "text" : "password"}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
      onClick={() => setShow(!show)}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  </div>
);

export default function UserForm({ currentUser, setIsDialogOpen, onSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    cid: "",
    full_name: "",
    email: "",
    phone: "",
    dzongkhag: "",
    gewog: "",
    village: "",
    role: "user",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // ✅ Initialize state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        cid: currentUser.cid || "",
        full_name: currentUser.full_name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        dzongkhag: currentUser.dzongkhag || "",
        gewog: currentUser.gewog || "",
        village: currentUser.village || "",
        role: currentUser.role || "user",
        password: "",
        confirmPassword: "",
      });
    } else {
      setFormData({
        username: "",
        cid: "",
        full_name: "",
        email: "",
        phone: "",
        dzongkhag: "",
        gewog: "",
        village: "",
        role: "user",
        password: "",
        confirmPassword: "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone && !/^\d{8}$/.test(formData.phone)) {
      alert("Phone number must be exactly 8 digits");
      return;
    }

    if (formData.email) {
      formData.email = formData.email.trim().toLowerCase();
    }

    try {
      const method = currentUser ? "PATCH" : "POST";
      const url = currentUser ? `/api/users/${currentUser._id}` : `/api/users`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save user");

      setIsDialogOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`/api/users/${currentUser._id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: formData.password }),
      });

      if (!res.ok) throw new Error("Failed to update password");

      alert("Password updated");
      setIsDialogOpen(false);
      onSuccess?.();
    } catch (error) {
      setPasswordError(error.message);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {["username", "cid", "full_name", "email", "phone"].map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>{field.replace("_", " ")}</Label>
            <Input
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {!currentUser && (
          <div className="space-y-2">
            <Label>Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              show={showPassword}
              setShow={setShowPassword}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Dzongkhag</Label>
          <Select
            value={formData.dzongkhag}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, dzongkhag: val, gewog: "" }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Dzongkhag" />
            </SelectTrigger>
            <SelectContent>
              {dzongkhagData.map((d) => (
                <SelectItem key={d.dzongkhag} value={d.dzongkhag}>
                  {d.dzongkhag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Gewog</Label>
          <Select
            value={formData.gewog}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, gewog: val }))
            }
            disabled={!formData.dzongkhag}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gewog" />
            </SelectTrigger>
            <SelectContent>
              {dzongkhagData
                .find((d) => d.dzongkhag === formData.dzongkhag)
                ?.gewogs.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Village</Label>
          <Input
            name="village"
            value={formData.village}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Role</Label>
          <Select
            value={formData.role}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, role: val }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit">
        {currentUser ? "Save changes" : "Create User"}
      </Button>
    </form>
  );

  return !currentUser ? (
    <>
      <CardHeader>
        <CardTitle>Create User</CardTitle>
        <CardDescription>
          Fill in the details to create a new user.
        </CardDescription>
      </CardHeader>
      <CardContent>{renderForm()}</CardContent>
    </>
  ) : (
    <Tabs defaultValue="account" className="w-full max-w-[800px]">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update user info</CardDescription>
          </CardHeader>
          <CardContent>{renderForm()}</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <PasswordInput
                id="password"
                name="password"
                placeholder="New password"
                show={showPassword}
                setShow={setShowPassword}
                value={formData.password}
                onChange={handleChange}
              />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                show={showPassword}
                setShow={setShowPassword}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
