import { USER_INFO_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";

export const fetchDetailUserRequest = () => {
    return(dispatch) => {
        axios.get(USER_INFO_API_BASE_URL+'/user-information', { headers: authHeader() }).then((res) => {
            dispatch(getDetailUser(res.data.data)) 
        })
    }
}

export const getDetailUser = (user) => {
    return {
        type:'GET_DETAIL_USER',
        user
    }
}

export const getDetailInfo = (detailInfo) => {
    return {
        type: 'GET_DETAIL_INFO',
        detailInfo
    }
}

export const updateDetail = (updateSuccess) => {
    return {
        type: 'UPDATE_DETAIL',
        updateSuccess
    }
}