import express from "express";
import { getUserAddress, updateUserAddress } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/address", protectRoute, getUserAddress);
router.put("/address", protectRoute, updateUserAddress);
export default router;
