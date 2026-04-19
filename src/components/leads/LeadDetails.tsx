import { Lead } from '@/types/leads'
import { SOURCES } from '@/lib/utils/constants'
import { formatDate, formatCurrency } from '@/lib/utils/format'

type Props = {
  lead: Lead | null
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
}

interface FieldProps {
  label: string
  value?: string | number | null
}

function Field({ label, value }: FieldProps) {
  return (
    <tr>
      <td className="py-1.5 text-sm text-muted-foreground w-2/5">{label}</td>
      <td className="py-1.5 text-sm font-medium text-foreground">{value || '—'}</td>
    </tr>
  )
}

export default function LeadDetails({ lead }: Props) {
  if (!lead) return null

  const initials = getInitials(lead.name)
  const sourceLabel = SOURCES[lead.source as keyof typeof SOURCES] ?? '-'

  return (
    <div className="flex flex-col gap-4">

      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground shrink-0">
          {initials}
        </div>
        <p className="font-medium text-foreground">{lead.name}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Contacto
        </p>
        <table className="w-full">
          <tbody>
            <Field label="Email" value={lead.email} />
            <Field label="Teléfono" value={lead.phone} />
          </tbody>
        </table>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Información comercial
        </p>
        <table className="w-full">
          <tbody>
            <Field label="Fuente" value={sourceLabel} />
            <Field label="Producto de interés" value={lead.interest_product} />
            <Field
              label="Presupuesto"
              value={lead.budget != null ? `${formatCurrency(lead.budget)} USD` : null}
            />
            <Field label="Fecha de creación" value={formatDate(String(lead.created_at))} />
          </tbody>
        </table>
      </div>

    </div>
  )
}
