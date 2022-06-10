
import $ from "jquery";
import loadjs from 'loadjs';

/*GET NUMBER CART*/
export const GetNumberCart = () =>{
    return{
        type:'GET_NUMBER_CART'
    }
}
 
export const AddCart = (payload) =>{
    return {
        type:'ADD_CART',
        payload
    }
}

export const addToCart = (items, product) => (dispatch) => {
    const cartItems = items.slice();
    let productAlreadyInCart = false;
    cartItems.forEach((cp) => {
      if (cp.id === product.id) {
        // cp.count += 1;
        loadjs('/assets/default/js/cartExist.js', () => {});

        productAlreadyInCart = true;
      }
    });
  
    if (!productAlreadyInCart) {
      cartItems.push({ ...product, count: 1 });
      loadjs('/assets/default/js/cart.js', () => {});
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
    dispatch({ type: 'ADD_TO_CART', payload: { cartItems } });
  };

export const removeFromCart = (items, product) => (dispatch) => {
    const cartItems = items.slice().filter((a) => a.id !== product.id);
    loadjs('/assets/default/js/removeCart.js', () => {});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    dispatch({ type: 'REMOVE_FROM_CART', payload: { cartItems } });
};

export const clearFromCart = () => (dispatch) => {
      localStorage.setItem("cartItems", []);

      dispatch({ type: 'CLEAR_FROM_CART'});
  
};
 