import { Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BsWhatsapp } from 'react-icons/bs'
import { SendChat } from '../SendChat'

function UserAgent({Productdata}:any) {
  return (
<div className="first bg-white  justify-center  shadow-sm rounded-xl p-5 w-full items-center flex flex-col">
                      <div className="account flex flex-col items-center">
                     <Image src={Productdata?.user?.image || "/Heroo.webp"} alt='' width={150} height={150} className='w-20 h-20 mb-2 rounded-full bg-white' />
                  <div className="text text-xl font-semibold text-center">
                    <h1>{Productdata?.user?.userName}</h1>
                    <h2 className='text-sm text-[#5e5e5e] font-medium'>{Productdata?.user?.company}</h2>
                  </div>
                 </div>
    <div className="social flex gap-5 mt-3">
<div className="icon p-2  rounded-full bg-white border border-gray-200">
          <Link href={`https://wa.me/${Productdata?.user?.phone}?text=مرحبا ${Productdata?.user?.userName} , هل يمكنني الاستفسار عن  العقار الخاص بك ؟`}>
            <BsWhatsapp color='#2cd46b'  size={21} />
          </Link>
</div>
<div className="icon p-2  rounded-full bg-white border border-gray-200">
         <Link href={`tel:${Productdata?.user?.phone}`}>
            <Phone   size={21} />
         </Link>
</div>
<div className="icon p-2  rounded-full bg-white border border-gray-200">
            <SendChat product={Productdata} />
</div>

    {/* </div> */}
    </div>
               </div>
                 )
}

export default UserAgent