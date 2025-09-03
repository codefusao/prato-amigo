import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { PageHeader } from "../components/shared/PageHeader";
import { ForgotPasswordModal } from "../components/modals/ForgotPasswordModal";
import { loginSchema, type LoginFormData } from "../schemas/login";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError("");

    try {
      const success = await login(data.email, data.password);

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Email ou senha inválidos. Tente novamente.");
      }
    } catch (err: unknown) {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <>
      <PageHeader
        title="Entrar no Prato Amigo"
        subtitle="Acesse sua conta para gerenciar doações, solicitações e acompanhar seu impacto social."
      />

      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-100 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-4 w-8 h-8 bg-yellow-100 rounded-full opacity-30"></div>
            <div className="text-center mb-8 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo de volta!
              </h2>
              <p className="text-gray-600 text-lg">
                Entre com suas credenciais para acessar sua conta
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Conectando pessoas através da solidariedade</span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              <div>
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="seu@email.com"
                  error={errors.email?.message}
                  leftIcon={Mail}
                />
              </div>

              <div>
                <Input
                  label="Senha"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Sua senha"
                  error={errors.password?.message}
                  leftIcon={Lock}
                  rightIcon={showPassword ? EyeOff : Eye}
                  onRightIconClick={() => setShowPassword(!showPassword)}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Lembrar de mim
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {isSubmitting ? "Entrando..." : "Entrar na Plataforma"}
              </Button>
            </form>

            <div className="mt-8 text-center relative z-10">
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-600 mb-4">
                  Não tem uma conta ainda?
                </p>
                <Link
                  to="/cadastro"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-lg transition-colors"
                >
                  <span>Cadastre-se aqui</span>
                  <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </>
  );
}
