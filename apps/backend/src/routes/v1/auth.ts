import { forgotPasswordLimiter } from "../../utils/rateLimiter";
import { forgotPassword, resetPassword, signin, signup } from "../../controllers/Login.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/forgot-password", forgotPasswordLimiter,  forgotPassword);
authRouter.post("/reset-password", resetPassword);




