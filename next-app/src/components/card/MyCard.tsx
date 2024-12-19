import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { HtmlHTMLAttributes, ReactNode } from "react";

export const MyCard = ({
  children,
  btn,
  footer,
  className = "min-w-[600px]",
}: {
  btn: {
    href?: string;
    text: string;
    setter?: any;
  };
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  footer: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div
      className={
        "overflow-hidden w-fit h-fit bg-sec/30 backdrop-blur  relative  p-5 rounded-lg shadow-xl "
      }
    >
      <div
        className={cn(
          "bg-light pt-5 shadow-2xl  items-center flex flex-col",
          className
        )}
      >
        {children}

        <div className="shadow-inner mt-10 uppercase pb-10 items-center    shadow-sec bg-sec/20 w-full px-10 flex flex-col">
          <Link
            href={btn?.href || "#"}
            onClick={btn?.setter}
            className="w-fit border bg-light px-5 border-sec/40 shadow-sec shadow-lg py-2 rounded-full hover:scale-105 -translate-y-1/2"
          >
            {btn?.text}
          </Link>
          {footer}
        </div>
      </div>
    </div>
  );
};
