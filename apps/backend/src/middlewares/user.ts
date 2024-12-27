import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies?.access_token;

  console.log(req.cookies);

  if (!authToken) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  try {
    const secretKey: string = process.env.JWT_PASSWORD || "";
    const decoded = jwt.verify(authToken, secretKey) as {
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
