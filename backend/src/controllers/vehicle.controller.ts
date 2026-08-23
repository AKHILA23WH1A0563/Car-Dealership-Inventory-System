import { Request, Response } from "express";
import {
  addVehicle,
  getVehicles,
  getVehicleById,
} from "../services/vehicle.service";

export const createVehicle = (req: Request, res: Response): void => {
  try {
    const vehicle = addVehicle(req.body);

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
};

export const listVehicles = (
  req: Request,
  res: Response
): void => {
  const vehicles = getVehicles();

  res.status(200).json(vehicles);
};

export const getVehicle = (
  req: Request,
  res: Response
): void => {
  const id = String(req.params.id);

  const vehicle = getVehicleById(id);

  if (!vehicle) {
    res.status(404).json({
      message: "Vehicle not found",
    });
    return;
  }

  res.status(200).json(vehicle);
};