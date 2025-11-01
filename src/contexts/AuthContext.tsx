import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "doador" | "receptor" | "voluntario" | "admin";
  avatar?: string;
  createdAt: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "doador" | "receptor" | "voluntario";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("auth_token");
        const userData = localStorage.getItem("user_data");

        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      const existingUsers = localStorage.getItem("registered_users");

      if (!existingUsers) {
        return false;
      }

      const users = JSON.parse(existingUsers);
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return false;
      }

      localStorage.setItem("auth_token", "auth_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(foundUser));

      setUser(foundUser);
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!userData.name || !userData.email || !userData.password) {
        throw new Error("Todos os campos são obrigatórios");
      }

      const existingUsers = localStorage.getItem("registered_users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error("Email já cadastrado");
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        password: userData.password,
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      localStorage.setItem("registered_users", JSON.stringify(users));

      localStorage.setItem("auth_token", "auth_token_" + Date.now());
      localStorage.setItem("user_data", JSON.stringify(newUser));

      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Erro no registro:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
