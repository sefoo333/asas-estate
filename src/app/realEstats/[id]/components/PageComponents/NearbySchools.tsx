import Head from '../Head'
import { LuSchool } from 'react-icons/lu'

function NearbySchools({schoolsWithDistance}:any) {
  return (
<>
<Head text='Nearby Schools' />
<div className="flex flex-col mt-4 gap-10">
{schoolsWithDistance.length > 0 && schoolsWithDistance.map((e:any) => (
        <div key={e?.id} className="school flex gap-4 items-center">
    <div className="icon text-white p-4 bg-blue-700 rounded-full">
        <LuSchool size={30} />
    </div>
    <div className="text">
        <h1 className='font-semibold text-xl text-blue-800'>{e?.name}</h1>
        <h2 className='text-sm'>Distance: <strong>{e.distance}KM</strong></h2>
    </div>
</div>
))}

</div>
</>  )
}

export default NearbySchools