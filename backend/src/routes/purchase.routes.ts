import { Router } from "express";
import {
  createPurchase,
  listPurchases,
} from "../controllers/purchase.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createPurchase);
router.get("/", authenticate, listPurchases);

export default router;