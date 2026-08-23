import {
  addVehicle,
  getVehicles,
  getVehicleById,
} from "../src/services/vehicle.service";

describe("Vehicle Service", () => {
  it("should add a vehicle to the inventory", () => {
    const vehicle = addVehicle({
      make: "Toyota",
      model: "Camry",
      year: 2024,
      price: 25000,
    });

    expect(vehicle).toEqual(
      expect.objectContaining({
        make: "Toyota",
        model: "Camry",
        year: 2024,
        price: 25000,
      })
    );
  });

  it("should generate a unique ID for each vehicle", () => {
    const vehicle1 = addVehicle({
      make: "Toyota",
      model: "Camry",
      year: 2024,
      price: 25000,
    });

    const vehicle2 = addVehicle({
      make: "Honda",
      model: "Civic",
      year: 2024,
      price: 23000,
    });

    expect(vehicle1.id).toBeDefined();
    expect(vehicle2.id).toBeDefined();
    expect(vehicle1.id).not.toBe(vehicle2.id);
  });

  it("should reject a vehicle with an invalid price", () => {
    expect(() =>
      addVehicle({
        make: "Toyota",
        model: "Camry",
        year: 2024,
        price: -5000,
      })
    ).toThrow("Price must be greater than 0");
  });

  it("should reject a vehicle with a future year", () => {
    const futureYear = new Date().getFullYear() + 1;

    expect(() =>
      addVehicle({
        make: "Toyota",
        model: "Camry",
        year: futureYear,
        price: 25000,
      })
    ).toThrow("Vehicle year cannot be in the future");
  });

  it("should reject a vehicle without a make", () => {
    expect(() =>
      addVehicle({
        make: "",
        model: "Camry",
        year: 2024,
        price: 25000,
      })
    ).toThrow("Make is required");
  });

  it("should reject a vehicle without a model", () => {
    expect(() =>
      addVehicle({
        make: "Toyota",
        model: "",
        year: 2024,
        price: 25000,
      })
    ).toThrow("Model is required");
  });

  it("should return all vehicles in the inventory", () => {
    const vehicle1 = addVehicle({
      make: "Toyota",
      model: "Camry",
      year: 2024,
      price: 25000,
    });

    const vehicle2 = addVehicle({
      make: "Honda",
      model: "Civic",
      year: 2023,
      price: 23000,
    });

    const vehicles = getVehicles();

    expect(vehicles).toEqual(
      expect.arrayContaining([vehicle1, vehicle2])
    );
  });

  it("should return a vehicle by its ID", () => {
    const vehicle = addVehicle({
      make: "BMW",
      model: "X5",
      year: 2024,
      price: 60000,
    });

    const result = getVehicleById(vehicle.id);

    expect(result).toEqual(vehicle);
  });

  it("should return undefined when the vehicle ID does not exist", () => {
    const result = getVehicleById("non-existent-id");

    expect(result).toBeUndefined();
  });
});