import React from 'react'

function Head({children ,className = "3xl"}:{children:React.ReactNode , className?:string}) {
  return (
            <h1 className={'font-bold text-center text-5xl max-md:text-2xl max-md:mb-2 '+className}>
        {children}
    </h1>
  )
}

export default Head