import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export const register = (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = registerUser(name, email, password);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};