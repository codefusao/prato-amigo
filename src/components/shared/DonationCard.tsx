import { Calendar, MapPin, Package, Heart } from "lucide-react";
import type { ReactNode } from "react";
import { formatDate } from "../../lib/dateUtils";

interface DateInfo {
  label: string;
  value: string;
  highlight?: boolean;
}

interface DonationCardProps {
  title: string;
  description?: string;
  quantity: string;
  expirationDate: string;
  location: string;
  category: string;
  statusBadge?: ReactNode;
  additionalBadges?: ReactNode[];
  dateInfo?: DateInfo[];
  defaultDate?: {
    label: string;
    value: string;
  };
  actionArea?: ReactNode;
  footer?: ReactNode;
  gridCols?: 3 | 4;
  showCategoryIcon?: boolean;
}

export function DonationCard({
  title,
  description,
  quantity,
  expirationDate,
  location,
  category,
  statusBadge,
  additionalBadges = [],
  dateInfo,
  defaultDate,
  actionArea,
  footer,
  gridCols = 4,
  showCategoryIcon = false,
}: DonationCardProps) {
  const gridColsClass = gridCols === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            {statusBadge && statusBadge}
            {additionalBadges.map((badge, index) => (
              <div key={index}>{badge}</div>
            ))}
          </div>

          {description && (
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          )}

          <div className={`grid grid-cols-1 ${gridColsClass} gap-4 text-sm`}>
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="w-4 h-4" />
              <span>{quantity}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Válido até: {formatDate(expirationDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{location}</span>
            </div>
            {gridCols === 4 && (
              <div className="flex items-center gap-2 text-gray-600">
                {showCategoryIcon && <Heart className="w-4 h-4" />}
                <span className={showCategoryIcon ? "capitalize" : ""}>{category}</span>
              </div>
            )}
          </div>

          {(dateInfo || defaultDate) && (
            <div className="mt-3 text-xs text-gray-500 space-y-1">
              {defaultDate && (
                <div>
                  {defaultDate.label}: {defaultDate.value}
                </div>
              )}
              {dateInfo?.map((date, index) => (
                <div
                  key={index}
                  className={date.highlight ? "text-green-600 font-medium" : ""}
                >
                  {date.label}: {date.value}
                </div>
              ))}
            </div>
          )}

          {footer && (
            <div className="mt-3 pt-3 border-t border-gray-200">{footer}</div>
          )}
        </div>

        {actionArea && (
          <div className="flex items-center gap-2 ml-4">{actionArea}</div>
        )}
      </div>
    </div>
  );
}
