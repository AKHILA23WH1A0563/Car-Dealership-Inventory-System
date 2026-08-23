import {
  purchaseVehicle,
  getPurchases,
} from "../src/services/purchase.service";
import { addVehicle } from "../src/services/vehicle.service";

describe("Purchase Service", () => {
  it("should purchase an available vehicle", () => {
    const vehicle = addVehicle({
      make: "Toyota",
      model: "Camry",
      year: 2024,
      price: 25000,
    });

    const purchase = purchaseVehicle(vehicle.id, "user-123");

    expect(purchase).toEqual(
      expect.objectContaining({
        vehicleId: vehicle.id,
        userId: "user-123",
        price: 25000,
      })
    );
  });

  it("should reject purchase of a non-existent vehicle", () => {
    expect(() =>
      purchaseVehicle("invalid-vehicle-id", "user-123")
    ).toThrow("Vehicle not found");
  });

  it("should not allow the same vehicle to be purchased twice", () => {
    const vehicle = addVehicle({
      make: "Honda",
      model: "Civic",
      year: 2024,
      price: 23000,
    });

    purchaseVehicle(vehicle.id, "user-123");

    expect(() =>
      purchaseVehicle(vehicle.id, "user-456")
    ).toThrow("Vehicle already purchased");
  });

  it("should return all purchases", () => {
    const purchases = getPurchases();

    expect(Array.isArray(purchases)).toBe(true);
  });
});