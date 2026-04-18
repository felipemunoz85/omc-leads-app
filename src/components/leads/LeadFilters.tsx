"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "landing_page", label: "Landing Page" },
  { value: "referred", label: "Referido" },
  { value: "other", label: "Otro" },
];

export default function LeadFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1">
          <Input type="text" placeholder="Buscar por nombre o email..." />
        </div>

        <div className="w-full sm:w-48">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Todas las fuentes" />
            </SelectTrigger>
            <SelectContent>
              {SOURCES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-500">Desde</label>
          <Input type="date" />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-500">Hasta</label>
          <Input type="date" />
        </div>

        <Button variant="outline" className="w-full sm:w-auto">
          Limpiar filtros
        </Button>
      </div>
    </div>
  );
}
