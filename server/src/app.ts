import cors from "cors";
import "dotenv/config";
import express from "express";
import { router } from "./router";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
