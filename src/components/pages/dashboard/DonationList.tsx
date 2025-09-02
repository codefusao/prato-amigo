import { useState } from "react";
import { Trash2, Edit, Calendar, MapPin, Package } from "lucide-react";
import { Button } from "../../ui/Button";
import { useDonations } from "../../../contexts/DonationContext";
import { useAuth } from "../../../contexts/AuthContext";
import { ConfirmModal } from "../../shared/ConfirmModal";
import { DonationModal } from "../../modals/DonationModal";

export function DonationList() {
  const { donations, deleteDonation } = useDonations();
  const { user } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);

  const userDonations = donations.filter(donation => donation.userId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "disponivel":
        return "bg-green-100 text-green-800";
      case "reservado":
        return "bg-yellow-100 text-yellow-800";
      case "entregue":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "disponivel":
        return "Disponível";
      case "reservado":
        return "Reservado";
      case "entregue":
        return "Entregue";
      default:
        return "Desconhecido";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleDelete = (id: string) => {
    setDonationToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (donationToDelete) {
      deleteDonation(donationToDelete);
      setDonationToDelete(null);
    }
  };

  const handleEdit = (donation: any) => {
    setSelectedDonation(donation);
    setEditModalOpen(true);
  };

  if (userDonations.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Nenhuma doação cadastrada
        </h3>
        <p className="text-gray-600 mb-6">
          Comece cadastrando sua primeira doação para ajudar pessoas em necessidade.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Minhas Doações ({userDonations.length})
          </h3>
        </div>

        <div className="space-y-4">
          {userDonations.map((donation) => (
            <div
              key={donation.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{donation.title}</h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        donation.status
                      )}`}
                    >
                      {getStatusText(donation.status)}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{donation.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Cadastrado em: {formatDate(donation.createdAt)}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleEdit(donation)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    onClick={() => handleDelete(donation.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Excluir Doação"
        message="Tem certeza que deseja excluir esta doação? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />

      <DonationModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedDonation(null);
        }}
        donation={selectedDonation}
        mode="edit"
      />
    </>
  );
}