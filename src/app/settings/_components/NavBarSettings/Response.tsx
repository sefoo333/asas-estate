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
import { lead } from "../../BrokerPage/masseges/_components/OrdersTable"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { User } from "lucide-react"
import { IoArrowUndoOutline, IoChatboxEllipsesOutline } from "react-icons/io5"
import { useState } from "react"
import { useUserStore } from "@/store/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function Response({chatId, openWindow , setOpenWindow}:any) {


const user = useUserStore((state) => state.user)
 const {data:chatProduct} = useQuery<lead>({
        queryKey:["chatNo" , chatId],
        queryFn:async () => {
const fetcher = await fetch(`/api/Leads/${chatId}`);
const json = await fetcher.json();

return json.data
        },
        refetchOnWindowFocus:false
    })


  const data = [{
    name:"UserName",
    value:chatProduct?.userSender?.userName,
    id:1
  },
{
    name:"Email",
    value:chatProduct?.userSender?.email,
    id:2,
},
{
    name:"Phone",
    value:chatProduct?.userSender?.phone || "01110343035",
    id:3
},
]

const [open,setOpen] = useState(false);
const [massege,setMassege] = useState("");
      const sendMassege = useMutation({
        mutationKey:["sendmassege"],
        mutationFn:async (type:boolean) => {
const test = await fetch(`/api/Leads/SendMassege` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        id:user?.id,
        idTo:chatProduct?.userSender?.id,
        idProduct:chatProduct?.product?.id,
        title:`${user?.userName}`,
        massege:!type ? "review": massege,
        description:!type ? `${user?.userName} want to know your rate about Brokering service` : `${user?.userName} response to your massege`,
        linkNoti:chatId,
        Response:true
    })
})


return test.json()
        },
        onSuccess:() => {
            
            toast.success(`${open ? "Request evaluation" : "Response massege"} sent successfully`)
        },
        onError:() => {
            toast.error("Failed to send request evaluation")
        }
       
      })

      const router = useRouter();
  return (
    <Dialog onOpenChange={setOpenWindow} open={openWindow}>
      <form>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Massege</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-5">
    {data?.map((e) => (
    <div key={e?.id} className="box">
        <h1 className='font-semibold'>{e?.name}</h1>
        <h2 className='text-sm mt-1'>{e?.value}</h2>
    </div>
))}
</div>
<div className="massegeBox mt-10">
    <h1 className='font-semibold'>Massege</h1>
    <Textarea onChange={(e) => setMassege(e.target.value)} className='mt-2 h-[250px]' readOnly={!open ? true : false} defaultValue={!open ? chatProduct?.massege : ""}  />
</div>



          <DialogFooter>
            <DialogClose onClick={() => setOpenWindow(false)} asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
   
    <Button onClick={() => router.push(`/brokers/${chatProduct?.userSender?.id}`)} className='px-10 cursor-pointer'>
        <User />
        Broker 
    </Button>
    <Button onClick={() => setOpen((e) => !e)} className='px-10 cursor-pointer'>
        <IoArrowUndoOutline />
        {!open ? "Response" : "Cancel Response"} 
    </Button>

    {open && <Button onClick={() => sendMassege.mutate(true)} className=' cursor-pointer  text-white'>
        <IoChatboxEllipsesOutline />
        Send
    </Button>}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
