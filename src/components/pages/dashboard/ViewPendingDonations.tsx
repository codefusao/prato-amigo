import { useState } from "react";
import { Package, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/Button";
import { useRequests } from "../../../contexts/RequestContext";
import { useDonations } from "../../../contexts/DonationContext";
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
import { DonationApprovalModal } from "@/components/shared/DonationApprovalModal";

export function ViewPendingDonations() {
  const { getDonorRequests, updateRequest } = useRequests();
  const { deleteDonation } = useDonations();
  const { user } = useAuth();
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [requestToHandle, setRequestToHandle] = useState<string | null>(null);

  const userRequests = getDonorRequests(user?.id || "").filter(
    (r) => r.status === "pendente"
  );

  const handleOpenModal = (id: string) => {
    setRequestToHandle(id);
    setApprovalModalOpen(true);
  };

  const handleApprove = () => {
    if (!requestToHandle) return;

    const request = userRequests.find((r) => r.id === requestToHandle);
    if (!request) return;

    updateRequest(request.id, {
      status: "aprovado",
      approvedAt: new Date().toISOString(),
    });

    toast.success("Solicitação aprovada com sucesso!", {
      description: `A solicitação para "${request.donationTitle}" foi aprovada.`,
      duration: 5000,
    });

    setApprovalModalOpen(false);
    setRequestToHandle(null);
  };

  const handleReject = () => {
    if (!requestToHandle) return;

    const request = userRequests.find((r) => r.id === requestToHandle);
    if (!request) return;

    updateRequest(request.id, { status: "rejeitado" });
    deleteDonation(request.donationId);

    toast.success("Solicitação rejeitada com sucesso!", {
      description: `A solicitação para "${request.donationTitle}" foi rejeitada.`,
      duration: 5000,
    });

    setApprovalModalOpen(false);
    setRequestToHandle(null);
  };

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
              actionArea={
                <>
                  {request.status === "pendente" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleOpenModal(request.id)}
                    >
                      Aprovar/Rejeitar
                    </Button>
                  )}
                </>
              }
            />
          ))}
        </div>
      </div>

      <DonationApprovalModal
        isOpen={approvalModalOpen}
        onClose={() => setApprovalModalOpen(false)}
        title="Analisar Solicitação"
        message="Deseja aprovar para entregar ou deletar esta solicitação de doação?"
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </>
  );
}
