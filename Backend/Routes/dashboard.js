import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { getDashboard, updateCount } from "../controllers/dashboardController.js";
import { getHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", verifyToken, getDashboard);
router.post("/count", verifyToken, updateCount);
router.get("/history", verifyToken, getHistory)

export default router;
