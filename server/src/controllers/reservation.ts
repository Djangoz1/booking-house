import { Request, Response } from "express";

import {
  createReservationQuery,
  getReservationsQuery,
} from "../queries/reservation";
import { getPricingQuery } from "../queries/prices";

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { id: roomId } = req.params;
    const { startDate } = req.query;

    const reservations = await getReservationsQuery({
      roomId: Number(roomId),
      startDate: startDate ? new Date(startDate as string) : new Date(),
    });
    const prices = await getPricingQuery({
      roomId: Number(roomId),
      startDate: startDate ? new Date(startDate as string) : new Date(),
    });
    res.json({ reservations, prices });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const createReservation = async (req: Request, res: Response) => {
//   try {
//     const { roomId, startDate, endDate, numberOfGuests } = req.body;

//     const reservation = await createReservationQuery({
//       roomId: Number(roomId),
//       startDate: new Date(startDate as string),
//       endDate: new Date(endDate as string),
//       numberOfGuests: Number(numberOfGuests),
//     });
//     res.json(reservation);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
