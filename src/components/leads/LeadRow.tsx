import React, { JSX } from "react";
import { Lead, Sources } from "@/types/leads";
import { formatDate, formatCurrency } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  lead: Lead;
  onNameClick?: () => void
};
export default function LeadRow(props: Props): JSX.Element {
  const { lead, onNameClick } = props;
  return (
    <>
      <TableRow className="text-sm text-gray-500">
        <TableCell>
          <Button variant="link" onClick={onNameClick}>
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
                <Button title="Editar" variant="outline" size="icon">
                  <SquarePen />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" title="Eliminar">
                  <Trash2 />
                </Button>
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
