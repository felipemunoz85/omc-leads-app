import React from "react";
import { Lead } from "@/types/leads";
import { FIELDS_MAP } from "@/lib/utils/constants";
type Props = {
  lead: Lead | null
}

const FIELD_NAMES = Object.keys(FIELDS_MAP)
export default function LeadDetails({ lead }: Props) {
  if (!lead) return null
  return (
    <div className="w-full">
      {FIELD_NAMES.map((field) => (
        <div key={field} className="w-full flex gap-2 py-2">
          <span className="font-medium">{FIELDS_MAP[field as keyof typeof FIELDS_MAP]}:</span>
          <span className="text-gray-600">{lead[field as keyof typeof lead] as string}</span>
        </div>
      ))}
    </div>
  )
}
