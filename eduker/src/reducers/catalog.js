
const initState = {
    catalogs:[],
    createSuccess: false,
    updateSuccess: false,
};

export const catalogReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_CATALOG':
            {
                return {
                    ...state,
                    catalogs: action.catalogs
                }
            }

        case 'SEARCH_CATALOG':
            {
                return {
                    ...state,
                    catalogs: action.catalogs
                }
            }

        case 'CREATE_CATALOG':
            {
                return {
                    ...state,
                    createSuccess: true
                }
            }
        
        case 'UPDATE_CATALOG':
            {
                return {
                    ...state,
                    updateSuccess: true
                }
            }

        default:
            {
                return {...state };
            }
    }
}