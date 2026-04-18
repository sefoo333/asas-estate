"use client"

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
import { ArrowUpDown, ChevronDown, Delete, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { RealEstate } from "@/types/realEstate"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useUserStore } from "@/store/store"
import { User } from "@/types/User"
import { ChangeStatus } from "./ChangeStatus"
import { toast } from "sonner"
import { useCallback, useMemo, useState } from "react"


export interface lead {
  massege:string;
  idSender:string;
  id:string;
  productId:string;
  product:RealEstate;
  status:string;
  userSender:User
}




export default function MassegesTable() {
  const queryClient = useQueryClient();
    const {data} = useQuery({
    queryKey:["MassegesKey"],
    queryFn: async () => { 
      const res =  await fetch(`/api/Leads/Masseges?idUser=${user?.id}`)
      const json = await res.json()
      
      return json?.data
  },
  refetchOnWindowFocus:false,
  })

    const DeleteLead = useMutation({
      mutationKey:["MassegeDelete"],
      mutationFn: async (id:any) => { 
        const res =  await fetch(`/api/Leads/SendMassege` , {
      method:"DELETE",
        headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),    
        })
        const json = await res.json()
        
        return json?.data
    },
    onSuccess:() => {
      toast.success("Delete Done 😀")
queryClient.invalidateQueries({ queryKey: ["MassegesKey"] })
    }
    })

    const memoData = useMemo(() => data ?? [], [data])

const handleDelete = useCallback((id:string) => {
  DeleteLead.mutate(id)
}, [DeleteLead])



const columns: ColumnDef<lead , any>[] = useMemo(() =>  [
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
       accessorKey: "UserName",
       header: ({ column }) => {
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
       cell: ({ row }) => <div className="lowercase flex gap-2 items-center">
         <Image src={row?.original?.userSender?.image || ""} alt="" width={50} height={50} className="w-8 h-8 rounded-md" />
         <span>{row?.original?.userSender?.userName || ""}</span>
       </div>,
     },
     {
       accessorKey: "Phone",
       header: ({ column }) => {
         return (
           <Button
             variant="ghost"
             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
           >
             Phone
           </Button>
         )
       },
       cell: ({ row }) => <div className="lowercase">{row.original?.userSender?.phone}</div>,
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
       cell: ({ row }) => <div className="lowercase w-10">{new Date().toLocaleDateString()}</div>,
     },
     {
       accessorKey: "status",
       header: ({ column }) => {
         return (
           <Button
             variant="ghost"
             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
           >
             status
           </Button>
         )
       },
       cell: ({ row }) => {
         const rower = row.original;
         const con:any = rower.status === "Spam" ? "destructive" : rower.status === "not Replied" ? "outline" : "defualt"
         return <Badge className="font-semibold" variant={con}>{row.original?.status}</Badge>
       },
     },
     {
         accessorKey: "Product",
         header: "product",
         cell: ({ row }) => (
          <>
             {row?.original?.productId ? <Badge className="font-semibold" variant={"default"}><Link href={`/realEstats/${row.original?.productId}`}>show product</Link></Badge> : 
             <Badge className="font-semibold" variant={"outline"}>No product</Badge>}
          </>
           ),
       },
       {
         accessorKey: "Massege",
         header: () => <div className="text-right w-8 font-semibold">Massege</div>,
         cell: ({ row }) => {
         const rower = row.original; 
         const massege = rower.massege.split(" ").slice(0,20).join(" ");
         const threedots = rower.massege.split(" ").length >= 20 && "..." ;
         return (
            <p>{massege}{threedots}</p>
         )
         },
       },
       {
         id: "actions",
         enableHiding: false,
         cell: ({ row }) => {
           const payment = row.original
     
           return (
             <DropdownMenu>
               <DropdownMenuTrigger  asChild>
                 <Button variant="ghost" className="h-8 w-8 p-0">
                   <span className="sr-only">Open menu</span>
                   <MoreHorizontal />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                 {/* <DropdownMenuSeparator /> */}
                 <DropdownMenuItem>
                   <Link href={`masseges/${payment?.id}`}>
                   View Massege
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem>
                   <Link href={`/realEstats/${payment.productId}`}>
                   View Real Estate
                   </Link>
                 </DropdownMenuItem>
                <ChangeStatus   id={payment.id} />
                 <DropdownMenuItem
                   onClick={() => handleDelete(payment.id)}
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
  
  , [handleDelete])
    const user = useUserStore((state) => state.user);



  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data : memoData,
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
          placeholder="Filter users..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
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
      <div className="rounded-md border  ">
        <Table>
          <TableHeader className="bg-slate-50  dark:!bg-gray-800  dark:!border-gray-600">
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
