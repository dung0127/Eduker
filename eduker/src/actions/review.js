import { COURSE_INFO_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import $ from "jquery"
import { courseByIdRequest } from "./course";

export const fetchAllReviewRequest = () => {
    return(dispatch) => {
        axios.get('http://localhost:8080/api/reviews',{ headers: authHeader() }).then((res) => {
            dispatch(getAllReview(res.data.data))
        })
    }
}

export const getAllReview = (courses) => {
    return {
        type:'GET_ALL_REVIEW',
        courses
    }
}

export const fetchCreateReviewRequest = (add, id) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/api/review/create',add,{ headers: authHeader() }).then((res) => {
            dispatch(createReview(res.data.message))
            $('#review').fadeIn('fast').delay(1000).fadeOut('slow');
            dispatch(courseByIdRequest(id))
        })
    }
}

export const createReview = (reviewSuccess) => {
    return {
        type:'CREATE_REVIEW',
        reviewSuccess
    }
}

export const fetchDeleteReviewRequest = (id, courseId) => {
    return (dispatch) => {
        axios.get('http://localhost:8080/api/review/delete/'+id,{ headers: authHeader() }).then((res) => {
            dispatch(deleteReview(res.data.data))
            $('#review').fadeIn('fast').delay(1000).fadeOut('slow');
            dispatch(courseByIdRequest(courseId))
        })
    }
}

export const deleteReview = (reviewSuccess) => {
    return {
        type:'DELETE_REVIEW',
        reviewSuccess
    }
}

export const fetchUpdateReviewRequest = (edit, id) => {
    return (dispatch) => {
        axios.post('http://localhost:8080/api/review/update', edit,{ headers: authHeader() }).then((res) => {
            dispatch(updateReview(res.data.message))
            $('#review').fadeIn('fast').delay(1000).fadeOut('slow');
            dispatch(courseByIdRequest(id))
        })
    }
}

export const updateReview = (reviewSuccess) => {
    return {
        type:'UPDATE_REVIEW',
        reviewSuccess
    }
}





