export function formatPhone(value: string): string {
  if (!value) return "";
  
  const cleaned = value.replace(/\D/g, "");
  
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 7) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  }
  
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
}
