import Product from '@/componants/Product';
import { useGetProducts } from '@/hooks/useGetProducts';

function MayProducts() {
    const {data:mayProducts} = useGetProducts("All");

  return (
<div className="second mt-15 bg-white   justify-center rounded-xl w-full flex  flex-col">
                                                            <h1 className='font-semibold'>May you like</h1>
                                                            <div className="boxs mt-8">
                                                            {mayProducts?.slice(0,4)?.map((e:any) => <Product product={e} key={e?.id}  />)}
                                                            </div>
                                                           </div>
                                                             )
}

export default MayProducts