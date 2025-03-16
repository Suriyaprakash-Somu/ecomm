import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../controllers/dashboard/category.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/category/add", authMiddleware, addCategory);
router.get("/admin/categories", authMiddleware, getCategories);
router.delete("/admin/category/delete", authMiddleware, deleteCategory);
router.patch("/admin/category/update", authMiddleware, updateCategory);

export default router;
