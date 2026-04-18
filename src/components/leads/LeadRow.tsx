import { JSX } from "react";
import { Lead, Sources } from "@/types/leads";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen } from "lucide-react";
import { DeleteLeadAction } from "@/components/leads/DeleteLeadAction";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  lead: Lead;
  onShowLead: (lead: Lead) => void;
  onEdit: (lead: Lead) => void
};
export default function LeadRow(props: Props): JSX.Element {
  const { lead, onShowLead, onEdit } = props;

  return (
    <>
      <TableRow className="text-sm text-gray-500">
        <TableCell>
          <Button variant="link" onClick={() => onShowLead(lead)}>
            {lead.name}
          </Button>
        </TableCell>
        <TableCell>{lead.email}</TableCell>
        <TableCell>{lead.phone ?? "—"}</TableCell>
        <TableCell>{Sources[lead.source]}</TableCell>
        <TableCell>{lead.interest_product ?? "—"}</TableCell>
        <TableCell>
          {lead.budget != null ? formatCurrency(lead.budget) : "—"}
        </TableCell>
        <TableCell>{formatDate(lead.created_at)}</TableCell>
        <TableCell className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  title='Editar'
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(lead)}
                >
                  <SquarePen />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteLeadAction />
              </TooltipTrigger>
              <TooltipContent>
                <p>Eliminar</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
