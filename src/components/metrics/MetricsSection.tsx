import { Lead } from '@/types/leads'
import { formatCurrency } from '@/lib/utils/format'
import { isWithinLastDays } from '@/lib/utils/date'
import { SOURCES } from '@/lib/utils/constants'

import MetricsCard from '@/components/metrics/MetricsCard'
type Props = {
  leads: Lead[]
}

export default function MetricsSection({ leads }: Props) {
  const total = leads.length

  const leadsWithBudget = leads.filter((l) => l.budget != null)
  const avgBudget =
    leadsWithBudget.length > 0
      ? leadsWithBudget.reduce((acc, l) => acc + (l.budget ?? 0), 0) /
        leadsWithBudget.length
      : 0

  const lastSevenDays = leads.filter((l) =>
    isWithinLastDays(String(l.created_at), 7)
  ).length

  const sourceCount = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.source] = (acc[l.source] ?? 0) + 1
    return acc
  }, {})
  const topSource =
    Object.entries(sourceCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[1024px]">
      <MetricsCard label="Total leads" value={total} />
      <MetricsCard
        label="Presupuesto promedio"
        value={avgBudget > 0 ? formatCurrency(avgBudget) : '—'}
      />
      <MetricsCard label="Últimos 7 días" value={lastSevenDays} />
      <MetricsCard label="Fuente principal" value={SOURCES[topSource as keyof typeof SOURCES] ?? '—'} />
    </div>
  )
}
