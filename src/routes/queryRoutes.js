import express from "express";
import { getAllQueries, createQuery, updateQueryStatus } from "../controllers/queryController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createQuery); // Public can submit query
router.get("/", verifyToken, isAdmin, getAllQueries); // Only admin can view
router.patch("/:id/status", verifyToken, isAdmin, updateQueryStatus);

export default router;
