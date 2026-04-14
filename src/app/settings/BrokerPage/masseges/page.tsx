import React from 'react'
import Crubchumb from '../../_components/crubchumb'
import HeadS from '../../_components/HeadS'
import OrddersTable from './_components/OrdersTable'

function page() {
  return (
     <div className="page  px-7 py-7 max-md:px-5 basis-[100%]">
    <Crubchumb />
                <HeadS title="Orders" />
                            <div className="window p-8 mt-10 bg-white shadow w-full  rounded-lg border border-gray-100  ">
<OrddersTable />
</div>

</div>
  )
}

export default page