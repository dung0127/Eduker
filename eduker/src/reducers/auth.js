const initState = {
    token: '',
    username: '',
    role: '',
    loginSuccess: false
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN':
            {
                return {
                    ...state,
                    token: action.token,
                    username: action.username,
                    role: action.role,
                    loginSuccess: true
                }
            }
        case 'LOGOUT':
            {
                return {
                    ...state,
                    token: null,
                    username: null,
                    role: null
                }
            }
            
        default:
            {
                return {...state };
            }
    }
}