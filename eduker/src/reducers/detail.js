const initState = {
    user: {},
    detailInfo:{},
    updateSuccess: false
};

export const detailReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DETAIL_USER':
            {
                return {
                    ...state,
                    user: action.user
                }
            }

        case 'GET_DETAIL_INFO':
            {
                return {
                    ...state,
                    detailInfo: action.detailInfo 
                }
            }

        case 'UPDATE_DETAIL':
            {
                return {
                    ...state,
                    updateSuccess: true
                }
            }

        default:
            {
                return {
                    ...state
                }
            }
    }
}