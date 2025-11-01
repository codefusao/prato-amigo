import { useState } from "react";
import { Calendar, MapPin, Package, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/Button";
import { useRequests } from "../../../contexts/RequestContext";
import { useDonations } from "../../../contexts/DonationContext";
import { useAuth } from "../../../contexts/AuthContext";
import { ConfirmModal } from "../../shared/ConfirmModal";
import { EmptyState } from "../../shared/EmptyState";
import { formatDate, isExpiringSoon } from "../../../lib/dateUtils";
import { getStatusColor, getStatusText, requestStatusMap } from "../../../lib/statusUtils";

export function ReceiverRequests() {
  const { getUserRequests, deleteRequest } = useRequests();
  const { updateDonation } = useDonations();
  const { user } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const userRequests = getUserRequests(user?.id || "");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-4 h-4" />;
      case "aprovado":
        return <CheckCircle className="w-4 h-4" />;
      case "rejeitado":
        return <XCircle className="w-4 h-4" />;
      case "entregue":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Minhas Solicitações ({userRequests.length})
          </h3>
        </div>

        <div className="space-y-4">
          {userRequests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{request.donationTitle}</h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(
                        request.status,
                        requestStatusMap
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      {getStatusText(request.status, requestStatusMap)}
                    </span>
                    {isExpiringSoon(request.expirationDate) && (
                      <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        Vencendo em breve
                      </div>
                    )}
                  </div>

                  {request.message && (
                    <p className="text-gray-600 text-sm mb-3">{request.message}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="w-4 h-4" />
                      <span>{request.quantity}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Válido até: {formatDate(request.expirationDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{request.donorLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="capitalize">{request.category}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    <div>Solicitado em: {formatDate(request.requestedAt)}</div>
                    {request.approvedAt && (
                      <div>Aprovado em: {formatDate(request.approvedAt)}</div>
                    )}
                    {request.deliveredAt && (
                      <div>Entregue em: {formatDate(request.deliveredAt)}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
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
                </div>
              </div>
            </div>
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
