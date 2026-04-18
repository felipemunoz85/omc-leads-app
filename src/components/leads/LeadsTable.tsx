import { JSX, useState } from "react";
import { Lead } from "@/types/leads";
import Modal from "@/components/ui/Modal";
import LeadRow from "./LeadRow";
import LeadsTableHeader from "./LeadsTableHeader";
import LeadDetails from "./LeadDetails";

import { Table, TableBody, TableCaption } from "@/components/ui/table";
type Props = {
  leads: Lead[];
  onLeadEdit: (lead: Lead) => void
};

export default function LeadsTable({ leads, onLeadEdit }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const onOpenModal = (lead: Lead) => {
      setSelectedLead(lead)
      setIsModalOpen(true);
    };

    const onCloseModal = () => {
      setIsModalOpen(false);
    };
  return (
    <>
      <Table>
        <TableCaption>Listado de leads</TableCaption>
        <LeadsTableHeader />
        <TableBody>
          {leads.map((lead: Lead) => (
            <LeadRow key={lead.id} lead={lead} onShowLead={(lead) => onOpenModal(lead)} onEdit={(lead) => onLeadEdit(lead)} />
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Detalles del lead">
        <LeadDetails lead={selectedLead} />
      </Modal>
    </>
  );
}
