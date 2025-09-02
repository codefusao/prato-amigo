import { X, AlertTriangle } from "lucide-react";
import { Button } from "../ui/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "danger"
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          icon: "text-red-600",
          bg: "bg-red-100",
          button: "bg-red-600 hover:bg-red-700 text-white"
        };
      case "warning":
        return {
          icon: "text-yellow-600",
          bg: "bg-yellow-100",
          button: "bg-yellow-600 hover:bg-yellow-700 text-white"
        };
      case "info":
        return {
          icon: "text-blue-600",
          bg: "bg-blue-100",
          button: "bg-blue-600 hover:bg-blue-700 text-white"
        };
      default:
        return {
          icon: "text-red-600",
          bg: "bg-red-100",
          button: "bg-red-600 hover:bg-red-700 text-white"
        };
    }
  };

  const styles = getTypeStyles();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 ${styles.bg} rounded-full flex items-center justify-center`}>
              <AlertTriangle className={`w-6 h-6 ${styles.icon}`} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">{message}</p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              className={`flex-1 ${styles.button}`}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 