import { Request, Response } from "express";
import { pool } from "../db";
import { getGalleryQuery, getRoomImagesQuery } from "../queries/gallery";

export const getGallery = async (req: Request, res: Response) => {
  try {
    const gallery = await getGalleryQuery();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGalleryByRoomId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const gallery = await getRoomImagesQuery(Number(id));

    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
