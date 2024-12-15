import { SigninSchema, SignupSchema } from "../types/index";
import { compare, hash } from "../utils/scrypt";
import { prisma } from "@repo/db/src";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_PASSWORD = process.env.JWT_PASSWORD || "";

export const signup = async (req: Request, res: Response) => {

  const parsedData = SignupSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
    return;
  }

  const {
    email,
    password,
    firstName,
    lastName,
    city,
    country,
    businessType,
    type,
  } = parsedData.data;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    const hashedPassword = await hash(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        city,
        country,
        businessType,
        role: type,
      },
    });

    res.status(200).json({
      user: {
        userId: user.id,
        firstName,
        lastName,
        city,
        country,
        businessType,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const signin = async (req: Request, res: Response) => {

  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res
      .status(400)
      .json({
        message: "Validation failed",
        errors: parsedData.error.format(),
      });
    return;
  }

  const { email, password } = parsedData.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isValid = await compare(password, user.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD,
      { expiresIn: "5h" }
    );

    res.json({
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
