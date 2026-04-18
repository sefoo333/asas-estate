import React from 'react'
import { SelectLang } from './SelectLanguage'

function Language() {
  return (
     <div className="box  md:w-1/2 p-5 rounded-lg border bg-white border-gray-200  dark:!bg-gray-800  dark:!border-gray-600 mt-5">
                   <div className="flex justify-between">
                         <h2 className='font-semibold'>Language</h2>
                        <SelectLang />
                   </div>
                   <span className='text-[13px] text-gray-600 font-semibold darktext-gray-300'>Not available ⚠️</span>
                    </div>
                      )
}

export default Language