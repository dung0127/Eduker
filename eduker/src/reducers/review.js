const initState = {
    reviews: [],
    reviewSuccess:''
};

export const reviewReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_REVIEW':
            {
                return {
                    ...state,
                    reviews: action.reviews
                }
            }

        case 'CREATE_REVIEW':
            {
                return {
                    ...state,
                    reviewSuccess: action.reviewSuccess
                }
            }

        case 'UPDATE_REVIEW':
            {
                return {
                    ...state,
                    reviewSuccess: action.reviewSuccess
                }
            }

        case 'DELETE_REVIEW':
            {
                return {
                    ...state,
                    reviewSuccess: action.reviewSuccess
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