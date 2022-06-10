import { LESSON_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import { courseByIdRequest } from "./course";
import $ from "jquery"

// export const fetchLessonByIdCourseRequest = (id) => {
//     return(dispatch) => {
//         axios.get(LESSON_API_BASE_URL+'/'+id,{ headers: authHeader() }).then((res) => {
//             dispatch(getLessonById(res.data.data))
//         })
//     }
// }

// export const getLessonByIdCourese = (lesson) => {
//     return {
//         type:'GET_LESSON_BY_ID',
//         lesson
//     }
// }

export const fetchLessonByIdRequest = (id) => {
    return(dispatch) => {
        axios.get(LESSON_API_BASE_URL+'/'+id,{ headers: authHeader() }).then((res) => {
            dispatch(getLessonById(res.data.data))
        })
    }
}

export const getLessonById = (lesson) => {
    return {
        type:'GET_LESSON_BY_ID',
        lesson
    }
}

export const updateLessonRequest = (edit, courseId) => {
    return(dispatch) => {
        axios.post(LESSON_API_BASE_URL + '/update', edit , { headers: authHeader() })
            .then(res=>{
            dispatch(updateLesson(res.data.message)) 
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId))
        })
    }
}

export const updateLesson = (messageSuccess) => {
    return {
        type:'UPDATE_LESSON',
        messageSuccess
    }
}

export const createLessonRequest = (add, courseId) => {
    return(dispatch) => {
        axios.post(LESSON_API_BASE_URL + '/create', add , { headers: authHeader() }).then(res=>{
            dispatch(createLesson(res.data.message)) 
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId))
        })
    }
}

export const createLesson = (messageSuccess) => {
    return {
        type:'CREATE_LESSON',
        messageSuccess
    }
}

export   const deleteLessonRequest = (id, courseId) => {
    return (dispatch) => {
            axios.delete(LESSON_API_BASE_URL + '/delete/'+ id , { headers: authHeader() }).then(res=>{
            dispatch(deleteLesson(res.data.message))
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId))
        })
         
    }
}

export const deleteLesson = (messageSuccess) => {
    return {
        type:'DELETE_LESSON',
        messageSuccess
    }
}

export const fetchLessonByCourseIdRequest = (id) => {
    return(dispatch) => {
        axios.get('http://localhost:8080/api/course/'+id+'/lessons',{ headers: authHeader() }).then((res) => {
            dispatch(getLessonByCourseId(res.data.data))
        })
    }
}

export const getLessonByCourseId = (lessons) => {
    return {
        type:'GET_LESSON_BY_COURSE_ID',
        lessons
    }
}