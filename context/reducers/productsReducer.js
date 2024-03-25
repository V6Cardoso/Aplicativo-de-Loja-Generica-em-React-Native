const initialState = {
    products: [],
  };
  
  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case "SET_PRODUCTS_LIST":
        return {
          ...state,
          products: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  
  export default productsReducer