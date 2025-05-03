import { z } from "zod";

// Schema for addon categories
export const itemCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name is required and must be at least 2 characters"),
  remarks: z.string().optional(),
});

// Schema for device addons
export const itemSchema = z.object({
  name: z.string().min(2, "Name is required"),
  purchase_date: z.string().date("Invalid date format"),
  supplier_name: z.string().min(2, "Supplier name is required"),
  unique_identifier: z.string().min(2, "Unique identifier is required"),
  specifications: z.string().optional(),
  model_number: z.string().min(1, "Model number is required"),
  category: z.string().min(1, "Category is required"),
  used: z.enum(["yes", "no"], {
    required_error: "Used status must be either 'yes' or 'no'",
    invalid_type_error: "Used status must be either 'yes' or 'no'",
  }),
  functional: z.enum(["yes", "no"], {
    required_error: "Functional status must be either 'yes' or 'no'",
    invalid_type_error: "Functional status must be either 'yes' or 'no'",
  }),
  // device: z.string().min(1, "Device ID is required"),
});

// Schema for updating addon category (all fields optional)
export const updateItemCategorySchema = itemCategorySchema.partial();

// Schema for updating device addon (all fields optional)
export const updateItemSchema = itemSchema.partial();
