import { Lead, Filters } from '@/types/leads'
export const filterLeads = (leads: Lead[], filters: Filters): Lead[] => {
  const filteredLeads: Lead[] = leads
    .filter((lead) => {
      const search = filters.search.toLowerCase()
      const matchSearch =
        !search ||
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search)

      const matchSource = !filters.source || lead.source === filters.source

      const matchDateFrom =
        !filters.dateFrom ||
        new Date(lead.created_at) >= new Date(filters.dateFrom)

      const matchDateTo =
        !filters.dateTo || new Date(lead.created_at) <= new Date(filters.dateTo)

      return matchSearch && matchSource && matchDateFrom && matchDateTo
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

  return filteredLeads
}
