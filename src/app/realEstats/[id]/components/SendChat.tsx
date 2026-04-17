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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoChatboxEllipses } from "react-icons/io5"

export function SendChat({product , broker , type , box}:any) {

    const user = useUserStore((state) => state.user);
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
const [isNot,setIsNot] = useState(false);
const [open,setOpen] = useState(true);
      const sendMassege = useMutation({
        mutationKey:["sendmassege"],
        mutationFn:async (data:any) => {
const test = await fetch(`/api/Leads/SendMassege` , {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        ...data,
        id:user?.id,
        idTo:type !== "Broker" ? product?.user?.id : broker?.id,
        idProduct:product?.id,
        title:`${user?.userName}`,
        description:`${user?.userName} send you a massege about your product ${product?.title}`,
        linkNoti:`${window.location.host}/settings/BrokerPage/masseges`,
    })
})

console.log(product)


return test.json()
        },
       
      })

      const massegeProduct = `hello ${product?.user?.userName} ! , i want to ask about property`;
      const massegeBroker = `hello ${broker?.userName} ! , i want to ask about your services`;

  return (
  <>
    <Dialog onOpenChange={setOpen}>
              <DialogTrigger  asChild>
{type === "Broker" ?  (
   <button className='bg-white  border border-gray-200  dark:!bg-gray-800  dark:!border-gray-600 dark:text-gray-300 duration-300 text-black hover:bg-gray-50/10 rounded-xl justify-center  py-2.5 text-[15px] px-7 flex items-center   ' >
        {/* <Mail size={18} className='mr-2' /> */}
       <span>
        Massege
       </span>
        </button> 
        ) : type === "box-on" ? (
      <Button variant={"outline"} size={"lg"} className='cursor-pointerpx-5 py-3 flex gap-2 items-center font-semibold rounded-md'>
      <IoChatboxEllipses  size={20}  />
      <span>Send</span>
                                                              </Button>
) : type === "mobile-product" ? (
  <button className='border-2 border-primary basis-[45%]  gap-3 p-4 py-0 text-primary font-semibold rounded-lg'>
                                                        Chat
                                                        </button>
) : (
   <MessageCircleMore  size={21} />

)}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
      <form action="" onSubmit={handleSubmit((data:any) => sendMassege.mutate(data))}> 
          <DialogHeader className="mb-3">
            <DialogTitle>Ask a question</DialogTitle>
            <DialogDescription>
             Ask agent for more property detailes
            </DialogDescription>
          </DialogHeader>
             <FieldGroup>
            
             <Field>
              <Label htmlFor="userName">Username</Label>
              <Input id="userName" {...register("userName")} name="userName" defaultValue={user?.userName} />
            </Field>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input id="email"  {...register("email")} name="email" defaultValue={user?.email} />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone"  {...register("phone")} name="phone" defaultValue={user?.phone} />
            </Field>
            
            <Field>
              <Label htmlFor="massege">Massege</Label>
              <Textarea id="massege"  {...register("massege")} name="massege" defaultValue={type !== "Broker" ? massegeProduct : massegeBroker} />
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
