"use client";

import { useTools } from "@/context/tools";
import { cn } from "@/utils/cn";

export const Textarea = ({
  id,
  onChange,
  ...props
}: {
  id: string;
} & React.InputHTMLAttributes<HTMLTextAreaElement>) => {
  const {
    formKit,
    state: { form },
  } = useTools();

  return (
    <textarea
      className={cn(
        "w-full  font-text   text-lg  bg-light border border-color appearance-none   py-4 px-3 placeholder:text-black font-light text-amber-900 leading-tight focus:outline-none focus:shadow-outline",
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
