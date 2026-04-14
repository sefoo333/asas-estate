import SearchInput from '@/componants/InputSearch/SearchInput'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SearchBrokerMobDialog } from './SearchBrokerMobDialog';

function SearchBrokerMob() {

  const [switcher,setSwitcher] = useState(false)
  const [text,setText] = useState("")
  const [type,setType] = useState("Buy")
  return (
    <div className="parent flex gap-4 items-center py-3 w-full">
            <SearchInput finder={switcher} placeholder={!switcher ? "Name" : "Location"} setTextSearh={setText} className=' py-6 ' />

                                    <SearchBrokerMobDialog
                                        switcher={switcher}
                                        text={text}
                                        type={type}
                                        setType={setType}
                                        setSwitcher={setSwitcher}
                                    />
    
    </div>
  )
}

export default SearchBrokerMob