import MapSingle from '@/componants/MapSingle';
import { useState } from 'react'
import { GoScreenNormal } from 'react-icons/go';
import { LiaMapMarkedAltSolid } from 'react-icons/lia'

function ViewMap({setDataLocation,setNearbySchools,location}:any) {

    const [open,setOpen] = useState(false);

  return (
    <>
 <button onClick={() => setOpen(true)} className='border border-blue-400 text-blue-400 focus:bg-blue-400 focus:text-white transition-all flex gap-2 items-center justify-center w-full py-3 mt-5 rounded-lg font-semibold'>
                    <LiaMapMarkedAltSolid size={21} className='inline' />
                    View on map</button>

                  {open && <div className="w-full   left-0 flex justify-center items-center top-0 z-999 h-full bg-black/30 fixed">
            <div className="w-full animate-fade-in relative h-full">
    <div onClick={() => setOpen(false)} className="butt p-3 rounded-full bg-white absolute left-3 cursor-pointer top-3 z-9">
            <GoScreenNormal  size={22} />
        </div>
                 <MapSingle setDataLocation={setDataLocation} setNearbySchools={setNearbySchools} location={location} />
            </div>
    </div>}
    </>
  )
}

export default ViewMap