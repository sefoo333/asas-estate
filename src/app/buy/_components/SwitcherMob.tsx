
import { useMediaQuery } from 'react-responsive'
import dynamic from 'next/dynamic';

const Buy = dynamic(() => import('./BuyPage'), {
  ssr: false,
});
const BuyMob = dynamic(() => import('./BuyMobPage'), {
  ssr: false,
});
function SwitcherMob() {
    const isMob = useMediaQuery({maxWidth:980})
    
  return (
    <>
    {isMob ? <BuyMob /> : <Buy />}
    </>
  )
}

export default SwitcherMob