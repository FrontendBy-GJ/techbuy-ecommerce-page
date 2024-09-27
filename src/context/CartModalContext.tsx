import { createContext, ReactNode, useState } from 'react';

export const CartModalContext = createContext<{
  isCartModalOpen: boolean;
  setIsCartModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export function CartModalProvider({ children }: { children: ReactNode }) {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  return (
    <CartModalContext.Provider value={{ isCartModalOpen, setIsCartModalOpen }}>
      {children}
    </CartModalContext.Provider>
  );
}
