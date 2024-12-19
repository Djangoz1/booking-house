"use client";

import "./style.css";

import { motion } from "framer-motion";

import Link from "next/link";

import { useRoomById } from "@/hooks/useRoomById";
import { Carousel } from "@/components/box/Carousel";

export const GalleryLayout = ({ target }: { target: number }) => {
  const { data } = useRoomById(target);
  console.log("galleryLayout", data);
  if (!data) return <></>;

  return (
    <div className="m-0 flex items-end bg-prim relative p-10   text-white overflow-hidden h-screen w-screen">
      <Carousel darker images={(data?.gallery || [])?.map((el) => el.image)} />
      <div className="">
        <div className=" relative  ">
          <div className=" w-fit capitalize font-sec text-6xl ">
            Ô Fil de la Durance
          </div>
          <motion.div
            key={"desc-"}
            className="flex flex-col   justify-start "
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-1/2 text-balance uppercase font-prim text-3xl flex flex-col">
              {data?.name}
            </div>

            <div className="w-1/2 text-xs font-text">
              {data?.description ||
                `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
              similique odio quisquam asperiores, earum nesciunt unde iusto vero
              amet et deleniti ullam!`}
            </div>
          </motion.div>
          <div className="mt-5">
            <Link
              href={`/reservation/${target}`}
              className=" backdrop-blur text-white py-2 px-4 text-[12px] border  uppercase "
            >
              Réservation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
