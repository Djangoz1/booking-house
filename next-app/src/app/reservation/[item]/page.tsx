"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useTools } from "@/context/tools";

import { ReservationLayout } from "@/sections/layouts/ReservationLayout";
import { useApi } from "@/hooks/useApi";
import { Room } from "@/types";

import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const page = ({ params: { item } }: { params: { item: string } }) => {
  let {
    state: { form, auth, data },
    formKit,
  } = useTools();
  const { data: rooms } = useApi({
    route: "rooms",
    params: {},
  }) as { data: Room[] | undefined };
  console.log({ rooms });
  let [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && item && loading === null) {
      setLoading(true);

      formKit({
        pack: {
          plan: 0,
          start: dayjs(),
          end: null,
        },
      });
      setLoading(false);
    }
  }, []);
  console.log({ form, data });
  if (!rooms) return <></>;
  return <ReservationLayout rooms={rooms || []} target={Number(item)} />;
};

export default page;
