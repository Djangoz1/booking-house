import { pool } from "../db";

export const getPricingQuery = async ({
  roomId,
  startDate = new Date(),
  endDate,
}: {
  roomId: number;
  startDate?: Date;
  endDate?: Date;
}) => {
  try {
    if (roomId === undefined) {
      throw new Error("Room id is required");
    }

    if (endDate && endDate < startDate) {
      throw new Error("End date must be greater than start date");
    }
    const res = await pool.query(
      !endDate
        ? "SELECT * FROM room_prices WHERE room_id = $1 AND start_date >= $2"
        : "SELECT * FROM room_prices WHERE room_id = $1 AND start_date >= $2 AND end_date <= $3",
      endDate ? [roomId, startDate, endDate] : [roomId, startDate]
    );

    return res.rows;
  } catch (error) {
    console.error("Error fetching pricing", error);
    throw error;
  }
};

export const setPricing = async ({
  roomId,
  startDate,
  endDate,
  pricePerNight,
}: {
  roomId: number;
  startDate: Date;
  endDate: Date;
  pricePerNight: number;
}) => {
  try {
    if (!roomId) {
      throw new Error("Room id is required");
    }
    if (!startDate) {
      throw new Error("Start date is required");
    }
    if (!endDate) {
      throw new Error("End date is required");
    }
    if (endDate < startDate) {
      throw new Error("End date must be greater than start date");
    }
    const res = await pool.query(
      "INSERT INTO room_prices (roomId, startDate, endDate, pricePerNight) VALUES ($1, $2, $3, $4)",
      [roomId, startDate, endDate, pricePerNight]
    );
    return res.rows;
  } catch (error) {
    console.error("Error setting pricing", error);
    throw error;
  }
};
