import express from "express";
import { domainRouter } from "./domains";

export const router = express.Router();

router.use('/domains', domainRouter);

