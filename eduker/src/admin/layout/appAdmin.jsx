import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Redirect} from 'react-router-dom';
import DashBoard from "../dashboard/dashboard.jsx"
import {connect} from "react-redux"
import MainUser from "../../user/layout/mainUser.jsx";
import CourseInfo from "../course/courseInfo.jsx";
import CourseAdd from "../course/courseAdd.jsx";

const isLogin = localStorage.getItem("isLogin");

export const PrivateRoute = ({children}) => {
  
  if (isLogin) {
      
    return children
  }
  
  return <Navigate to="/" />
}

class AppAdmin extends React.Component {
  render() {
      return (
        <Router>
                
            <Routes>    
                <Route path ="/dashboard" element = {<DashBoard/>}/> 
                <Route path ="/" element = {<MainUser/>}/> 
                <Route path ="/course-info" element = {<CourseInfo/>}/> 
                <Route path="/course-add" element = {<CourseAdd/>}/>
               
            </Routes>  
        </Router>
      );
    }
}

const mapStateToProps = state => {
  return {
      auth: state.auth.token
  }
}

export default connect(mapStateToProps)(AppAdmin)
