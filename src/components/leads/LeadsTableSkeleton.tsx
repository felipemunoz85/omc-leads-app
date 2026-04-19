import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody } from '@/components/ui/table'
import LeadsTableHeader from '@/components/leads/LeadsTableHeader'
export default function LeadsTableSkeleton() {
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
      <Table>
        <LeadsTableHeader />
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-44" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-36" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-4">
                <Skeleton className="h-4 w-12" />
              </td>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
