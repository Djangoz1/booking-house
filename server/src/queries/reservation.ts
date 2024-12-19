import { pool } from "../db";
import { getRoomByIdQuery } from "./rooms";

export const getReservationsQuery = async ({
  roomId,
  startDate,
}: {
  roomId: number;
  startDate: Date;
}) => {
  try {
    if (roomId === undefined) {
      throw new Error("Room id is required");
    }
    if (!startDate) {
      throw new Error("Start date is required");
    }
    const reservations = await pool.query(
      "SELECT * FROM reservations WHERE room_id = $1 AND start_date >= $2",
      [roomId, startDate]
    );
    return reservations.rows;
  } catch (error) {
    console.error("Error fetching reservations", error);
    throw error;
  }
};

export const createReservationQuery = async ({
  roomId,
  startDate,
  endDate,
  numberOfGuests,
  stripeId,
}: {
  roomId: number;
  startDate: Date;
  endDate: Date;
  numberOfGuests: number;
  stripeId: string;
}) => {
  try {
    if (roomId === undefined) {
      throw new Error("Room id is required");
    }
    if (!startDate) {
      throw new Error("Start date is required");
    }
    if (!endDate) {
      throw new Error("End date is required");
    }
    if (!numberOfGuests) {
      throw new Error("Number of guests is required");
    }
    const room = await getRoomByIdQuery(roomId);
    if (numberOfGuests > room.max_guests) {
      throw new Error(
        "Number of guests is greater than the maximum number of guests for this room"
      );
    }

    const res = await pool.query(
      "INSERT INTO reservations (room_id, start_date, end_date, stripe_id, number_of_guests) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [roomId, startDate, endDate, stripeId, numberOfGuests]
    );
    return res.rows?.[0];
  } catch (error) {
    console.error("Error creating reservation", error);
    throw error;
  }
};
