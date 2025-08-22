import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:transform hover:scale-[1.02] active:scale-[0.98]";
  
  const variants = {
    default: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm",
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/20",
    secondary: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 border border-slate-300",
    success: "bg-gradient-to-r from-success to-success/80 text-white hover:from-success/90 hover:to-success/70 shadow-lg shadow-success/20",
    warning: "bg-gradient-to-r from-warning to-warning/80 text-white hover:from-warning/90 hover:to-warning/70 shadow-lg shadow-warning/20",
    danger: "bg-gradient-to-r from-error to-error/80 text-white hover:from-error/90 hover:to-error/70 shadow-lg shadow-error/20",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    link: "text-primary underline-offset-4 hover:underline"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm rounded-md",
    md: "h-10 px-4 text-sm rounded-lg",
    lg: "h-12 px-6 text-base rounded-lg",
    xl: "h-14 px-8 text-lg rounded-xl"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;