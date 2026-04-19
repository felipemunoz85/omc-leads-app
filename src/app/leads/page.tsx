'use client'
import React, { useState } from 'react'

import LeadsTable from '@/components/leads/LeadsTable'
import Modal from '@/components/ui/Modal'
import LeadForm from '@/components/leads/LeadForm'
import LeadFilters from '@/components/leads/LeadFilters'
import { Button } from '@/components/ui/button'

import { LeadFormData } from '@/lib/validations'
import { UserRoundPlus } from 'lucide-react'
import { Lead } from '@/types/leads'
import { useLeadsStore } from '@/store/leadsStore'
import LeadsPagination from '@/components/leads/LeadsPagination'

export default function Home() {
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
  const onOpenModal = () => {
    setIsModalOpen(true)
  }

  const onEdit = (lead: Lead) => {
    setLeadToEdit(lead)
    setIsModalOpen(true)
  }

  const onDelete = (lead: Lead) => {
    if (!lead.id) return

    deleteLead(lead.id as number)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
    setLeadToEdit(null)
  }

  const onSubmit = (data: LeadFormData) => {
    if (leadToEdit) {
      updateLead(leadToEdit.id as number, data)
    } else {
      addLead(data)
    }
    onCloseModal()
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex gap-4 items-center pb-8">
          <h1 className="text-xl font-bold pointer-events-auto">Leads</h1>
        </div>
        <div className="flex gap-4 items-center pb-8">
          <LeadFilters />
          <Button
            variant="outline"
            data-icon="inline-start"
            onClick={onOpenModal}
          >
            <UserRoundPlus />
            Nuevo Lead
          </Button>
        </div>
        <LeadsTable
          leads={paginatedLeads}
          onLeadEdit={(value) => onEdit(value)}
          onDelete={onDelete}
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
