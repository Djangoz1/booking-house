"use client";
import React, { useState } from "react";

// import { BoxImages } from "../box/BoxImages";

import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";

import { Icon } from "@iconify/react";
import { icfy } from "@/constants/icon";
import { motion, MotionConfig } from "framer-motion";

import { handleCheckout } from "@/utils/stripe";
import { Calendar, Badge, IconButton, ButtonToolbar } from "rsuite";

import { MyBtn } from "@/components/btn/MyBtn";
import { BoxInfo } from "@/components/box/BoxInfo";
import { useTools } from "@/context/tools";
import { TAccomodation } from "@/interfaces/data";
import { ITEMS } from "@/constants/items";
import { BookingCard } from "@/components/card/BookingCard";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Room } from "@/types";

dayjs.extend(isBetweenPlugin);

export const ReservationLayout = ({
  rooms,
  target,
}: {
  rooms: Room[];
  target: number;
}) => {
  let {
    state: { form, auth },
    formKit,
  } = useTools();

  //   // réorganiser commodities afin que commoditie.path === target soit positionné en milieu

  let commodities = rooms
    .map((el) => ({ image: el.image, path: el.id }))
    .sort((a, b) => (a.path === target ? 1 : 0));
  //     let commoditie = commodities.find((el) => el.path === target);
  let targetIndex = commodities.findIndex(
    (commoditie) => commoditie.path === target
  );

  if (targetIndex !== -1) {
    // Supprimer l'élément trouvé de sa position actuelle
    let [removed] = commodities.splice(targetIndex, 1);
    // Insérer l'élément à la position médiane
    let middleIndex = Math.ceil(commodities.length / 2);
    commodities.splice(middleIndex, 0, removed);
  }

  const room = rooms.find((el) => el.id === target) as Room;
  console.log({ form, commodities, room, target });

  return (
    <>
      <section className="  px-[10vw] box-border py-[10vh]  font-prim relative flex flex-col  ">
        <div className="w-screen h-screen top-0 left-0 fixed">
          <img
            src={room?.image}
            className="w-screen z-0 h-screen object-cover aspect-auto   brightness-50 "
          />
        </div>
        <div className="flex py-40 relative gap-20 lg:flex-row flex-col items-center lg:items-start">
          <div className="flex flex-col gap-10 w-fit text-white">
            <div className="text-xs whitespace-nowrap uppercase flex justify-between">
              <Link
                href={`/reservation/${commodities[0].path}`}
                className="opacity-50 hover:opacity-100 flex items-center text-left  gap-1"
              >
                <Icon icon={icfy.ux.arrow} className="-rotate-90 text-[25px]" />
                Appartement
                <br />
                précédent
              </Link>
              <h6 className="text-4xl">Choisir Appartement</h6>
              <Link
                href={`/reservation/${commodities[2].path}`}
                className="flex text-sec  text-right items-center gap-1"
              >
                Appartement
                <br />
                Suivant
                <Icon icon={icfy.ux.arrow} className="rotate-90 text-[25px]" />
              </Link>
            </div>
            <div className="flex items-center gap-5 justify-between">
              {commodities.map((el, i) => (
                <Link
                  href={`/reservation/${el.path}`}
                  key={`accomodation-image-${i}`}
                  className={cn(
                    "bg-sec/40 backdrop-blur shadow-xl rounded p-3",
                    target === el.path && "bg-light border-sec border-4 "
                  )}
                >
                  <img
                    className="w-[200px] h-[160px] aspect-auto"
                    src={el.image}
                    alt={"image accomodation " + i}
                  />
                </Link>
              ))}
            </div>
          </div>
          <BookingCard accomodation={room} />
        </div>
      </section>
    </>
  );
};

// <div className="w-screen h-[30vh] ">

//         <div className="flex items-center z-1 relative mb-10 flex-col justify-center">
//           <h6 className="text-6xl font-black font-prim text-light mb-3">
//             {ITEMS?.[target]?.title}
//           </h6>
//           <p className="text-xl opacity-80 my-5">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit.
//           </p>
//           <h5 className="text-sec font1 text-3xl whitespace-nowrap flex flex-col">
//             Ô fil de la Durance
//           </h5>
//         </div>

//           <div className="bg-gradient-to-b from-transparent via-transparent to-black/80 w-full relative h-full" />
//         </div>
//           <img
//             src={ITEMS?.[target]?.images?.[0]?.image}
//             className="w-full z-0 h-full absolute object-cover aspect-auto top-0 left-0  brightness-50"
//           />

//         <div className="bg-light p-5 rounded-lg shadow-xl relative flex gap-5 font-text     w-full">
//           <div className="flex relative flex-col w-full gap-5">
//             {/* <BoxImages
//               color={"light"}
//               sizeImg={750}
//               targetCommoditie={target}
//             /> */}
//             <div className="flex whitespace-nowrap  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 w-fit h-fit">
//               {form?.plans?.map((plan, i) => (
//                 <div
//                   onClick={() => setIsPlan(i)}
//                   key={"plan-" + plan.id}
//                   className={`${
//                     i === isPlan
//                       ? " bg-prim opacity-100"
//                       : "brightness-50 backdrop-blur border-4 border-prim hover:brightness-100 cursor-pointer"
//                   } w-[300px] hover:scale-105 text-light rounded-lg px-3 py-5 shadow-xl relative   transition     uppercase text-shadow  font-text flex  flex-col   `}
//                 >
//                   <h6 className="text-2xl text-sec text-left w-full font-black">
//                     {plan.name}
//                   </h6>

//                   <motion.ul className="grid grid-cols-2 gap-3 my-4 w-full">
//                     {ITEMS[target].plans[i].arr.map((featureItem, idx) => (
//                       <li
//                         key={idx}
//                         className={`${
//                           idx % 2 === 0 ? "flex-row " : "flex-row-reverse"
//                         } flex  py-2 border-b border-sec/50 text-xs normal-case  w-full gap-2`}
//                       >
//                         <Icon
//                           className="text-[22px]  "
//                           icon={featureItem?.icon || icfy.ux.admin}
//                         />

//                         <>{featureItem.title}</>
//                       </li>
//                     ))}
//                   </motion.ul>
//                   <BoxInfo
//                     className={"mt-auto text-black bg-light text-3xl"}
//                     icon={icfy.bank.euro}
//                   >
//                     {end && start ? (
//                       plan.price * dayjs(end).diff(start, "day")
//                     ) : (
//                       <span className="text-lg normal-case">
//                         {plan.price}€ par nuit
//                       </span>
//                     )}
//                   </BoxInfo>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="   flex  flex-col gap-1 text-center w-3/5">
//             <h6 className="border bg-light uppercase text-black font-bold border-color w-full text-center p-5 sm:text-xs font-text text-xl">
//               Sélectionnez vos dates
//             </h6>
//             <div className="flex gap-[2px] font-text w-full">
//               <div className=" w-full  border-2 border-color bg-light">
//                 <label className="block uppercase text-white text-xl sm:text-xs  bg-prim  p-2   ">
//                   Arrivée
//                 </label>
//                 <div className="flex sm:mt-5 mt-3 flex-col  pb-4 h-fit text-black font-bold w-full items-center   ">
//                   <div className="h-fit leading-0 font7 font-light ">
//                     <span className="countdown font7  sm:text-3xl text-6xl">
//                       <span style={{ "--value": start?.$D || 0 }}></span>
//                     </span>
//                   </div>
//                   <div className="text-lg uppercase font-light ">
//                     {
//                       [
//                         "Janvier",
//                         "Février",
//                         "Mars",
//                         "Avril",
//                         "May",
//                         "Juin",
//                         "Juillet",
//                         "Août",
//                         "Septembre",
//                         "Octobre",
//                         "Novembre",
//                         "Décembre",
//                       ][start?.$M]
//                     }
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full  border-2  border-color bg-light">
//                 <label className="block text-white text-xl sm:text-xs  bg-prim  p-2  uppercase">
//                   Départ
//                 </label>
//                 <div className="flex sm:mt-5 mt-3 flex-col  pb-4 h-fit text-black font-bold w-full items-center   ">
//                   <div className="h-fit leading-0 font7 font-light ">
//                     <span className="countdown font7   sm:text-3xl text-6xl">
//                       <span style={{ "--value": end?.$D || 0 }}></span>
//                     </span>
//                   </div>
//                   <div className="text-lg uppercase font-light ">
//                     {
//                       [
//                         "Janvier",
//                         "Février",
//                         "Mars",
//                         "Avril",
//                         "May",
//                         "Juin",
//                         "Juillet",
//                         "Août",
//                         "Septembre",
//                         "Octobre",
//                         "Novembre",
//                         "Décembre",
//                       ][end?.$M]
//                     }
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Calendar
//               onChange={handleChange}
//               className="border-2 border-main text-black"
//               cellClassName={(date, i) => {
//                 let _date = dayjs(date);
//                 const targetDate = dayjs(new Date(date));
//                 let bool = targetDate.isBetween(start, end);
//                 let result: string;
//                 if (
//                   form?.booking
//                     ?.map((el) => ({
//                       end_date: el.end_date,
//                       start_date: el.start_date,
//                     }))
//                     .some((el) =>
//                       dayjs(date).isBetween(
//                         dayjs(el.start_date),
//                         dayjs(el.end_date),
//                         null,
//                         "[]"
//                       )
//                     )
//                 ) {
//                   result = "bg-sec";
//                 } else if (dayjs().isAfter(date)) {
//                   result = "opacity-50 bg-gray-300";
//                 } else if (
//                   (start && start.isSame(_date, "day")) ||
//                   (end && end.isSame(_date, "day"))
//                 ) {
//                   result = "bg-prim/40";
//                 } else if (bool) {
//                   result = "bg-prim text-light";
//                 } else {
//                   result = "border border-prim/20";
//                 }
//                 return result;
//               }}
//               compact
//               bordered
//             />
//             <div className="flex gap-2 items-end">
//               <Icon icon={icfy.person.add} className="text-xl text-black " />
//               Voyageur(s)
//             </div>
//             <input
//               className=" font-text  uppercase text-lg  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline"
//               type="number"
//               min={1}
//               value={form?.voyagers || 1}
//               onChange={(e) =>
//                 formKit({
//                   target: "voyagers",
//                   value: parseInt(e.target.value),
//                 })
//               }
//               placeholder="Nombre de voyageur(s)"
//             />
//             <input
//               className=" font-text uppercase sm:text-sm text-xl  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline"
//               type="phone"
//               placeholder="Numéro de téléphone"
//             />

//             <MyBtn
//               onClick={async () => {
//                 let datas = {
//                   user: auth?.id,
//                   start_date: start,
//                   end_date: end,
//                   voyagers: form.voyagers,
//                   plan: form?.plans?.[isPlan]?.id,
//                 };

//                 console.log(datas);
//                 await handleCheckout(datas);
//               }}
//               className=""
//             >
//               CHECK AVAILABILITY
//             </MyBtn>
//           </div>
//         </div>
