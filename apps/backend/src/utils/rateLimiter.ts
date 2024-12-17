import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: number[];
}

const rateLimitSlidingWindow = ({
  windowMs,
  max,
  message = "Too many requests, please try again later.",
}: {
  windowMs: number;
  max: number;
  message?: string;
}) => {
  const store: RateLimitStore = {};

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || "";
    const now = Date.now();

    if (!store[ip]) {
      store[ip] = [];
    }

    store[ip] = store[ip].filter((timestamp) => now - timestamp < windowMs);

    if (store[ip].length >= max) {
      res.status(429).json({
        error: message,
      });
      return;
    }

    store[ip].push(now);
    next();
  };
};

export const forgotPasswordLimiter = rateLimitSlidingWindow({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message:
    "Too many password reset requests from this IP, please try again later.",
});
