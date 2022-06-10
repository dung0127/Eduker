
const initState = {
    orders: [],
    messageSuccess: '',
    page: 0,
    totalPages: 0,
    order: {},
    ordersSearch: []
};

export const paymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'PAYMENT':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }

        case 'GET_ALL_ORDER':
            {
                return {
                    ...state,
                    orders: action.orders,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }

        case 'GET_ORDER_BY_ID':
            {
                return {
                    ...state,
                    order: action.order
                }
            }

        case 'SEARCH_ORDER':
            {
                return {
                    ...state,
                    orders: action.orders,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }

        default:
            {
                return { ...state };
            }
    }
}