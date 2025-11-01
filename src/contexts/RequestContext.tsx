import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface DonationRequest {
  id: string;
  userId: string;
  donationId: string;
  donationTitle: string;
  status: "pendente" | "aprovado" | "rejeitado" | "entregue";
  message?: string;
  requestedAt: string;
  approvedAt?: string;
  deliveredAt?: string;
  donorId: string;
  donorName: string;
  donorLocation: string;
  quantity: string;
  category: string;
  expirationDate: string;
}

interface RequestContextType {
  requests: DonationRequest[];
  addRequest: (request: Omit<DonationRequest, "id" | "requestedAt" | "status">) => void;
  updateRequest: (id: string, updates: Partial<DonationRequest>) => void;
  deleteRequest: (id: string) => void;
  getUserRequests: (userId: string) => DonationRequest[];
  getDonationRequests: (donationId: string) => DonationRequest[];
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState<DonationRequest[]>([]);

  useEffect(() => {
    const savedRequests = localStorage.getItem("donation_requests");
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  const saveRequests = (newRequests: DonationRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem("donation_requests", JSON.stringify(newRequests));
  };

  const addRequest = (
    requestData: Omit<DonationRequest, "id" | "requestedAt" | "status">
  ) => {
    const newRequest: DonationRequest = {
      ...requestData,
      id: Date.now().toString(),
      requestedAt: new Date().toISOString(),
      status: "pendente",
    };

    const updatedRequests = [...requests, newRequest];
    saveRequests(updatedRequests);
  };

  const updateRequest = (id: string, updates: Partial<DonationRequest>) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, ...updates } : request
    );
    saveRequests(updatedRequests);
  };

  const deleteRequest = (id: string) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    saveRequests(updatedRequests);
  };

  const getUserRequests = (userId: string) => {
    return requests.filter((request) => request.userId === userId);
  };

  const getDonationRequests = (donationId: string) => {
    return requests.filter((request) => request.donationId === donationId);
  };

  const value: RequestContextType = {
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
    getUserRequests,
    getDonationRequests,
  };

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  );
}

export function useRequests(): RequestContextType {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error("useRequests deve ser usado dentro de um RequestProvider");
  }
  return context;
}
