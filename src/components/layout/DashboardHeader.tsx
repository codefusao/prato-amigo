import { useState } from "react";
import { Link } from "react-router";
import {
  Leaf,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">Prato Amigo</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/dashboard"
              className="font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-gray-700">{user?.name}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block w-full text-left py-2 px-3 font-medium text-green-600 bg-green-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/doacoes"
                className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Doações
              </Link>
              <Link
                to="/solicitacoes"
                className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitações
              </Link>
              <Link
                to="/relatorios"
                className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Relatórios
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-green-600">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Link
                to="/configuracoes"
                className="block w-full text-left py-2 px-3 font-medium text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Configurações
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 px-3 font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
