import { Request, Response } from "express";

import { getAllRoomsQuery, getRoomByIdQuery } from "../queries/rooms";
import { getPricingQuery } from "../queries/prices";
import { pool } from "../db";
import { getRoomImagesQuery } from "../queries/gallery";

export const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRoomsQuery();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRoom = async (req: Request, res: Response) => {
  try {
    const id = req.query.id || req.params.id || req.body.id;
    const room = await getRoomByIdQuery(Number(id));
    const prices = await getPricingQuery({
      roomId: Number(id),
      startDate: new Date(),
    });
    const gallery = await getRoomImagesQuery(Number(id));
    res.json({ ...room, prices, gallery });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, description, default_price, capacity, image } = req.body;
    const room = await getRoomByIdQuery(Number(id));
    if (!room) {
      throw new Error("Room not found");
    }
    const params = {
      name: name === undefined ? room.name : name,
      description: description === undefined ? room.description : description,
      default_price:
        default_price === undefined ? room.default_price : default_price,
      capacity: capacity === undefined ? room.capacity : capacity,
      image: image === undefined ? room.image : image,
    };
    const query = `
      UPDATE rooms
      SET
        name = COALESCE($2, name),
        description = COALESCE($3, description),
        default_price = COALESCE($4, default_price),
        capacity = COALESCE($5, capacity),
        image = COALESCE($6, image)
      WHERE id = $1
      RETURNING *;
    `;

    const values = [
      id,
      params.name,
      params.description,
      params.default_price,
      params.capacity,
      params.image,
    ];
    const result = await pool.query(query, values);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
