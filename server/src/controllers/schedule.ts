import { Request, Response } from "express";
import { getPricingQuery } from "../queries/prices";

export const getSchedule = async (req: Request, res: Response) => {
  const { roomId, startDate, endDate } = req.body;
  const schedule = await getPricingQuery({ roomId, startDate, endDate });
  res.json(schedule);
};
