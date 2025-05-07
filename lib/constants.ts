export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};


export const products = [
  {
    id: 1,
    title: 'Dual Cameras E99 Pro Drone',
    price: 31.23,
    originalPrice: 140.81,
    image: '/drone-placeholder.jpg',
    tag: "Mother's Day",
    rating: 4.8,
    reviews: 235,
    category: 'Drones & Flying Toys'
  },
  {
    id: 2,
    title: "Stylish Quartz Men's Watch",
    price: 16.41,
    originalPrice: 54.59,
    image: '/watch-placeholder.jpg',
    rating: 4.9,
    reviews: 260,
    category: "Men's Watches"
  },
  {
    id: 3,
    title: 'Seven-piece Capybara Pencil Case',
    price: 5.87,
    originalPrice: 19.99,
    image: '/pencilcase-placeholder.jpg',
    tag: "Mother's Day",
    rating: 4.9,
    reviews: 141,
    category: 'Storage & Organization'
  },
  {
    id: 4,
    title: 'Android 13 Smartphone',
    price: 115.23,
    originalPrice: 191.89,
    image: '/phone-placeholder.jpg',
    tag: "Mother's Day",
    badge: "Local",
    rating: 0,
    reviews: 0,
    category: 'Smartphones'
  }
];


export const reviews = [
  {
    user: "alexd",
    date: "Apr 10, 2023",
    rating: 5,
    comment: "The material is great. If you’re planning to order, consider going a size up.",
    // avatar: "/images/avatar1.png"
  },
  {
    user: "jaredt",
    date: "Mar 26, 2023",
    rating: 5,
    comment: "Fits perfectly and super soft. Highly recommend!",
   
  },
  {
    user: "natalie",
    date: "Feb 15, 2023",
    rating: 4,
    comment: "Color is nice, but slightly tighter than expected. Still comfy.",
   
  },
  {
    user: "mikep",
    date: "Jan 30, 2023",
    rating: 5,
    comment: "Love this shirt! Fabric feels premium and delivery was fast.",
  
  },
  {
    user: "lisaw",
    date: "Jan 10, 2023",
    rating: 4,
    comment: "Good quality overall. Fit is true to size for me.",
    
  }
];

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
