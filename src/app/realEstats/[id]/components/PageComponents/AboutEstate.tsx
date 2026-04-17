import Head from "../Head"

function AboutEstate({data}:{data:any}) {
  return (
  <div className="about_estate mt-15 shadow-sm bg-white dark:bg-gray-800 dark:border dark:border-gray-600 rounded-xl p-5">
<Head text='About Real Estate' />
                                                <div className="features grid grid-cols-2 mt-4">
                                                    {data.map((e:any , a:number) => (
                                                        <div className={`box flex justify-between items-center ${a !== data.length -1 ? "border-b border-gray-300/40 dark:border-gray-700" : ""}`} key={a}>
                                                            <div className="title flex items-center py-5">
                                                            <e.icon size={22} className='inline mr-3' />
                                                            <h1>{e.name}</h1>
                                                        </div>
                                                        <div className="flex justify-start basis-[55%] ">
                                                            <h2 className='font-semibold'>{e.value}</h2>
                                                        </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                              )
}

export default AboutEstate