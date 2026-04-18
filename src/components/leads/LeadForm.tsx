"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SOURCES_FIELDS } from "@/lib/utils/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lead } from "@/types/leads";

const leadSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(2, 'Mínimo 2 caracteres'),
  email: z
    .email('Email inválido')
    .min(1, 'El email es obligatorio'),
  phone: z.string().optional(),
  source: z
    .string()
    .min(1, 'La fuente es obligatoria'),
  interest_product: z.string().optional(),
  budget: z
    .number({ error: 'Debe ser un número' })
    .min(0, 'Debe ser mayor o igual a 0')
    .optional()
    .or(z.nan().transform(() => undefined)),
})

type LeadFormProps = {
  lead: Lead | null;
  onClose: () => void;
  onSubmit: (data: LeadFormData) => void
};

type LeadFormData = z.infer<typeof leadSchema>

export default function LeadForm({ onClose, lead, onSubmit }: LeadFormProps) {
  const isEditing = !!lead;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: lead?.name ?? '',
      email: lead?.email ?? '',
      phone: lead?.phone ?? '',
      source: lead?.source ?? '',
      interest_product: lead?.interest_product ?? '',
      budget: lead?.budget ?? undefined,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Nombre <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Ej: Valentina Torres"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Ej: valentina@gmail.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Teléfono
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          type="tel"
          placeholder="+57 311 234 5678"
          {...register('phone')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Fuente <span className="text-red-500">*</span>
        </label>
        <Select defaultValue={lead?.source} onValueChange={(value) => setValue('source', value, { shouldValidate: true })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una fuente" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES_FIELDS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.source && (
          <p className="text-xs text-red-500">{errors.source.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Producto de interés
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          type="text"
          placeholder="Ej: Curso de marketing digital"
          {...register('interest_product')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Presupuesto
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            $
          </span>
          <Input
            type="number"
            min={0}
            placeholder="0"
            className="pl-7"
            {...register('budget', { valueAsNumber: true })}
          />
        </div>
        {errors.budget && (
          <p className="text-xs text-red-500">{errors.budget.message}</p>
        )}
      </div>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {isEditing ? "Guardar cambios" : "Guardar lead"}
        </Button>
      </div>
    </form>
  );
}
