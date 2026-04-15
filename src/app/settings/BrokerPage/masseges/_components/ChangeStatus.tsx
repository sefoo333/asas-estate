"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useUserStore } from "@/store/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
export function ChangeStatus({id}:{id:string}) {
  const [open, setOpen] = useState(false)
const [value,setStatus] = useState("");
  const status = ["Spam", "Not Replied", "In Progress", "Done"]
const user = useUserStore((state) => state?.user);
const queryClient = useQueryClient();

  const editStatus = useMutation({
    mutationKey:["editStatus"],
    mutationFn:async (status:string) => {
const res = await fetch("/api/Leads/SendMassege", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status, id: id , userId:user?.id }),
})

const json = await res.json()



return json
    },
     onSuccess: () => {
            toast.success("Success to edit 😀")
    queryClient.invalidateQueries({ queryKey: ["MassegesKey"] })
  },
  })


  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault() // يمنع غلق الـ dropdown بشكل طبيعي
          setOpen(true)
        }}
      >
        Change Status
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Status</DialogTitle>
          </DialogHeader>

          <Select onValueChange={(e) => setStatus(e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {status.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => editStatus.mutate(value)} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
