import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { PageHeader } from "../components/shared/PageHeader";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);

      if (success) {
        navigate("/dashboard");
      } else {
        setError("Email ou senha inválidos. Tente novamente.");
      }
    } catch (err: unknown) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Entrar no Prato Amigo"
        subtitle="Acesse sua conta para gerenciar doações, solicitações e acompanhar seu impacto social."
      />

      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Bem-vindo de volta!
              </h2>
              <p className="text-gray-600 mt-2">
                Entre com suas credenciais para acessar sua conta
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
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
                <Link
                  to="/esqueci-senha"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Não tem uma conta?{" "}
                <Link
                  to="/cadastro"
                  className="text-green-600 hover:text-green-700 font-medium underline"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
