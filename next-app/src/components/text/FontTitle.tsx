import { cn } from "@/utils/cn";

export const FontTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-sec font1 text-4xl", className)}>{children}</h3>
  );
};

export const FontTitle2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h6
      className={cn(
        "font-prim text-4xl sm:text-2xl text-sec1 text-shadow",
        className
      )}
    >
      {children}
    </h6>
  );
};
