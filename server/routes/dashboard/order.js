import express from "express";

import { getOrders, updateOrder } from "../../controllers/dashboard/order.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/admin/orders", authMiddleware, getOrders);
router.patch("/admin/order/update", authMiddleware, updateOrder);

export default router;
