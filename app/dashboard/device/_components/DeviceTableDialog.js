"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deviceSchema,
  editDeviceSchema,
} from "../../../../schemas/deviceSchema";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Switch } from "@/components/ui/switch"; // Add this import

export default function DeviceFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  mode = "create",
  defaultValues = {},
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [includePassword, setIncludePassword] = useState(false);
  const isEdit = mode === "edit";

  const schema = isEdit ? editDeviceSchema : deviceSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      includePassword ? schema : schema.omit({ password: true })
    ),
    defaultValues,
  });

  // const handleFormSubmit = (data) => {
  //   if (!includePassword) {
  //     const { password, ...restData } = data;
  //     onSubmit(restData);
  //   } else {
  //     onSubmit(data);
  //   }
  // };

  useEffect(() => {
    if (isOpen) {
      // Add null check before destructuring
      if (defaultValues) {
        const { password, ...valuesWithoutPassword } = defaultValues;
        reset(valuesWithoutPassword);
      } else {
        reset({});
      }
    } else {
      setTimeout(() => {
        document.activeElement?.blur();
      }, 50);
    }
  }, [isOpen, defaultValues, reset]);

  const handleFormSubmit = (data) => {
    if (!includePassword) {
      const { password, ...restData } = data;
      onSubmit(restData);
    } else {
      onSubmit(data);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="device-dialog-desc">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Device" : "Add New Device"}</DialogTitle>
          <p id="device-dialog-desc" className="text-sm text-muted-foreground">
            {isEdit
              ? "You can only edit the device name and password."
              : "Please provide all required information to add a new device."}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {!isEdit && (
              <div className="space-y-2">
                <Label htmlFor="d_id">Device ID</Label>
                <Input id="d_id" {...register("d_id")} />
                {errors.d_id && (
                  <p className="text-sm text-red-500">{errors.d_id.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="d_name">Device Name</Label>
              <Input id="d_name" {...register("d_name")} />
              {errors.d_name && (
                <p className="text-sm text-red-500">{errors.d_name.message}</p>
              )}
            </div>

            <div className="space-y-2 col-span-2 sm:col-span-1 mt-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="include-password" className="text-sm">
                    {includePassword ? "Include" : "Exclude"}
                  </Label>
                  <Switch
                    id="include-password"
                    checked={includePassword}
                    onCheckedChange={setIncludePassword}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  placeholder="Enter password"
                  disabled={!includePassword}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={!includePassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && includePassword && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {!isEdit && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...register("location")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mac_address">MAC Address</Label>
                  <Input id="mac_address" {...register("mac_address")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installed_date">Installed Date</Label>
                  <Input
                    type="date"
                    id="installed_date"
                    max={new Date().toISOString().split("T")[0]}
                    {...register("installed_date")}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <textarea
                    id="remarks"
                    rows={3}
                    className="w-full border rounded-md p-2"
                    {...register("remarks")}
                  />
                </div>
              </>
            )}
          </div>
          <Button type="submit">{isEdit ? "Save Changes" : "Save"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
