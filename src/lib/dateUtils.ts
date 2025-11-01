/**
 * Formata uma data string para o formato brasileiro (dd/mm/yyyy)
 * @param dateString - String da data no formato ISO ou similar
 * @returns String formatada no padrão brasileiro
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  try {
    return new Date(dateString).toLocaleDateString("pt-BR");
  } catch {
    return dateString;
  }
}

/**
 * Verifica se uma data de expiração está próxima (3 dias ou menos)
 * @param expirationDate - String da data de expiração
 * @returns true se a data expira em 3 dias ou menos
 */
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

