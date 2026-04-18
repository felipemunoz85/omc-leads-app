import { JSX } from "react";
import { Lead } from "@/types/leads";
import LeadRow from "./LeadRow";
import LeadsTableHeader from "./LeadsTableHeader";

import { Table, TableBody, TableCaption } from "@/components/ui/table";
type Props = {
  leads: Lead[];
};

export default function LeadsTable(props: Props): JSX.Element {
  return (
    <>
      <Table>
        <TableCaption>Listado de leads</TableCaption>
        <LeadsTableHeader />
        <TableBody>
          {props.leads.map((lead: Lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
