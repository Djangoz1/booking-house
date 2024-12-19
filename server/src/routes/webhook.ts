import express from "express";
import stripe from "../services/stripe";
import { createReservationQuery } from "../queries/reservation";
import { getGuestByEmailQuery, setGuestQuery } from "../queries/guests";
import { sendConfirmationMail } from "../queries/mail";
import { getRoomByIdQuery } from "../queries/rooms";

const router = express.Router();

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      if (!sig) throw new Error("No signature found");
      const payload = req.body;

      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        if (session.customer_details?.email) {
          let guest = await getGuestByEmailQuery(
            session.customer_details?.email
          );
          if (!guest) {
            guest = await setGuestQuery({
              name: session.customer_details?.name || "",
              email: session.customer_details?.email || "",
              phone: session.customer_details?.phone || "",
            });
          }
          if (!guest) {
            throw new Error("Guest not found");
          }
        }
        const { roomId, numberOfGuests, startDate, endDate } =
          (session.metadata || {}) as any;
        const newReservation = await createReservationQuery({
          roomId,
          startDate,
          endDate,
          numberOfGuests,
          stripeId: session.payment_intent?.toString() || "",
        });

        if (!newReservation) {
          throw new Error("Reservation not created");
        }
        const room = await getRoomByIdQuery(newReservation.room_id);
        let send = await sendConfirmationMail({
          email: session.customer_details?.email || "",
          name: session.customer_details?.name || "",
          endDate: endDate,
          roomName: room.name,
          startDate,
          transactionId: newReservation.stripe_id,
          amount: (session.amount_total || 0) / 100,
        });
        console.log("send", send);
      }
    } catch (error) {
      console.error(
        "Webhook error :",
        error instanceof Error ? error.message : "Unknown error"
      );
      res
        .status(400)
        .send(
          `Webhook error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
    }
  }
);

export default router;
