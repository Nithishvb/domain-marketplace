import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  res.status(401).json({
    error: "User login",
  });
};
