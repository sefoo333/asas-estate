import React from 'react'

function UserName({setData,data}:{data?:any,setData:any}) {
  return (
  <div className='flex gap-6 items-center mt-8 w-full'>
                 <div className="first w-full">
                   <label htmlFor="first" className='text-sm font-semibold'>UserName</label>
                  <input defaultValue={data?.userName} onChange={(x) => setData((e:any) => ({...e , userName:x.target.value}))} type="text" id='first' placeholder='Enter your UserName' className='w-full mt-2 p-3 text-sm rounded-md border border-gray-300 outline-0' />
                 </div>
                 {/* <div className="last w-full">
                   <label htmlFor="last" className='text-sm font-semibold'>Last Name</label>
                  <input type="text" id='last' placeholder='Enter your LastName' className='w-full mt-2 p-3 rounded-md border border-gray-300 outline-0' />
                 </div> */}
                </div>  )
}

export default UserName