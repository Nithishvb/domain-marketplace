import { signin, signup } from "../../controllers/Login.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

