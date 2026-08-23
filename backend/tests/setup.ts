
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDatabase } from "../src/config/database";
import { UserModel } from "../src/models/user";

dotenv.config();

beforeAll(async () => {
  await connectDatabase();
  await UserModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});