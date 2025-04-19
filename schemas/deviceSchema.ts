// schemas/deviceSchema.ts
import { z } from "zod";

export const deviceSchema = z.object({
  d_id: z.string().min(3, "Device ID is required"),
  d_name: z.string().min(3, "Device Name is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  location: z.string().optional(),
  mac_address: z.string().optional(),
  installed_date: z.string().date(),
  remarks: z.string().optional(),
});

export const editDeviceSchema = deviceSchema.pick({
  d_name: true,
  password: true,
});
