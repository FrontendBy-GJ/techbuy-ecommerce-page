import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }

  return context;
}
