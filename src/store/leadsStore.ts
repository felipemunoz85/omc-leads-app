import { create } from 'zustand'
import { Lead } from '@/types/leads'
import { initialLeads } from '@/lib/leadsData'

function getNextId(leads: Lead[]): number {
  if (leads.length === 0) return 1

  const maxId = Math.max(...leads.map((lead) => Number(lead.id)))
  return maxId + 1
}

type Filters = {
  search: string
  source: string
  dateFrom: string
  dateTo: string
}
type LeadsState = {
  leads: Lead[]
  filters: Filters

  addLead: (lead: Omit<Lead, 'id' | 'created_at'>) => void
  updateLead: (id: number, data: Partial<Lead>) => void
  deleteLead: (id: number) => void
  setFilter: (key: keyof Filters, value: string) => void
  resetFilters: () => void
}

const defaultFilters: Filters = {
  search: '',
  source: '',
  dateFrom: '',
  dateTo: '',
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: initialLeads,
  filters: defaultFilters,

  addLead: (data) => {
    const newLead: Lead = {
      ...data,
      id: getNextId(get().leads),
      created_at: new Date().toISOString(),
    }
    set((state) => ({ leads: [newLead, ...state.leads] }))
  },

  updateLead: (id, data) => {
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, ...data } : lead
      ),
    }))
  },

  deleteLead: (id) => {
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id),
    }))
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }))
  },

  resetFilters: () => set({ filters: defaultFilters }),
}))
