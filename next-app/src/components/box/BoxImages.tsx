import { ITEMS } from "@/constants/items";
import { TAccomodation } from "@/interfaces/data";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const BoxImages = ({
  sizeImg = 600,
  color = 0,
  activeIndex = 0,
  setActiveIndex,

  images,
}: {
  sizeImg?: number;
  color?: number;
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;

  images: string[];
}) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      style={{
        width: sizeImg,
        height: sizeImg,
      }}
      className={` relative overflow-hidden`}
    >
      <img
        src={images?.[activeIndex || 0]}
        alt=""
        className="w-full h-full object-cover  col-span-3 relative"
      />

      <div className="absolute w-full h-full top-0 left-0 grid-cols-3 grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <Element
            setActiveIndex={setActiveIndex}
            color={color}
            key={`photo-gallery-${isHover}` + i}
            sizeImg={sizeImg}
            active={isHover}
            index={i}
            images={images}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Element = ({
  sizeImg,
  setActiveIndex,
  color,
  active,
  index,
  images,
}: {
  sizeImg: number;
  setActiveIndex?: (index: number) => void;
  color?: number;

  active: boolean;
  index: number;
  images: string[];
}) => {
  const [isClick, setIsClick] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          if (setActiveIndex && images?.[index]) {
            setActiveIndex(index);
          }
          setIsClick(!isClick);
        }}
        style={{
          height: sizeImg / 3,
        }}
        // transition={{
        //   stiffness: 100,
        //   damping: 10,
        //   duration: 5,
        //   type: "spring",
        //   when: "beforeChildren",
        //   staggerChildren: 0.1,
        // }}
        className={`border-${color || "prim"} border-4
         w-full transition ${!isClick ? "overflow-hidden" : ""} ${
          images?.[index] && active
            ? "hover:brightness-100 brightness-50 backdrop-blur"
            : ""
        } z-0 cursor-pointer`}
      >
        {images?.[index] && active ? (
          <AnimatePresence>
            <motion.img
              initial={{ opacity: 0, translateY: 100 }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: { duration: 1 },
              }}
              src={images?.[index]}
              className="  w-full h-full object-cover aspect-auto "
            />
          </AnimatePresence>
        ) : (
          <></>
        )}
      </div>
      {isClick ? (
        <motion.img
          onClick={() => setIsClick(false)}
          initial={{
            opacity: 0,
            width: sizeImg / 3,
            height: sizeImg / 3,
            top: -100,
            left: -100,
          }}
          animate={{
            width: sizeImg,
            height: sizeImg,
            top: 0,
            left: 0,
            opacity: 1,
            transition: { duration: 1 },
          }}
          className="absolute cursor-pointer z-50 w-full  h-full"
          src={images?.[index]}
        />
      ) : (
        <></>
      )}
    </>
  );
};
