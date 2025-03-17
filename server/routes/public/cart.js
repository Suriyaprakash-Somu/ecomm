import express from "express";
import { checkout } from "../../controllers/public/cart.js";
const router = express.Router();

import { customerMiddleware } from "../../middlewares/customerMiddleware.js";

router.post("/checkout", customerMiddleware, checkout);

export default router;
