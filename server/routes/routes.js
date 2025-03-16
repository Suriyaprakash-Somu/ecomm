import express from "express";

import AdminUserRoutes from "./dashboard/user.js";
import CategoryRoutes from "./dashboard/category.js";
const router = express.Router();

router.use(AdminUserRoutes);
router.use(CategoryRoutes);

export default router;
