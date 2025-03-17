import express from "express";

import {
  customerLogin,
  customerSignup,
  verifyCustomerToken,
} from "../../controllers/public/customer.js";

const router = express.Router();

router.post("/signup", customerSignup);
router.post("/login", customerLogin);
router.post("/verify-token", verifyCustomerToken);

export default router;
