'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SOURCES = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'landing_page', label: 'Landing Page' },
  { value: 'referred', label: 'Referido' },
  { value: 'other', label: 'Otro' },
]

type LeadFormProps = {
  onClose: () => void
}

export default function LeadForm({ onClose }: LeadFormProps) {
  return (
    <form className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Nombre <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          placeholder="Ej: Valentina Torres"
        />
        <p className="text-xs text-red-500">El nombre es obligatorio</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <Input
          type="email"
          placeholder="Ej: valentina@gmail.com"
        />
        <p className="text-xs text-red-500">El email no es válido</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Teléfono
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          type="tel"
          placeholder="+57 311 234 5678"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Fuente <span className="text-red-500">*</span>
        </label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una fuente" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">La fuente es obligatoria</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Producto de interés
          <span className="text-gray-400 font-normal ml-1">(opcional)</span>
        </label>
        <Input
          type="text"
          placeholder="Ej: Curso de marketing digital"
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
          />
        </div>
        <p className="text-xs text-red-500">El presupuesto debe ser mayor o igual a 0</p>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          Guardar lead
        </Button>
      </div>

    </form>
  )
}
