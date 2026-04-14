"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useGetProducts } from "@/hooks/useGetProducts"
import { RealEstate } from "@/types/realEstate"
import { useRouter } from "next/navigation"
import Link from "next/link"
import DeleteButton from "@/app/settings/Account/_components/DeleteButton"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUserStore } from "@/store/store"
import { Broker } from "@/types/Broker"
import { User } from "@/types/User"
import { toast } from "sonner"







export default function TTable() {
  const queryClient = useQueryClient();

    const user = useUserStore((state) => state.user);
    const {data} = useQuery({
    queryKey:["BrokerRequests"],
    queryFn: async () => { 
      const res =  await fetch(`/api/brokers/requests`)
      const json = await res.json()
      console.log("tsa",json)
      return json?.data
  },
  refetchOnWindowFocus:false,
  })
    const acceptRequest = useMutation({
    mutationKey:["BrokerAction"],
    mutationFn: async ({ action, id }: { action: string; id: string }) => { 
      const res =  await fetch(`/api/brokers/requests/${id}` , {method:action})
      const json = await res.json()
      console.log("tsa",json)
      return json?.data
  },
  onSuccess:() => {
    toast.success("success tso create")
    queryClient.invalidateQueries({ queryKey: ["BrokerRequests"] })

  }
  })


 const columns: ColumnDef<Broker , any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userName",
    header: ({ column }:any) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          userName
                    <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }:any) => <div className="lowercase flex gap-2 items-center">
      <Image src={row?.original?.image} alt="" width={50} height={50} className="w-8 h-8 rounded-md" />
      <span>{row.getValue("userName")}</span>
    </div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          phone
        </Button>
      )
    },
    cell: ({ row }:any) => <div className="lowercase">{row?.original.phone}</div>,
  },
  {
    accessorKey: "Location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-10 font-semibold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase w-10">{row?.original.location}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right w-8  font-semibold">Added To</div>,
    cell: ({ row }:any) => {
  

      return <div className="text-right font-medium w-15">{new Date(row?.original.createdAt).toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "languages",
    header: "Languages",
    cell: ({ row }) => ( 
      <Badge className="font-semibold" variant={row.getValue("languages")}>{(row.getValue("languages") as any).join(",")}</Badge>
    ),
  },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => console.log(row)}>
                <Link href={`/settings/AdminPage/RequestsBroker/${payment.id}`}>
                Open Request
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => acceptRequest.mutate({ action: "POST", id: payment.id.toString() })}>Accept</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => acceptRequest.mutate({ action: "DELETE", id: payment.id.toString() })}
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
]




















  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data : data ?? [],
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
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <Input
          placeholder="Filter properties..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
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
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="font-semibold" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>

  )
}
