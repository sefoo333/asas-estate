import Image from "next/image"
import { SendChat } from "../SendChat"
import { Link, PhoneCall } from "lucide-react"

function CallToAction({Productdata}:any) {
  return (
 <div className='bg-white mt-15 rounded-xl relative'>
                                                <h1 className='font-semibold'>About Agent</h1>
                                              <div className="box flex relative justify-between flex-col">
                                                  <div className="flex gap-3 items-center mt-3">
                                                    <Image src={Productdata?.user?.image} alt='' width={100} height={100} className='w-15 h-15 rounded-full' />
                                                <div className="text">
                                                    <h1 className='font-semibold'>{Productdata?.user?.userName}</h1>
                                                    <h2 className='text-sm'>Property Owner</h2>
                                                </div>
                                                </div>
                                              
                                               
                                              </div>
                                            </div> 
                                             )
}

export default CallToAction