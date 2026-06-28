import {Router} from "express";
import { allProfileList, getProfileByUsername } from '../controllers/storedStats.controller.js';

const router = Router();

router.route("/").get(allProfileList);
router.route("/getProfileByUsername").post(getProfileByUsername);

export default router;