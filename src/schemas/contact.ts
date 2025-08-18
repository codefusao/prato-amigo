import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .refine((name) => {
      const trimmedName = name.trim();
      const nameParts = trimmedName.split(/\s+/);
      return (
        nameParts.length >= 2 && nameParts.every((part) => part.length >= 2)
      );
    }, "Por favor, insira seu nome completo (nome e sobrenome)"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  type: z.string().min(1, "Selecione um tipo de contato"),
  message: z
    .string()
    .min(30, "Mensagem deve ter pelo menos 30 caracteres")
    .max(500, "Mensagem muito longa"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
