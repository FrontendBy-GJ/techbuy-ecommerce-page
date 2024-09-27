import { useContext } from 'react';
import { CartModalContext } from '../context/CartModalContext';

export default function useCartModalContext() {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error(
      'useCartModalContext must be used within CartModalProvider'
    );
  }

  return context;
}
