import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function FeaturesDialog({featuresData , GetIcon}:any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
           <Button className='px-8 py-5 border text-blue-600 border-blue-600  font-bold rounded-lg hover:bg-blue-700 hover:text-white cursor-pointer transition' variant={"outline"}>
                                                                 Show More ({featuresData?.length - 7})
                                                                 </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl !z-99999999">
          <DialogHeader>
            <DialogTitle>Features</DialogTitle>
          </DialogHeader>
            <div className="features grid grid-cols-2 mt-4">
                                                    {featuresData?.map((e:any , a:number) => (
                                                        <div className={`box flex justify-between items-center`} key={a}>
                                                            <div className="title flex items-center py-5">
                                                            <GetIcon icon={e.icon}/>
                                                            <h1>{e.label}</h1>
                                                        </div>
                                                      
                                                        </div>
                                                    ))}
                                                </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
