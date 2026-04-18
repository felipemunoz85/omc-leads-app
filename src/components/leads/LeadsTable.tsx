import { JSX, useState } from "react";
import { Lead } from "@/types/leads";
import Modal from "@/components/ui/Modal";
import LeadRow from "./LeadRow";
import LeadsTableHeader from "./LeadsTableHeader";
import LeadDetails from "./LeadDetails";

import { Table, TableBody, TableCaption } from "@/components/ui/table";
type Props = {
  leads: Lead[];
};

export default function LeadsTable({ leads }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const onOpenModal = () => {
      setIsModalOpen(true);
    };

    const onCloseModal = () => {
      setIsModalOpen(false);
    };
  const selectedLead = leads[0]
  return (
    <>
      <Table>
        <TableCaption>Listado de leads</TableCaption>
        <LeadsTableHeader />
        <TableBody>
          {leads.map((lead: Lead) => (
            <LeadRow key={lead.id} lead={lead} onNameClick={onOpenModal} />
          ))}
        </TableBody>
      </Table>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Detalles del lead">
        <LeadDetails lead={selectedLead} />
      </Modal>
    </>
  );
}
