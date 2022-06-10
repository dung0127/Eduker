
const initState = {
    items:[],
}


export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_NUMBER_CART':
            {
                return {
                    ...state,
                }
            }

        case 'ADD_TO_CART':
            {
                return { 
                    ...state, 
                    items: action.payload.cartItems 
                };
            }

        case 'REMOVE_FROM_CART':
            {
                return { 
                    ...state, 
                    items: action.payload.cartItems 
                };
            }
            
        case 'CLEAR_FROM_CART':
            return { ...state, items: []};
        
        default:
            {
                return {...state };
            }
    }
}