import React from 'react'
import { SelectLang } from './SelectLanguage'

function Language() {
  return (
     <div className="box flex justify-between items-center md:w-1/2 p-5 rounded-lg border bg-white border-gray-200 mt-5">
                        <h2 className='font-semibold'>Language</h2>
                        <SelectLang />
                    </div>
                      )
}

export default Language