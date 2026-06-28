import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import stats from "./routes/stats.js";

app.use("/api/v1/stats", stats);

export default app;
