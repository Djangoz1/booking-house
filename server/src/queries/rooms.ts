import { pool } from "../db";

export const getAllRoomsQuery = async () => {
  try {
    const res = await pool.query("SELECT * FROM rooms");
    return res.rows;
  } catch (error) {
    console.error("Error fetching rooms", error);
    throw error;
  }
};

export const getRoomByIdQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await pool.query("SELECT * FROM rooms WHERE id = $1", [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching room by id", error);
    throw error;
  }
};
