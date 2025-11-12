import { Package, Clock, Search } from "lucide-react";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";
import { EmptyState } from "../../shared/EmptyState";
import { DonationCard } from "../../shared/DonationCard";
import { SectionHeader } from "../../shared/SectionHeader";
import { formatDate, isExpiringSoon } from "../../../lib/dateUtils";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function ViewDeliveries() {
  const { user } = useAuth();
  const { updateRequest, requests, getApprovedRequests } = useRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [delivery, setDelivery] = useState<any>(null);

  const approvedRequests = getApprovedRequests().filter((r) => !r.voluntaryId);

  const hasVolunteerAcceptedDonation = (donationId: string) => {
    if (!user) return false;
    return requests.some(
      (request) =>
        request.voluntaryId === user.id &&
        request.donationId === donationId &&
        (request.status === "aprovado" || request.status === "entregue")
    );
  };

  const categories = [
    "Frutas e Verduras",
    "Cereais e Grãos",
    "Laticínios",
    "Carnes e Aves",
    "Pães e Massas",
    "Enlatados",
    "Outros",
  ];

  const filteredDonations = useMemo(() => {
    let filtered = approvedRequests;

    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.donationTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          donation.donationDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          donation.donorLocation
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (donation) => donation.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.approvedAt ?? 0).getTime() -
            new Date(a.approvedAt ?? 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.approvedAt ?? 0).getTime() -
            new Date(b.approvedAt ?? 0).getTime()
          );
        case "expiring":
          return (
            new Date(a.expirationDate).getTime() -
            new Date(b.expirationDate).getTime()
          );
        case "location":
          return a.donorLocation.localeCompare(b.donorLocation);
        default:
          return 0;
      }
    });

    return filtered;
  }, [approvedRequests, searchTerm, selectedCategory, sortBy]);

  const handlePickupDelivery = (donation: any) => {
    if (!user) return;

    if (hasVolunteerAcceptedDonation(donation.id)) {
      toast.error("Você já está responsável por esta entrega!", {
        description: "Finalize ou cancele a entrega atual.",
        duration: 5000,
      });
      return;
    }

    setDelivery(donation);
    setConfirmModalOpen(true);
  };

  const confirmPickupDelivery = () => {
    if (!user || !delivery) return;

    updateRequest(delivery.id, { voluntaryId: user.id });
    toast.success("Entrega atribuída com sucesso!", {
      description: `Você agora é o responsável pela doação: ${delivery.title}`,
      duration: 5000,
    });
    setDelivery(null);
  };

  if (approvedRequests.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Nenhuma entrega disponível"
        description="No momento não há entregas disponíveis. Tente novamente mais tarde."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SectionHeader title="Buscar Entregas" className="mb-4" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por título, descrição ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigas</option>
            <option value="expiring">Vencendo em breve</option>
            <option value="location">Por localização</option>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setSortBy("newest");
            }}
            className="w-full"
          >
            Limpar filtros
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <SectionHeader
          title="Entregas Disponíveis"
          count={filteredDonations.length}
        />

        <div className="space-y-4">
          {filteredDonations.map((request) => (
            <DonationCard
              key={request.id}
              title={request.donationTitle}
              description={request.donationDescription}
              quantity={request.quantity}
              expirationDate={request.expirationDate}
              location={request.donorLocation}
              category={request.category}
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
              showCategoryIcon
              defaultDate={{
                label: "Aprovado em",
                value: request.approvedAt
                  ? formatDate(request.approvedAt)
                  : "—",
              }}
              actionArea={
                hasVolunteerAcceptedDonation(request.id) ? (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-600 font-medium">
                      Já solicitado
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={() => handlePickupDelivery(request)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Assumir Entrega
                  </Button>
                )
              }
            />
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <EmptyState
            icon={Search}
            title="Nenhuma entrega encontrada"
            description="Tente ajustar os filtros de busca para encontrar entregas disponíveis."
          />
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setDelivery(null);
        }}
        onConfirm={confirmPickupDelivery}
        title="Assumir Entrega"
        message={`Tem certeza que deseja assumir a entrega da doação "${delivery?.title}"?`}
        confirmText="Solicitar"
        cancelText="Cancelar"
        type="info"
      />
    </div>
  );
}
