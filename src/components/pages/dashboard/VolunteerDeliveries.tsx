import { Package, Clock } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";
import { DonationCard } from "../../shared/DonationCard";
import { SectionHeader } from "../../shared/SectionHeader";
import { buildRequestDateInfo, isExpiringSoon } from "../../../lib/dateUtils";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { toast } from "sonner";
import {
  getRequestStatusIcon,
  getStatusColor,
  getStatusText,
  requestStatusMap,
} from "@/lib/statusUtils";
import { useDonations } from "@/contexts/DonationContext";

export function VolunteerDeliveries() {
  const { user } = useAuth();
  const { updateRequest, getApprovedRequests } = useRequests();
  const { updateDonation } = useDonations();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [delivery, setDelivery] = useState<any>(null);

  const assignedDeliveries = getApprovedRequests().filter(
    (r) => r.voluntaryId === user?.id
  );
  
  const handleOpenModal = (delivery: any) => {
    setDelivery(delivery);
    setConfirmModalOpen(true);
  };

  const confirmDelivery = () => {
    if (!user || !delivery) return;

    updateRequest(delivery.id, {
      status: "entregue",
      deliveredAt: new Date().toISOString(),
    });
    updateDonation(delivery.donationId, { status: "entregue" });

    toast.success("Entrega concluida com sucesso!", {
      description: `Você entregou a doação: ${delivery.title}`,
      duration: 5000,
    });
    setDelivery(null);
  };

  if (assignedDeliveries.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma entrega disponível"
        description="Você ainda não assumiu nenhuma entrega. Explore as entregas disponíveis para começar."
      />
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SectionHeader
          title="Minhas entregas"
          count={assignedDeliveries.length}
        />

        <div className="space-y-4">
          {assignedDeliveries.map((delivery) => (
            <DonationCard
              key={delivery.id}
              title={delivery.donationTitle}
              description={delivery.message}
              quantity={delivery.quantity}
              expirationDate={delivery.expirationDate}
              location={delivery.donorLocation}
              category={delivery.category}
              statusBadge={
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(
                    delivery.status,
                    requestStatusMap
                  )}`}
                >
                  {getRequestStatusIcon(delivery.status)}
                  {getStatusText(delivery.status, requestStatusMap)}
                </span>
              }
              additionalBadges={
                isExpiringSoon(delivery.expirationDate)
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
                requestedAt: delivery.requestedAt,
                approvedAt: delivery.approvedAt,
                deliveredAt: delivery.deliveredAt,
              })}
              actionArea={
                <>
                  {delivery.status === "aprovado" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleOpenModal(delivery)}
                    >
                      Confirmar Entrega
                    </Button>
                  )}
                </>
              }
            />
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDelivery}
        title="Confirma Entrega"
        message={`Tem certeza que deseja confirmar a entrega da doação "${delivery?.donationTitle}"?`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
}
