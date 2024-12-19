import path from "path";
// src/index.ts

import express from "express";
import roomsRoutes from "./routes/rooms";

import reservationRoutes from "./routes/reservations";
import dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from "./routes/upload";
import webhookRoutes from "./routes/webhook";
dotenv.config();

const app = express();
app.use(cors());
app.use("/api/webhook", webhookRoutes);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/rooms", roomsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/reservations", reservationRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
