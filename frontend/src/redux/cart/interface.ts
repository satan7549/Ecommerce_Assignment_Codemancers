// Define interfaces for CartState, AddToCartItem, and FetchedCartItem
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  product: Product;
  count: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface AddToCartItem {
  id: string;
  count: number;
}

export interface FetchedCartItem {
  product: Product;
  quantity: number;
  id: string;
}
