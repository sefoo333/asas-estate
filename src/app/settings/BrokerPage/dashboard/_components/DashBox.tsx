
function DashBox({Data}:any) {
  return (
  <div className="box p-5 rounded-xl shadow bg-white border border-gray-100  dark:!bg-gray-800  dark:!border-gray-600">
                                  <div className="head flex gap-2 items-center">
                                   <div className="icon p-1  border border-gray-200 dark:!border-gray-600 rounded-full">
                                     <Data.icon size={17} />
                                   </div>
                                    <h1 className='text-sm text-gray-700 dark:text-gray-200'>{Data?.name}</h1>
                                  </div>
                                   <div className="body flex gap-3 items-center">
                                    <h2 className='text-3xl font-semibold mt-1'>{Data?.value}</h2>
                                    {/* <div className="icon flex gap-1 items-center text-[#2bc78e] h-fit py-1 px-2  bg-[#f4f6f6] w-fit p-1 rounded-3xl">
                                     <span className='text-[13px]'>15.02%</span>
                                     <PiArrowUpRightBold size={15} /> 
                                    </div> */}
                                  </div>
                                  <h2 className='text-gray-600 text-sm mt-5 font-medium dark:text-gray-300'>{Data?.lastEdit}</h2>
                                </div>
                                  )
}

export default DashBox