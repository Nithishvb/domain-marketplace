import express from "express";
import { domainRouter } from "./domains";
import { authRouter } from "./auth";
import { userRouter } from "./user";

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/domains', domainRouter);
router.use('/user', userRouter);

