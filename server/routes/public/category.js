import express from "express";

import {getCustomerCategories} from "../../controllers/public/category.js";

const router = express.Router();

router.get("/categories", getCustomerCategories);

export default router;
