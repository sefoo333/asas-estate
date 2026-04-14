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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Share } from "lucide-react"
import { usePathname } from "next/navigation"
import { PiShareFatLight } from "react-icons/pi"
import { RiShareForwardFill } from "react-icons/ri"

export function ShareProfile({Type = "" , link}: {Type:string , link?:string }) {



  return (
    <Dialog>
      <DialogTrigger asChild>
         {
          Type === "broker" ?  <button className='bg-blue-600 duration-300 text-white hover:bg-blue-700 rounded-xl justify-center hover:text-white py-2.5 text-[15px] px-7 flex items-center   ' >
                    <RiShareForwardFill size={18} className='mr-2' />
                    Share profile
                </button>
                : Type === "on-product" ? (

                  <div className="box flex items-center cursor-pointer">
                <PiShareFatLight size={27} />
                <span className='text-sm ml-2'>Share</span>
            </div>
          )
            : (
               <Button variant={"outline"} className='p-2 border cursor-pointer transition-all hover:bg-slate-50 border-gray-300 bg-white rounded-lg '>
                                                                <Share size={25} />
                                                                </Button>
            )
         }
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share {Type ? "Profile" : "Property"}</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link ?? location.href}
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
