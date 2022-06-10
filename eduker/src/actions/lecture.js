import { LECTURE_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import { courseByIdRequest } from "./course";
import $ from "jquery"
import { fetchLessonByCourseIdRequest } from "./lesson";

export const fetchLectureByIdRequest = (id) => {
    return(dispatch) => {
        axios.get(LECTURE_API_BASE_URL+'/'+id,{ headers: authHeader() }).then((res) => {
            dispatch(getLectureById(res.data.data))
        })
    }
}
 
export const getLectureById = (lecture) => {
    return {
        type:'GET_LECTURE_BY_ID',
        lecture
    }
}

export const updateLectureRequest = (edit, courseId) => {
    return(dispatch) => {
        axios.post(LECTURE_API_BASE_URL + '/update', edit , { headers: authHeader() }).then(res=>{
            dispatch(updateLecture(res.data.message)) 
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId))
        })
    }
}

export const updateLecture = (messageSuccess) => {
    return {
        type:'UPDATE_LECTURE',
        messageSuccess,
    }
}

export const createLectureRequest = (add, courseId) => {
    return(dispatch) => {
        axios.post(LECTURE_API_BASE_URL + '/create', add , { headers: authHeader() }).then(res=>{
            dispatch(createLecture(res.data.message))
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId)) 
        })
    }
}

export const createLecture = (messageSuccess) => {
    return {
        type:'CREATE_LECTURE',
        messageSuccess
    }
}

export const deleteLectureRequest = (id,courseId) => {
    return(dispatch) => {
        axios.delete(LECTURE_API_BASE_URL + '/delete/'+ id , { headers: authHeader() }).then(res=>{
            dispatch(deleteLecture(res.data.message))
            $('#success').fadeIn('fast').delay(3000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId)) 
            
        })
    }
}

export const deleteLecture = (messageSuccess) => {
    return {
        type:'DELETE_LECTURE',
        messageSuccess
    }
}

