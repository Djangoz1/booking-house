import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react";
import React from "react";

export const BoxInfo = ({
  icon,
  children,
  className,
}: {
  icon: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `flex px-3 py-1   whitespace-nowrap   uppercase border border-color  justify-between  items-center  gap-5`,
        className || "text-sm  bg-light"
      )}
    >
      <Icon className="text-[24px]  " icon={icon} />
      {children}
    </div>
  );
};
