"use client";

import { Button } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createFileRoute, Link } from "@tanstack/react-router";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  Edit,
  Ellipsis,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import * as React from "react";

export const Route = createFileRoute(
  "/_authenticated/_party/policy-holder/$policyHolderId/file/risk-objects"
)({
  component: RouteComponent,
});

// Define the data type
export type RiskObject = {
  id: string;
  type: "Voertuig" | "Gebouw";
  description: string;
  hoedanigheid: string;
  actief: boolean;
  bouwjaar: string;
};

// Mock data for risk objects
const data: RiskObject[] = [
  {
    id: "1",
    type: "Voertuig",
    description: "1-JJY-521 - Mercedes C-Klasse",
    hoedanigheid: "Verzekeringsnemer",
    actief: true,
    bouwjaar: "2020",
  },
  {
    id: "2",
    type: "Gebouw",
    description: "Rue Joseph Wauters 29, 4257 Berloz",
    hoedanigheid: "Eigenaar",
    actief: true,
    bouwjaar: "1995",
  },
  {
    id: "3",
    type: "Voertuig",
    description: "2-ABC-123 - BMW X5",
    hoedanigheid: "Verzekeringsnemer",
    actief: false,
    bouwjaar: "2018",
  },
  {
    id: "4",
    type: "Gebouw",
    description: "Hoofdstraat 45, 2000 Antwerpen",
    hoedanigheid: "Huurder",
    actief: true,
    bouwjaar: "2005",
  },
];

// Define columns
export const columns: ColumnDef<RiskObject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="border-border"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Selecteer alle items"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="border-border"
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Selecteer rij"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div> {row.getValue("type")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Omschrijving
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "hoedanigheid",
    header: "Hoedanigheid",
    cell: ({ row }) => <div>{row.getValue("hoedanigheid")}</div>,
  },
  {
    accessorKey: "bouwjaar",
    header: "Bouwjaar",
    cell: ({ row }) => <div>{row.getValue("bouwjaar")}</div>,
  },
  {
    accessorKey: "actief",
    header: "Actief",
    cell: ({ row }) => {
      const isActive = row.getValue("actief");
      return isActive ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <X className="h-4 w-4 text-red-600" />
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const riskObject = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acties</DropdownMenuLabel>
            {riskObject.type === "Voertuig" && (
              <DropdownMenuItem asChild>
                <Link
                  to="/vehicle/$vehicleId"
                  params={{ vehicleId: riskObject.id }}
                  className="flex items-center"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Bekijken
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem disabled={true}>
              <Edit className="mr-2 h-4 w-4" />
              Bewerken
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={true}>
              <Trash2 className="mr-2 h-4 w-4" />
              Verwijderen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Data table component
export function DataTable({
  columns,
  data,
}: {
  columns: ColumnDef<RiskObject>[];
  data: RiskObject[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      {/* Enhanced Header Section */}
      <div className="py-4">
        {/* Filters and RiskObjects length */}
        <div className="flex items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 text-sm text-muted-foreground">
              {data.length} risico-objecten
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Type
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuCheckboxItem
                  checked={!table.getColumn("type")?.getFilterValue()}
                  onCheckedChange={() =>
                    table.getColumn("type")?.setFilterValue("")
                  }
                >
                  Alle types
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn("type")?.getFilterValue() === "Voertuig"
                  }
                  onCheckedChange={() =>
                    table
                      .getColumn("type")
                      ?.setFilterValue(
                        table.getColumn("type")?.getFilterValue() === "Voertuig"
                          ? ""
                          : "Voertuig"
                      )
                  }
                >
                  Voertuigen
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={
                    table.getColumn("type")?.getFilterValue() === "Gebouw"
                  }
                  onCheckedChange={() =>
                    table
                      .getColumn("type")
                      ?.setFilterValue(
                        table.getColumn("type")?.getFilterValue() === "Gebouw"
                          ? ""
                          : "Gebouw"
                      )
                  }
                >
                  Gebouwen
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Column Visibility */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Kolommen <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center ">
              <Button variant="ghost" size="icon">
                <Filter />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="icon">
              <Ellipsis />
            </Button>
            <Button variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nieuw risico-object
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Geen resultaten.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} van{" "}
          {table.getFilteredRowModel().rows.length} rij(en) geselecteerd.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Vorige
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Volgende
          </Button>
        </div>
      </div>
    </div>
  );
}

function RouteComponent() {
  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={data.filter((item) => item.actief)} />
    </div>
  );
}
