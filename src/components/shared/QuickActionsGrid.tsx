import { ComponentType } from "react";
import { QuickActionCard } from "./QuickActionCard";
import { SectionHeader } from "./SectionHeader";

interface QuickAction {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
  disabled?: boolean;
  comingSoon?: boolean;
  action: () => void;
  tab?: string;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  activeTab?: string;
  columns?: 2 | 3 | 4;
}

export function QuickActionsGrid({
  actions,
  activeTab,
  columns = 4,
}: QuickActionsGridProps) {
  const gridColsClass =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 3
      ? "md:grid-cols-2 lg:grid-cols-3"
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <SectionHeader title="Ações Rápidas" className="mb-4" />
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4`}>
        {actions.map((action, index) => (
          <QuickActionCard
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            color={action.color}
            disabled={action.disabled}
            comingSoon={action.comingSoon}
            isActive={activeTab === action.tab}
            onClick={action.action}
          />
        ))}
      </div>
    </div>
  );
}

