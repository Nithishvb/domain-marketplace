import { sendEmail } from "../utils/sendEmail";
import {
  PasswordResetSchema,
  resetPasswordSchema,
  SigninSchema,
  SignupSchema,
} from "../types/index";
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
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
    return;
  }

  const { email, password } = parsedData.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
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

    // Access Token
    const accessToken = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD,
      { expiresIn: "5h" }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
      { userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD,
      { expiresIn: '7d' }
    );

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 5 * 60 * 60 * 1000,
      path: '/', 
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.json({
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

export const forgotPassword = async (req: Request, res: Response) => {
  const parsedData = PasswordResetSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
    return;
  }

  const { email } = parsedData.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_PASSWORD, {
      expiresIn: "15m",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `Please click the following link to reset your password: ${resetUrl}`,
    });

    res.status(200).json({
      message: "Password reset link sent to your email.",
      resetUrl,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
    return;
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const parsedData = resetPasswordSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
    return;
  }

  const { token, newpassword } = parsedData.data;

  try {
    const decoded: any = jwt.verify(token, JWT_PASSWORD);
    const userId = decoded.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const hashedPassword = await hash(newpassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successfully" });
    return;
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token",
      error: (error as Error).message,
    });
    return;
  }
};
