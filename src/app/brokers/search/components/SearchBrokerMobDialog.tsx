import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import SelectInBroker from "../../_components/Select"
import { type Dispatch, type SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { LuFilter } from "react-icons/lu"

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

interface SearchBrokerMobDialogProps {
  switcher: boolean
  text: string
  type: string
  setType: Dispatch<SetStateAction<string>>
  setSwitcher: Dispatch<SetStateAction<boolean>>
}

export function SearchBrokerMobDialog({
  switcher,
  text,
  type,
  setType,
  setSwitcher,
}: SearchBrokerMobDialogProps) {

      const types = ["Sale","Rent","Commercial"]
      const router= useRouter();

      const searchProducts = async () => {
    // setSearchResults(json.data)
    router.replace(`/brokers/search?finder=${!switcher ? "name" : "location"}&${new URLSearchParams({title:text , type:type }  )}`)
    router.refresh()
      }

  return (
    <div className="flex flex-wrap gap-2">
   
        <Drawer  >
          <DrawerTrigger asChild>
              <div className="box shadow-sm p-3 rounded-lg bg-white">
                                    <LuFilter size={23} className='text-primary' />
                                </div>   
          </DrawerTrigger>
          <DrawerContent className="px-5">
            <DrawerHeader>
              <DrawerTitle>SearchBroker</DrawerTitle>
           
            </DrawerHeader>
           <div className="locati">
            <h1 className="text-[15px] text-start  font-semibold mb-3 mt-5">Type Search</h1>
                <div className="button flex rounded-md  border border-[#ccc] p-0.5 ">
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md w-1/2 transition-[500ms] ${!switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(() => false)}>
  Name
</button>
<button className={`px-8 font-semibold py-2.5 cursor-pointer rounded-md w-1/2 transition-[500ms] ${switcher && "bg-blue-400/20 text-blue-700"}`} onClick={() => setSwitcher(() => true)}>
  Location
</button>
</div>
           </div>
           <div className="type">
            <h1 className="text-[15px] text-start  font-semibold mb-3 mt-5">Property Type</h1>
              <div className="select flex gap-5 w-full">
                        <SelectInBroker onChange={setType} Title={""} data={types} placeholder="select type" />
                       </div>
           </div>
            <DrawerFooter>
              <Button onClick={() => searchProducts()}>Search</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    </div>
  )
}
