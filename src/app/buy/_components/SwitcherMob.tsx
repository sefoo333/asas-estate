import React from 'react'
import BuyMobPage from './BuyMobPage'
import BuyPage from './BuyPage'
import { useMediaQuery } from 'react-responsive'

function SwitcherMob() {
    const isMob = useMediaQuery({maxWidth:980})
    
  return (
    <>
    {isMob ? <BuyMobPage /> : <BuyPage />}
    </>
  )
}

export default SwitcherMob