import express from "express";
import { getAllOrders, getUserOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my-orders", protectRoute, getUserOrders);
// ✅ Admin: Fetch all orders
router.get("/admin/orders", protectRoute,adminRoute,getAllOrders);
// ✅ Update Order Status (Admin Only)

router.put("/admin/orders/:orderId/update",protectRoute,adminRoute, updateOrderStatus);


export default router;
