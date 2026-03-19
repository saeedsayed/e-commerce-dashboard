import { z } from "zod";
export const createCouponSchema = z.object({
  code: z
    .string("Coupon code is required")
    .trim()
    .toUpperCase()
    .min(1, "Coupon code cannot be empty"),
  description: z.string("Description must be a string").optional(),
  discountType: z.enum(
    ["percentage", "fixed"],
    "Discount type is required & must be either 'percentage' or 'fixed'",
  ),
  discountValue: z
    .number("Discount value is required")
    .positive("Discount value must be greater than 0"),
  minOrderAmount: z
    .number("Minimum order amount must be a number")
    .min(0, "Minimum order amount cannot be negative")
    .default(0),
  maxDiscountAmount: z
    .number("Maximum discount amount must be a number")
    .positive("Maximum discount amount must be greater than 0")
    .optional(),
  // startDate: z.coerce.date("Start date is required"),
  // endDate: z.coerce.date("End date is required"),
  expiryDateRange: z
    .array(z.string(), "expiry date range is required")
    .length(2, "aaaaaaaaaa"),
  usageLimit: z
    .number("Usage limit must be a number")
    .int("Usage limit must be an integer")
    .positive("Usage limit must be greater than 0")
    .optional(),
});

export type TCreateCouponSchema = z.infer<typeof createCouponSchema>;
