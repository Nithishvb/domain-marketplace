import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    const secretKey: string = process.env.JWT_PASSWORD || "";
    const decoded = jwt.verify(token, secretKey) as {
      role: string;
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

export default userMiddleware;
