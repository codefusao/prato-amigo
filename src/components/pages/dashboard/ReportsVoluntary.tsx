import { CheckCircle, Package } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";

export function ReportsVoluntary() {
  const { getVoluntaryRequests } = useRequests();
  const { user } = useAuth();

  const userRequests = getVoluntaryRequests(user?.id || "");
  console.log(userRequests);
  console.log("userRequests");
  console.log(user);
  const total = userRequests.length;
  const approved = userRequests.filter((r) => r.status === "aprovado").length;
  const delivered = userRequests.filter((r) => r.status === "entregue").length;

  const items = [
    {
      label: "Total",
      value: total,
      icon: Package,
      color: "text-gray-600",
    },
    {
      label: "Aprovadas",
      value: approved,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "Entregues",
      value: delivered,
      icon: Package,
      color: "text-blue-600",
    },
  ];

  if (userRequests.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma entrega assumida ou realizada"
        description="Você ainda não fez nenhuma entrega. Explore as entregas disponíveis para começar."
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {items.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center"
          >
            <Icon className={`w-5 h-5 mb-2 ${color}`} />
            <p className="text-sm text-gray-600">{label}</p>
            <p className="text-xl font-semibold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
