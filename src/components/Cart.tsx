import { ChangeEvent, useEffect, useRef } from 'react';
import useCartContext from '../hooks/useCartContext';
import { formatToUSDCurrency } from '../utils/formatCurrency';
import useCartModalContext from '../hooks/useCartModalContext';

export default function Cart() {
  const { state, dispatch } = useCartContext();
  const { isCartModalOpen, setIsCartModalOpen } = useCartModalContext();
  const cartRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isCartModalOpen) {
      cartRef.current?.showModal();
    } else {
      cartRef.current?.close();
    }
  }, [isCartModalOpen]);

  const handleQtyChange = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    const selectedQty = Number(e.target.value);
    dispatch({
      type: 'SET_QUANTITY',
      payload: {
        id,
        quantity: selectedQty,
      },
    });
  };

  return (
    <dialog
      id="cart-modal"
      ref={cartRef}
      onClose={() => setIsCartModalOpen(false)}
    >
      <header>
        <h2>Order Summary</h2>
      </header>
      <form method="dialog">
        <hr />
        {!state.items.length ? (
          <p>Your cart is empty!</p>
        ) : (
          <div className="cart-items">
            {state.items.map(({ id, name, price, quantity }) => (
              <div className="cart-item" key={id}>
                <div>
                  <h3>{name}</h3>
                  <span>{formatToUSDCurrency(price)}</span>
                </div>
                <br />
                <div className="cart-actions">
                  <>
                    <label htmlFor={`${name}-quantity`}>
                      {' '}
                      <abbr title="Quantity">Qty</abbr>{' '}
                    </label>
                    <select
                      value={quantity}
                      name={`${name}-quantity`}
                      id={`${name}-quantity`}
                      onChange={(e) => handleQtyChange(e, id)}
                    >
                      {quantityOptions()}
                    </select>
                  </>

                  <button
                    type="button"
                    aria-label={`Remove ${name} from cart`}
                    title="Remove"
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: { id },
                      });
                    }}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <footer>
          <hr />
          <div className="cart-total">
            <span>Total: </span>
            <span>{formatToUSDCurrency(state.total)}</span>
          </div>

          {state.items.length ? (
            <>
              <button type="button" className="checkout-btn">
                Checkout
              </button>
            </>
          ) : (
            <button
              type="button"
              className="continue-shopping-btn"
              onClick={() => setIsCartModalOpen(false)}
            >
              Continue Shopping
            </button>
          )}

          <button
            aria-label="Close cart"
            title="Close"
            type="button"
            className="close-btn"
            onClick={() => setIsCartModalOpen(false)}
          >
            &times;
          </button>
        </footer>
      </form>
    </dialog>
  );
}

const quantityOptions = () => {
  let options = [];

  for (let i = 0; i < 10; i++) {
    options.push(
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    );
  }
  return options;
};
