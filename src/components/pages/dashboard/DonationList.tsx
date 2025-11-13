import { useState } from "react";
import { Trash2, Edit, Package } from "lucide-react";
import { Button } from "../../ui/Button";
import { useDonations } from "../../../contexts/DonationContext";
import { useAuth } from "../../../contexts/AuthContext";
import { ConfirmModal } from "../../shared/ConfirmModal";
import { EmptyState } from "../../shared/EmptyState";
import { DonationCard } from "../../shared/DonationCard";
import { SectionHeader } from "../../shared/SectionHeader";
import { DonationModal } from "../../modals/DonationModal";
import { formatDate } from "../../../lib/dateUtils";
import {
  getStatusColor,
  getStatusText,
  donationStatusMap,
} from "../../../lib/statusUtils";

export function DonationList() {
  const { donations, deleteDonation } = useDonations();
  const { user } = useAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userDonations = donations.filter(
    (donation) => donation.userId === user?.id
  );

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

  return (
    <>
      {userDonations.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhuma doação cadastrada"
          description="Comece cadastrando sua primeira doação para ajudar pessoas em necessidade."
          action={
            <Button onClick={() => setIsModalOpen(true)}>Nova Doação</Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <SectionHeader title="Minhas Doações" count={userDonations.length} />

          <div className="flex justify-end mb-4">
            <Button onClick={() => setIsModalOpen(true)}>Nova Doação</Button>
          </div>

          <div className="space-y-4">
            {userDonations.map((donation) => (
              <DonationCard
                key={donation.id}
                title={donation.title}
                description={donation.description}
                quantity={donation.quantity}
                expirationDate={donation.expirationDate}
                location={donation.location}
                category={donation.category}
                statusBadge={
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      donation.status,
                      donationStatusMap
                    )}`}
                  >
                    {getStatusText(donation.status, donationStatusMap)}
                  </span>
                }
                gridCols={3}
                defaultDate={{
                  label: "Cadastrado em",
                  value: formatDate(donation.createdAt),
                }}
                actionArea={
                  <>
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
                  </>
                }
              />
            ))}
          </div>
        </div>
      )}

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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="create"
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
