import { COURSE_INFO_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import $ from "jquery"
import { courseByIdRequest } from "./course";

export const fetchAllSavedRequest = () => {
    return(dispatch) => {
        axios.get(COURSE_INFO_API_BASE_URL+ '/savedcourses',{ headers: authHeader() }).then((res) => {
            dispatch(getAllSaved(res.data.data))
        })
    }
}

export const getAllSaved = (courses) => {
    return {
        type:'GET_ALL_SAVED',
        courses
    }
}

export const fetchSavedRequest = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/savedcourse/save/'+id,{ headers: authHeader() }).then((res) => {
            dispatch(saved(res.data.data))
            $('#saved').fadeIn('fast').delay(1000).fadeOut('slow');
            dispatch(courseByIdRequest(id))
            dispatch(fetchAllSavedRequest())
        })
    }
}

export const saved = (savedSuccess) => {
    return {
        type:'SAVED',
        savedSuccess
    }
}

export const fetchUnsavedRequest = (id) => {
    return (dispatch) => {
            axios.get('http://localhost:8080/api/savedcourse/unsaved/'+id,{ headers: authHeader() }).then((res) => {
            dispatch(unsaved(res.data.data))
            $('#unsaved').fadeIn('fast').delay(1000).fadeOut('slow');
            dispatch(courseByIdRequest(id))
            dispatch(fetchAllSavedRequest())
            
        })
    }
}

export const unsaved = (unsavedSuccess) => {
    return {
        type:'UNSAVED',
        unsavedSuccess
    }
}