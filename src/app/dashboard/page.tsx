'use client'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { UserRoundPlus } from 'lucide-react'

import { Lead } from '@/types/leads'
import { LeadFormData } from '@/lib/validations'
import { useLeadsStore } from '@/store/leadsStore'

import LeadsPagination from '@/components/leads/LeadsPagination'
import MetricsSection from '@/components/metrics/MetricsSection'
import { AiSummaryDrawer } from '@/components/ai_summary/AiSummaryDrawer'
import LeadsTable from '@/components/leads/LeadsTable'
import Modal from '@/components/ui/Modal'
import LeadForm from '@/components/leads/LeadForm'
import LeadFilters from '@/components/leads/LeadFilters'
import { Button } from '@/components/ui/button'

export default function Leads() {
  const leads = useLeadsStore((state) => state.leads)
  const filters = useLeadsStore((state) => state.filters)

  const filteredLeads = leads
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
  const addLead = useLeadsStore((state) => state.addLead)
  const updateLead = useLeadsStore((state) => state.updateLead)
  const deleteLead = useLeadsStore((state) => state.deleteLead)

  const currentPage = useLeadsStore((state) => state.currentPage)
  const leadsPerPage = useLeadsStore((state) => state.leadsPerPage)
  const setPage = useLeadsStore((state) => state.setPage)

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage)
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * leadsPerPage,
    currentPage * leadsPerPage
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onOpenModal = () => {
    setIsModalOpen(true)
  }

  const onEdit = useCallback((lead: Lead) => {
    setLeadToEdit(lead)
    setIsModalOpen(true)
  }, [])

  const onDelete = useCallback(
    (lead: Lead) => {
      if (!lead.id) return
      deleteLead(lead.id)
      toast.success('Lead eliminado')
    },
    [deleteLead]
  )

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setLeadToEdit(null)
  }, [])

  const onSubmit = (data: LeadFormData) => {
    if (leadToEdit) {
      updateLead(leadToEdit.id as number, data)
      toast.success('Lead actualizado')
    } else {
      addLead(data)
      toast.success('Lead creado')
    }
    onCloseModal()
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full gap-4 justify-between pb-8 flex-col sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4">
            <span className="text-base text-gray-700">One Million Company</span>
            <h1 className="text-4xl font-bold pointer-events-auto">
              Leads Dashboard
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <AiSummaryDrawer leads={filteredLeads} />
            <Button data-icon="inline-start" onClick={onOpenModal}>
              <UserRoundPlus />
              Nuevo Lead
            </Button>
          </div>
        </div>
        <div className="py-4 w-full">
          <MetricsSection leads={filteredLeads} />
        </div>
        <div className="flex gap-4 items-center pb-8 w-full">
          <LeadFilters />
        </div>
        <LeadsTable
          leads={paginatedLeads}
          onLeadEdit={(value) => onEdit(value)}
          onDelete={onDelete}
          isLoading={isLoading}
          error={error}
        />
        <LeadsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalLeads={filteredLeads.length}
          leadsPerPage={leadsPerPage}
          onPageChange={setPage}
        />
      </main>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Nuevo lead">
        <LeadForm
          onClose={onCloseModal}
          lead={leadToEdit}
          onSubmit={onSubmit}
        />
      </Modal>
    </div>
  )
}
