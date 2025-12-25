import express from "express";
import { getAllBookings, createBooking, updateBookingStatus } from "../controllers/bookingController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route to create a booking (if applicable, or protect it)
router.post("/", verifyToken, createBooking);

// Admin routes
router.get("/", verifyToken, isAdmin, getAllBookings);
router.patch("/:id/status", verifyToken, isAdmin, updateBookingStatus);

export default router;
