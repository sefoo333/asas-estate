"use client"
import { useMediaQuery } from 'react-responsive'
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const MobileView = dynamic(() => import('./components/MobileView'), {
  ssr: false,
});
const DesktopView = dynamic(() => import('./components/DesktopView'), {
  ssr: false,
});

function page() {
  const isMob = useMediaQuery({maxWidth:767});
      const wParams = useParams();
  
    return (
    <>
    {isMob ? <MobileView wParams={wParams} /> : <DesktopView wParams={wParams} />}
    </>
  )
}

export default page