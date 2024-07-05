import express from "express";

import ProtectRoute from "../middlewares/protect-route.js";
import { getUsers } from "../controllers/users-controllers.js";

const router = express.Router()

router.route("/").get(ProtectRoute, getUsers)

export default router