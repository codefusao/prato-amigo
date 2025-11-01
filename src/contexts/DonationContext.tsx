import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface Donation {
  id: string;
  userId: string;
  title: string;
  description: string;
  quantity: string;
  category: string;
  expirationDate: string;
  location: string;
  status: "disponivel" | "reservado" | "entregue";
  createdAt: string;
  image?: string;
}

interface DonationContextType {
  donations: Donation[];
  addDonation: (
    donation: Omit<Donation, "id" | "createdAt" | "status">
  ) => void;
  updateDonation: (id: string, updates: Partial<Donation>) => void;
  deleteDonation: (id: string) => void;
  getUserDonations: (userId: string) => Donation[];
  reserveDonation: (id: string) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(
  undefined
);

export function DonationProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const savedDonations = localStorage.getItem("user_donations");
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);

  const saveDonations = (newDonations: Donation[]) => {
    setDonations(newDonations);
    localStorage.setItem("user_donations", JSON.stringify(newDonations));
  };

  const addDonation = (
    donationData: Omit<Donation, "id" | "createdAt" | "status">
  ) => {
    const newDonation: Donation = {
      ...donationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "disponivel",
    };

    const updatedDonations = [...donations, newDonation];
    saveDonations(updatedDonations);
  };

  const updateDonation = (id: string, updates: Partial<Donation>) => {
    const updatedDonations = donations.map((donation) =>
      donation.id === id ? { ...donation, ...updates } : donation
    );
    saveDonations(updatedDonations);
  };

  const deleteDonation = (id: string) => {
    const updatedDonations = donations.filter((donation) => donation.id !== id);
    saveDonations(updatedDonations);
  };

  const getUserDonations = (userId: string) => {
    return donations.filter((donation) => donation.userId === userId);
  };

  const reserveDonation = (id: string) => {
    const updatedDonations = donations.map((donation) =>
      donation.id === id ? { ...donation, status: "reservado" as const } : donation
    );
    saveDonations(updatedDonations);
  };

  const value: DonationContextType = {
    donations,
    addDonation,
    updateDonation,
    deleteDonation,
    getUserDonations,
    reserveDonation,
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonations(): DonationContextType {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error(
      "useDonations deve ser usado dentro de um DonationProvider"
    );
  }
  return context;
}
