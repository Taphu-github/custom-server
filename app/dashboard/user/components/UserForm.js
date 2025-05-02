"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // or 'react-hot-toast'

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
    remarks: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone && !/^\d{8}$/.test(formData.phone)) {
      toast.error("Phone number must be exactly 8 digits");
      return;
    }

    if (formData.email) {
      formData.email = formData.email.trim().toLowerCase();
    }

    setFormDataToSubmit(formData);
    setShowConfirmDialog(true);
  };

  const handleConfirmedSubmit = async () => {
    try {
      const method = currentUser ? "PATCH" : "POST";
      const url = currentUser ? `/api/users/${currentUser._id}` : `/api/users`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSubmit),
      });

      const responseData = await res.json();

      if (!res.ok) {
        toast.error("Failed to save user", {
          description: responseData.message || "Unknown error",
        });
        return;
      }

      toast.success("User saved successfully");
      setIsDialogOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        description: err.message,
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        cid: currentUser.cid,
        full_name: currentUser.full_name,
        email: currentUser.email,
        phone: currentUser.phone,
        dzongkhag: currentUser.dzongkhag,
        gewog: currentUser.gewog,
        village: currentUser.village,
        role: currentUser.role,
        password: "",
        confirmPassword: "",
        remarks: currentUser.remarks,
      });
    }
  }, [currentUser]);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {["username", "cid", "full_name", "email"].map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{field.replace("_", " ")}</Label>
              <Input
                id={field}
                name={field}
                type="text"
                placeholder={`Enter ${field.replace("_", " ")}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div key="phone" className="space-y-2">
            <Label htmlFor="phone">Phone No.</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
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
            <select
              value={formData.dzongkhag}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dzongkhag: e.target.value,
                  gewog: "",
                }))
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select Dzongkhag</option>
              {dzongkhagData.map((d) => (
                <option key={d.dzongkhag} value={d.dzongkhag}>
                  {d.dzongkhag}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Gewog</Label>
            <select
              value={formData.gewog}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gewog: e.target.value }))
              }
              disabled={!formData.dzongkhag}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select Gewog</option>
              {dzongkhagData
                .find((d) => d.dzongkhag === formData.dzongkhag)
                ?.gewogs.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
            </select>
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
          <div className="space-y-2 md:col-span-2">
            <Label>Remarks</Label>
            <Textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button type="submit">
          {currentUser ? "Save changes" : "Create User"}
        </Button>
      </form>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Save</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {currentUser ? "update" : "create"} this
              user?
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-sm text-slate-500">
                      Personal Information
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-500">Username:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.username}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Full Name:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.full_name}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">CID:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.cid}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Role:</span>{" "}
                        <span className="font-medium capitalize">
                          {formDataToSubmit?.role}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-sm text-slate-500">
                      Contact Details
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-500">Email:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.email}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Phone:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.phone}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-green-50 rounded-lg col-span-2">
                    <h3 className="font-semibold text-sm text-slate-500">
                      Address Information
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-slate-500">Dzongkhag:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.dzongkhag}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Gewog:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.gewog}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-500">Village:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.village}
                        </span>
                      </p>
                    </div>
                  </div>

                  {formDataToSubmit?.remarks && (
                    <div className="space-y-2 p-3 bg-slate-50 rounded-lg col-span-2">
                      <h3 className="font-semibold text-sm text-slate-500">
                        Additional Information
                      </h3>
                      <p className="text-sm">
                        <span className="text-slate-500">Remarks:</span>{" "}
                        <span className="font-medium">
                          {formDataToSubmit?.remarks}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>
              {currentUser ? "Update" : "Create"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
