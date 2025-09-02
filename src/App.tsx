import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { DonationProvider } from "./contexts/DonationContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { HowItWorks } from "./pages/HowItWorks";
import { Contact } from "./pages/Contact";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DonationProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="sobre" element={<About />} />
              <Route path="como-funciona" element={<HowItWorks />} />
              <Route path="contato" element={<Contact />} />
              <Route path="cadastro" element={<Register />} />
              <Route path="login" element={<Login />} />
            </Route>

            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster position="top-right" richColors closeButton duration={5000} />
      </DonationProvider>
    </AuthProvider>
  );
}
