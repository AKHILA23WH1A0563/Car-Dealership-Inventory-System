import { Request, Response } from "express";
import {
  purchaseVehicle,
  getPurchases,
} from "../services/purchase.service";

export const createPurchase = (
  req: Request,
  res: Response
): void => {
  try {
    const { vehicleId, userId } = req.body;

    const purchase = purchaseVehicle(vehicleId, userId);

    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const listPurchases = (
  req: Request,
  res: Response
): void => {
  const purchases = getPurchases();

  res.status(200).json(purchases);
};