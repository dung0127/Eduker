import React from "react";
import { fetchDetailUserRequest} from "../../actions/detail"
import {loginRequest} from "../../actions/auth"
import {connect} from 'react-redux'
import HeaderUser from "./headerUser.jsx";
import HeaderGuest from "./headerGuest.jsx";
import loadjs from "loadjs";
import HeaderAdmin from "../../admin/layout/headerAdmin.jsx";

const isEmpty = (v) => {
return Object.keys(v).length === 0;
}

class Header extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        loadjs('https://unpkg.com/swiper@8/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
        this.props.fetchDetailUserRequest()
    }

    render() {
        
        if (!isEmpty(this.props.user)) {
            if(localStorage.getItem("role")=='ROLE_ADMIN')
                return <HeaderAdmin/>
            else 
                return <HeaderUser/>
        }
        if (isEmpty(this.props.user)) {
            return <HeaderGuest/>
        }
    } 
};

const mapStateToProps = state => {
    return {        
        username: state.auth.username,
        token: state.auth.token,
        role: state.auth.role,
        user: state.detail.user,
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
        subCatalog: state.subCatalog.subCatalog
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        loginRequest:(e) => dispatch (loginRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)