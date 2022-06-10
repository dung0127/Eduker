
const initState = {
    deleteSuccess:false,
    cancelSuccess:false,
}


export const alertReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ALERT_DELETE':
            {
                return {
                    ...state,
                    deleteSuccess: true,
                }
            }

        case 'ALERT_CANCEL':
            {
                return {
                    ...state,
                    cancelSuccess:true,
                }
            }

       
        default:
            {
                return {...state };
            }
    }
}