import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { CartAction, CartState } from '../types/cartTypes';
import cartReducer from '../reducers/cartReducer';

const initialCartState: CartState = {
  items: [],
  total: 0,
};

export const CartContext = createContext<{
  state: CartState;
  dispatch: Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
