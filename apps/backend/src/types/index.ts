import z from "zod";

const ValidDomainExtensions = [
  "com",
  "org",
  "net",
  "info",
  ".biz",
  ".gov",
  ".edu",
  ".mil",
  ".co",
  ".io",
  ".me",
  ".app",
  ".dev",
  ".xyz",
  ".online",
  ".store",
  ".site",
  ".tech",
  ".pro",
  ".name",
  ".tv",
  ".cc",
  ".us",
  ".asia",
];

export const DomainListingSchema = z.object({
  domainName: z
    .string({
      required_error: "Domain name is required",
    })
    .min(1, "Domain name is required")
    .regex(
      /^[a-zA-Z0-9-]+\.(com|org)$/,
      "Domain name must be in a valid format (e.g., domain.com or domain.org)"
    )
    .refine(
      (domainName) => {
        const parts = domainName.split(".");
        return ValidDomainExtensions.includes(parts[parts.length - 1]);
      },
      {
        message: "Domain extension must be valid",
      }
    ),
  description: z.string().optional(),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, "Price must be at least 1 digit"),
});

export const DomainListQuerySchema = z.object({
  domainName: z
    .string()
    .trim()
    .min(1, { message: "Domain name must not be empty if provided" })
    .optional(),
  status: z
    .string()
    .trim()
    .refine((val) => ["PENDING", "VERIFIED", "SOLD"].includes(val), {
      message: "Invalid status value",
    })
    .optional(),
  category: z
    .string()
    .trim()
    .min(1, { message: "Invalid category" })
    .optional(),
  minPrice: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "minPrice must be a valid number",
    })
    .optional(),
  maxPrice: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), {
      message: "maxPrice must be a valid number",
    })
    .optional(),
  page: z
    .string()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "Page must be a positive number" })
    .optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, {
      message: "Limit must be between 1 and 100",
    }),
  sortBy: z
    .string()
    .optional()
    .refine(
      (val) => !val || ["domainName", "price", "createdAt"].includes(val),
      {
        message: "sortBy must be one of 'domainName' or 'price'",
      }
    ),
  sortOrder: z
    .string()
    .optional()
    .refine((val) => !val || ["asc", "desc"].includes(val), {
      message: "sortOrder must be either 'asc' or 'desc'",
    }),
});

export const SearchDomainsSchema = z.object({
  domainName: z.string().optional(),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    "Password must contain at least one number, one uppercase, and one lowercase letter"
  );

export const emailSchema = z
  .string()
  .email()
  .min(1)
  .transform((email) => email.toLowerCase());

export const SignupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  type: z.enum(["USER", "ADMIN"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'user' or 'admin'",
  }),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name cannot be empty"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(1, "Last name cannot be empty"),
  city: z
    .string({ required_error: "City is required" })
    .min(1, "City cannot be empty"),
  country: z
    .string({ required_error: "Country is required" })
    .min(1, "Country cannot be empty"),
  businessType: z.enum(["INDIVIDUAL", "COMPANY"], {
    required_error: "Business Type is required",
    invalid_type_error:
      "Business Type must be either 'individual' or 'company'",
  }),
});

export const SigninSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

export const PasswordResetSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    newpassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  });

declare global {
  namespace Express {
    export interface Request {
      role?: "Admin" | "User";
      userId: number;
    }
  }
}
