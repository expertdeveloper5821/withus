import { allIconList } from 'config/security-config';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string | number;
  image: string;
  title: string;
  discountPrice?: number;
  originalPrice?: number;
  price?: number | string;
  description: string;
  handle: string;
  ratings: number;
  reviews: number;
}

export default function ProductGrid({ products}: { products: Product[] | any }) {
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
      {products.map((product:any) => (
        <div
          key={product.id}
          className=""
        >
          <div className="relative">
            
            <Link href={`/product/${product.handle}`} prefetch={true}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full sm:h-30 md:h-60 object-cover cursor-pointer rounded-[4px] md:rounded-[20px] border border-gray-200"
              />
            </Link>
          </div>
          <div className='px-3 pt-2'>
                <div className="flex items-center justify-between">
        <span className="bg-[#D91E37] text-[9px] leading-[97%] font-semibold text-white  px-2 pt-[2px] pb-[2px] pl-[8px] pr-[8px] text-center mr-2 rounded">
          MEGA SALE
        </span>
        <h3 className="text-[13px] font-normal leading-[120%] text-[#00000099] font-semibold line-clamp-1 ">
          {product.title}
        </h3>
      </div>         
          <div className="flex items-center justify-between mt-2">
          <div className="text-red-500 font-bold font-medium text-[14px] leading-[120%]">
            {product.discountPrice} <span className="text-xs">Uzs</span>
            {/* <span className="line-through text-gray-500 text-sm ml-2">
              {product.price}
            </span> */}
          </div>
          <button className="px-3 py-1 border border-gray-500 rounded-full text-sm font-medium hover:bg-gray-300 flex items-center justify-center">
           <Image
              src={allIconList.CartIcon}
              alt="Cart Icon"
              width={20}
              height={20}
              className="h-3"
            />
            
          </button>    
        </div>
          <p className="text-[14px] text-[#EC250C] mt-1 ">{product.description}Best selling Item</p>
          <div className="flex items-center  text-gray-600 "style={{fontSize:'14px'}}>
            <span className="text-grey-500  text-[20px]" >{"★".repeat(product.ratings)}</span>
            <span className="text-gray-500 text-[20px] ml-1">
              {"☆".repeat(5 - product.ratings)}
            </span>
            <span className="ml-2">{product.reviews.toLocaleString()}</span>
          </div>
          </div>
          
        </div>
        
      ))}


    </div>
  );
}