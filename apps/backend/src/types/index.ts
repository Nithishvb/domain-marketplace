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
    .refine((val) => !val || ["domainName", "price", "createdAt"].includes(val), {
      message: "sortBy must be one of 'domainName' or 'price'",
    }),
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

declare global {
  namespace Express {
    export interface Request {
      role?: "Admin" | "User";
      userId: number;
    }
  }
}
