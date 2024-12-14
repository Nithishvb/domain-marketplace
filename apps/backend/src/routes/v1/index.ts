import express from "express";
import { login } from "../../controllers/Login.controller";
export const router = express.Router();

router.get('/login', login);

