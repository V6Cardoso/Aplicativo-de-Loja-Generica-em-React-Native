const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Add to cart, if already exists, update quantity
      const item = action.payload;
      const existItem = state.cart.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.id === item.id ? { ...x, quantity: x.quantity + item.quantity } : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    
    case "UPDATE_QUANTITY":
      // Update quantity of a product in cart
      return {
        ...state,
        cart: state.cart.map((x) =>
          x.id === action.payload.id ? { ...x, quantity: action.payload.quantity } : x
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};


export default cartReducer