import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import statsRouter from "./routes/stats.routes.js";
import profileRouter from "./routes/profileStats.routes.js";

app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/profiles", profileRouter);

export default app;
