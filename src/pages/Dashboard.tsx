import { Link } from "react-router";
import { Plus, Package, Users, BarChart3, Calendar } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";
import { PageHeader } from "../components/shared/PageHeader";

export function Dashboard() {
  const { user } = useAuth();

  const quickActions = [
    {
      title: "Nova Doação",
      description: "Registrar alimentos disponíveis",
      icon: Plus,
      href: "/dashboard",
      color: "green",
    },
    {
      title: "Ver Solicitações",
      description: "Visualizar pedidos pendentes",
      icon: Package,
      href: "/dashboard",
      color: "blue",
    },
    {
      title: "Agendar Entrega",
      description: "Programar retirada ou entrega",
      icon: Calendar,
      href: "/dashboard",
      color: "purple",
    },
    {
      title: "Relatórios",
      description: "Ver estatísticas e impacto",
      icon: BarChart3,
      href: "/dashboard",
      color: "orange",
    },
  ];

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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
                  <div
                    className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-${action.color}-200 transition-colors`}
                  >
                    <action.icon
                      className={`w-6 h-6 text-${action.color}-600`}
                    />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {action.title}
                  </h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Bem-vindo ao Prato Amigo!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Como{" "}
            {user?.role === "doador"
              ? "doador"
              : user?.role === "receptor"
              ? "receptor"
              : "voluntário"}
            , você pode começar a usar a plataforma para{" "}
            {user?.role === "doador"
              ? "registrar doações de alimentos"
              : user?.role === "receptor"
              ? "solicitar alimentos disponíveis"
              : "ajudar no transporte de doações"}
            .
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/como-funciona">
              <Button
                variant="outline"
                className="text-green-600 border-green-200 hover:bg-green-50"
              >
                Como funciona
              </Button>
            </Link>
            <Link to="/tutorial">
              <Button className="bg-green-600 hover:bg-green-700">
                Ver tutorial
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
