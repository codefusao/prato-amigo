import type { InputHTMLAttributes } from "react";
import { forwardRef, type ComponentType } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: ComponentType<{ className?: string }>;
  rightIcon?: ComponentType<{ className?: string }>;
  onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, required, leftIcon: LeftIcon, rightIcon: RightIcon, onRightIconClick, type, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "date") {
        const value = e.target.value;
        if (value && value.length >= 4) {
          const parts = value.split("-");
          if (parts.length > 0 && parts[0].length > 4) {
            const normalizedYear = parts[0].slice(-4);
            e.target.value = [normalizedYear, ...parts.slice(1)].join("-");
          }
        }
      }
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <LeftIcon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            id={id}
            type={type}
            className={cn(
              "w-full py-3 border-2 rounded-lg transition-colors duration-200",
              "focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-600",
              error ? "border-red-500" : "border-gray-300",
              LeftIcon ? "pl-10" : "pl-4",
              RightIcon ? "pr-10" : "pr-4",
              className
            )}
            onChange={handleChange}
            {...props}
          />
          {RightIcon && (
            <div 
              className={cn(
                "absolute right-3 top-1/2 transform -translate-y-1/2",
                onRightIconClick ? "cursor-pointer hover:text-gray-600 transition-colors" : "pointer-events-none"
              )}
              onClick={onRightIconClick}
            >
              <RightIcon className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <span className="mr-1">⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
