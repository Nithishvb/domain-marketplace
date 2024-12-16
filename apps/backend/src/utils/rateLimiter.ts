import rateLimit from "express-rate-limit";
import { Request } from "express";

export const forgotPasswordLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many password reset requests from this IP, please try again later."
  },
  statusCode: 429, // HTTP Status Code for Too Many Requests
  keyGenerator: (req: Request) => req.ip || "", // Use the IP address as the key for rate limiting
});
