
const initState = {
    dashboard:''
};

export const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_DASHBOARD':
            {
                return {
                    ...state,
                    dashboard: action.dashboard
                }
            }

        default:
            {
                return {...state };
            }
    }
}