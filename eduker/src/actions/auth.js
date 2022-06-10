// export const login = (username, token, role) => {
//     return {
//         type: 'LOGIN',
//         username,
//         token,
//         role
//     }
// }
import loadjs from 'loadjs'; 
import {LOGIN_BASE_URL} from '../config/env';
import axios from 'axios';
export const logout = () => {
    return {
        type: 'LOGOUT'
    }
} 


export const loginRequest = (user) => {
    return(dispatch) => {
        axios.post(LOGIN_BASE_URL,user).then((res) => {
            dispatch(login((res.data.data.username,res.data.data.token,res.data.data.roles)))
        })
    }
}

export const login = (username, token, role) => {
    return {
                type: 'LOGIN',
                username,
                token,
                role
            }
}