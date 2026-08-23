import express from "express";
import authRoutes from "./routes/auth.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import purchaseRoutes from "./routes/purchase.routes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/purchases", purchaseRoutes);

export default app;