import { z } from "zod";

export const donationSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título muito longo"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição muito longa"),
  quantity: z
    .string()
    .min(1, "Quantidade é obrigatória")
    .max(50, "Quantidade muito longa"),
  category: z
    .string()
    .min(1, "Selecione uma categoria"),
  expirationDate: z
    .string()
    .min(1, "Data de validade é obrigatória")
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }, "Data de validade deve ser hoje ou no futuro"),
  location: z
    .string()
    .min(5, "Local de retirada deve ter pelo menos 5 caracteres")
    .max(200, "Local de retirada muito longo"),
});

export type DonationFormData = z.infer<typeof donationSchema>;
