import express from "express";

import {getCustomerProducts} from "../../controllers/public/product.js";

const router = express.Router();

router.get("/products", getCustomerProducts);

export default router;
