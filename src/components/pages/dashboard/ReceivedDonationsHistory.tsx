import { Calendar, MapPin, Package, CheckCircle } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";
import { formatDate } from "../../../lib/dateUtils";

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Histórico de Doações Recebidas
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Total: {receivedDonations.length} doação(ões) recebida(s)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {receivedDonations.map((donation) => (
          <div
            key={donation.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{donation.donationTitle}</h4>
                  <span className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 bg-blue-100 text-blue-800">
                    <CheckCircle className="w-4 h-4" />
                    Entregue
                  </span>
                </div>

                {donation.message && (
                  <p className="text-gray-600 text-sm mb-3">{donation.message}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{donation.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Válido até: {formatDate(donation.expirationDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{donation.donorLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="capitalize">{donation.category}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500 space-y-1">
                  <div>Solicitado em: {formatDate(donation.requestedAt)}</div>
                  {donation.approvedAt && (
                    <div>Aprovado em: {formatDate(donation.approvedAt)}</div>
                  )}
                  {donation.deliveredAt && (
                    <div className="text-green-600 font-medium">
                      Entregue em: {formatDate(donation.deliveredAt)}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Doador:</span> {donation.donorName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

