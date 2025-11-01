import { useState } from "react";
import { Link } from "react-router";
import { Plus, Package, BarChart3, Calendar, Search, Truck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { PageHeader } from "../components/shared/PageHeader";
import { QuickActionsGrid } from "../components/shared/QuickActionsGrid";
import { DonationModal } from "../components/modals/DonationModal";
import { DonationList } from "../components/pages/dashboard/DonationList";
import { AvailableDonations } from "../components/pages/dashboard/AvailableDonations";
import { ReceiverRequests } from "../components/pages/dashboard/ReceiverRequests";
import { ReceivedDonationsHistory } from "../components/pages/dashboard/ReceivedDonationsHistory";

export function Dashboard() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

    const donorActions = [
    {
      title: "Nova Doação",
      description: "Registrar alimentos disponíveis",
      icon: Plus,
        action: () => setIsModalOpen(true),
      color: "green",
        disabled: false,
    },
    {
      title: "Ver Solicitações",
      description: "Visualizar pedidos pendentes",
      icon: Package,
        action: () => {},
      color: "blue",
        disabled: true,
        comingSoon: true,
    },
    {
      title: "Agendar Entrega",
      description: "Programar retirada ou entrega",
      icon: Calendar,
        action: () => {},
      color: "purple",
        disabled: true,
        comingSoon: true,
    },
    {
      title: "Relatórios",
      description: "Ver estatísticas e impacto",
      icon: BarChart3,
        action: () => {},
        color: "orange",
        disabled: true,
        comingSoon: true,
      },
    ];

  const DonorDashboard = () => (
    <>
      <QuickActionsGrid actions={donorActions} columns={4} />
        <DonationList />
      </>
    );

  const ReceiverDashboard = () => {
    const [activeTab, setActiveTab] = useState<"search" | "requests" | "history">("search");

    const receiverActions = [
      {
        title: "Buscar Doações",
        description: "Encontrar alimentos disponíveis",
        icon: Search,
        action: () => setActiveTab("search"),
        tab: "search",
        color: "blue",
        disabled: false,
      },
      {
        title: "Minhas Solicitações",
        description: "Ver pedidos realizados",
        icon: Package,
        action: () => setActiveTab("requests"),
        tab: "requests",
        color: "green",
        disabled: false,
      },
      {
        title: "Histórico",
        description: "Doações recebidas",
        icon: BarChart3,
        action: () => setActiveTab("history"),
        tab: "history",
        color: "purple",
        disabled: false,
      },
    ];

    return (
      <>
        <QuickActionsGrid actions={receiverActions} activeTab={activeTab} columns={3} />
        {activeTab === "search" && <AvailableDonations />}
        {activeTab === "requests" && <ReceiverRequests />}
        {activeTab === "history" && <ReceivedDonationsHistory />}
      </>
    );
  };

    const volunteerActions = [
      {
        title: "Ver Entregas",
        description: "Visualizar entregas pendentes",
        icon: Truck,
        action: () => {},
        color: "green",
        disabled: true,
        comingSoon: true,
      },
      {
        title: "Minhas Entregas",
        description: "Histórico de entregas realizadas",
        icon: Package,
        action: () => {},
        color: "blue",
        disabled: true,
        comingSoon: true,
      },
      {
        title: "Relatórios",
        description: "Ver estatísticas de impacto",
        icon: BarChart3,
        action: () => {},
      color: "orange",
        disabled: true,
        comingSoon: true,
      },
    ];

  const VolunteerDashboard = () => (
    <>
      <QuickActionsGrid actions={volunteerActions} columns={3} />
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Bem-vindo ao Prato Amigo!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Como voluntário, você pode ajudar no transporte de doações entre doadores e receptores.
            Em breve você poderá ver entregas disponíveis e se voluntariar para realizá-las.
          </p>
          <Link to="/como-funciona">
            <Button
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
            >
              Como funciona
            </Button>
          </Link>
        </div>
      </>
    );

  const renderDashboard = () => {
    switch (user?.role) {
      case "doador":
        return <DonorDashboard />;
      case "receptor":
        return <ReceiverDashboard />;
      case "voluntario":
        return <VolunteerDashboard />;
      default:
        return <DonorDashboard />;
    }
  };

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Bem-vindo, ${user?.name}! Este é seu painel de controle.`}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">
                {user?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500">
                Membro desde{" "}
                {new Date(user?.createdAt || "").toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>

        {renderDashboard()}
      </div>

      {user?.role === "doador" && (
        <DonationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          mode="create"
        />
      )}
    </>
  );
}