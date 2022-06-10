const initState = {
    courses: [],
    savedSuccess:'',
    unsavedSuccess:'',
};

export const savedCourseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_SAVED':
            {
                return {
                    ...state,
                    courses: action.courses
                }
            }

        case 'SAVED':
            {
                return {
                    ...state,
                    savedSuccess: action.savedSuccess
                }
            }

        case 'UNSAVED':
            {
                return {
                    ...state,
                    unsavedSuccess: action.unsavedSuccess
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