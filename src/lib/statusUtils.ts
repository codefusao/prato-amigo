type StatusConfig = {
  color: string;
  text: string;
};

type StatusMap = Record<string, StatusConfig>;

export function getStatusColor(status: string, statusMap: StatusMap): string {
  return statusMap[status]?.color || "bg-gray-100 text-gray-800";
}

export function getStatusText(status: string, statusMap: StatusMap): string {
  return statusMap[status]?.text || "Desconhecido";
}

export const donationStatusMap: StatusMap = {
  disponivel: {
    color: "bg-green-100 text-green-800",
    text: "Disponível",
  },
  reservado: {
    color: "bg-yellow-100 text-yellow-800",
    text: "Reservado",
  },
  entregue: {
    color: "bg-blue-100 text-blue-800",
    text: "Entregue",
  },
};

export const requestStatusMap: StatusMap = {
  pendente: {
    color: "bg-yellow-100 text-yellow-800",
    text: "Pendente",
  },
  aprovado: {
    color: "bg-green-100 text-green-800",
    text: "Aprovado",
  },
  rejeitado: {
    color: "bg-red-100 text-red-800",
    text: "Rejeitado",
  },
  entregue: {
    color: "bg-blue-100 text-blue-800",
    text: "Entregue",
  },
};

