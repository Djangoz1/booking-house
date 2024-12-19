import { Request, Response } from "express";
import { getGuestByIdQuery, setGuestQuery } from "../queries/guests";

export const getGuest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const guest = await getGuestByIdQuery(Number(id));
    res.json(guest);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
