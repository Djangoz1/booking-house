"use client";

import { useTools } from "@/context/tools";
import { cn } from "@/utils/cn";

export const Input = ({
  id,
  onChange,
  ...props
}: {
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const {
    formKit,
    state: { form },
  } = useTools();

  return (
    <input
      className={cn(
        "w-full h-fit  font-text   text-lg  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline",
        props?.className
      )}
      onChange={(e) => {
        formKit({
          target: id,
          value: e.target.value,
        });
        onChange?.(e);
      }}
      {...props}
    />
  );
};
