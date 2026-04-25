import { TiStarFullOutline } from "react-icons/ti";
import Head from '../Head';
import { MarqueeDemo } from './Tha-marq';

function Thanks() {
  return (
    <div className="parent mt-30 flex justify-center max-md:mb-10">
        <div className="container">
           <div className="parent flex justify-center">
             <div className="rate mb-9 flex gap-3 items-center bg-gray-800 rounded-full shadow-2xl p-3 pr-4 text-white">
                <div className="icon p-2 text-white bg-purple-500 rounded-full">
                    <TiStarFullOutline size={20} />
                </div>
                <h1 className='font-medium max-md:text-sm'>4/5 Rate from 350 users</h1>
            </div>
           </div>
           <Head className="leading-16 max-md:leading-10 mb-15">
            What The Customers Says <br /> about our presence
           </Head>
           <div className="thanks">
            <MarqueeDemo />
           </div>
        </div>
    </div>
  )
}

export default Thanks