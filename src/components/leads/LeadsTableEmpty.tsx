import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function LeadsTableEmpty() {
  return (
    <div className="w-full flex items-center justify-center">
      <Alert variant="default" className="max-w-md p-4">
        <AlertCircleIcon className="w-12 h-12"/>
        <AlertTitle className="text-base font-medium">No se encontraron leads</AlertTitle>
        <AlertDescription className="text-[14px]">
          Intenta ajustar los filtros o crea un nuevo lead
        </AlertDescription>
      </Alert>
    </div>
  )
}
