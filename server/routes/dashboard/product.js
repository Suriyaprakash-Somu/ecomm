import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../controllers/dashboard/product.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/admin/product/add", authMiddleware, addProduct);
router.get("/admin/products", authMiddleware, getProducts);
router.patch("/admin/product/update", authMiddleware, updateProduct);
router.delete("/admin/product/delete", authMiddleware, deleteProduct);

export default router;
