import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/authController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", verifyToken, isAdmin, getAllUsers);

export default router;
