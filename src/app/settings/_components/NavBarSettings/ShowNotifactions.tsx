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
import Image from "next/image"
import { useRouter } from "next/navigation"

export function ShowNotifactions({data,setOpen,setSelectedNotifaction}:any) {
    const router = useRouter();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className='text-sm w-full text-gray-500 text-center und my-2 cursor-pointer hover:underline'>show more</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[900px] ">
          <DialogHeader>
            <DialogTitle>Notifactions</DialogTitle> 
          </DialogHeader>
         <div className="flex flex-col">
             {data?.map((e:any) => (
          <div onClick={() => {
            e?.linkNotifaction === "review" ? (setOpen(true), setSelectedNotifaction(e)) : router.push(`${window.location.protocol}//${e?.linkNotifaction}`)
          }} className='relative z-999' key={e?.id}>
            <div className="box flex gap-4 items-center px-3 py-5 transition-all border-b border-b-gray-200 hover:bg-slate-100/80 cursor-pointer">
              <Image src={"/Hero.jpg"} alt='' className='rounded-full w-10 h-10' width={50} height={50} />
              <div className="text">
                  <h1 className='font-semibold text-[15px]'>{e?.Content?.title}</h1>
                  <h2 className='text-[12px] text-gray-500'>{e?.Content?.description}</h2>
              </div>
          </div>
          </div>
          ))}
         </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
