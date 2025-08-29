import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home }))
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About }))
);
const HowItWorks = lazy(() =>
  import("./pages/HowItWorks").then((module) => ({ default: module.HowItWorks }))
);
const Contact = lazy(() =>
  import("./pages/Contact").then((module) => ({ default: module.Contact }))
);
const Register = lazy(() =>
  import("./pages/Register").then((module) => ({ default: module.Register }))
);
const Login = lazy(() =>
  import("./pages/Login").then((module) => ({ default: module.Login }))
);
const Dashboard = lazy(() =>
  import("./pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);

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
      <HashRouter>
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
      </HashRouter>

      <Toaster position="top-right" richColors closeButton duration={5000} />
    </AuthProvider>
  );
}
