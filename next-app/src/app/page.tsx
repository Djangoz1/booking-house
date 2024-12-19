"use client";

import { Carousel } from "@/components/box/Carousel";
import { FontTitle, FontTitle2 } from "@/components/text/FontTitle";
import { useApp } from "@/context/app";
import { useApi } from "@/hooks/useApi";
import { Image as TImage } from "@/types";
import { useQuery } from "@tanstack/react-query";
// import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  let videoRef = useRef(null);

  const { data: images, ...rest } = useApi({
    route: "upload",
    params: {},
  }) as { data: TImage[] | undefined };

  return (
    <main className="font1 snap-mandatory snap-y bg-sec  sm:text-[60px] lg:text-[104px]  text-lg w-screen  text-white relative overflow-hidden">
      <div className="relative h-screen aspect-[16/9] w-screen">
        {images?.length ? (
          <Carousel images={(images || []).map((el) => el.image)} />
        ) : (
          <></>
        )}

        <div className="py-40 text-center absolute top-0 left-0 w-full h-full flex flex-col gap-20 sm:gap-5 justify-end items-center bg-gradient-radial from-transparent via-black/50 to-black">
          <FontTitle2 className="lg:text-5xl sm:text-3xl">
            Hotel & Spa
          </FontTitle2>
          <FontTitle className="lg:text-8xl text-white sm:text-xl">
            Ô Fil de la Durance
          </FontTitle>
        </div>
      </div>
      <div className="bg-light snap-start lg:flex-row-reverse lg:gap-0  sm:flex-col-reverse sm:gap-10 relative flex py-60 justify-center items-center w-full ">
        <motion.img
          viewport={{ amount: 0.5 }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          src="/image9.jpeg"
          className=" sm:h-fit sm:w-full lg:h-[800px] lg:w-fit   "
        />
        <div className="flex sm:max-w-full sm:text-center flex-col sm:items-center lg:max-w-[600px]  sm:text-sm lg:text-left text-black relative  ">
          <FontTitle2 className="   whitespace-nowrap  mb-10 text-sec1 flex flex-col  sm:text-[30px] lg:text-[60px]">
            Salle de Réception
          </FontTitle2>

          <motion.div className="flex font-text font-light    h-fit  flex-col text-prim sm:items-center lg:items-start">
            <p className="w-3/4 mt-5 sm:mt-0 sm:text-xs lg:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis
              aut modi obcaecati fugiat exercitationem cumque debitis quidem sed
              accusantium et rem magni sunt, rerum nam laudantium autem
              blanditiis hic voluptatum! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Odit laboriosam distinctio quaerat cumque porro?
              Vitae dolorum alias deserunt pariatur, quas voluptas dignissimos
              perferendis suscipit ducimus at repellat odio quasi laborum.
            </p>
          </motion.div>
        </div>
      </div>
      <div className=" bg-light sm:px-10  snap-center relative flex sm:flex-col-reverse lg:flex-row lg:px-0  lg:py-10 justify-center items-start w-full gap-5">
        <motion.img
          viewport={{ amount: 0.5 }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          src="/appartements/oliviers/_3.jpeg"
          className="xl:max-w-[700px] sm:max-w-[400px] z-0 min-h-[500px]"
        />
        <div className="flex  z-5 relative gap-10 flex-col text-amber-950 color2 lg:w-[700px] sm:w-full sm:text-center lg:items-start lg:text-left sm:items-center">
          <FontTitle2 className=" w-fit lg:-ml-20 flex flex-col  lg:text-[90px] lg:leading-[90px] sm:text-3xl sm:ml-0">
            <span>L'endroit idéal</span>
            <span>pour se reposer</span>
          </FontTitle2>
          <p className="w-2/3 sm:w-full text-prim sm:text-sm lg:text-xl font-light font-text ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            nisi corrupti odit quisquam. Quod consectetur libero, ex expedita
            veniam odit nam quisquam commodi explicabo omnis facere quaerat enim
            ducimus nobis. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eum quaerat commodi fugit molestiae laudantium accusamus
            beatae aperiam officiis quod ut, ipsam sunt suscipit et neque odio
            placeat! Magnam, nisi explicabo! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Laboriosam nisi corrupti odit
            quisquam. Quod consectetur libero, ex expedita veniam odit nam
            quisquam commodi explicabo omnis facere quaerat enim ducimus nobis.
            libero, ex expedita veniam odit nam quisquam commodi explicabo omnis
            facere quaerat enim ducimus nobis. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Eum quaerat commodi fugit molestiae
            laudantium accusamus beatae aperiam officiis quod ut, ipsam sunt
            suscipit et neque odio placeat! Magnam, nisi explicabo!
          </p>
        </div>
      </div>

      <div className="bg-sec snap-start flex-col sm:gap-10 relative flex py-60 justify-center items-center w-full ">
        <FontTitle2 className="w-4/5 text-left  text-shadow  whitespace-nowrap  mb-5 color1    lg:text-[40px] sm:text-3xl">
          Spas, Sport & Relax
        </FontTitle2>
        <div className="lg:grid  mb-10 w-4/5 lg:grid-cols-5 lg:gap-4 sm:flex sm:flex-col sm:gap-0">
          {[
            {
              img: "/spa/_1.jpeg",
              description: "Venez profitez d'un jacuzzi et d'un sauna",
              title: "Jacuzzi",
            },
            {
              img: "/pingpong.png",
              title: "Ping-Pong",
              description: "Une table de ping-pong et des boules de pétanques",
            },
            {
              img: "/sport.png",
              description: "Des machines de musculations ",
              title: "Salle fitness",
            },
            {
              img: "/image5.jpeg",
              description: "Parcourez la durance à bord d'un Kanoé",
              title: "Kanoé",
            },
            {
              img: "/piscine/_2.jpeg",
              description: "Rafraichissez vous dans notre piscine",
              title: "Piscine",
            },
          ].map((el, i) => (
            <motion.div
              key={`activity-img-${i}`}
              viewport={{ once: true, amount: 0.5 }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="w-full border border-light shadow-2xl sm:h-[350px]  lg:h-[500px] relative flex justify-end flex-col"
            >
              <motion.img
                src={el.img}
                className=" min-h-full z-0 shadow-xl absolute object-cover top-0 left-0 "
              />

              <div className="relative z-1 h-full flex flex-col justify-end bg-gradient-to-b from-transparent to-black via-transparent p-3">
                <h6 className="font-sec sm:text-4xl lg:text-5xl">{el.title}</h6>
                <p className="font-text sm:text-xs lg:text-sm opacity-70">
                  {el?.description || "Lorem ipsum dolor sit amet consectetur!"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className=" bg-light py-60 snap-center relative flex  justify-center items-start w-full gap-5 lg:flex-row flex-col-reverse">
        <motion.img
          viewport={{ amount: 0.5 }}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, type: "spring" }}
          src="/durance/_3.jpeg"
          className="xl:max-w-[700px] sm:max-w-[400px] z-0 min-h-[500px]"
        />
        <div className="flex  z-5 relative gap-10 flex-col text-amber-950 color2 lg:w-[700px] sm:w-full lg:p-0  sm:px-10">
          <FontTitle2 className="w-fit lg:-ml-20 flex flex-col  lg:text-[90px] lg:leading-[90px] sm:ml-0 sm:text-4xl sm:w-full">
            <span>Au bord</span>
            <span>de la Durance</span>
          </FontTitle2>
          <p className="w-2/3 text-prim sm:text-sm lg:text-xl font-light font-text sm:w-full ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam
            nisi corrupti odit quisquam. Quod consectetur libero, ex expedita
            veniam odit nam quisquam commodi explicabo omnis facere quaerat enim
            ducimus nobis. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Eum quaerat commodi fugit molestiae laudantium accusamus
            beatae aperiam officiis quod ut, ipsam sunt suscipit et neque odio
            placeat! Magnam, nisi explicabo! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Laboriosam nisi corrupti odit
            quisquam. Quod consectetur libero, ex expedita veniam odit nam
            quisquam commodi explicabo omnis facere quaerat enim ducimus nobis.
            libero, ex expedita veniam odit nam quisquam commodi explicabo omnis
            facere quaerat enim ducimus nobis. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Eum quaerat commodi fugit molestiae
            laudantium accusamus beatae aperiam officiis quod ut, ipsam sunt
            suscipit et neque odio placeat! Magnam, nisi explicabo!
          </p>
        </div>
      </div>
      <div className="bg-prim snap-start lg:flex-row-reverse sm:flex-col-reverse relative flex py-40 justify-center items-center w-full ">
        <motion.div
          viewport={{ amount: 0.5 }}
          initial={{ opacity: 0, y: 0 }}
          whileInView={{ opacity: 1, y: -50 }}
          transition={{ duration: 1, type: "spring" }}
          className="flex absolute font-text text-white text-2xl top-0 -translate-y-1/2 gap-5 lg:w-4/5 sm:w-5/6"
        >
          <Link
            href={"/reservation/"}
            className="w-1/2 lg:h-[130px] sm:h-[90px] border border-sec relative overflow-hidden flex items-end shadow-2xl justify-end text-white"
          >
            <img
              src="/terrasses/reception/_4.jpeg"
              alt=""
              className="brightness-[.80] absolute  object-cover object-center top-0 min-h-full"
            />
            <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            <FontTitle2 className=" relative  p-5 text-lg  ">
              Réserver
            </FontTitle2>
          </Link>
          <Link
            href={"/reservation"}
            className="w-1/2 lg:h-[130px] sm:h-[90px] border border-sec relative overflow-hidden flex items-end shadow-2xl justify-end text-white"
          >
            <img
              src="/jardin5.png"
              alt=""
              className="brightness-[.80] absolute  object-cover object-center top-0 min-h-full"
            />
            <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
            <FontTitle2 className=" relative  p-5 text-lg ">
              Gallerie
            </FontTitle2>
          </Link>
        </motion.div>
        <>
          <video
            muted
            ref={videoRef}
            // src="festival.mp4"
            controls
            // width="620"
            // height="440"
            autoPlay
            poster="festival.png"
            src="festival.mp4"
            className="lg:-ml-40 sm:ml-0 sm:max-w-[80vw]  lg:max-w-[900px]  relative "
          >
            <source type="video/mp4" />
          </video>
        </>

        <div className="w-fit lg:text-left text-center  relative   text-shadow font-prim whitespace-nowrap  mb-5 color1 flex flex-col sm:text-[30px]  text-[40px]">
          <FontTitle2 className="uppercase text-center ">
            festival international
            <br />
            de piano
          </FontTitle2>

          <p className="font-text  lg:mt-10 sm:mt-4 normal-case text-xs font-light w-full lg:w-[200px] whitespace-pre-wrap text-left sm:text-center">
            Assistez au festival de piano de la Roque d'Anthéron, le plus grand
            festival de piano du monde. Situé à 5min de voiture, vous serez logé
            au plus proche.
          </p>
        </div>
      </div>
    </main>
  );
}
