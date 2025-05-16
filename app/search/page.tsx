import Grid from 'components/grid';
import ProductGrid from 'components/grid/product-grid';
import { defaultSort, sorting } from 'lib/constants';
import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';
   
  const formattedProducts = products.map((item: any, index: number) => ({
    id: index + 1,
    title: item.title,
    handle: item.handle,
    discountPrice: parseFloat(item.priceRange.minVariantPrice.amount),
    price: parseFloat(item.priceRange.maxVariantPrice.amount),
    image: item.featuredImage?.url || '',
    tag: item.tags.includes("Mother's Day") ? "Mother's Day" : undefined,
    badge: item.tags.includes("Local") ? "Local" : undefined,
    ratings: 5,
    reviews: Math.floor(Math.random() * 200),
  }))
 
  return (
    <>
      {searchValue ? (
        <p className="mb-4 mt-4 text-black">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing results for  ${searchValue}  `}
          <span className="font-bold">{`Search instead for `}{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="">
          <ProductGrid products={formattedProducts} />
        </Grid>
      ) : null}
    </>
  );
}
