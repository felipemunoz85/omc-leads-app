import { useCallback, useState } from 'react'

import { Lead } from '@/types/leads'

import Modal from '@/components/ui/Modal'
import { Table, TableBody } from '@/components/ui/table'

import LeadRow from '@/components/leads/LeadRow'
import LeadsTableHeader from '@/components/leads/LeadsTableHeader'
import LeadDetails from '@/components/leads/LeadDetails'
import LeadsTableSkeleton from '@/components/leads/LeadsTableSkeleton'
import LeadsTableEmpty from '@/components/leads/LeadsTableEmpty'
import LeadsTableError from '@/components/leads/LeadsTableError'
type Props = {
  leads: Lead[]
  onLeadEdit: (lead: Lead) => void
  onDelete: (lead: Lead) => void
  isLoading?: boolean
  error?: string | null
}

export default function LeadsTable({
  leads,
  onLeadEdit,
  onDelete,
  isLoading = false,
  error = null,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const onOpenModal = useCallback((lead: Lead) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }, [])

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  if (isLoading) {
    return <LeadsTableSkeleton />
  }
  if (error) {
    return <LeadsTableError error={error} />
  }

  if (leads.length === 0) {
    return <LeadsTableEmpty />
  }
  return (
    <>
      <Table>
        <LeadsTableHeader />
        <TableBody>
          {leads.map((lead: Lead) => (
            <LeadRow
              key={lead.id}
              lead={lead}
              onShowLead={(lead) => onOpenModal(lead)}
              onEdit={(lead) => onLeadEdit(lead)}
              onDelete={(lead) => onDelete(lead)}
            />
          ))}
        </TableBody>
      </Table>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title="Detalles del lead"
      >
        <LeadDetails lead={selectedLead} />
      </Modal>
    </>
  )
}
