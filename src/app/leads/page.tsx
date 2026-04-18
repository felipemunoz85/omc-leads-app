"use client";
import React, { useState } from "react";

import LeadsTable from "@/components/leads/LeadsTable";
import Modal from "@/components/ui/Modal";
import LeadForm from "@/components/leads/LeadForm";
import LeadFilters from "@/components/leads/LeadFilters";
import { Button } from "@/components/ui/button";

import { LeadFormData } from "@/lib/validations";
import { UserRoundPlus } from "lucide-react";
import { Lead } from "@/types/leads";
import { useLeadsStore } from "@/store/leadsStore";


export default function Home() {
  const leads = useLeadsStore((state) => state.leads)
  const addLead = useLeadsStore((state) => state.addLead)
  const updateLead = useLeadsStore((state) => state.updateLead)
  const deleteLead = useLeadsStore((state) => state.deleteLead)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadToEdit, setLeadToEdit] = useState<Lead | null>(null)
  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onEdit = (lead: Lead) => {
    setLeadToEdit(lead)
    setIsModalOpen(true)
  }

  const onDelete = (lead: Lead) => {
    if (!lead.id) return

    deleteLead(lead.id as number)
  }

  const onCloseModal = () => {
    setIsModalOpen(false);
    setLeadToEdit(null)
  };

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
          <Button variant="outline" data-icon="inline-start" onClick={onOpenModal}>
            <UserRoundPlus />Nuevo Lead</Button>
        </div>
        <LeadsTable leads={leads} onLeadEdit={(value) => onEdit(value)} onDelete={onDelete}/>
      </main>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Nuevo lead">
        <LeadForm onClose={onCloseModal} lead={leadToEdit} onSubmit={onSubmit} />
      </Modal>
    </div>
  );
}
