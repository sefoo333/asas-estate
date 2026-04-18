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
import { useUserStore } from "@/store/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"






export default function TTable() {
  const router = useRouter();

  const DeleteProperties = useMutation({
    mutationKey:["DeleteProperties"],
    mutationFn: async (data: { ids: number[] }) => { 
      const res =  await fetch(`/api/RealEstats/RealEstates` , {
        method:"DELETE",
         headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const json = await res.json()
      return json?.data
  },
  onSuccess: () => {
    toast.success("Delete is success")
location.reload()
  }
  })

 const columns: ColumnDef<RealEstate , any>[] = [
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
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Property
                      <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase flex gap-2 items-center">
        <Image src={row.original.images[0]} alt="" width={50} height={50} className="w-8 h-8 rounded-md" />
        <span>{row.getValue("title")}</span>
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
            Type
          </Button>
        )
      },
      cell: ({ row }:any) => <div className="lowercase">{row.getValue("type").startsWith("b_") ? row.getValue("type").slice(2) : row.getValue("type")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-10 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Added To
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase w-10">{new Date(row.getValue("createdAt"))?.toLocaleDateString()}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right w-8 font-semibold">Amount</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"))
  
        // Format the amount as a dollar amount
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: row.getValue("currency"),
        // }).format(amount)
  
        return <div className="text-right font-medium w-15">${amount}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className="font-semibold" variant={row.getValue("status")}>{row.getValue("status")}</Badge>
      ),
    },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row ,table}) => {
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
                <DropdownMenuItem >
                  <Link href={`/realEstats/${payment.id}`}>
                  View Real Estate
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/settings/BrokerPage/updateProperty/${payment.id}`}>
                  Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                 onClick={() => DeleteProperties.mutate({ids: table.getSelectedRowModel().rows.map(row => row.original?.id)})}
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

  

  const user = useUserStore((state) => state.user)
  // const {data}:any = useGetProducts("",user?.id);


    const fetchData = async () => {
    const res = await fetch(`/api/RealEstats/RealEstates?idBroker=${user?.id}`)
    const json = await res.json()
   return json?.data
  }
  
  const {data , isLoading} = useQuery({
    queryKey:["fetchProducts"],
    queryFn:fetchData,
  refetchOnWindowFocus:false
  })

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
        <Input
          placeholder="Filter properties..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
          <TableHeader className="bg-slate-50 dark:bg-gray-800">
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
            variant="destructive"
            size="sm"
            onClick={() => DeleteProperties.mutate({ids: table.getSelectedRowModel().rows.map(row => row.original?.id)})}
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            Delete Selected
          </Button>
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
