import React from 'react'
import HeadS from '../../_components/HeadS'
import Crubchumb from '../../_components/crubchumb'
import Image from 'next/image'
import { ChartPieDonutText } from './_components/chart'
import TTable from './_components/table'

function page() {
  return (
    <div className="page  px-7 py-7 max-md:px-5 basis-[100%]">
        <Crubchumb />
<HeadS title={"Real Estats"} />
                            <div className="window p-8 mt-10  rounded-lg border  dark:!bg-gray-800  dark:!border-gray-600 bg-white border-gray-200  ">
                                <h1 className='text-lg font-semibold'>Properties</h1>
                               <TTable />
</div>
{/* <div className="grid grid-cols-2 mt-5">
                                                                <ChartPieDonutText />
</div> */}
    </div>
  )
}

export default page