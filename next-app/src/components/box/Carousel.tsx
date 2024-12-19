"use client";
import { motion } from "framer-motion";
import React, { use, useEffect, useState } from "react";

export const Carousel = ({
  images,
  darker = false,
}: {
  images: string[];
  darker?: boolean;
}) => {
  const [pointer, setPointer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setPointer((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <motion.div
        initial={{ x: 0, width: `${images.length * 100}vw` }}
        animate={{ x: `-${pointer * 100}vw` }}
        transition={{ duration: 4, type: "spring" }}
        className={`absolute flex top-0 left-0  h-full`}
      >
        {images.map((el, i) => (
          // carousel image par image qui prend tout le viewport avec un glissement vers la gauche. Revenir à 0 lorsque la dernière image est passée.
          <img
            src={el}
            key={`image-carousel-${i}`}
            className="  w-[100vw] h-[100vh] object-cover"
          />
        ))}
      </motion.div>
      {darker ? (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent via-black/30 to-black/80"></div>
      ) : null}
    </>
  );
};
