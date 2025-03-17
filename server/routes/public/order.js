import express from "express";

import { getCustomerOrders } from "../../controllers/public/order.js";

import { customerMiddleware } from "./../../middlewares/customerMiddleware.js";

const router = express.Router();

router.get("/orders", customerMiddleware, getCustomerOrders);

export default router;
