import { JSX, useState } from "react";
import { Lead } from "@/types/leads";
import Modal from "@/components/ui/Modal";
import LeadRow from "./LeadRow";
import LeadsTableHeader from "./LeadsTableHeader";
import LeadDetails from "./LeadDetails";
import LeadsTableSkeleton from "./LeadsTableSkeleton";
import LeadsTableEmpty from "./LeadsTableEmpty";

import { Table, TableBody } from "@/components/ui/table";
import LeadsTableError from "./LeadsTableError";
type Props = {
  leads: Lead[];
  onLeadEdit: (lead: Lead) => void
  onDelete: (lead: Lead) => void
  isLoading?: boolean;
  error?: string | null;
};

export default function LeadsTable({ leads, onLeadEdit, onDelete, isLoading = false,
  error = null, }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const onOpenModal = (lead: Lead) => {
      setSelectedLead(lead)
      setIsModalOpen(true);
    };

    const onCloseModal = () => {
      setIsModalOpen(false);
    };
    if (isLoading) {
      return (
        <LeadsTableSkeleton />
      )
    }
    if (error) {
    return (
      // <div className="w-full border border-red-200 bg-red-50 rounded-xl px-6 py-12 flex flex-col items-center gap-3 text-center">
      //   <p className="text-red-600 font-medium">Ocurrió un error al cargar los leads</p>
      //   <p className="text-sm text-red-400">{error}</p>
      // </div>
      <LeadsTableError error={error} />
    );
  }

  if (leads.length === 0) {
    return (
      <LeadsTableEmpty />
    );
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
              onDelete={(lead) => onDelete(lead)}/>
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Detalles del lead">
        <LeadDetails lead={selectedLead} />
      </Modal>
    </>
  );
}
