import express from "express";
import { getReservations } from "../controllers/reservation";
import stripe from "../services/stripe";
import { getRoomByIdQuery } from "../queries/rooms";
import moment from "moment";
import dotenv from "dotenv";
import { pool } from "../db";
import { getGuestByEmailQuery } from "../queries/guests";
import { getReservationsQuery } from "../queries/reservation";
import { getGalleryByRoomId } from "../controllers/gallery";
import { getRoomImagesQuery } from "../queries/gallery";
dotenv.config();
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { roomId, startDate, numberOfGuests, endDate } = req.body;
    const room = await getRoomByIdQuery(roomId);
    const days = moment(endDate).diff(moment(startDate), "days");
    const sourceUrl = process.env.APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${room.name}`,
            },
            unit_amount: room.default_price * 100,
          },
          quantity: days,
        },
      ],
      mode: "payment",
      success_url: `${sourceUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${sourceUrl}/reservation/${room.id}`,
      metadata: {
        roomId: room.id,
        numberOfGuests,
        startDate,
        endDate,
      },
    });

    res.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("Error checkout reservation", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.get("/stripe/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["customer", "payment_intent", "line_items"],
  });

  if (!session.payment_intent) {
    throw new Error("Payment intent not found");
  }

  let reservation = await pool.query(
    "SELECT * FROM reservations WHERE stripe_id = $1",
    [(session.payment_intent as any).id]
  );

  reservation = reservation.rows[0];
  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const room = await getRoomByIdQuery((reservation as any).room_id);
  if (!room) {
    throw new Error("Room not found");
  }
  let customer;
  if (session.customer_details?.email) {
    customer = await getGuestByEmailQuery(
      session.customer_details?.email as string
    );
  }

  const images = await getRoomImagesQuery(room.id);

  res.json({
    reservation,
    price: session.amount_total,
    room,
    customer,
    images,
  });
});

router.get("/", async (req, res) => {
  const reservations = await pool.query("SELECT * FROM reservations");

  res.json(
    await Promise.all(
      reservations.rows.map(async (el) => {
        const room = await getRoomByIdQuery(el.room_id);
        const tx = await stripe.paymentIntents.retrieve(el.stripe_id, {
          expand: ["customer", "line_items"],
        });
        return {
          ...el,
          room,
          guest: tx.customer,
          price: tx.amount,
        };
      })
    )
  );
});

router.get("/:id", getReservations);
//

export default router;
