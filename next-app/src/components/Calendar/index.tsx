import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

import { ITEMS } from "@/constants/items";
import { v4 } from "uuid";
import { Icon } from "@iconify/react";
import { icfy } from "@/constants/icon";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import { doForm, pb, useAuthDispatch, useAuthState } from "@/context/auth";
import { handleCheckout } from "@/utils/stripe";

dayjs.extend(isBetweenPlugin);

const localizer = momentLocalizer(moment);

export const MyCalendar = ({ target }) => {
  let { user, form } = useAuthState();

  const [isPlan, setIsPlan] = useState(0);
  let dispatch = useAuthDispatch();
  // Définissez les états et les gestionnaires pour les dates, les chambres, les adultes et les enfants
  console.log(user);
  return (
    <div className="flex font-text  gap-10  sm:w-full  lg:w-4/5 xxl:w-3/5">
      <div className="flex-1  lg:w-4/5 flex flex-col">
        <h6 className="relative text-6xl color1 font-sec   text-center  p-2 capitalize   w-fit  ">
          {ITEMS[target].title}
        </h6>
        <h6 className="border bg-light uppercase text-black font-bold border-color w-full text-center p-5 sm:text-xs font-text text-xl">
          Sélectionnez vos dates
        </h6>
        <div className="w-full relative divide-x-2  flex items-center border border-color ">
          {/* <div className="w-1/2 h-fit"></div> */}
        </div>

        <div className="mt-5 text-black  text-shadow flex items-center text-xl   font-text relative  gap-5 justify-evenly w-2/3   ">
          <Link
            className=" p-2 text-center bg-light1 text-black w-full"
            href={"/"}
          >
            Retour
          </Link>

          <Link
            className="w-full p-2 text-center   bg-prim text-white"
            href={`/gallery/${target}`}
          >
            Voir photos
          </Link>
        </div>
      </div>
      <div className="  flex  flex-col gap-1 text-center lg:w-2/5 w-2/5">
        <div className="relative flex-col  flex   h-fit items-center justify-center     ">
          <div className="flex flex-col w-full gap-1 ">
            {form?.plans?.map((plan, i) => (
              <div
                onClick={() => setIsPlan(i)}
                key={v4()}
                className={`${
                  i === isPlan
                    ? "z-10 opacity-100"
                    : "opacity-50 hover:opacity-100 cursor-pointer"
                } relative   transition w-full h-fit text-center  text-black  uppercase text-shadow  font-text flex  flex-col   `}
              >
                <div
                  className={`sm:text-xs text-xl  text-white  p-4  text-center  bg-sec w-full   whitespace-nowrap     relative  font-medium`}
                >
                  <div className="flex   absolute top-1/2 -translate-y-1/2 right-2     justify-center  items-center text-white font-bold uppercase">
                    <span className="font7 text-xl mr-2 font-light">
                      {plan.price}
                    </span>
                    <Icon icon={icfy.bank.euro} className="text-lg " />
                  </div>
                  {plan.name}
                </div>
                <motion.ul
                  key={isPlan}
                  initial={{ opacity: 0, y: -100 }} // Définit l'état initial avec une opacité de 0 et y de 0
                  animate={{
                    opacity: isPlan === i ? 1 : 0,
                    y: isPlan === i ? 0 : -100,
                  }} // Anime l'opacité et l'échelle en fonction de la condition
                  transition={{ duration: 0.3 }}
                  className={`gap-1  grid grid-cols-2 w-full  ${
                    i !== isPlan ? "absolute" : ""
                  }`}
                >
                  {ITEMS[target].plans[i].arr.map((featureItem, idx) => (
                    <li
                      key={idx}
                      className={`flex p-3   uppercase border border-color  justify-between  items-center py-4 gap-5
                  ${
                    featureItem?.price
                      ? " text-white bg-black  text-4xl"
                      : "text-sm  bg-light"
                  }

                `}
                    >
                      <Icon
                        className="text-[34px]  "
                        icon={featureItem?.icon || icfy.ux.admin}
                      />

                      <div className=" flex items-center  justify-center text-xs sm:text-[9px] whitespace-nowrap   ">
                        {featureItem.title}
                      </div>
                    </li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[2px] font-text w-full">
          <div className=" w-full  border-2 border-color bg-light">
            <label className="block uppercase text-white text-xl sm:text-xs  bg-prim  p-2   ">
              Arrivée
            </label>
            <div className="flex sm:mt-5 mt-3 flex-col  pb-4 h-fit text-black font-bold w-full items-center   ">
              <div className="h-fit leading-0 font7 font-light ">
                <span className="countdown font7  sm:text-3xl text-6xl">
                  <span
                    style={{ "--value": form?.start_date?.[`$D`] || 0 }}
                  ></span>
                </span>
              </div>
              <div className="text-lg uppercase font-light ">
                {
                  [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "May",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                  ][form?.start_date?.["$M"]]
                }
              </div>
            </div>
          </div>
          <div className="w-full  border-2  border-color bg-light">
            <label className="block text-white text-xl sm:text-xs  bg-prim  p-2  uppercase">
              Départ
            </label>
            <div className="flex sm:mt-5 mt-3 flex-col  pb-4 h-fit text-black font-bold w-full items-center   ">
              <div className="h-fit leading-0 font7 font-light ">
                <span className="countdown font7   sm:text-3xl text-6xl">
                  <span
                    style={{ "--value": form?.end_date?.[`$D`] || 0 }}
                  ></span>
                </span>
              </div>
              <div className="text-lg uppercase font-light ">
                {
                  [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "May",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre",
                  ][form?.end_date?.["$M"]]
                }
              </div>
            </div>
          </div>
        </div>

        <input
          className=" font-text  uppercase text-lg  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          value={form?.voyagers || 0}
          onChange={(e) =>
            doForm(dispatch, {
              form: { ...form },
              target: "voyagers",
              value: parseInt(e.target.value),
            })
          }
          placeholder="Nombre de voyageur(s)"
        />
        <input
          className=" font-text uppercase sm:text-sm text-xl  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline"
          type="phone"
          placeholder="Numéro de téléphone"
        />

        <button
          onClick={async () => {
            let datas = {
              user: user?.id,
              start_date: form.start_date,
              end_date: form.end_date,
              voyagers: form.voyagers,
              plan: form?.plans?.[isPlan]?.id,
            };

            console.log(datas);
            handleCheckout(datas);
          }}
          className="bg-sec btn rounded-none  hover:bg-amber-700 text-white   p-4 "
        >
          CHECK AVAILABILITY
        </button>
      </div>
    </div>
  );
};
