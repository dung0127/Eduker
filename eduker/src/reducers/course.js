const initState = {
    courses: [],
    courseIndex: [],
    courseTop: [],
    page: 0,
    totalPages: 0,
    pageSearch: 0,
    totalPagesSearch: 0,
    addSuccess: false,
    deteleSuccess: false,
    courseById:[],
    coursesByDraft:[],
    pageDraft: 0,
    totalPagesDraft: 0,
    coursesByActivate:[],
    pageActivate: 0,
    totalPagesActivate: 0,
    messageSuccess:'',
    coursesEnroll:[],
    courseSearch:[],
    img:'',
};

export const courseReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_ALL_COURSE':
            {
                return {
                    ...state,
                    courses: action.courses,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }

        case 'GET_INDEX_COURSE':
            {
                return {
                    ...state,
                    coursesIndex: action.coursesIndex
                }
            }

        case 'GET_TOP_COURSE':
            {
                return {
                    ...state,
                    coursesTop: action.coursesTop
                }
            }

        case 'SEARCH_COURSE':
            {
                return {
                    ...state,
                    coursesSearch: action.coursesSearch,
                    pageSearch: action.pageSearch,
                    totalPagesSearch: action.totalPagesSearch
                }
            }

        case 'SEARCH_COURSE_AD':
            {
                return {
                    ...state,
                    courses: action.courses,
                    page: action.page,
                    totalPages: action.totalPages
                }
            }

        case 'COURSE_BY_ID':
            {
                return {
                    ...state,
                    courseById: action.courseById
                }
            } 

        case 'DELETE_COURSE':
            {
                return {
                    ...state,
                    messageSuccess:action.messageSuccess
                }
            }
            
        case 'GET_COURSE_BY_DRAFT':
            {
                return {
                    ...state,
                    coursesByDraft: action.coursesByDraft,
                    pageDraft: action.pageDraft,
                    totalPagesDraft: action.totalPagesDraft
                }
            } 

        case 'GET_COURSE_BY_ACTIVATE':
            {
                return {
                    ...state,
                    coursesByActivate: action.coursesByActivate,
                    pageActivate: action.pageActivate,
                    totalPagesActivate: action.totalPagesActivate
                }
            } 

        case 'UPDATE_COURSE':
            {
                return {
                    ...state,
                    messageSuccess: action.messageSuccess
                }
            }

        case 'GET_ALL_ENROLL':
            {
                return {
                    ...state,
                    coursesEnroll: action.coursesEnroll
                }
            }

        case 'IMAGE':
            {
                return {
                    ...state,
                    img: action.img
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