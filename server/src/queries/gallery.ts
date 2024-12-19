import { pool } from "../db";

export const getRoomImagesQuery = async (id: number) => {
  try {
    if (id === undefined) {
      throw new Error("Room id is required");
    }
    const res = await pool.query(
      "SELECT * FROM room_images WHERE room_id = $1",
      [id]
    );
    return res.rows;
  } catch (error) {
    console.error("Error fetching room images", error);
    throw error;
  }
};

export const getGalleryQuery = async () => {
  try {
    const res = await pool.query("SELECT * FROM room_images");
    return res.rows;
  } catch (error) {
    console.error("Error fetching gallery", error);
    throw error;
  }
};
