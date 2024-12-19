import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

export const handleCheckout = async (data: any) => {
  const stripe = await stripePromise;
  if (!stripe) return console.error("Stripe not loaded");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  let res = await response.json();
  console.log({ res });

  const result = await stripe.redirectToCheckout({
    sessionId: res.id,
  });
  console.log({ result });
  if (result.error) {
    console.error(result.error.message);
  }
  return result;
};
