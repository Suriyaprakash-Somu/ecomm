import express from "express";

import {
  adminLogin,
  adminSignup,
  deleteUser,
  getUsers,
  updateUser,
  verifyToken,
} from "../../controllers/dashboard/user.js";

import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);
router.post("/admin/verify-token", verifyToken);
router.get("/admin/users", authMiddleware, getUsers);
router.delete("/admin/user/delete", authMiddleware, deleteUser);
router.patch("/admin/user/update", authMiddleware, updateUser);

export default router;
