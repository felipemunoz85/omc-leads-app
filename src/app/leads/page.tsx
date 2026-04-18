"use client";
import React, { useState } from "react";

import LeadsTable from "@/components/leads/LeadsTable";
import Modal from "@/components/ui/Modal";
import LeadForm from "@/components/leads/LeadForm";
import LeadFilters from "@/components/leads/LeadFilters";
import { Button } from "@/components/ui/button";
import { initialLeads } from "@/lib/leadsData";

import { UserRoundPlus } from "lucide-react";

<UserRoundPlus />
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };
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
        <LeadsTable leads={initialLeads} />
      </main>
      <Modal isOpen={isModalOpen} onClose={onCloseModal} title="Nuevo lead">
        <LeadForm onClose={onCloseModal} />
      </Modal>
    </div>
  );
}
