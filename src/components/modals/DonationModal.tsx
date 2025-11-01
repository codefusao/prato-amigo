import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Calendar, MapPin, Package } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Select } from "../ui/Select";
import { useDonations } from "../../contexts/DonationContext";
import { useAuth } from "../../contexts/AuthContext";
import { donationSchema, type DonationFormData } from "../../schemas/donation";

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
  const today = new Date().toISOString().split("T")[0];
  const { addDonation, updateDonation } = useDonations();
  const { user } = useAuth();

  const isEditMode = mode === "edit" && donation;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      title: "",
      description: "",
      quantity: "",
      category: "",
      expirationDate: "",
      location: "",
    },
  });

  useEffect(() => {
    if (isEditMode && donation) {
      setValue("title", donation.title);
      setValue("description", donation.description);
      setValue("quantity", donation.quantity);
      setValue("category", donation.category);
      setValue("expirationDate", donation.expirationDate);
      setValue("location", donation.location);
    } else if (!isOpen) {
      reset();
    }
  }, [donation, isEditMode, isOpen, setValue, reset]);

  const onSubmit = async (data: DonationFormData) => {
    try {
      if (isEditMode && donation) {
        updateDonation(donation.id, data);
      } else {
        addDonation({
          ...data,
          userId: user?.id || "",
        });
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Erro ao atualizar doação:" : "Erro ao cadastrar doação:",
        error
      );
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

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Título da Doação"
              {...register("title")}
              placeholder="Ex: Arroz integral, 5kg"
              error={errors.title?.message}
              required
            />

            <Select
              label="Categoria"
              {...register("category")}
              options={categories}
              error={errors.category?.message}
              required
            />

            <Input
              label="Quantidade"
              {...register("quantity")}
              placeholder="Ex: 5kg, 10 unidades"
              error={errors.quantity?.message}
              required
            />

              <Input
              label="Data de Validade"
              type="date"
              {...register("expirationDate", {
                onChange: (e) => {
                  const input = e.target.value;
                  const [year, month, day] = input.split("-");

                  if (!year) return;

                  let fixedYear = year;
                  if (year.length > 4) fixedYear = year.slice(-4);

                  const finalValue = [fixedYear, month, day]
                    .filter(Boolean)
                    .join("-");
                  if (finalValue !== input) {
                    e.target.value = finalValue;
                  }
                },
              })}
              min={today}
              error={errors.expirationDate?.message}
              leftIcon={Calendar}
              required
            />

            <div className="md:col-span-2">
              <Input
                label="Local de Retirada"
                {...register("location")}
                placeholder="Endereço completo para retirada"
                leftIcon={MapPin}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Descrição Detalhada"
                {...register("description")}
                placeholder="Descreva os alimentos, condições de conservação, horários disponíveis para retirada..."
                leftIcon={Package}
                rows={4}
                error={errors.description?.message}
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
