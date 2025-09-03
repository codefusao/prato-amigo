import type { SelectHTMLAttributes } from "react";
import { forwardRef, type ComponentType } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./Label";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  leftIcon?: ComponentType<{ className?: string }>;
  rightIcon?: ComponentType<{ className?: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, required, options, leftIcon: LeftIcon, rightIcon: RightIcon, ...props }, ref) => {
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
          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full py-3 border-2 rounded-lg transition-colors duration-200 appearance-none",
              "focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-600",
              error ? "border-red-500" : "border-gray-300",
              LeftIcon ? "pl-10" : "pl-4",
              RightIcon ? "pr-10" : "pr-4",
              className
            )}
            {...props}
          >
            {options ? (
              <>
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
              </>
            ) : (
              props.children
            )}
          </select>
          {RightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
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

Select.displayName = "Select";
