"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { itemSchema, updateItemSchema } from "@/schemas/itemSchema";

export default function ItemFormDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  mode = "create",
  defaultValues = {},
}) {
  const [categories, setCategories] = useState([]);
  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateItemSchema : itemSchema),
    defaultValues,
  });

  useEffect(() => {
    // Fetch categories and devices
    const fetchData = async () => {
      try {
        const categoriesRes = await fetch("/api/item_categories");

        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesRes.json();
        console.info("Categories", categoriesData.data);
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (isOpen && defaultValues && isEdit) {
  //     reset(isEdit && defaultValues ? defaultValues : {});
  //   }
  // }, [isOpen, defaultValues, reset, isEdit]);

  useEffect(() => {
    if (isOpen) {
      if (isEdit && defaultValues) {
        reset(defaultValues);
      } else {
        reset({
          name: "",
          unique_identifier: "",
          model_number: "",
          supplier_name: "",
          purchase_date: "",
          category: "",
          specifications: "",
          used: "",
          functional: "",
        });
      }
    }
  }, [isOpen, defaultValues, reset, isEdit]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Item" : "Add Item"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-4 grid grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="unique_identifier">Unique Identifier</Label>
            <Input
              id="unique_identifier"
              {...register("unique_identifier")}
              disabled={isEdit}
            />
            {errors.unique_identifier && (
              <p className="text-sm text-red-500">
                {errors.unique_identifier.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model_number">Model Number</Label>
            <Input id="model_number" {...register("model_number")} />
            {errors.model_number && (
              <p className="text-sm text-red-500">
                {errors.model_number.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier_name">Supplier Name</Label>
            <Input id="supplier_name" {...register("supplier_name")} />
            {errors.supplier_name && (
              <p className="text-sm text-red-500">
                {errors.supplier_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchase_date">Purchase Date</Label>
            <Input
              type="date"
              id="purchase_date"
              {...register("purchase_date")}
              max={new Date().toISOString().split("T")[0]}
            />
            {errors.purchase_date && (
              <p className="text-sm text-red-500">
                {errors.purchase_date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue={defaultValues?.category?._id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="device">Device</Label>
            <Select
              onValueChange={(value) => setValue("device", value)}
              defaultValue={defaultValues?.device?._id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                {devices.map((device) => (
                  <SelectItem key={device._id} value={device._id}>
                    {device.d_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.device && (
              <p className="text-sm text-red-500">{errors.device.message}</p>
            )}
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Input id="specifications" {...register("specifications")} />
            {errors.specifications && (
              <p className="text-sm text-red-500">
                {errors.specifications.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 col-span-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="used">Used</Label>
              <Select
                onValueChange={(value) => setValue("used", value)}
                defaultValue={defaultValues?.used}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.used && (
                <p className="text-sm text-red-500">{errors.used.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="functional">Functional</Label>
              <Select
                onValueChange={(value) => setValue("functional", value)}
                defaultValue={defaultValues?.functional}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              {errors.functional && (
                <p className="text-sm text-red-500">
                  {errors.functional.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
