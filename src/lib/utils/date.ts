export function isWithinLastDays(isoString: string, days: number): boolean {
  const date = new Date(isoString)
  const limit = new Date()
  limit.setDate(limit.getDate() - days)
  return date >= limit
}
