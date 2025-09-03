import { z } from "zod";

export const registerSchema = z
  .object({
    type: z.string().min(1, "Selecione um tipo de cadastro"),
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z
      .string()
      .min(14, "Telefone deve ter 11 dígitos")
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato de telefone inválido"),
    address: z.string().min(5, "Endereço inválido"),
    city: z.string().min(2, "Cidade inválida"),
    state: z.string().min(1, "Selecione um estado"),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, "Você deve aceitar os termos"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
