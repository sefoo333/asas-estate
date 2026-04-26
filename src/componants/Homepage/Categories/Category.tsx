import Image from 'next/image'
import Link from 'next/link';


type CategoryProps = {
  Title: string;
  Description: string;
  image?: string;
  value?:string;
};

function Category({Title , value = "buy",Description,image = "/Hero.jpg"}:CategoryProps) {
  return (
   <Link href={`/${value}?estateType=${Title.toLowerCase()}`} className='max-md:flex-shrink-0 max-md:snap-start max-[920px]:w-screen'>
     <div className="card_category  overflow-hidden group-hover:bg-red-500 relative rounded-xl h-[450px] w-[350px]  max-md:w-full   max-xl:h-[236px] flex items-end justify-center max-xl:justify-start">
      <Image className="absolute w-full transition-[500ms] h-full object-cover rounded-xl z-[-1] group" src={image} alt="" width={600} height={600} />
      <div className="text p-[20px] text-center max-xl:text-start text-white relative z-9 ">
      <h1 className="font-semibold text-xl">{Title}</h1>
          <p>{Description}</p>
        </div>
       </div>
   </Link>
  )
}

export default Category