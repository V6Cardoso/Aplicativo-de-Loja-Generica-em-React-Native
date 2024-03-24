export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product.id,
  };
};

export const updateQuantity = (product) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: product,
  };
}
