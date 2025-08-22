import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  size = "md",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/10 to-accent/10 text-secondary border border-secondary/20",
    success: "bg-gradient-to-r from-success/10 to-success/20 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-warning/20 text-warning border border-warning/20",
    danger: "bg-gradient-to-r from-error/10 to-error/20 text-error border border-error/20",
    info: "bg-gradient-to-r from-info/10 to-info/20 text-info border border-info/20"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs rounded-md",
    md: "px-3 py-1 text-sm rounded-lg",
    lg: "px-4 py-2 text-base rounded-lg"
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;