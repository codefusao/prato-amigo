import type { TextareaHTMLAttributes } from "react";
import { forwardRef, type ComponentType } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./Label";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: ComponentType<{ className?: string }>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, required, leftIcon: LeftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-3 pointer-events-none">
              <LeftIcon className="w-5 h-5 text-gray-400" />
            </div>
          )}
          <textarea
            ref={ref}
            id={id}
            className={cn(
              "w-full py-3 border-2 rounded-lg transition-colors duration-200",
              "focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-600",
              "resize-none",
              error ? "border-red-500" : "border-gray-300",
              LeftIcon ? "pl-10" : "px-4",
              className
            )}
            {...props}
          />
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

Textarea.displayName = "Textarea";