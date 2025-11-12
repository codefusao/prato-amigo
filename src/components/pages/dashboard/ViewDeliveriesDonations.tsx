import { Package, Clock } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";
import { DonationCard } from "../../shared/DonationCard";
import { SectionHeader } from "../../shared/SectionHeader";
import { isExpiringSoon, buildRequestDateInfo } from "../../../lib/dateUtils";
import {
  getStatusColor,
  getStatusText,
  getRequestStatusIcon,
  requestStatusMap,
} from "../../../lib/statusUtils";

export function ViewDeliveriesDonations() {
  const { getDonorRequests } = useRequests();
  const { user } = useAuth();

  const userRequests = getDonorRequests(user?.id || "").filter(
    (r) => r.status === "aprovado" || r.status === "entregue"
  );

  if (userRequests.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma solicitação realizada"
        description="Nenhum doador fez solicitação de doação ainda."
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SectionHeader title="Solicitações" count={userRequests.length} />

        <div className="space-y-4">
          {userRequests.map((request) => (
            <DonationCard
              key={request.id}
              title={request.donationTitle}
              description={request.message}
              quantity={request.quantity}
              expirationDate={request.expirationDate}
              location={request.donorLocation}
              category={request.category}
              statusBadge={
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(
                    request.status,
                    requestStatusMap
                  )}`}
                >
                  {getRequestStatusIcon(request.status)}
                  {getStatusText(request.status, requestStatusMap)}
                </span>
              }
              additionalBadges={
                isExpiringSoon(request.expirationDate)
                  ? [
                      <div
                        key="expiring"
                        className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        <Clock className="w-3 h-3" />
                        Vencendo em breve
                      </div>,
                    ]
                  : []
              }
              dateInfo={buildRequestDateInfo({
                requestedAt: request.requestedAt,
                approvedAt: request.approvedAt,
                deliveredAt: request.deliveredAt,
              })}
            />
          ))}
        </div>
      </div>
    </>
  );
}
