import { cn } from "@/utils/cn";
import { Icon } from "@iconify/react/dist/iconify.js";

export const BoxIcon = ({
  icon,
  className,
  children,
  ...props
}: {
  icon: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        `bg-light h-fit p-1 w-fit rounded-full border-sec border shadow-sec shadow-xl`,
        className
      )}
      {...props}
    >
      <div className="p-2 bg-sec/80 rounded-full items-center flex justify-center">
        <Icon icon={icon} className="text-light text-3xl" />
      </div>
    </div>
  );
};
