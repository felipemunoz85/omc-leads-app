import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'Mínimo 2 caracteres'),
  email: z
    .email('Email inválido')
    .min(1, 'El email es obligatorio'),
  phone: z.string().optional(),
  source: z
    .enum(['instagram', 'facebook', 'landing_page', 'referred', 'other'],
    { error: 'La fuente es obligatoria'}),
  interest_product: z.string().optional(),
  budget: z
    .number({ error: 'Debe ser un número' })
    .min(0, 'Debe ser mayor o igual a 0')
    .optional()
    .or(z.nan().transform(() => undefined)),
})

export type LeadFormData = z.infer<typeof leadSchema>
