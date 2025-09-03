import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
        <img 
          src="/logo.svg" 
          alt="Logo Prato Amigo" 
          className={cn(sizeClasses[size], "text-green-600")}
        />
      </div>
      {showText && (
        <span className={cn("font-bold text-gray-900", textSizeClasses[size])}>
          Prato Amigo
        </span>
      )}
    </div>
  );
}
