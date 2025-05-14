'use client';

import clsx from 'clsx';
import { useProduct, useUpdateURL } from 'components/product/product-context';
import { ProductOption, ProductVariant } from 'lib/shopify/types';

type Combination = {
  id: string;
  availableForSale: boolean;
  imageUrl: string;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);
  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    imageUrl: variant.image?.url || '', 
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }),
      {}
    )
  }));
 

  return options.map((option) => (
    <form key={option.id}>
      <dl className="mb-8">
        <dt className="mb-4 text-[18px] md:text-[20px] tracking-wide text-black">{option.name}:<span className="font-normal ml-2 normal-case">{state[option.name.toLowerCase()]}</span></dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();

            // Base option params on current selectedOptions so we can preserve any other param state.
            const optionParams = { ...state, [optionNameLowerCase]: value };

            // Filter out invalid options and check if the option combination is available for sale.
            const filtered = Object.entries(optionParams).filter(([key, value]) =>
              options.find(
                (option) => option.name.toLowerCase() === key && option.values.includes(value)
              )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) => combination[key] === value && combination.availableForSale
              )
            );
            const matchingCombination = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            const imageUrl = matchingCombination?.imageUrl;
            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                className={clsx(
                  'flex flex-col items-center  justify-between rounded-lg border border-gray-300 bg-white text-black shadow-sm',
                  {
                    'ring-1 ring-red-600 border-red-600': isActive,
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-red-600 border-#00000033-600':
                      !isActive && isAvailableForSale,
                    'cursor-not-allowed bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300':
                      !isAvailableForSale,
                      'w-20 h-12 ': optionNameLowerCase === 'size',
                      'w-30 h-40': optionNameLowerCase === 'color',
                  }
                )}
              >
                {optionNameLowerCase === 'color' && imageUrl && (
                  <img
                    src={imageUrl}
                    alt={value}
                    className=" w-full object-cover rounded-t-md"
                  />
                )}
                <span className="text-sm font-medium text-center ">{value}</span>
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
