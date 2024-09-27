import useCartModalContext from '../hooks/useCartModalContext';

export default function Header() {
  const { setIsCartModalOpen } = useCartModalContext();
  return (
    <header>
      <p>Header</p>
      <button onClick={() => setIsCartModalOpen(true)}>Open Cart</button>
    </header>
  );
}
