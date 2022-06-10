import {USER_API_BASE_URL,USER_INFO_API_BASE_URL} from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";

export const fetchUserRequest = (page) => {
    return(dispatch) => {
        axios.get(USER_API_BASE_URL +'/?pageNumber='+ page, { headers: authHeader() }).then((res) => {
            dispatch(getAllUser(res.data.data.content,res.data.data.pageable.pageNumber,res.data.data.totalPages))
        })
    }
}

export const getAllUser = (users, page, totalPages) => {
    return {
        type:'GET_ALL_USER',
        users,
        page,
        totalPages
    }
}

export const deleteUserRequest = (id) => {
    return(dispatch) => {
        axios.delete('http://localhost:8080/api/admin/user/delete/' + id, { headers: authHeader() }).then((res) => {
            dispatch(deleteUser(res.data.message))
            
            dispatch(fetchUserRequest(0))
        })
    }
}

export const deleteUser = (alertMess) => {
    return {
        type:'DELETE_USER',
        alertMess
    }
}

export const searchUserRequest = (search) => {
    return(dispatch) => {
        axios.get(USER_INFO_API_BASE_URL+'/search?username='+search, { headers: authHeader() }).then((res) => {
            dispatch(searchUser(res.data.data.content,res.data.data.pageable.pageNumber,res.data.data.totalPages))
        })
    }
}

export const searchUser = (users, page, totalPages) => {
    return {
        type:'SEARCH_USER',
        users,
        page,
        totalPages
    }
}

export const getUserByIdRequest = (id) => {
    return(dispatch) => {
        axios.get('http://localhost:8080/api/user/' + id, { headers: authHeader() }).then((res) => {
            dispatch(getUserById(res.data.data))
        })
    }
}

export const getUserById = (userById) => {
    return {
        type:'GET_USER_BY_ID',
        userById
    }
}

export const editUserByIdRequest = (edit) => {
    return(dispatch) => {
        axios.post('http://localhost:8080/api/admin/user/update',edit, { headers: authHeader() }).then((res) => {
            dispatch(editUserById(res.data.data))
        })
    }
}

export const editUserById = (userById) => {
    return {
        type:'EDIT_USER_BY_ID',
        userById
    }
}