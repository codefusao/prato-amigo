import { Package, CheckCircle } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";
import { DonationCard } from "../../shared/DonationCard";
import { SectionHeader } from "../../shared/SectionHeader";
import { buildRequestDateInfo } from "../../../lib/dateUtils";

export function ReceivedDonationsHistory() {
  const { getUserRequests } = useRequests();
  const { user } = useAuth();

  const receivedDonations = getUserRequests(user?.id || "").filter(
    (request) => request.status === "entregue"
  );

  

  if (receivedDonations.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma doação recebida"
        description="Você ainda não recebeu nenhuma doação. Suas doações recebidas aparecerão aqui."
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <SectionHeader
        title="Histórico de Doações Recebidas"
        subtitle={`Total: ${receivedDonations.length} doação(ões) recebida(s)`}
      />

      <div className="space-y-4">
        {receivedDonations.map((donation) => (
          <DonationCard
            key={donation.id}
            title={donation.donationTitle}
            description={donation.message}
            quantity={donation.quantity}
            expirationDate={donation.expirationDate}
            location={donation.donorLocation}
            category={donation.category}
            statusBadge={
              <span className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 bg-blue-100 text-blue-800">
                <CheckCircle className="w-4 h-4" />
                Entregue
              </span>
            }
            dateInfo={buildRequestDateInfo({
              requestedAt: donation.requestedAt,
              approvedAt: donation.approvedAt,
              deliveredAt: donation.deliveredAt,
            })}
            footer={
              <p className="text-xs text-gray-500">
                <span className="font-medium">Doador:</span> {donation.donorName}
              </p>
            }
          />
        ))}
      </div>
    </div>
  );
}

