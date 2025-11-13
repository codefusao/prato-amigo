import { useState } from "react";
import {
  Plus,
  Package,
  BarChart3,
  Calendar,
  Search,
  Truck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { PageHeader } from "../components/shared/PageHeader";
import { QuickActionsGrid } from "../components/shared/QuickActionsGrid";
import { DonationList } from "../components/pages/dashboard/DonationList";
import { AvailableDonations } from "../components/pages/dashboard/AvailableDonations";
import { ReceiverRequests } from "../components/pages/dashboard/ReceiverRequests";
import { ReceivedDonationsHistory } from "../components/pages/dashboard/ReceivedDonationsHistory";
import { ViewPendingDonations } from "@/components/pages/dashboard/ViewPendingDonations";
import { ViewDeliveriesDonations } from "@/components/pages/dashboard/ViewDeliveriesDonations";
import { ReportsDonnor } from "@/components/pages/dashboard/ReportsDonnor";
import { ViewDeliveries } from "@/components/pages/dashboard/ViewDeliveries";
import { VolunteerDeliveries } from "@/components/pages/dashboard/VolunteerDeliveries";
import { ReportsVoluntary } from "@/components/pages/dashboard/ReportsVoluntary";

export function Dashboard() {
  const { user } = useAuth();

  const DonorDashboard = () => {
    const [activeTab, setActiveTab] = useState<
      "donation" | "view" | "delivery" | "reports"
    >("donation");

    const donorActions = [
      {
        title: "Doações",
        description: "Visualizar doações disponíveis",
        icon: Plus,
        action: () => {
          setActiveTab("donation");
        },
        color: "green",
        disabled: false,
      },
      {
        title: "Ver Solicitações",
        description: "Visualizar pedidos pendentes",
        icon: Package,
        action: () => setActiveTab("view"),
        color: "blue",
        disabled: false,
      },
      {
        title: "Pronto para Entrega",
        description: "Pronto para entrega",
        icon: Calendar,
        action: () => setActiveTab("delivery"),
        color: "purple",
        disabled: false,
      },
      {
        title: "Relatórios",
        description: "Ver estatísticas e impacto",
        icon: BarChart3,
        action: () => setActiveTab("reports"),
        color: "orange",
        disabled: false,
      },
    ];

    return (
      <>
        <QuickActionsGrid
          actions={donorActions}
          activeTab={activeTab}
          columns={4}
        />
        {activeTab === "donation" && <DonationList />}
        {activeTab === "view" && <ViewPendingDonations />}
        {activeTab === "delivery" && <ViewDeliveriesDonations />}
        {activeTab === "reports" && <ReportsDonnor />}
      </>
    );
  };

  const ReceiverDashboard = () => {
    const [activeTab, setActiveTab] = useState<
      "search" | "requests" | "history"
    >("search");

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
        <QuickActionsGrid
          actions={receiverActions}
          activeTab={activeTab}
          columns={3}
        />
        {activeTab === "search" && <AvailableDonations />}
        {activeTab === "requests" && <ReceiverRequests />}
        {activeTab === "history" && <ReceivedDonationsHistory />}
      </>
    );
  };

  const VolunteerDashboard = () => {
    const [activeTab, setActiveTab] = useState<
      "view-deliveries" | "my-deliveries" | "reports"
    >("view-deliveries");

    const volunteerActions = [
      {
        title: "Ver Entregas",
        description: "Visualizar entregas",
        icon: Truck,
        action: () => setActiveTab("view-deliveries"),
        color: "green",
        disabled: false,
      },
      {
        title: "Minhas Entregas",
        description: "Histórico de entregas pendentes e realizadas",
        icon: Package,
        action: () => setActiveTab("my-deliveries"),
        color: "blue",
        disabled: false,
      },
      {
        title: "Relatórios",
        description: "Ver estatísticas de impacto",
        icon: BarChart3,
        action: () => setActiveTab("reports"),
        color: "orange",
        disabled: false,
      },
    ];

    return (
      <>
        <QuickActionsGrid
          actions={volunteerActions}
          columns={3}
          activeTab={activeTab}
        />
        {activeTab === "view-deliveries" && <ViewDeliveries />}
        {activeTab === "my-deliveries" && <VolunteerDeliveries />}
        {activeTab === "reports" && <ReportsVoluntary />}
      </>
    );
  };

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
    </>
  );
}
