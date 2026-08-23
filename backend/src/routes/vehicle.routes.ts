import { Router } from "express";
import {
  createVehicle,
  listVehicles,
  getVehicle,
} from "../controllers/vehicle.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createVehicle);
router.get("/", authenticate, listVehicles);
router.get("/:id", authenticate, getVehicle);

export default router;