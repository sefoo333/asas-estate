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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useUserStore } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { MessageCircleMore } from "lucide-react"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, Toaster } from "sonner"
import { id } from "zod/v4/locales"
import { FaStar } from "react-icons/fa"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function RateWindow({product ,broker , opene,setOpene}:any) {

    const user = useUserStore((state) => state.user);
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [rating,setRating] = useState(0);
const [isNot,setIsNot] = useState(false);
const [open,setOpen] = useState(true);
const [massege,setMassege] = useState("");
      const sendMassege = useMutation({
        mutationKey:["sendmassege"],
        mutationFn:async (data:any) => {
const test = await fetch(`/api/Leads/Star` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        ...data,
        userId:user?.id,
        BrokerId:product?.UserTo?.id,
        rating:rating,
    })


})



return test.json()
        },
       
      })

  return (
  <>
    <Dialog open={opene} onOpenChange={setOpene}>
        <DialogTrigger className="hidden"  asChild>
<FaStar  size={21} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
      <form action="" onSubmit={handleSubmit((data:any) => sendMassege.mutate(data))}> 
          <DialogHeader className="mb-3">
            <DialogTitle>Review a broker</DialogTitle>
          </DialogHeader>

{broker ? <div className="box mb-5 mt-7 flex gap-2 items-center p-3 transition-all border rounded-xl bg-white border-gray-200 ">
    <Image src={broker?.image || "/Heroo.jpg"} alt="User Image" width={100} height={100} className="rounded-full w-15 h-15 " />
    <div className="info ml-3">
        <h2 className="font-semibold">{broker?.userName}</h2>
        <p className="text-sm text-gray-500">Broker</p>
    </div>
</div>
 : 
 <div className="box mb-5 mt-7 flex gap-2 items-center p-3 transition-all border rounded-xl bg-white border-gray-200 ">
    <Image src={product?.UserTo?.image || "/Heroo.jpg"} alt="User Image" width={100} height={100} className="rounded-full w-15 h-15 " />
    <div className="info ml-3">
        <h2 className="font-semibold">{product?.UserTo?.userName}</h2>
        <p className="text-sm text-gray-500">{product?.UserTo?.email}</p>
    </div>
</div>

 }
             <FieldGroup>       
        <Field>
    <Label>Rate</Label>
     <Select name="rate" onValueChange={(value) => setRating(parseInt(value))}>
      <SelectTrigger className='bg-white'>
                 <SelectValue placeholder={"Rate"} />
       </SelectTrigger>
      <SelectGroup>
      <SelectContent>
         <SelectItem value="1">1</SelectItem>
      <SelectItem value="2">2</SelectItem>
     <SelectItem value="3">3</SelectItem>
      <SelectItem value="4">4</SelectItem>
       <SelectItem value="5">5</SelectItem>
      </SelectContent>
      </SelectGroup>
     </Select>
   </Field>
            
            <Field>
              <Label htmlFor="massege">Massege</Label>
              <Textarea id="massege"  {...register("massege")} name="massege" defaultValue={"hello Agent ! , i want to ask about property"} />
            </Field>
          </FieldGroup>
      {isNot && <h1 className="text-[13px] text-red-500 mt-2">You are not a user</h1>}
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="cursor-pointer" type={"submit"}>Send</Button>

          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  </>
  )
}
