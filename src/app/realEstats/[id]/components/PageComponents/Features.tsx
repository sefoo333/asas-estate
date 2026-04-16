import React from 'react'
import Head from '../Head'
import { FeaturesDialog } from '../FeaturesDialog'
import { featuresLabel } from '@/lib/Features'

function Features({Productdata}:any) {
    const GetIcon = ({icon}:any) => {
        const getIcon = featuresLabel.find((e) => e.icon.name === icon)
    const Iconer = getIcon?.icon;
    
    return Iconer ? <Iconer size={22} className='inline mr-3' /> : null
    }

  return (
<>
<Head text='Features' />
                                                 <div className="features grid max-md:gap-3 grid-cols-2 mt-4">
                                                    {Productdata?.features?.map((e:any , a:number) => (
                                                        <div className={`box flex justify-between items-center`} key={a}>
                                                            <div className="title flex items-center py-5">
                                                            <GetIcon icon={e.icon}/>
                                                            <h1>{e.label}</h1>
                                                        </div>
                                                      
                                                        </div>
                                                    ))}
                                                </div>
                                                    {Productdata?.features?.length >= 6 ? (
                                                       <FeaturesDialog featuresData={Productdata?.features} GetIcon={GetIcon} />
                                                    ) : null}


</>
)
}

export default Features