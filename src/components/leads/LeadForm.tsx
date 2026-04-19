'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Lead } from '@/types/leads'
import { leadSchema, LeadFormData } from '@/lib/validations'
import { SOURCES_FIELDS } from '@/lib/utils/constants'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type LeadFormProps = {
  lead: Lead | null
  onClose: () => void
  onSubmit: (data: LeadFormData) => void
}

export default function LeadForm({ onClose, lead, onSubmit }: LeadFormProps) {
  const isEditing = !!lead

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
      phone: lead?.phone,
      source: lead?.source ?? 'other',
      interest_product: lead?.interest_product ?? '',
      budget: lead?.budget,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Nombre <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Valentina Torres"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Ej: valentina@gmail.com"
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Teléfono
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+57 311 234 5678"
          {...register('phone')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="source" className="text-sm font-medium text-gray-700">
          Fuente <span className="text-red-500">*</span>
        </label>
        <Select
          defaultValue={lead?.source}
          onValueChange={(value) =>
            setValue('source', value as Lead['source'], { shouldValidate: true })
          }
        >
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
        <label htmlFor="interest_product" className="text-sm font-medium text-gray-700">
          Producto de interés
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          id="interest_product"
          type="text"
          placeholder="Ej: Curso de marketing digital"
          {...register('interest_product')}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="budget" className="text-sm font-medium text-gray-700">
          Presupuesto
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            $
          </span>
          <Input
            id="budget"
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
          {isEditing ? 'Guardar cambios' : 'Guardar lead'}
        </Button>
      </div>
    </form>
  )
}
