'use client'

import { useLeadsStore } from '@/store/leadsStore'
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
import { Eraser } from 'lucide-react'

export default function LeadFilters() {
  const filters = useLeadsStore((state) => state.filters)
  const setFilter = useLeadsStore((state) => state.setFilter)
  const resetFilters = useLeadsStore((state) => state.resetFilters)

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end lg:w-max gap-4 p-4 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500">
          Nombre o email
        </label>
        <Input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={filters.search}
          onChange={(e) => setFilter('search', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500">Fuente</label>
        <Select
          value={filters.source}
          onValueChange={(value) => setFilter('source', value)}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Todas las fuentes" />
          </SelectTrigger>
          <SelectContent>
            {SOURCES_FIELDS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500">Desde</label>
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter('dateFrom', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500">Hasta</label>
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter('dateTo', e.target.value)}
        />
      </div>

      <Button
        variant="secondary"
        className="w-full sm:w-auto"
        onClick={resetFilters}
      >
        <Eraser />
        Limpiar filtros
      </Button>
    </div>
  )
}
