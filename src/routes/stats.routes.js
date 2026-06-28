import { Router } from "express";
import { getProfileStats } from "../controllers/stats.controller.js";

const router = Router();

router.route("/").get(getProfileStats);

export default router;