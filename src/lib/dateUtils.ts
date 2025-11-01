export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    return new Date(dateString).toLocaleDateString("pt-BR");
  } catch {
    return dateString;
  }
}

export function isExpiringSoon(expirationDate: string): boolean {
  if (!expirationDate) return false;
  
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expDate = new Date(expirationDate);
    expDate.setHours(0, 0, 0, 0);
    
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays <= 3 && diffDays >= 0;
  } catch {
    return false;
  }
}

interface DateInfo {
  label: string;
  value: string;
  highlight?: boolean;
}

interface RequestDates {
  requestedAt: string;
  approvedAt?: string;
  deliveredAt?: string;
}

export function buildRequestDateInfo(dates: RequestDates): DateInfo[] {
  const dateInfo: DateInfo[] = [
    { label: "Solicitado em", value: formatDate(dates.requestedAt) },
  ];

  if (dates.approvedAt) {
    dateInfo.push({
      label: "Aprovado em",
      value: formatDate(dates.approvedAt),
    });
  }

  if (dates.deliveredAt) {
    dateInfo.push({
      label: "Entregue em",
      value: formatDate(dates.deliveredAt),
      highlight: true,
    });
  }

  return dateInfo;
}

