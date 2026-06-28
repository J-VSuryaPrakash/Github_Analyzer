import { Router } from "express";
import { getProfileStats } from "../controllers/stats.controller.js";

const router = Router();

router.route("/stats").get(getProfileStats);

export default router;