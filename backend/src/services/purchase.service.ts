import { randomUUID } from "crypto";
import { getVehicleById } from "./vehicle.service";

interface Purchase {
  id: string;
  vehicleId: string;
  userId: string;
  price: number;
}

const purchases: Purchase[] = [];

export const purchaseVehicle = (
  vehicleId: string,
  userId: string
): Purchase => {
  const vehicle = getVehicleById(vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const alreadyPurchased = purchases.find(
    (purchase) => purchase.vehicleId === vehicleId
  );

  if (alreadyPurchased) {
    throw new Error("Vehicle already purchased");
  }

  const purchase: Purchase = {
    id: randomUUID(),
    vehicleId,
    userId,
    price: vehicle.price,
  };

  purchases.push(purchase);

  return purchase;
};

export const getPurchases = (): Purchase[] => {
  return purchases;
};