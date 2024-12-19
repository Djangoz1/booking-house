"use client";
import { BoxImages } from "@/components/box/BoxImages";
import { BoxInfo } from "@/components/box/BoxInfo";
import { MyCard } from "@/components/card/MyCard";
import { icfy } from "@/constants/icon";

import { useApi } from "@/hooks/useApi";

import { Guest, Image, Reservation, Room } from "@/types";
import { Icon } from "@iconify/react";

export type TSuccessReservation = {
  reservation: Reservation;
  room: Room;
  customer: Guest;
  images: Image[];
  price: number;
};
// Page de redirection après transaction spline `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`
export default (ctx: any) => {
  let { session_id } = ctx.searchParams;

  const { data } = useApi({
    route: `reservations/stripe/${session_id}`,
    params: {},
  }) as { data: TSuccessReservation | null };

  console.log({ successData: data });

  return (
    <main className="w-screen lg:h-screen flex flex-col-reverse lg:flex-row  lg:items-end bg-prim justify-between">
      <div className="flex flex-col justify-between gap-20 p-20w">
        <BoxImages
          sizeImg={800}
          images={(data?.images || []).map((el) => el.image)}
        />
        <div className="text-sec text-shadow font1 text-6xl whitespace-nowrap flex flex-col">
          <span className=" font-prim text-light mb-3">{data?.room?.name}</span>

          <h1>Ô Fil de la Durance</h1>
        </div>
      </div>
      <div className="lg:bg-light/50 py-40 lg:py-0 flex items-center justify-center w-full  lg:w-1/2 lg:h-full">
        <MyCard
          footer={
            <div className="flex flex-col items-center mt-5 w-full">
              <p className="text-2xl  font-bold">Contact</p>

              <div className="flex items-center gap-3 mt-4">
                <Icon icon={icfy.ux.phone} className="text-2xl" />
                <span className="text-xs">06.13.14.13.69</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon={icfy.msg.casual} className="text-2xl" />
                <span className="text-xs">campagne-st-chrisophe@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon={icfy.msg.casual} className="text-2xl" />
                <span className="text-xs text-center">
                  Campagne Saint-Christophe
                  <br />
                  13 640 La Roque d'Anthéron
                </span>
              </div>
            </div>
          }
          // className="w-[800px]"
          btn={{ href: "/", text: "Accueil" }}
        >
          <div className="flex  w-full   flex-col items-center  gap-2 ">
            <div className="bg-light p-1 w-fit rounded-full border-sec border shadow-sec shadow-xl">
              <div className="p-2 bg-sec/80 rounded-full items-center flex justify-center">
                <Icon icon={icfy.check.yes} className="text-light text-3xl" />
              </div>
            </div>

            <div className="flex text-center items-center  w-2/3 flex-col gap-2 ">
              <b className={"text-2xl font-black"}>Réservation confirmée !</b>
              <p className={"text-xs my-5 "}>
                Vous retrouverez les détails de la commande dans le mail que
                vous recevrez sous peu à{" "}
                <span className="underline font-bold text-sm">
                  {data?.customer?.email}
                </span>
                <br />
                <br />
                Les détails concernant votre séjour vous seront transmis par
                mail la semaine de votre arrivée.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <BoxInfo className={"w-full"} icon={icfy.ux.calendar}>
              <div className="flex divide-x divide-black w-full justify-between items-center ">
                <div className="flex flex-col items-center w-full">
                  <p className="text-xs opacity-50  normal-case font-light">
                    Date d'arrivée
                  </p>
                  <span>{data?.reservation?.start_date}</span>
                </div>
                <div className="flex flex-col w-full items-center">
                  <p className="text-xs normal-case opacity-50 font-light">
                    Date de départ
                  </p>
                  <span>{data?.reservation?.end_date}</span>
                </div>
              </div>
            </BoxInfo>

            <BoxInfo className={"w-full"} icon={icfy.ux.shop}>
              <div className="flex divide-x divide-sec w-full justify-evenly items-center ">
                <div className="flex   flex-col text-lg items-center gap-0 w-full">
                  <span className="text-xs opacity-50  normal-case font-light">
                    Appartement
                  </span>
                  <span className={"  "}>{data?.room?.name}</span>
                </div>
                <div className="flex   flex-col text-lg items-center gap-0 w-full">
                  <span className="text-xs opacity-50  normal-case font-light">
                    Voyageurs
                  </span>
                  <span className={"text-lg   font-prim  "}>
                    {data?.reservation?.number_of_guests}
                  </span>
                </div>
                <div className="flex   flex-col text-lg items-center gap-0 w-full">
                  <span className="text-xs opacity-50  normal-case font-light">
                    Prix
                  </span>
                  <span className={"text-lg   font-prim  "}>
                    {(data?.price || 0) / 100} €
                  </span>
                </div>
              </div>
            </BoxInfo>
          </div>

          <p className="text-center font-light w-1/2">
            Nous vous remercions pour votre réservation et nous sommes ravi de
            vous accueilir.
            <br />À très bientôt !
          </p>
        </MyCard>
      </div>
    </main>
  );
};
