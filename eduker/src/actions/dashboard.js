import { LECTURE_API_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import $ from "jquery"

export const fetchDashboardRequest = (id) => {
    return(dispatch) => {
        axios.get('http://localhost:8080/api/admin/dashboard',{ headers: authHeader() }).then((res) => {
            dispatch(getDashboard(res.data.data))
        })
    }
}
 
export const getDashboard = (dashboard) => {
    return {
        type:'GET_DASHBOARD',
        dashboard
    }
}
