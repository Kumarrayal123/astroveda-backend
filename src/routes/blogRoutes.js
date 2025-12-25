import express from "express";
import { getAllBlogs, getBlogById, createBlog, deleteBlog } from "../controllers/blogController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs); // Public can view blogs
router.get("/:id", getBlogById); // Public can view single blog
router.post("/", verifyToken, isAdmin, upload.single("image"), createBlog); // Handle image upload
router.delete("/:id", verifyToken, isAdmin, deleteBlog); // Only admin can delete

export default router;
