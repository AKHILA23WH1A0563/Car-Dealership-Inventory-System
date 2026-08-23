import { randomUUID } from "crypto";
import { User } from "../models/user";

const users: User[] = [];

export const registerUser = (
  name: string,
  email: string,
  password: string
): User => {
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user: User = {
    id: randomUUID(),
    name,
    email,
    password,
    role: "user",
  };

  users.push(user);

  return user;
};