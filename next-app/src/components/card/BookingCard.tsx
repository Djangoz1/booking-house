import { icfy } from "@/constants/icon";
import { useTools } from "@/context/tools";
import { IAccomodation } from "@/interfaces/data";
import { Icon } from "@iconify/react/dist/iconify.js";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Calendar } from "rsuite";
import { MyBtn } from "../btn/MyBtn";
import { handleCheckout } from "@/utils/stripe";
import { IBookingFormState, ICtxData } from "@/interfaces/ctx";
import Link from "next/link";
import { FontTitle, FontTitle2 } from "../text/FontTitle";
import { BoxIcon } from "../box/BoxIcon";
import { Reservation, Room, RoomPrice } from "@/types";
import { ITEMS } from "@/constants/items";
import { Input } from "../form/input";
import { useApi } from "@/hooks/useApi";

export const BookingCard = ({ accomodation }: { accomodation: Room }) => {
  let {
    state: { data: parsedData, form: parsedForm, auth },
    formKit,
  } = useTools();

  const { data } = useApi({
    route: `reservations/${accomodation.id}`,
    params: { id: accomodation.id },
  }) as {
    data: { reservations: Reservation[]; prices: RoomPrice[] } | undefined;
  };

  let { commoditie, plans: _plans } = parsedData as ICtxData["booking"];
  let form = parsedForm as IBookingFormState;
  let { name } = accomodation;

  let [moreIsClick, setMoreIsClick] = useState<boolean>(false);

  let [isBooking, setIsBooking] = useState<boolean>(false);

  const handleChange = (newDate: Date) => {
    let parseDate = dayjs(newDate);
    if (parseDate.isSame(form.start)) {
      return formKit({ pack: { end: null, start: parseDate } });
    } else if (parseDate.isBefore(form.end)) {
      formKit({ target: "start", value: parseDate });
    } else if (parseDate.isBefore(form.start)) {
      formKit({ pack: { end: form.start, start: parseDate } });
    } else if (parseDate.isAfter(form.end)) {
      formKit({ target: "end", value: parseDate });
    } else if (form.start === null) {
      formKit({ target: "start", value: parseDate });
    } else if (form.end === null) {
      formKit({ target: "end", value: parseDate });
    } else {
      formKit({ pack: { end: null, start: parseDate } });
    }
  };

  return (
    <div className="overflow-hidden bg-sec/30 backdrop-blur  relative  p-5 rounded-lg shadow-xl h-full">
      <div className="bg-light pt-5 shadow-2xl  items-center w-[600px] flex flex-col">
        <FontTitle className=" text-4xl text-shadow whitespace-nowrap flex flex-col">
          Ô Fil de la Durance
        </FontTitle>

        <motion.div
          animate={{
            paddingTop: !moreIsClick && !isBooking ? "10px" : 0,
            paddingBottom: !moreIsClick && !isBooking ? "80px" : 0,
            opacity: !moreIsClick && !isBooking ? 1 : 0,
            height: !moreIsClick && !isBooking ? "fit-content" : 0,
          }}
          className="w-full flex-col  items-center flex "
        >
          <FontTitle2 className="text-7xl font-black">{name}</FontTitle2>
          <div className="w-1/2 h-px border my-6 border-sec "></div>
          <p className="w-4/5 text-center opacity-80">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo cumque
            est, pariatur dolor voluptatum aspernatur praesentium, officia,
            explicabo reiciendis quibusdam quisquam. Illum ab aliquid doloribus
            quis obcaecati cum, sed alias?
          </p>
          <div className=" justify-center  mt-10 mx-auto   gap-5 grid grid-cols-4 ">
            {ITEMS[accomodation.id].plans[0]?.arr.map(({ icon }, i) => (
              <BoxIcon key={`accessoire-${i}`} icon={icon} />
            ))}
          </div>
        </motion.div>

        <div className="shadow-inner uppercase pb-10 items-center mt-5   shadow-sec bg-sec/20 w-full px-10 flex flex-col">
          <Link
            href={isBooking ? "#" : `/gallery/${accomodation.id}`}
            onClick={() => (isBooking ? setIsBooking(false) : null)}
            className="w-fit border bg-light px-5 border-sec/40 shadow-sec shadow-lg py-2 rounded-full hover:scale-105 -translate-y-1/2"
          >
            {isBooking ? "Fermer" : "Voir photos"}
          </Link>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isBooking ? 1 : 0,
              height: isBooking ? "fit-content" : 0,
            }}
            className="w-full flex-col pb-5 items-center flex "
          >
            <div className="flex flex-col gap-2 w-full">
              <h6 className="border bg-light uppercase text-black font-bold border-color w-full text-center p-5 sm:text-xs font-text text-xl">
                Sélectionnez vos dates
              </h6>
              <div className="flex gap-[2px] font-text w-full">
                <DayBox date={form.start} />
                <DayBox date={form.end as Dayjs} header="Départ" />
              </div>
            </div>

            <Calendar
              onChange={handleChange}
              className="border-2 border-main text-black"
              cellClassName={(date: Date) => {
                let _date = dayjs(date);
                const targetDate = dayjs(new Date(date));
                let bool = targetDate.isBetween(form.start, form.end);
                let result: string;
                if (
                  data?.reservations
                    ?.map((el) => ({
                      end_date: el.end_date,
                      start_date: el.start_date,
                    }))
                    .some((el: any) =>
                      dayjs(date).isBetween(
                        dayjs(el.start_date),
                        dayjs(el.end_date),
                        null,
                        "[]"
                      )
                    )
                ) {
                  result = "bg-prim";
                } else if (dayjs().isAfter(date)) {
                  result = "opacity-50 bg-gray-300";
                } else if (
                  (form.start && form.start.isSame(_date, "day")) ||
                  (form.end && form.end.isSame(_date, "day"))
                ) {
                  result = "bg-sec/40";
                } else if (bool) {
                  result = "bg-sec text-light";
                } else {
                  result = "border border-prim/20";
                }
                return result;
              }}
              compact
              bordered
            />
            <div className="w-full mt-5">
              <div className="flex gap-2 items-end">
                <Icon icon={icfy.person.add} className="text-xl text-black " />
                Voyageur(s)
              </div>

              <Input
                className=" w-full mb-1 font-text  uppercase text-lg  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                min={1}
                id="voyagers"
                placeholder="Nombre de voyageur(s)"
              />
              <input
                className=" font-text uppercase sm:text-sm text-xl  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline w-full"
                type="phone"
                onChange={(e) =>
                  formKit({ target: "phone", value: e.target.value })
                }
                value={form?.phone || ""}
                placeholder="Numéro de téléphone"
              />
            </div>
          </motion.div>
          <div className="relative shadow shadow-sec  px-5 py-4 w-full border-2 border-sec flex justify-between items-center">
            <div className=" flex flex-col">
              <span className="text-xs">
                {commoditie?.name === "reception" ? "Par weekend" : "Par nuit"}
              </span>
              <p className="text-4xl text-sec1">
                {accomodation.default_price} €
              </p>
            </div>
            <MyBtn
              onClick={async () => {
                if (!isBooking) {
                  setIsBooking(true);
                  return;
                }
                let datas = {
                  roomId: accomodation.id,
                  user: auth?.id,
                  startDate: form.start,
                  endDate: form.end,
                  stripeId: "tx_1234567890",
                  numberOfGuests: form.voyagers,
                };
                // const res = await fetch(
                //   `${process.env.NEXT_PUBLIC_API_URL}/reservations/create-checkout-session`,
                //   {
                //     headers: {
                //       "Content-Type": "application/json",
                //     },
                //     method: "POST",
                //     body: JSON.stringify(datas),
                //   }
                // );
                // const { url } = await res.json();
                // console.log({ url });
                // window.location.href = url;
                await handleCheckout(datas);
              }}
              className=""
            >
              {!isBooking ? "Réserver" : "Payer"}
            </MyBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

let DayBox = ({
  header = "Arrivée",
  date,
}: {
  date: Dayjs;
  header?: "Arrivée" | "Départ";
}) => {
  return (
    <div className=" w-full  border-2 border-sec bg-light">
      <label className="block uppercase text-white text-xl sm:text-xs  bg-sec  p-2   ">
        {header}
      </label>
      <div className="flex sm:mt-5 mt-3 flex-col  pb-4 h-fit text-black font-bold w-full items-center   ">
        {date?.["$D"] ? (
          <>
            <div className="h-fit leading-0 font7 font-light ">
              <span className="countdown font7  sm:text-3xl text-6xl">
                {date?.["$D"] || 0}
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
                ][date?.$M]
              }
            </div>
          </>
        ) : (
          <p className="h-full flex items-center justify-center font-light opacity-50 normal-case">
            Sélectionner une date
          </p>
        )}
      </div>
    </div>
  );
};
