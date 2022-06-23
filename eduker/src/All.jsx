import React from "react";
import { Navigate} from 'react-router-dom';
import {connect} from "react-redux"
import { fetchDetailUserRequest } from "./actions/detail"
import AppAdmin from "./admin/layout/appAdmin.jsx";
import AppUser from "./user/layout/appUser.jsx";

const isLogin = localStorage.getItem("isLogin");

export const PrivateRoute = ({children}) => {
  
  if (isLogin) {
      
    return children
  }
  
  return <Navigate to="/" />
}

const isEmpty = (v) => {
  return Object.keys(v).length === 0;
}



class All extends React.Component {
  
  componentDidMount () {
    this.props.fetchDetailUserRequest()
  }
  render(){{
  console.log('koko',this.props.role)

    if(isEmpty(this.props.role) && this.props.role=="ROLE_ADMIN"){
      return (
        <AppAdmin/>)
    }
    else {
      return(
        <AppUser/>)
    }
  }
  }
}

const mapStateToProps = state => {
  return {
      auth: state.auth.token,
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
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(All)
 