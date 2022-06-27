import React from "react";
import axios from "axios";
import validator from 'validator';
import { connect } from 'react-redux';
import {LOGIN_BASE_URL} from '../../../config/env'
import {withRouter} from './withRouter'
import $ from "jquery";
import {Link} from "react-router-dom"
import { loginRequest, logout } from "../../../actions/auth";
import loadjs from 'loadjs'; 
import {fetchDetailUserRequest} from "../../../actions/detail"
import Header from "../../../user/layout/header.jsx";

class Login extends React.Component {
	constructor(){
        super();
        this.state = {
            user: {
                username: '',
                password: ''
            },
			role: '',
            error: {},
            isSuccess: false,
            errorMessage: '',
        }
        this.handleInputsChange = this.handleInputsChange.bind(this);  
		
    }

	handleInputsChange = e =>{                
        let formData = Object.assign({}, this.state.user);
        formData[e.target.name] = e.target.value;        
        console.log(formData)
        this.setState({
            user: formData            
        })         
    }

	validateFormData = () => {
        let isValid = true;

        const error = {}
        if(validator.isEmpty(this.state.user.username)){            
            error['username'] = 'The username field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.user.password)){
            error['password'] = 'The password field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
}

	checkLoginInfo = (user) => {   
        if(this.validateFormData()){
            this.props.loginRequest(user),
            axios.post(LOGIN_BASE_URL,user).then((res) => {
               
                localStorage.setItem('isLogin',true)
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('role',res.data.data.roles)					
                localStorage.setItem('username',res.data.data.username)				
                loadjs('/assets/default/js/login.js', () => {});
                if(res.data.data.roles=='ROLE_ADMIN'){
                    this.props.navigate('/dashboard')
                    window.location.reload();
                }
                else {
                    this.props.navigate('/')

                }
                
            }).catch(error => loadjs('/assets/default/js/loginError.js', () => {}))
            
        }
        
    }

    componentDidMount() {
        // loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        // loadjs('/assets/default/js/parts/main.min.js', () => {});
        // loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        // loadjs('/assets/default/js/parts/home.min.js', () => {});
        // loadjs('/assets/default/js/parts/categories.min.js', () => {});
        this.props.fetchDetailUserRequest();

        
       
    }
    render() {
        return(
            <>
            <Header/>
            <div className="container">
                <div className="row login-container">

                    <div className="col-12 col-md-6 pl-0">
                        <img src="store/1/default_images/front_login.jpg" className="img-cover" alt="Login"/>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="login-card">
                            <h1 className="font-20 font-weight-bold">Log in to your account</h1>

                            <form className="mt-35">
                                {/* <input type="hidden" name="_token" value="V1yQUuqpChkymsEzCbH3pHmi4wVeZ6rhp2xV2qJX"/> */}
                                <div className="form-group">
                                    <label className="input-label" for="username">Username:</label>
                                    <input name="username" type="text" className="form-control " placeholder="Username" id="id_email" onChange={this.handleInputsChange} value={this.state.user.username}
                                       aria-describedby="emailHelp"/>
									{this.state.error.username && <div style={{color:"red",fontSize:"12px",padding:"10px",fontSize:"13px"}}>{this.state.error.username}</div>}
                                     
                                </div>


                                <div className="form-group">
                                    <label className="input-label" for="password">Password:</label>
                                    <input  type="password" name="password" id="id_password" required=""  placeholder={"Password"} onChange={this.handleInputsChange} value={this.state.user.password} className="form-control "aria-describedby="passwordHelp"/>
									{this.state.error.password && <div style={{color:"red",fontSize:"12px",padding:"10px",fontSize:"13px"}}>{this.state.error.password}</div>}
                                
                                </div>

                                <button type="button" value="Login" onClick={()=>this.checkLoginInfo(this.state.user)} className="btn btn-primary btn-block mt-20">Login</button>
                            
                                
                            
                            <div className="form-group text-center ml-5">
                 </div>
                            
                            
                            </form>


                            <div className="mt-20 text-center">
                                <span>Don&#039;t have an account? </span>
                                <Link to ="/signup" className="text-secondary font-weight-bold"> Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
		);
    }
}


const mapStateToProps = state => {
    return {        
        username: state.auth.username,
        token: state.auth.token,
		role: state.auth.role,
        loginSuccess: state.auth.loginSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginRequest:(e) => {
            dispatch (loginRequest(e))
            
        },

		logout: () => {
            dispatch(logout())
        },
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));