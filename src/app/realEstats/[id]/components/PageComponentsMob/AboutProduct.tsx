
function AboutProduct({data}:any) {
  return (
  <div className="about_estate mt-15  bg-white rounded-xl ">
                <h1 className='font-semibold'>About Property</h1>
                                                            <div className="features grid grid-cols-1 mt-4">
                                                                {data.map((e:any , a:number) => (
                                                                    <div className={`box flex gap-2 justify-between items-center ${a !== data.length -1 ? "border-b border-gray-300/40" : ""}`} key={a}>
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

export default AboutProduct