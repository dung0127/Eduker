const initState = {
    users: [],
    page: 0,
    totalPages: 0,
    addSuccess: false,
    deteleSuccess: false,
    userById: {},
    alertMess:'',
};
 
export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_USER':
            {
                return {
                    ...state,
                    users: action.users,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }
            
        case 'ADD_USER':
            {
                return {
                    ...state,
                    addSuccess: true
                }
            }   

        case 'DELETE_USER':
            {
                return {
                    ...state,
                    deleteSuccess: true,
                    alertMess: action.alertMess
                }
            }

        case 'SEARCH_USER':
            {
                return {
                    ...state,
                    users: action.users,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }

        case 'GET_USER_BY_ID':
            {
                return {
                    ...state,
                    userById: action.userById,
                    
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