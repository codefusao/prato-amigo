import { useState, type FormEvent, useEffect } from "react";
import { X, Calendar, MapPin, Package } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { useDonations } from "../../contexts/DonationContext";
import { useAuth } from "../../contexts/AuthContext";

interface Donation {
  id: string;
  userId: string;
  title: string;
  description: string;
  quantity: string;
  category: string;
  expirationDate: string;
  location: string;
  status: "disponivel" | "reservado" | "entregue";
  createdAt: string;
  image?: string;
}

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation?: Donation | null;
  mode?: "create" | "edit";
}

const categories = [
  { value: "frutas-verduras", label: "Frutas e Verduras" },
  { value: "graos-cereais", label: "Grãos e Cereais" },
  { value: "laticinios", label: "Laticínios" },
  { value: "carnes", label: "Carnes" },
  { value: "paes-massas", label: "Pães e Massas" },
  { value: "enlatados", label: "Enlatados" },
  { value: "bebidas", label: "Bebidas" },
  { value: "outros", label: "Outros" },
];

export function DonationModal({
  isOpen,
  onClose,
  donation = null,
  mode = "create",
}: DonationModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const { addDonation, updateDonation } = useDonations();
  const { user } = useAuth();

  const isEditMode = mode === "edit" && donation;

  useEffect(() => {
    if (isEditMode && donation) {
      setTitle(donation.title);
      setDescription(donation.description);
      setQuantity(donation.quantity);
      setCategory(donation.category);
      setExpirationDate(donation.expirationDate);
      setLocation(donation.location);
    } else if (!isOpen) {
      setTitle("");
      setDescription("");
      setQuantity("");
      setCategory("");
      setExpirationDate("");
      setLocation("");
    }
  }, [donation, isEditMode, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const donationData = {
        title,
        description,
        quantity,
        category,
        expirationDate,
        location,
      };

      if (isEditMode && donation) {
        updateDonation(donation.id, donationData);
      } else {
        addDonation({
          ...donationData,
          userId: user?.id || "",
        });
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Erro ao atualizar doação:" : "Erro ao cadastrar doação:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${
                  isEditMode ? "bg-blue-100" : "bg-green-100"
                } rounded-full flex items-center justify-center`}
              >
                <Package
                  className={`w-5 h-5 ${
                    isEditMode ? "text-blue-600" : "text-green-600"
                  }`}
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditMode ? "Editar Doação" : "Nova Doação"}
                </h2>
                <p className="text-gray-600">
                  {isEditMode
                    ? "Atualize os dados da sua doação"
                    : "Cadastre alimentos disponíveis para doação"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Título da Doação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Arroz integral, 5kg"
              required
            />

            <Select
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categories}
              required
            />

            <Input
              label="Quantidade"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 5kg, 10 unidades"
              required
            />

            <div className="relative">
              <Input
                label="Data de Validade"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                min={today}
                required
                className="pl-10"
              />
              <Calendar className="absolute left-3 bottom-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="md:col-span-2 relative">
              <Input
                label="Local de Retirada"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Endereço completo para retirada"
                className="pl-10"
                required
              />
              <MapPin className="absolute left-3 bottom-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="md:col-span-2 relative">
              <Textarea
                label="Descrição Detalhada"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva os alimentos, condições de conservação, horários disponíveis para retirada..."
                className="pl-10"
                rows={4}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 ${
                isEditMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Salvando..."
                  : "Cadastrando..."
                : isEditMode
                ? "Salvar Alterações"
                : "Cadastrar Doação"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
