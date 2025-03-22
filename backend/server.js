import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS
import cookieParser from "cookie-parser"; // Import
import path from "path";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderRoutes from "./routes/order.route.js"; // Import order routes
import userRoutes from "./routes/user.route.js"; // Import User Routes



import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Fixed a typo (50000 is too large)

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // Allows cookies & authentication
  }));

app.use(express.json({ limit: "10mb" })); // Allows parsing JSON in request body
app.use(cookieParser()); // Use cookie-parser middleware

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes); // Add User Routes

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
