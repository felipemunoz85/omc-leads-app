import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

type Props = {
  error: string
}
export default function LeadsTableError({ error }: Props) {
  return (
    <div className="w-full flex items-center justify-center">
      <Alert variant="destructive" className="max-w-md p-4">
        <AlertCircleIcon className="w-12 h-12"/>
        <AlertTitle className="text-base font-medium">Ocurrió un error al cargar los leads</AlertTitle>
        <AlertDescription className="text-[14px]">
          {error}
        </AlertDescription>
      </Alert>
    </div>
  )
}
