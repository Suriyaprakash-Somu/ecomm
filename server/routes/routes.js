import express from "express";

import AdminUserRoutes from "./dashboard/user.js";

const router = express.Router();

router.use(AdminUserRoutes);

export default router;
