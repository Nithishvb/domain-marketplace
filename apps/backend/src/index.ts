import express from "express";
import cors from "cors";
import { router } from "./routes/v1";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials: true }));

app.use("/api/v1", router);

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (e) => console.error(e));
