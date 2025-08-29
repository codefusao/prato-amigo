import { useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { formatPhone } from "../../lib/formatPhone";
import { contactSchema, type ContactFormData } from "../../schemas/contact";
import { contactTypeOptions } from "../../data/constants";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [charCount, setCharCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    toast.success(
      "Mensagem enviada com sucesso! Entraremos em contato em breve."
    );
    reset();
    setCharCount(0);
    onSuccess?.();
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted);
  };


  return (
    <div className="bg-white rounded-xl border border-green-100 shadow-lg">
      <div className="p-6 pb-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Formulário de Contato
        </h3>
        <p className="text-gray-600 mb-6">
          Preencha todos os campos obrigatórios para enviar sua
          mensagem
        </p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Nome completo *"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Email *"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Telefone"
            {...register("phone")}
            onChange={handlePhoneChange}
            placeholder="(XX) XXXXX-XXXX"
            error={errors.phone?.message}
          />

          <Select
            label="Tipo de contato *"
            options={contactTypeOptions}
            {...register("type")}
            error={errors.type?.message}
          />

          <div>
            <Textarea
              label="Mensagem *"
              {...register("message")}
              onChange={(e) => {
                register("message").onChange(e);
                setCharCount(e.target.value.length);
              }}
              placeholder="Digite sua mensagem aqui..."
              error={errors.message?.message}
              maxLength={500}
            />
            <div className="text-sm text-gray-500 mt-1">
              {charCount}/500 caracteres (mínimo 30)
            </div>
          </div>

          <Button type="submit" className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
            Enviar mensagem
          </Button>
        </form>
      </div>
    </div>
  );
}
