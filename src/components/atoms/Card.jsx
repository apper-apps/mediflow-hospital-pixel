import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className,
  children,
  gradient = false,
  hover = true,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200",
        gradient && "bg-gradient-to-br from-white via-slate-50 to-white",
        hover && "hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;