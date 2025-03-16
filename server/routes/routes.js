import express from "express";

import AdminUserRoutes from "./dashboard/user.js";
import CategoryRoutes from "./dashboard/category.js";
import ProductRoutes from "./dashboard/product.js";

const router = express.Router();

router.use(AdminUserRoutes);
router.use(CategoryRoutes);
router.use(ProductRoutes);

export default router;
