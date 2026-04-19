'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot } from 'lucide-react'

import { Lead } from '@/types/leads'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  leads: Lead[]
}

export function AiSummaryDrawer({ leads }: Props) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    setSummary(null)

    try {
      const response = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads }),
      })

      if (!response.ok) throw new Error('Error al generar el resumen')

      const data = await response.json()

      setSummary(data.summary)
      console.log(data.summary)
    } catch {
      setError('No se pudo generar el resumen. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Bot />
          Ver resumen de IA
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl font-bold">
            Resumen de comportamiento de leads
          </DrawerTitle>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
          {!isLoading && !summary && !error && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                Genera un resumen inteligente basado en los {leads.length} leads
                actuales.
              </p>
              <Button onClick={handleGenerate}>
                <Bot />
                Generar resumen
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col gap-3 py-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-36 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-5 w-44 mt-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <Button variant="outline" onClick={handleGenerate}>
                Intentar de nuevo
              </Button>
            </div>
          )}

          {summary && !isLoading && (
            <div className="flex flex-col gap-4 py-2">
              <ReactMarkdown
                allowedElements={['h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'blockquote']}
                unwrapDisallowed
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-lg font-semibold mt-4 mb-1">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-base font-semibold mt-4 mb-1">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base font-semibold mt-4 mb-1">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-2">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                }}
              >
                {summary}
              </ReactMarkdown>
              <Button variant="outline" size="sm" onClick={handleGenerate}>
                Regenerar
              </Button>
            </div>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
