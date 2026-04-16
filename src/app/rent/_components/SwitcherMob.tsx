"use client"
import { useMediaQuery } from 'react-responsive'
import RentPage from './Responsive/RentPage'
import RentPageMob from './Responsive/RentPageMob'

function SwitcherMob() {
    const isMob = useMediaQuery({maxWidth:1016})

  return (
<>
{isMob ? <RentPageMob /> : <RentPage />}
</>
)
}

export default SwitcherMob