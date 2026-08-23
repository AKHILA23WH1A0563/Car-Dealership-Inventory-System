import bcrypt from "bcrypt";
import { UserModel } from "../models/user";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return user;
};