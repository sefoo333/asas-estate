"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetProducts } from '@/hooks/useGetProducts';
import EasySearchsTypes from '@/componants/EasySearchsTypes';
import { useMediaQuery } from 'react-responsive';
import Product_BRC from '@/componants/Product_BRC';
import Product from '@/componants/Product';
function Products({searchResults}:any) {

  const {data} = useGetProducts("com","","",true);
const isMob = useMediaQuery({maxWidth:1000});


  return (
    <div className="parent max-md:w-full max-xl:px-4  basis-[80%] max-md:basis-full h-screen pb-70 overflow-y-scroll" style={{scrollbarWidth:"none"}}>
        <div className="container">
            <div className="title flex justify-between items-center">
                <h1 className='font-semibold text-start text-3xl'>Properties for sale</h1>
                <Select>
                    <SelectTrigger className="w-[150px] max-md:hidden">
                            <SelectValue className='font-semibold' placeholder={"Popular"} />
                          </SelectTrigger>
                    <SelectContent>
<SelectGroup>
    <SelectItem value='Popular' className='font-semibold'>Popular</SelectItem>
    <SelectItem value='Newest' className='font-semibold'>Newest</SelectItem>
    <SelectItem value='Oldest' className='font-semibold'>Oldest</SelectItem>
    <SelectItem value='lPrice' className='font-semibold'>Lowest price</SelectItem>
    <SelectItem value='hPrice' className='font-semibold'>Highest price</SelectItem>
</SelectGroup>
                    </SelectContent>
                </Select>
            </div>
                     <EasySearchsTypes isCommercial={true} products={data} />
            <div className="products flex flex-col  max-[920px]:grid max-[920px]:grid-cols-2 max-md:grid-cols-1 mt-14  gap-9 relative">
                 {searchResults?.length > 0 ? searchResults.map((e:any) => (
<>
{isMob ?  <Product product={e} key={e} /> : <Product_BRC product={e} key={e} />}
</>
)) : 
              (
                data?.map((e:any) => (
<>
{isMob ?  <Product product={e} key={e} /> : <Product_BRC product={e} key={e} />}
</>

              ))
              )
              }
            </div>
        </div>
    </div>
  )
}

export default Products