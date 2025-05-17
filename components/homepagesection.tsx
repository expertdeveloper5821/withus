'use client';
import { CheckIcon } from '@heroicons/react/20/solid';
import FeatureScroller from 'components/FeatureScroller';
import ProductGrid from 'components/grid/product-grid';
import GreenBanner from 'components/layout/green-banner';
import LightningDeals from 'components/lightning-deals';
import { allIconList } from 'config/security-config';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const HomePageSection = ({lan ,  translations}:{lan:string,   translations: Record<string, any>}) => {
  const [productCollections, setProductCollections] = useState<any>([]);
  const [homepageItems, setHomepageItems] = useState<any>([]);
  const [collectionHandle, setCollectionHandle] = useState<any>("best-sellers");
  const [Items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGridLoading, setIsGridLoading] = useState<boolean>(false);
      

  const fetchCollectionProducts = async (handle: string) => {
 
    try {
      setIsGridLoading(true);
      const response = await fetch(`/api/collections/products?collection=${handle}&language=${lan || 'en'}`);
      if (!response.ok) throw new Error(`Failed to fetch collection: ${handle}`);
      const products = await response.json();
      setHomepageItems(products);
      setIsGridLoading(false);
    } catch (error) {
      console.error(`Error fetching ${handle} products:`, error);
      setError('Failed to load collection products');
      setIsGridLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch collections
        const collectionsResponse = await fetch(`/api/collections?language=${lan || 'en'}`);
        if (!collectionsResponse.ok) throw new Error('Failed to fetch collections');
        const collections = await collectionsResponse.json();
        setProductCollections(collections);

        // Fetch collection products based on selected handle
        await fetchCollectionProducts(collectionHandle);

        // Fetch kitchen products
        const kitchenResponse = await fetch(`/api/collections/products?collection=Kitchen`);
        if (!kitchenResponse.ok) throw new Error('Failed to fetch kitchen products');
        const kitchenProducts = await kitchenResponse.json();
        setItems(kitchenProducts);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching collections or products:', error);
        setError('Failed to load data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lan]);
  useEffect(() => {
    if (productCollections.length > 0) {
      fetchCollectionProducts(collectionHandle);
    }
  }, [collectionHandle, productCollections.length, lan]);

  const formattedProducts = homepageItems.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("Mother's Day") ? "Mother's Day" : undefined,
    badge: item.tags.includes("Local") ? "Local" : undefined,
    ratings: 4,
    reviews: Math.floor(Math.random() * 200),
  }));

  const products = Items.slice(0, 7).map((item: any, index: number) => ({
    id: index + 1,
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || "",
  }));

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const handleDescriptionSelect = (description: string) => {
    const collectionToShow = description?.trim() ? description : "best-sellers";
    setCollectionHandle(collectionToShow);
  };
  
  return (
    <div className=" bg-gray-50 pt-4 md:pt-9 ">
      <div className="block sm:hidden bg-red-100 rounded-lg  px-4 py-2 flex justify-between items-center max-w-xl mx-4 mb-4">
        <div className="flex items-start space-x-2 ">
          <CheckIcon className="w-5 h-5 text-green-600 mt-1" />
          <div>
            <div className="text-green-600 font-semibold text-[13.89px]">{translations.common.banners?.freeShipping || "Free Shipping"}</div>
            <div className="text-gray-500 text-[11.89px]">{translations.common.banners?.limitedOffer || "Limited Offer"}</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 border-l border-gray-400 mx-4" />

        {/* Delivery Guarantee */}
        <div className="flex items-start space-x-2 ">
          <Image src={allIconList.DeliveryBlackIcon} alt={'truck'}  />
          <div>
            <div className="text-black font-semibold text-[13.89px]">{translations.common.banners?.deliveryGuarantee || "Delivery guarantee"}</div>
            <div className="text-gray-500 text-[11.89px]">Refund of any issue</div>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-[20px] lg:px-[69px]">
        <GreenBanner
          title= {translations.common.cart?.WhyBiBiShop || "Why choose BiBi Shop"}
          items={[
            { icon: allIconList.LockIcon, text:translations.common.security?.securePrivacy || "Secure privacy" },
            { icon: allIconList.Safe, text: translations.common.security?.safePayments || "Safe payments" },
            { icon: allIconList.DeliveryIcon, text:  translations.common.security?.deliveryGuarantee || "Delivery guarantee" },
          ]}
          reminder={translations.common?.reminder ||" Please be wary of scam messages and links. BiBi Shop won't ask for extra fees via SMS or email."}
          linkText={translations.common?.viewAll || "View All"}
        />
        <LightningDeals products={products} />
      </div>

      <header className="text-center py-1 md:py-4 ">
        <h1 className="text-xl font-bold text-red-500  text-[15px] md:text-[24px]">
          <div className="flex justify-center items-center">
            <Image
              src={allIconList.Star}
              alt="Lightning Icon"
              width={26}
              height={26}
              className="h-12 mr-2"
            />{translations.common?.holidaySale || 'MEGA HOLIDAY SALE'}
            
            <Image
              src={allIconList.Star}
              alt="Lightning Icon"
              width={26}
              height={26}
              className="h-12 ml-2"
            />
          </div>
        </h1>

        <h2 className=" text-black text-[18px] md:text-[28px] mt-[-10px] md:mt-[0px] font-extrabold ">
         {translations.common?.exploreInterests || `EXPLORE YOUR INTERESTS`}
        </h2>
      </header>
      <div className="pl-4 md:pl-[20px] lg:pl-[69px] ">
        <div className="flex items-center pt-0 md:pt-3 pb-8 sm:pb-13">
          <FeatureScroller  onDescriptionSelect={handleDescriptionSelect} items={productCollections.map((col:any) => ({title: col.title, description:col.handle}))} showArrow={false} mainScollClassName="flex gap-2 overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden scrollbar-hide scroll-smooth mt-2 md:ml-6 pr-10 w-[90%]" itemClassName="border border-[#00000080] rounded-[40px]  px-[15px] sm:px-[35px] py-[7px] sm:py-[14px] font-normal text-[18px] leading-[1.5]  whitespace-nowrap text-black"/>
        </div>
      </div>
      <div className="px-4 sm:px-6 md:px-[20px] lg:px-[69px] ">
        {isGridLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ProductGrid products={formattedProducts} />
        )}
      </div>
    </div>
  );
};

export default HomePageSection;