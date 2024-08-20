import cors from "cors";
import "dotenv/config";
import express from "express";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const port = 3333;

app.listen(port, () => console.log(`Server running on port ${port}`));
