import { randomUUID } from "crypto";

export interface VehicleInput {
  make: string;
  model: string;
  year: number;
  price: number;
}

export interface Vehicle extends VehicleInput {
  id: string;
}

const vehicles: Vehicle[] = [];

export const addVehicle = (vehicleData: VehicleInput): Vehicle => {
  if (!vehicleData.make.trim()) {
    throw new Error("Make is required");
  }

  if (!vehicleData.model.trim()) {
    throw new Error("Model is required");
  }

  if (vehicleData.price <= 0) {
    throw new Error("Price must be greater than 0");
  }

  const currentYear = new Date().getFullYear();

  if (vehicleData.year > currentYear) {
    throw new Error("Vehicle year cannot be in the future");
  }

  const vehicle: Vehicle = {
    id: randomUUID(),
    ...vehicleData,
  };

  vehicles.push(vehicle);

  return vehicle;
};

export const getVehicles = (): Vehicle[] => {
  return vehicles;
};

export const getVehicleById = (
  id: string
): Vehicle | undefined => {
  return vehicles.find((vehicle) => vehicle.id === id);
};