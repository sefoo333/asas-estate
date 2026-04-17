import React from 'react'
import { SelectTheme } from './SelectTheme'

function Theme() {
  return (
     <div className="box flex justify-between items-center md:w-1/2 p-5 rounded-lg border bg-white border-gray-200   dark:!bg-gray-800  dark:!border-gray-600 mt-5">
                        <h2 className='font-semibold'>Theme</h2>
                        <SelectTheme />
                    </div>
                      )
}

export default Theme