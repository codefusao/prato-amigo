import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const variants = {
      primary: "bg-green-600 text-white hover:bg-green-700",
      outline:
        "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
      ghost: "hover:bg-gray-100",
      white: "bg-white text-green-600 hover:bg-gray-50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          !className?.includes("bg-") && !className?.includes("text-") ? variants[variant] : "",
          !className?.includes("px-") && !className?.includes("py-") ? sizes[size] : "",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
