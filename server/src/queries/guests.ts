import { pool } from "../db";

export const getGuestByIdQuery = async (id: number) => {
  try {
    if (!id) {
      throw new Error("Guest id is required");
    }
    const res = await pool.query("SELECT * FROM guests WHERE id = $1", [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching guest", error);
    throw error;
  }
};

export const getGuestByEmailQuery = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const res = await pool.query("SELECT * FROM guests WHERE email = $1", [
      email,
    ]);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching guest by email", error);
    throw error;
  }
};

export const setGuestQuery = async ({
  name,

  email,
  phone,
}: {
  name: string;

  email: string;
  phone: string;
}) => {
  try {
    if (!name) {
      throw new Error("Name is required");
    }

    if (!email) {
      throw new Error("Email is required");
    }
    // if (!phone) {
    //   throw new Error("Phone is required");
    // }

    const res = await pool.query(
      "INSERT INTO guests (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, email, phone]
    );
    return res.rows[0];
  } catch (error) {
    console.error("Error creating guest", error);
    throw error;
  }
};
