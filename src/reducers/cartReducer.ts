import { CartAction, CartState } from '../types/cartTypes';
import {
  INCREMENT,
  DECREMENT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_QUANTITY,
  CLEAR_CART,
} from '../reducers/actionTypes';

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case SET_QUANTITY: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: action.payload.quantity || item.quantity || 1,
                }
              : item
          ),
          total: state.items.reduce(
            (acc, item) =>
              item.id === action.payload.id
                ? acc + (action.payload.quantity || item.quantity) * item.price
                : acc + item.quantity * item.price,
            0
          ),
        };
      }
      return state;
    }

    case INCREMENT: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        total: state.total + (action.payload.price || 0),
      };
    }

    case DECREMENT: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          total: state.total - (action.payload.price || 0),
        };
      } else {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          total: state.total - (action.payload.price || 0),
        };
      }
    }

    case ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Item already in the cart, increment quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + (action.payload.quantity || 1),
                }
              : item
          ),
          total:
            state.total +
            (action.payload.quantity || 1) * (action.payload.price || 0),
        };
      } else {
        // If the item is not in the cart, add it
        return {
          ...state,
          items: [
            ...state.items,
            {
              id: action.payload.id,
              name: action.payload.name || '',
              price: action.payload.price || 0,
              quantity: action.payload.quantity || 1,
            },
          ],
          total:
            state.total +
            (action.payload.quantity || 1) * (action.payload.price || 0),
        };
      }
    }

    case REMOVE_FROM_CART: {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          total: state.total - itemToRemove.price * itemToRemove.quantity,
        };
      }
      return state;
    }

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
