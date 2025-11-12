import { X, Gift } from "lucide-react";
import { Button } from "../ui/Button";

interface DonationApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void;
  onReject: () => void;
  title: string;
  message: string;
}

export function DonationApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  title,
  message,
}: DonationApprovalModalProps) {
  if (!isOpen) return null;

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-blue-600" />
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
              onClick={handleReject}
              className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
            >
              Rejeitar
            </Button>
            <Button
              onClick={handleApprove}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Aprovar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
