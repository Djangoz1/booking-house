"use client";

import { BoxIcon } from "@/components/box/BoxIcon";
import { FontTitle2 } from "@/components/text/FontTitle";
import { icfy } from "@/constants/icon";
import { useApp } from "@/context/app";

import { useTools } from "@/context/tools";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const MyHeader = ({ header }: { header?: false | undefined }) => {
  let {
    state: { auth },
  } = useTools();
  const [isClick, setIsClick] = useState<boolean | null>(null);
  const [menusClick, setMenusClick] = useState<number | null>(null);
  const { data } = useApp();
  console.log({ datatoview: data });
  const menus: {
    title: string;
    url?: `/${string}`;
    arr?: { title: string; url: string }[];
  }[] = [
    {
      title: "Accueil",
      url: "/",
    },
    {
      title: "Réserver",

      arr: data.rooms?.map((el) => ({
        title: el.name,
        url: `/reservation/${el.id}`,
      })),
    },
    {
      title: "Photos",

      arr: [
        { title: "Tout", url: "#" },
        { title: "Spa", url: "/gallery/spa" },
        { title: "Salle de Réception", url: "/gallery/reception" },
        { title: "Piscine", url: "/gallery/pool" },
        { title: "Les Oliviers", url: "/gallery/oliviers" },
        { title: "Les Lavandes", url: "/gallery/lavandes" },
      ],
    },

    !auth?.id
      ? {
          title: "Se connecter",
          url: "/login",
        }
      : {
          title: "Se déconnecter",
          url: "/login",
        },
  ];

  return (
    <>
      {header !== false && (
        <header className="absolute z-100  top-0 left-0   p-10 w-full flex items-center justify-between pointer-events-none">
          <Link
            className="text-shadow pointer-events-auto font-light color1  font1 text-4xl "
            href={"/"}
          >
            <Image alt="logo" src="/logo.png" width={150} height={150} />
          </Link>
        </header>
      )}
      <div className="lg:fixed absolute right-0 color1 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-end ">
        <button
          onClick={() => setIsClick(!isClick)}
          className={` text-[44px] sm:text-3xl  transition-all hover:w-[100px] w-[80px] sm:w-[50px] flex items-center px-4  py-5 border-sec/40 bg-prim border-2 shadow-2xl border-r-0   font-light `}
        >
          <Icon icon={icfy.ux.hamburger} />
        </button>

        <Link
          href={"/reservation"}
          className={`text-[44px] sm:text-3xl  transition-all hover:w-[100px] w-[80px] sm:w-[50px] flex items-center px-4  py-5 bg-sec font-light `}
        >
          <Icon icon={icfy.ux.shop} />
        </Link>
      </div>
      <AnimatePresence>
        {isClick && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            style={{ zIndex: 100 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-full  lg:flex-row lg:overflow-y-auto flex-col flex fixed top-0 left-0 h-screen  bg-black/20  text-light"
          >
            <div className="lg:w-2/3 w-full shadow-2xl  bg-black h-full flex relative">
              <img
                src="/appartements/oliviers/_5.jpg"
                className="absolute brightness-[0.25] top-0 left-0 w-full h-full"
              />
              <button
                className="btn absolute top-3 right-3 btn-ghost text-6xl"
                onClick={() => setIsClick(false)}
              >
                <Icon icon={icfy.ux.check.uncheck} />
              </button>
              <div className="flex font-light font-sec relative lg:text-[85px] text-[60px]   flex-col items-start justify-center lg:gap-20 gap-10  px-10 h-full">
                {menus
                  .filter((el) => el.title)
                  .map((el, i) =>
                    !el?.url ? (
                      <button
                        key={"menu-" + i}
                        className={` ${
                          i === menusClick
                            ? "opacity-100 border-b"
                            : "opacity-50 hover:opacity-100"
                        }`}
                        onClick={() => {
                          setMenusClick(i === menusClick ? null : i);
                        }}
                      >
                        {el.title}
                      </button>
                    ) : (
                      <Link
                        href={el.url}
                        key={"menu-" + i}
                        onClick={() => setIsClick(false)}
                        className="opacity-50 hover:opacity-100"
                      >
                        {el.title}
                      </Link>
                    )
                  )}
              </div>
              <AnimatePresence>
                <div className="flex  font-prim relative lg:text-[70px] text-4xl font-extralight flex-col items-center ml-5 justify-center gap-10  px-10 h-full">
                  {menusClick !== null ? (
                    menus?.[menusClick]?.arr?.map((el, i) => (
                      <motion.div
                        initial={"enter"}
                        animate={"center"}
                        exit={"exit"}
                        transition={{ duration: 0.5 }}
                        variants={{
                          center: { opacity: 1, y: 0 },
                          exit: { opacity: 0, y: 100 },
                          enter: { opacity: 0, y: -100 },
                        }}
                        key={`submenu-${menusClick}-${i}`}
                        className="text-white/70 hover:text-white"
                      >
                        <Link
                          onClick={() => {
                            setIsClick(false);
                          }}
                          href={el.url}
                        >
                          {el.title}
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </AnimatePresence>
            </div>
            <div
              className="lg:w-1/3 w-full gap-10 flex flex-row lg:flex-col   relative bg-prim color1 h-full lg:p-10 pb-10 px-10 items-end"
              onClick={() => setIsClick(false)}
            >
              <Image
                src="/logo.png"
                alt="logo"
                className=""
                width={150}
                height={150}
              />

              <div className="flex flex-col gap-20 w-full items-center py-5">
                <FontTitle2 className="lg:text-8xl sm:text-4xl text-center text-sec">
                  Hotel <br />
                  Reception <br />
                  Spa
                </FontTitle2>

                <div
                  onClick={() =>
                    window.open(
                      "https://www.airbnb.fr/rooms/26556869?source_impression_id=p3_1734564110_P3W7_4OSkBbGNZ_o",
                      "_blank"
                    )
                  }
                  className="flex lg:flex-col flex-rowitems-center text-center cursor-pointer "
                >
                  <div className="flex gap-5 items-center ">
                    <img
                      src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
                      className="w-[100px]"
                    />
                    <div className="flex flex-col gap-2 items-center">
                      <Icon icon={"logos:airbnb-icon"} className="text-4xl" />
                      <span className="font-black text-4xl">4.83</span>
                    </div>
                    <img
                      src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
                      className="w-[100px]"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-black text-2xl">
                      Coup de coeur des voyageurs
                    </p>
                    <p className="opacity-80 text-lg font-light">
                      Un des logements préférés des voyageurs sur AirBnB
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-center">
                  <p className="font-bold">Contactez-nous</p>
                  <div className="flex items-center gap-5">
                    <BoxIcon
                      icon={icfy.ux.phone}
                      onClick={() => (window.location.href = "tel:0613141369")}
                      className="shadow-sm cursor-pointer"
                    />
                    <BoxIcon
                      className="shadow-sm cursor"
                      icon={icfy.msg.casual}
                      onClick={() =>
                        (window.location.href =
                          "mailto:campagne-stchristophe@gmail.com")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
