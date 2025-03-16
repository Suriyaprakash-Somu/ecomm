import express from "express";

import {
  adminLogin,
  adminSignup,
  verifyToken,
} from "../../controllers/dashboard/user.js";

const router = express.Router();

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/verify-token", verifyToken);

export default router;
