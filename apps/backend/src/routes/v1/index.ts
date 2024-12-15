import express from "express";
import { domainRouter } from "./domains";
import { authRouter } from "./auth";

export const router = express.Router();

router.use('/auth', authRouter);
router.use('/domains', domainRouter);

