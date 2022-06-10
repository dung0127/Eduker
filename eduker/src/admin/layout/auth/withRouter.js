import React from "react";
import { createBrowserHistory } from "history";
import {useNavigate, useParams} from 'react-router-dom'

export const withRouter = (Component) => {

    const Wrapper = (props) => {
        const navigate = useNavigate();
        return (
            <Component navigate = {navigate}
            {...props}
            />
        )
        
    }
    return Wrapper;
    
}

export const withRouterParams = (Component) => {

    const Wrapper = (props) => {
        const params = useParams();
        return (
            <Component params = {params}
            {...props}
            />
        )
        
    }
    return Wrapper;
}
