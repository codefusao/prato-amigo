import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { formatPhone } from "../../lib/formatPhone";
import { registerSchema, type RegisterFormData } from "../../schemas/register";
import { states, userTypeOptions } from "../../data/constants";
import { User, MapPin, Lock, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import type { ChangeEvent } from "react";

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const roleMap: Record<string, "doador" | "receptor" | "voluntario"> = {
        doador: "doador",
        receptor: "receptor",
        voluntario: "voluntario",
      };

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: roleMap[data.type] || "doador",
      };

      const success = await registerUser(userData);

      if (success) {
        toast.success("Conta criada com sucesso! Bem-vindo ao Prato Amigo!");
        navigate("/dashboard");
      } else {
        toast.error("Erro ao criar conta. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Formulário de Cadastro</h3>
        <p className="text-green-100">
          Preencha os campos abaixo para criar sua conta
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Select
              label="Tipo de Cadastro *"
              options={userTypeOptions}
              {...register("type")}
              error={errors.type?.message}
            />
            <p className="text-sm text-green-700 mt-2">
              Escolha se você quer doar alimentos ou receber doações
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Informações Pessoais
            </h4>

            <Input
              label="Nome/Razão Social *"
              {...register("name")}
              error={errors.name?.message}
              placeholder="Digite seu nome completo ou razão social"
            />

            <Input
              label="Email *"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              placeholder="seu@email.com"
            />

            <Input
              label="Telefone *"
              {...register("phone")}
              onChange={handlePhoneChange}
              placeholder="(XX) XXXXX-XXXX"
              error={errors.phone?.message}
              defaultValue=""
            />
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Endereço
            </h4>

            <Input
              label="Endereço *"
              {...register("address")}
              placeholder="Rua, número, complemento"
              error={errors.address?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Cidade *"
                {...register("city")}
                error={errors.city?.message}
                placeholder="Sua cidade"
              />

              <Select
                label="Estado *"
                options={states}
                {...register("state")}
                error={errors.state?.message}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              Segurança da Conta
            </h4>

            <Input
              label="Senha *"
              type="password"
              {...register("password")}
              error={errors.password?.message}
              placeholder="Mínimo 8 caracteres"
            />
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <strong>Dica:</strong> Use uma senha forte com letras, números e
              símbolos
            </div>

            <Input
              label="Confirmar Senha *"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              placeholder="Confirme sua senha"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                Li e concordo com os{" "}
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a
                  href="#"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Política de Privacidade
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 mt-2">
                {errors.terms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 text-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Criando conta...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Criar Conta
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
