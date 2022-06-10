
const initState = {
    lecture:{},
    messageSuccess:'',
};

export const lectureReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_LECTURE_BY_ID':
            {
                return {
                    ...state,
                    lecture: action.lecture
                }
            }

        case 'UPDATE_LECTURE':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }

        case 'CREATE_LECTURE':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }

        case 'DELETE_LECTURE':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }
        
        default:
            {
                return {...state };
            }
    }
}