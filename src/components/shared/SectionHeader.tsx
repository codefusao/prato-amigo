import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  count,
  action,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {title}
          {count !== undefined && ` (${count})`}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

