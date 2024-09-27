import Cart from './components/Cart';
import Footer from './components/Footer';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import { CartProvider } from './context/CartContext';
import { CartModalProvider } from './context/CartModalContext';

function App() {
  return (
    <div id="app">
      <CartProvider>
        <CartModalProvider>
          <Cart />
          <Header />
          <main>
            <ProductPage />
          </main>
        </CartModalProvider>
      </CartProvider>
      <Footer />
    </div>
  );
}

export default App;
