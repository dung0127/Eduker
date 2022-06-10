import { CATALOG_BASE_URL, CATALOG_INFO_BASE_URL, SUBCATALOG_BASE_URL, SUBCATALOG_INFO_BASE_URL } from "../config/env";
import authHeader from "../config/authHeader";
import axios from "axios";
import $ from "jquery"

export const fetchCatalogRequest = () => {
    return(dispatch) => {
        axios.get(CATALOG_BASE_URL, { headers: authHeader() }).then((res) => {
            dispatch(getAllCatalog(res.data.data)) 
        })
    }
}

export const getAllCatalog = (catalogs) => {
    return {
        type:'GET_ALL_CATALOG',
        catalogs
    }
}

export const searchCatalogRequest = (search) => {
    return(dispatch) => {
        axios.get(CATALOG_INFO_BASE_URL+'/search?name='+search, { headers: authHeader() }).then((res) => {
            dispatch(searchCatalog(res.data.data)) 
        });
    }
}

export const searchCatalog = (catalogs) => {
    return {
        type:'SEARCH_CATALOG',
        catalogs
    }
}

export const updateCatalogRequest = (editCatalog) => {
    return(dispatch) => {
        axios.post(CATALOG_INFO_BASE_URL + '/update', editCatalog , { headers: authHeader() }).then(res=>{
            dispatch(updateCatalog()) 
            $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
            dispatch(fetchCatalogRequest())
        })
    }
}

export const updateCatalog = () => {
    return {
        type:'UPDATE_CATALOG'
    }
}

export const createCatalogRequest = (addCatalog) => {
    return(dispatch) => {
        axios.post(CATALOG_INFO_BASE_URL + '/create', addCatalog , { headers: authHeader() }).then(res=>{
            alert(res.data.message)
            dispatch(createCatalog()) 
            dispatch(fetchCatalogRequest())
        })
    }
}
 
export const createCatalog = () => {
    return {
        type:'CREATE_CATALOG'
    }
}

