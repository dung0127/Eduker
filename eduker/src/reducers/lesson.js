
const initState = {
    lesson:{},
    messageSuccess:'',
    lessons:[],
};

export const lessonReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_LESSON_BY_ID':
            {
                return {
                    ...state,
                    lesson: action.lesson
                }
            }

        case 'GET_LESSON_BY_COURSE_ID':
            {
                return {
                    ...state,
                    lessons: action.lessons
                }
            }

        case 'UPDATE_LESSON':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }

        case 'CREATE_LESSON':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }
            
        case 'DELETE_LESSON':
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