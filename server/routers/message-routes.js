import express from "express";

import ProtectRoute from "../middlewares/protect-route.js";
import { getMessages, sendMessages } from "../controllers/message-controllers.js";

const router = express.Router()

router.route("/:id").get(ProtectRoute, getMessages)
router.route("/send/:id").post(ProtectRoute, sendMessages)

export default router