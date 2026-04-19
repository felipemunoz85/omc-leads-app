import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type Props = {
  currentPage: number
  totalPages: number
  totalLeads: number
  leadsPerPage: number
  onPageChange: (page: number) => void
}

export default function LeadsPagination({
  currentPage,
  totalPages,
  totalLeads,
  leadsPerPage,
  onPageChange,
}: Props) {
  const from = (currentPage - 1) * leadsPerPage + 1
  const to = Math.min(currentPage * leadsPerPage, totalLeads)

  if (totalLeads === 0) return null

  return (
    <div className="flex flex-col items-center justify-between px-4 py-3 pt-8 border-t border-gray-200 w-full">
      <span className="text-sm text-gray-500 w-full flex items-center justify-center pb-2 border-b border-b-gray-200">
        Mostrando {from}–{to} de {totalLeads} leads
      </span>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-gray-500 px-2">
              {currentPage} / {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
