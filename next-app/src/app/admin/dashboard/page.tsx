"use client";
import { FontTitle2 } from "@/components/text/FontTitle";
import { useApi } from "@/hooks/useApi";
import { Guest, Reservation, Room } from "@/types";
import React from "react";

const page = () => {
  const { data } = useApi({ route: "reservations", params: {} }) as {
    data:
      | (Reservation & { price: number; guest: Guest | null; room: Room })[]
      | undefined;
  };
  console.log(data);
  return (
    <div className="h-screen w-screen p-40 flex flex-col">
      {data?.map((el) => (
        <div className="flex gap-10" key={el.id}>
          <FontTitle2>{el.room.name}</FontTitle2>
          <span>{el.price / 100} €</span>
        </div>
      ))}
    </div>
  );
};

export default page;
