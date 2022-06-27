import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect} from 'react-router-dom';
import MainUser from "./mainUser.jsx";
import FooterUser from "./footerUser.jsx";
import Login from "../../admin/layout/auth/login.jsx";
import Course from "../course/course.jsx";
import Search from "../course/search.jsx";
import CourseById from "../course/courseById.jsx";
import CourseBySubCatalog from "../course/courseBySubCatalog.jsx";
import Cart from "../cart/cart.jsx";
import {connect}  from "react-redux"
import { fetchDetailUserRequest } from "../../actions/detail.js";
import { loginRequest } from "../../actions/auth.js";
import DetailUser from "../profile/detailUser.jsx";
import DetailEdit from "../profile/detailEdit.jsx";
import Contact from "./contact.jsx";
import Checkout from "../payment/checkout.jsx";
import About from "./about.jsx";
import ChangePassword from "../profile/changePassword.jsx";
import Order from "../payment/order.jsx";
import OrderDetail from "../payment/orderDetail.jsx";
import Signup from "../profile/signup.jsx";
import CourseLesson from "../course/courseLesson.jsx";
import Enroll from "../enroll/enroll.jsx";

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

class AppUser extends React.Component {
    constructor(){
      super(),
      this.state = {
        
        isLog: false,
      }
      
    }

    componentDidMount(){
      this.props.fetchDetailUserRequest()

  }
    render() {

      return (
          <Router >
                {/* {isLogin? ( !(window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/learn') || window.location.pathname.startsWith('/signup') ) ? <HeaderUser/> : '') : (  (window.location.pathname.startsWith('/login') || window.location.pathname.startsWith('/signup')) ? '':<HeaderGuest/> )} */}
                {/* {this.state.isLog?  <HeaderUser/>: <HeaderGuest/>} */}
              <Routes>
                <Route path ="/index" element = {<MainUser/>}/> 
                <Route path ="/" element = {<MainUser/>}/> 
                <Route path ="*" element = {<MainUser/>}/> 
                <Route path ="/signup" element = {<Signup/>}/>
                {!isEmpty(this.props.user) && <Route path ="/learn/:id" element = {<CourseLesson/>} /> }
                {!isEmpty(this.props.user) && <Route path ="/enroll" element = {<Enroll/>}/> }

                {!isLogin?<Route path ="/login" element = {<Login/>}/>:<Route path ="/login" element = {<MainUser/>}/>}
                <Route path ="/course" element = {<Course/>}/>
                <Route path ="/contact" element = {<Contact/>}/>
                <Route path ="/about" element = {<About/>}/> 
                <Route path="/search" element ={<Search/>}></Route>
                <Route path="/course/:id" element ={<CourseById/>}></Route>
                <Route path="/search/:name" element ={<Search/>}></Route>
                <Route path="/courses/:name/:id" element ={<CourseBySubCatalog/>}></Route>
                <Route path ="/cart" element = {<Cart/>}/>
                {!isEmpty(this.props.user) && <Route path ="/detail" element = {<DetailUser/>}/> }
                {!isEmpty(this.props.user) && <Route path ="/edit-profile" element = {<DetailEdit/>}/> }
                {!isEmpty(this.props.user) && <Route path ="/checkout" element = {<Checkout/>}/> }
                {!isEmpty(this.props.user) && <Route path ="/change-password" element = {<ChangePassword/>}/> }
                {!isEmpty(this.props.user) && <Route path ="/orders" element = {<Order/>}/> }
                {!isEmpty(this.props.user) && <Route path ="/order/:id" element = {<OrderDetail/>}/> }

              </Routes>
              <FooterUser/>
            </Router>
            
      );
    }
}

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
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(AppUser)