import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect} from 'react-router-dom';
import DashBoard from "../dashboard/dashboard.jsx"
import {connect} from "react-redux"
import MainUser from "../../user/layout/mainUser.jsx";
import CourseInfo from "../course/courseInfo.jsx";
import CourseAdd from "../course/courseAdd.jsx";
import { fetchDetailUserRequest } from "../../actions/detail.js";
import ChangePassword from "../../user/profile/changePassword.jsx";
import DetailUser from "../../user/profile/detailUser.jsx";
import DetailEdit from "../../user/profile/detailEdit.jsx";
import CourseBySubCatalog from "../../user/course/courseBySubCatalog.jsx";
import CourseById from "../../user/course/courseById.jsx";
import Search from "../../user/course/search.jsx";
import About from "../../user/layout/about.jsx";
import Contact from "../../user/layout/contact.jsx";
import Login from "./auth/login.jsx";
import Course from "../../user/course/course.jsx";
import FooterAdmin from "./footerAdmin.jsx";
import UserInfo from "../user/userInfo.jsx";
import Catalog from "../category/catalog.jsx";
import CatalogAdd from "../category/catalogAdd.jsx";
import SubCatalog from "../category/subCatalog.jsx";
import UserEdit from "../user/userEdit.jsx";
import CourseEdit from "../course/courseEdit.jsx";
import OrderInfo from "../payment/orderInfo.jsx";
import OrderInfoDetail from "../payment/orderInfoDetail.jsx";
import Signup from "../../user/profile/signup.jsx";
import UserAdd from "../user/userAdd.jsx";
import CourseStatus from "../course/courseStatus.jsx";

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

class AppAdmin extends React.Component {
  render() {
      return (
        <>
        <Router>
                
            <Routes>    
                <Route path ="/dashboard" element = {<DashBoard/>}/> 
                <Route path ="/index" element = {<MainUser/>}/> 
                <Route path ="/course-info" element = {<CourseInfo/>}/> 
                <Route path ="/user-info" element = {<UserInfo/>}/> 
                <Route path ="/user-edit/:id" element = {<UserEdit/>}/>
                <Route path ="/course-status/:id" element = {<CourseStatus/>}/>
                <Route path="/course-add" element = {<CourseAdd/>}/>
                <Route path ="/course-edit/:id" element = {<CourseEdit/>}/>
                <Route path ="/change-password" element = {<ChangePassword/>}/> 
                <Route path ="/detail" element = {<DetailUser/>}/> 
                <Route path ="/edit-profile" element = {<DetailEdit/>}/> 
                <Route path="/courses/:name/:id" element ={<CourseBySubCatalog/>}></Route>
                <Route path="/course/:id" element ={<CourseById/>}></Route>
                <Route path="/search" element ={<Search/>}></Route>
                <Route path ="/about" element = {<About/>}/>
                <Route path ="/course" element = {<Course/>}/>
                <Route path ="/subcatalog" element = {<SubCatalog/>}/>
                <Route path ="/catalog" element = {<Catalog/>}/>
                <Route path ="/catalog-add" element = {<CatalogAdd/>}/>
                <Route path ="/contact" element = {<Contact/>}/>
                {isEmpty(this.props.user)?<Route path ="/login" element = {<Login/>}/>:<Route path ="/login" element = {<DashBoard/>}/>}
                <Route path ="/user-add" element = {<UserAdd/>}/> 
        
                <Route path ="/order-info" element = {<OrderInfo/>}/>
                <Route path="/order-detail/:id" element = {<OrderInfoDetail/>}/>
                <Route path ="/contact" element = {<Contact/>}/>
                <Route path ="/about" element = {<About/>}/>
                <Route path ="/signup" element = {<Signup/>}/>
                <Route path ="*" element = {<DashBoard/>}/> 
                <Route path ="/" element = {<MainUser/>}/> 
                <Route path ="/contact" element = {<Contact/>}/>
                <Route path ="/about" element = {<About/>}/> 
                <Route path="/search/:name" element ={<Search/>}></Route>
                <Route path="/courses/:name/:id" element ={<CourseBySubCatalog/>}></Route>
                <Route path="/search" element ={<Search/>}></Route>
            </Routes>  

        </Router>
            <FooterAdmin/>

        </>
      );
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

export default connect(mapStateToProps,mapDispatchToProps)(AppAdmin)
 