import express, { Request, Response } from "express";
import { upload } from "../middleware/upload";
import { pool } from "../db";
import { getAllRoomsQuery, getRoomByIdQuery } from "../queries/rooms";
import path from "path";
import fs from "fs";
const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (req.body.room_id === undefined) {
      throw new Error("Room ID is required");
    }
    const roomId = req.body.room_id;
    const file = req.file;
    if (!file) {
      throw new Error("File is required");
    }
    const url = `${process.env.API_URL}/uploads/${roomId}-${file.originalname}`;

    // Vérifiez si le room_id existe dans la table rooms
    const rooms = await getAllRoomsQuery();
    const roomCheck = rooms.find((room) => room.id === Number(roomId));
    if (!roomCheck) {
      throw new Error(`Room ID ${roomId} does not exist`);
    }

    pool.query("INSERT INTO room_images (room_id, image) VALUES ($1, $2)", [
      Number(roomId),
      url,
    ]);

    res.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const image = await pool.query("SELECT * FROM room_images WHERE id = $1", [
    id,
  ]);
  if (image.rows.length === 0) {
    throw new Error("Image not found");
  }
  const filePath = path.join(
    __dirname,
    "..",
    "..",

    image.rows[0].image.split(process.env.API_URL)[1]
  );
  fs.unlinkSync(filePath);
  await pool.query("DELETE FROM room_images WHERE id = $1", [id]);
  res.json({ message: "File deleted successfully" });
});

router.get("/", async (req, res) => {
  const images = await pool.query("SELECT * FROM room_images");
  res.json(images.rows);
});

export default router;
