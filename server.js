import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

dotenv.config();
connectDB();

const app = express();

import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import queryRoutes from "./src/routes/queryRoutes.js";

// Middleware
app.use(cors());
app.use(express.json());

// Fix for common URL copy-paste errors (trailing newlines/spaces)
app.use((req, res, next) => {
  req.url = req.url.replace(/%0A/g, "").replace(/\s+/g, "");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/queries", queryRoutes);

// Serve static uploads
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
