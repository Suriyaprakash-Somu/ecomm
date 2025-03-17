import express from "express";

// Admin
import AdminUserRoutes from "./dashboard/user.js";
import CategoryRoutes from "./dashboard/category.js";
import ProductRoutes from "./dashboard/product.js";

// Public
import PublicCategoryRoutes from "./public/category.js";
import PublicProductRoutes from "./public/product.js";
import PublicCustomerRoutes from "./public/customer.js";

const router = express.Router();

router.use(AdminUserRoutes);
router.use(CategoryRoutes);
router.use(ProductRoutes);

router.use(PublicCategoryRoutes);
router.use(PublicProductRoutes);
router.use(PublicCustomerRoutes);

export default router;
