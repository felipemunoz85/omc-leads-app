import { Lead } from '@/types/leads'
import { SOURCES } from '@/lib/utils/constants'

export async function POST(req: Request) {
  const { leads }: { leads: Lead[] } = await req.json()

  const totalLeads = leads.length
  const leadsWithBudget = leads.filter((lead) => lead.budget != null)
  const avgBudget =
    leadsWithBudget.length > 0
      ? Math.round(
          leadsWithBudget.reduce((acc, lead) => acc + (lead.budget ?? 0), 0) /
            leadsWithBudget.length
        )
      : 0

  const sourceCount = leads.reduce<Record<string, number>>((acc, lead) => {
    acc[lead.source] = (acc[lead.source] ?? 0) + 1
    return acc
  }, {})

  const sourceSummary = Object.entries(sourceCount)
    .sort((a, b) => b[1] - a[1])
    .map(
      ([source, count]) =>
        `${SOURCES[source as keyof typeof SOURCES]}: ${count}`
    )
    .join(', ')

  const prompt = `
Eres un analista de marketing digital. Analiza los siguientes datos de leads y genera un resumen ejecutivo en español.

Datos:
- Total de leads: ${totalLeads}
- Presupuesto promedio: $${avgBudget} USD
- Distribución por fuente: ${sourceSummary}
- Leads recientes (últimos 7 días): ${
    leads.filter((l) => {
      const date = new Date(l.created_at)
      const limit = new Date()
      limit.setDate(limit.getDate() - 7)
      return date >= limit
    }).length
  }

Genera el resumen EXACTAMENTE con este formato markdown, sin agregar nada antes ni después:

### Análisis General
[2-3 oraciones analizando el total de leads, presupuesto promedio y distribución por fuente]

### Fuente Principal
[2-3 oraciones describiendo la fuente con más leads, su porcentaje y oportunidades]

### Recomendaciones
- [Recomendación 1 basada en los datos]
- [Recomendación 2 basada en los datos]
- [Recomendación 3 basada en los datos]

IMPORTANTE:
- Usa exactamente los encabezados ### Análisis General, ### Fuente Principal y ### Recomendaciones
- No agregues texto introductorio ni conclusiones fuera de estas tres secciones
- Basa cada sección estrictamente en los datos proporcionados
- Responde siempre en español
  `.trim()
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
      }),
    }
  )

  if (!response.ok) {
    return Response.json(
      { error: 'Error al generar el resumen' },
      { status: 500 }
    )
  }

  const data = await response.json()
  return Response.json({
    summary: data.choices[0].message.content,
  })
}
