import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  Menu,
  X,
  Leaf,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">Prato Amigo</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-medium transition-colors",
                  isActive(link.href)
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-600">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <hr className="my-2 text-gray-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    Cadastre-se
                  </Button>
                </Link>
              </>
            )}
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "block w-full text-left py-2 font-medium transition-colors",
                  isActive(link.href)
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="mt-4 pt-4 border-t border-gray-200">
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
                  to="/dashboard"
                  className="block w-full text-left py-2 font-medium text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/perfil"
                  className="block w-full text-left py-2 font-medium text-gray-700 hover:text-green-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <Link
                  to="/login"
                  className="block w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link
                  to="/cadastro"
                  className="block w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
