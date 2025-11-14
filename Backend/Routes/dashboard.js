import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { getDashboard, updateCount } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", verifyToken, getDashboard);
router.post("/count", verifyToken, updateCount);

export default router;
