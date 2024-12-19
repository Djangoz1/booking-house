"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { icfy } from "@/constants/icon";
import { Icon } from "@iconify/react";

import Link from "next/link";
import { ITEMS } from "@/constants/items";
import { useApp } from "@/context/app";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  let [view, setView] = useState<number | null>(null);
  console.log(view);

  const { data } = useApp();
  if (!data.rooms) return <></>;
  return (
    <div className="w-screen flex h-screen  overflow-hidden">
      {data.rooms.map((items, i) => (
        <motion.div
          key={"data-img-" + i}
          onHoverEnd={() => setView(null)}
          onClick={() => (view === i ? setView(null) : setView(i))}
          onHoverStart={() => setView(i)}
          className="w-1/3 flex items-center justify-center h-screen relative"
        >
          <img
            src={items.image}
            className="absolute w-full h-full top-0 left-0 brightness-50 object-cover"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
          <p className="font-prim relative text-center sm:text-4xl text-6xl color1">
            {data.rooms[i].name}
          </p>
          {view === i ? (
            <motion.div
              initial={{ y: [0, 100, 0][i], x: [-100, 0, 100][i], opacity: 0 }}
              animate={{ y: 0, x: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`gap-10 bg-gradient-to-b text-white justify-center divide-y divide-yellow-800 flex flex-col ${
                [
                  "from-transparent    to-black/60",
                  "from-black/10 to-transparent ",
                  "from-black/5 to-black/10 ",
                ][i]
              } backdrop-blur items-center w-full h-full absolute`}
            >
              <div
                key={"item-" + i}
                className="flex pt-5  flex-col items-center gap-2 w-4/5 font-prim"
              >
                <h6 className="text-4xl sm:text-xl text-center capitalize font-bold  ">
                  {items.name}
                </h6>
                <div className="lg:grid color2 lg:grid-cols-2 flex flex-col gap-2 w-full">
                  {ITEMS[items.id].plans[0].arr.map((el, _i) => (
                    <div
                      key={"plan-" + _i + el.title}
                      className="w-full py-2 px-3 whitespace-nowrap border-color bg-light color2 border font-text flex items-center justify-between sm:text-xs text-sm"
                    >
                      <Icon
                        className="sm:text-[28px] text-[34px]"
                        icon={el.icon}
                      />
                      {el.title}
                    </div>
                  ))}
                </div>
                <div className="font-text font-light flex w-full gap-2">
                  <Link
                    className="flex items-center justify-between bg-prim w-full sm:p-2 p-4 border-color border text-white"
                    href={`/gallery/${items.id}`}
                  >
                    Voir photos
                  </Link>
                  <Link
                    className=" flex items-center justify-between bg-sec w-full p-4 sm:p-2 border-color border"
                    href={`/reservation/${items.id}`}
                  >
                    Réserver <Icon icon={icfy.ux.arrow} className="rotate-90" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <></>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default page;
