import { useState } from "react";
import { Package, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/Button";
import { useRequests } from "../../../contexts/RequestContext";
import { useDonations } from "../../../contexts/DonationContext";
import { useAuth } from "../../../contexts/AuthContext";
import { ConfirmModal } from "../../shared/ConfirmModal";
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

export function ReceiverRequests() {
  const { getUserRequests, deleteRequest } = useRequests();
  const { updateDonation } = useDonations();
  const { user } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const userRequests = getUserRequests(user?.id || "");

  

  const handleCancelRequest = (id: string) => {
    setRequestToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmCancel = () => {
    if (requestToDelete) {
      const request = userRequests.find(r => r.id === requestToDelete);
      deleteRequest(requestToDelete);
      
      if (request) {
        updateDonation(request.donationId, { status: "disponivel" });
      }
      
      toast.success("Solicitação cancelada com sucesso!", {
        description: `A solicitação para "${request?.donationTitle}" foi cancelada.`,
        duration: 5000,
      });
      setRequestToDelete(null);
    }
  };

  if (userRequests.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma solicitação realizada"
        description="Você ainda não fez nenhuma solicitação de doação. Explore as doações disponíveis para começar."
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SectionHeader
          title="Minhas Solicitações"
          count={userRequests.length}
        />

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
                      onClick={() => handleCancelRequest(request.id)}
                    >
                      Cancelar
                    </Button>
                  )}
                  {request.status === "aprovado" && (
                    <div className="text-sm text-green-600 font-medium">
                      Aguardando entrega
                    </div>
                  )}
                  {request.status === "entregue" && (
                    <div className="text-sm text-blue-600 font-medium">
                      Entregue com sucesso
                    </div>
                  )}
                  {request.status === "rejeitado" && (
                    <div className="text-sm text-red-600 font-medium">
                      Solicitação rejeitada
                    </div>
                  )}
                </>
              }
            />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmCancel}
        title="Cancelar Solicitação"
        message="Tem certeza que deseja cancelar esta solicitação? Esta ação não pode ser desfeita."
        confirmText="Cancelar Solicitação"
        cancelText="Manter"
        type="danger"
      />
    </>
  );
}
