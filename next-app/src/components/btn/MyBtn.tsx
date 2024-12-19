"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { MouseEventHandler, useState } from "react";

export const MyBtn = ({
  children,
  onClick,
  className,
  href,
  ...props
}: {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
  href?: string;
}) => {
  let [isLoading, setIsLoading] = useState(false);
  return (
    <Link
      href={href || "#"}
      onClick={
        (onClick
          ? async () => {
              setIsLoading(true);
              await onClick();
              setIsLoading(false);
            }
          : null) as MouseEventHandler<HTMLAnchorElement>
      }
      className={cn(
        "bg-sec btn rounded-none  hover:bg-amber-700 text-white   p-4 ",
        className || ""
      )}
    >
      {isLoading ? <span className="loading " /> : children}
    </Link>
  );
};
