import { Clock } from "lucide-react";
import type { ComponentType } from "react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  disabled?: boolean;
  comingSoon?: boolean;
  isActive?: boolean;
  onClick: () => void;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
  disabled = false,
  comingSoon = false,
  isActive = false,
  onClick,
}: QuickActionCardProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; hoverBg: string; text: string; border: string }> = {
      green: {
        bg: "bg-green-100",
        hoverBg: "group-hover:bg-green-200",
        text: "text-green-600",
        border: "hover:border-green-300",
      },
      blue: {
        bg: "bg-blue-100",
        hoverBg: "group-hover:bg-blue-200",
        text: "text-blue-600",
        border: "hover:border-blue-300",
      },
      purple: {
        bg: "bg-purple-100",
        hoverBg: "group-hover:bg-purple-200",
        text: "text-purple-600",
        border: "hover:border-purple-300",
      },
      orange: {
        bg: "bg-orange-100",
        hoverBg: "group-hover:bg-orange-200",
        text: "text-orange-600",
        border: "hover:border-orange-300",
      },
    };
    return colorMap[color] || colorMap.green;
  };

  const colors = getColorClasses(color);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-4 border border-gray-200 rounded-lg transition-all group ${
        disabled
          ? "opacity-50 cursor-not-allowed bg-gray-50"
          : isActive
          ? "border-blue-300 bg-blue-50 shadow-md"
          : `${colors.border} hover:shadow-md cursor-pointer`
      }`}
    >
      <div className="relative">
        <div
          className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center mb-3 ${colors.hoverBg} transition-colors`}
        >
          <Icon className={`w-6 h-6 ${colors.text}`} />
          {comingSoon && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
            </div>
          )}
        </div>
        <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        {comingSoon && (
          <p className="text-xs text-orange-600 mt-2 font-medium">Em breve</p>
        )}
      </div>
    </button>
  );
}
