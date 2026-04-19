import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default function LeadsTableHeader(){
  return (
    <>
      <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Fuente</TableHead>
            <TableHead>Producto de interés</TableHead>
            <TableHead>Presupuesto</TableHead>
            <TableHead>Fecha de creación</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
    </>
  );
}
