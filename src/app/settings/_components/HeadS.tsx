import React from 'react'

function HeadS({title}:{title:string}) {
  return (
            <h1 className='text-2xl font-semibold mt-4 border-b pb-2 border-gray-100'>{title}</h1>
  )
}

export default HeadS