import  { useState } from 'react'
import Head_create from './Head_create'
import { CgGym, CgHomeAlt, CgProfile, CgSmartHomeBoiler } from 'react-icons/cg'
import { IoClose } from 'react-icons/io5'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { IoMdCafe, IoMdCheckmark } from 'react-icons/io'
import { FaUtensils } from 'react-icons/fa6'
import { FaParking, FaPray, FaSwimmingPool } from 'react-icons/fa'
import { featuresLabel } from '@/lib/Features'

function Features({features,setFeatures,edit = false}:{features:any,setFeatures:any,edit:boolean}) {
    const [add , setadd] = useState(false);
   
    const [Name,setName] =  useState("")
    const [icon,setIcon] =  useState(null);


const GetIcon = ({icon}:any) => {
    const getIcon = featuresLabel.find((e) => e.icon.name === icon)
const Iconer = getIcon?.icon;

return Iconer ? <Iconer size={22} className='inline mr-3' /> : null
}

  return (
<div className="features p-4">
    <Head_create>Features</Head_create>
    <div className="boxs my-4 flex flex-col gap-5">
       
        {features?.map((e:any , i:number) => (
            <div key={i} className="box flex justify-between items-center py-4 px-4 border border-gray-200 rounded-xl">
           <div className="first  items-center flex gap-3">
               <GetIcon icon={e.icon}/>
             {/* {edit ? (
             ): (
                <e.icon size={25} />
             )} */}
                             {/* {e?.icon && <e.icon size={25} />} */}

            <h1 className='font-semibold'>{e.label}</h1>
           </div>
           <IoClose onClick={() => setFeatures(features.filter((f:any) => f.id !== e.id))} color='#cd0303' className='cursor-pointer' size={20} /> 
        </div>
        ))}
       
      
      {add && (
          <div className="box flex flex-col  py-4 px-4 border-2 border-dashed border-gray-200 rounded-xl">
        {/* <div className="title">
              <Head_create>Title</Head_create>
    <Input onChange={(e) => setName(e.target.value) } className='p-5 mt-2 shadow-none' placeholder='Write Here' />
        </div> */}
        <div className="type mt-3">
              <Head_create>Type</Head_create>
   <Select onValueChange={(a:any) => setIcon(a)}>
      <SelectTrigger className="w-full py-5 mt-3">
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className='h-[200px]'>
        {featuresLabel.map((e) => (
                      <SelectItem key={e?.id} value={e.label} id={e.label}>{<e.icon size={15} className="mr-1" />} {e.label} </SelectItem>
        ))}
        </SelectGroup>
    
      </SelectContent>
    </Select>
        </div>
        <div className="button flex justify-end mt-3">
            <Button onClick={(e) => {
                e.preventDefault();
                if ( icon){
                    const selectedFeature = featuresLabel.find((f) => f.label === icon);
                    if (selectedFeature) {
                        setFeatures((x:any) => [...x, {
                            label:selectedFeature.label,
                            icon:selectedFeature.icon?.name,
                            idTwo:selectedFeature.id,
                            id:Date.now(),
                        }])
                    }
                }

            }} className='font-semibold cursor-pointer'>
                <IoMdCheckmark  />
                Confirm
                </Button>
        </div>
        </div>
      )}
    </div>
<div className="feature flex justify-end">
    <Button onClick={(e)=> {setadd((e) => !e); e.preventDefault();}} className='font-semibold cursor-pointer'  variant={"outline"}>
        Add Feature
        </Button>
</div>



</div>  )
}

export default Features