'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { GridTileImage } from 'components/grid/tile';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <form>
  
      <div className="flex w-full items-center justify-center gap-8 overflow-auto py-1 lg:mb-0">
      {images.length > 1 ? (
        <ul className="hidden lg:block items-center  py-1 lg:mb-0">
          {images.map((image, index) => {
            const isActive = index === imageIndex;

            return (
              <li key={image.src} className="h-25 w-25 mb-2">
                <button
                  formAction={() => {
                    const newState = updateImage(index.toString());
                    updateURL(newState);
                  }}
                  aria-label="Select product image"
                  className="h-full w-full mb-2"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
       <div className="relative aspect-square  max-h-[550px] w-[550px] overflow-hidden " style={{borderRadius: '20px'}}>
        {images[imageIndex] && (
          <Image
            className=" object-contain "
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}
{images.length > 1 && (
  <>
    {/* Left Arrow - top-left (only visible on mobile) */}
    <div className="absolute top-4 left-4 z-10 block md:hidden lg:hidden">
      <button
        formAction={() => {
          const newState = updateImage(previousImageIndex.toString());
          updateURL(newState);
        }}
        aria-label="Previous product image"
        className="rounded-full p-2 bg-white/80 dark:bg-black/60 border border-gray-300 dark:border-gray-700 backdrop-blur-md"
      >
        <ArrowLeftIcon className="h-5 w-5 text-black dark:text-white" />
      </button>
    </div>

    {/* Right Arrow - top-right (only visible on mobile) */}
    <div className="absolute top-4 right-4 z-10 block md:hidden lg:hidden">
      <button
        formAction={() => {
          const newState = updateImage(nextImageIndex.toString());
          updateURL(newState);
        }}
        aria-label="Next product image"
        className="rounded-full p-2 bg-white/80 dark:bg-black/60 border border-gray-300 dark:border-gray-700 backdrop-blur-md"
      >
        <ArrowRightIcon className="h-5 w-5 text-black dark:text-white" />
      </button>
    </div>

    {/* Image Count - bottom-right (only visible on mobile) */}
    <div className="absolute bottom-4 right-4 z-10 block md:hidden lg:hidden">
      <div className="text-xs sm:text-sm text-black dark:text-white bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700">
        {imageIndex + 1} / {images.length}
      </div>
    </div>
  </>
)}

        {/* {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
              <button
                formAction={() => {
                  const newState = updateImage(previousImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Previous product image"
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <div className="text-sm text-black dark:text-white bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700">
      {imageIndex + 1} / {images.length}
    </div>
              <button
                formAction={() => {
                  const newState = updateImage(nextImageIndex.toString());
                  updateURL(newState);
                }}
                aria-label="Next product image"
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null} */}
      </div>
     


      </div>
    </form>
  );
}
