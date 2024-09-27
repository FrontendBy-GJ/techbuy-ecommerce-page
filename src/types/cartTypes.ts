export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  total: number;
};

export type CartAction = {
  type:
    | 'INCREMENT'
    | 'DECREMENT'
    | 'ADD_TO_CART'
    | 'REMOVE_FROM_CART'
    | 'CLEAR_CART'
    | 'SET_QUANTITY';
  payload: {
    id: string;
    quantity?: number;
    name?: string;
    price?: number;
  };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  specifications: Specifications;
  reviews: Review[];
  related_products: RelatedProduct[];
};

export type Specifications = {
  processor: string;
  memory: string;
  storage: string;
  display: string;
  graphics: string;
  battery_life: string;
  dimensions: string;
  weight: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  timestamp: string;
};

export type RelatedProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
};
