import { useState, useMemo } from "react";
import { Search, MapPin, Calendar, Package, Clock, Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { ConfirmModal } from "../../shared/ConfirmModal";
import { useDonations } from "../../../contexts/DonationContext";
import { useRequests } from "../../../contexts/RequestContext";
import { useAuth } from "../../../contexts/AuthContext";

export function AvailableDonations() {
  const { donations, reserveDonation } = useDonations();
  const { addRequest, requests } = useRequests();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [donationToRequest, setDonationToRequest] = useState<any>(null);

  const availableDonations = donations.filter(
    (donation) => donation.status === "disponivel"
  );

  const hasUserRequestedDonation = (donationId: string) => {
    if (!user) return false;
    return requests.some(
      (request) => 
        request.userId === user.id && 
        request.donationId === donationId &&
        (request.status === "pendente" || request.status === "aprovado")
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
    let filtered = availableDonations;

    if (searchTerm) {
      filtered = filtered.filter(
        (donation) =>
          donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          donation.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((donation) => donation.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "expiring":
          return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

    return filtered;
  }, [availableDonations, searchTerm, selectedCategory, sortBy]);

  const handleRequestDonation = (donation: any) => {
    if (!user) return;
    
    if (hasUserRequestedDonation(donation.id)) {
      toast.error("Você já solicitou esta doação!", {
        description: "Aguarde a resposta do doador ou cancele a solicitação anterior.",
        duration: 5000,
      });
      return;
    }
    
    setDonationToRequest(donation);
    setConfirmModalOpen(true);
  };

  const confirmRequestDonation = () => {
    if (!user || !donationToRequest) return;

    const requestData = {
      userId: user.id,
      donationId: donationToRequest.id,
      donationTitle: donationToRequest.title,
      message: `Solicitação de doação para ${donationToRequest.title}`,
      donorId: donationToRequest.userId,
      donorName: "Doador", 
      donorLocation: donationToRequest.location,
      quantity: donationToRequest.quantity,
      category: donationToRequest.category,
      expirationDate: donationToRequest.expirationDate,
    };

    addRequest(requestData);
    reserveDonation(donationToRequest.id);
    toast.success("Solicitação enviada com sucesso!", {
      description: `Você solicitou a doação: ${donationToRequest.title}`,
      duration: 5000,
    });
    setDonationToRequest(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const isExpiringSoon = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  if (availableDonations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma doação disponível
        </h3>
        <p className="text-gray-600">
          No momento não há doações disponíveis. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Buscar Doações
        </h3>
        
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
          
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Doações Disponíveis ({filteredDonations.length})
          </h3>
        </div>

        <div className="space-y-4">
          {filteredDonations.map((donation) => (
            <div
              key={donation.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                    {isExpiringSoon(donation.expirationDate) && (
                      <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Clock className="w-3 h-3" />
                        Vencendo em breve
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{donation.description}</p>

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
                      <span className="truncate">{donation.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Heart className="w-4 h-4" />
                      <span className="capitalize">{donation.category}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Publicado em: {formatDate(donation.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {hasUserRequestedDonation(donation.id) ? (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-yellow-600 font-medium">
                        Já solicitado
                      </span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRequestDonation(donation)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Solicitar Doação
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDonations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma doação encontrada
            </h4>
            <p className="text-gray-600">
              Tente ajustar os filtros de busca para encontrar doações disponíveis.
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setDonationToRequest(null);
        }}
        onConfirm={confirmRequestDonation}
        title="Solicitar Doação"
        message={`Tem certeza que deseja solicitar a doação "${donationToRequest?.title}"?`}
        confirmText="Solicitar"
        cancelText="Cancelar"
        type="info"
      />
    </div>
  );
}
