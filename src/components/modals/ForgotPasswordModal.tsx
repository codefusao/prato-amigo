import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../../schemas/forgotPassword";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError("Erro ao enviar email. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError("");
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full opacity-50"></div>
        <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-green-100 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {!isSubmitted && (
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isSubmitted ? "Email Enviado!" : "Esqueci minha senha"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {isSubmitted 
                    ? "Verifique sua caixa de entrada" 
                    : "Digite seu email para receber instruções"
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Instruções enviadas!
                  </h3>
                  <p className="text-gray-600">
                    Enviamos um email com instruções para redefinir sua senha. 
                    Verifique sua caixa de entrada e spam.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-800 font-medium mb-1">
                        Não recebeu o email?
                      </p>
                      <p className="text-blue-700">
                        Verifique sua pasta de spam ou tente novamente em alguns minutos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Fechar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="flex-1"
                  >
                    Tentar outro email
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600">
                    Digite o email associado à sua conta e enviaremos instruções 
                    para redefinir sua senha.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}

                <Input
                  label="Email"
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="seu@email.com"
                  error={errors.email?.message}
                  leftIcon={Mail}
                  required
                />

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar instruções"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
