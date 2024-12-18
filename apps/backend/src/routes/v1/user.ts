import { userProfile } from "../../controllers/User.controller";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/:id", userProfile);