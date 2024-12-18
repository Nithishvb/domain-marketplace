import { Request, Response } from "express";
import { prisma } from "@repo/db/src/index";

export const userProfile = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        domains: true,
        DomainVerification: true
      }
    });

    if (!user) {
      res.status(409).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
