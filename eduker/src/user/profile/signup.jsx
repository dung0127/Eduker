import React from "react";
import axios from "axios";
import validator from 'validator';
import { USER_INFO_API_BASE_URL } from "../../config/env"
import $ from "jquery";
import { withRouter } from "../../admin/layout/auth/withRouter"
import { Link } from "react-router-dom"
import Header from "../layout/header.jsx";
import loadjs from "loadjs";

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            addUser: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            error: {},
            isShow: false,
            messageSuccess: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    validateFormData = () => {
        let isValid = true;

        const error = {}

        if (validator.isEmpty(this.state.addUser.username)) {
            error['username'] = 'The Username field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.password)) {
            error['password'] = 'The Password field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.confirmPassword)) {
            error['confirmPassword'] = 'The Confirm password field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.email)) {
            error['email'] = 'The Email field is required.';
            isValid = false;
        }

        if (this.state.addUser.email !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.addUser.email)) {
                isValid = false;
                error["email"] = "Please enter valid email address.";
            }
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    handle = (mess) => {

        this.setState({ messageSuccess: mess })

        if (mess == "Success") {
            loadjs('/assets/default/js/signup.js', () => {});

            
                this.props.navigate('/login')
        }
        else {
            loadjs('/assets/default/js/error.js', () => {});


        }


    }

    handleInputChange = e => {
        let formData = Object.assign({}, this.state.addUser);
        console.log(formData)
        formData[e.target.name] = e.target.value;
        this.setState({ addUser: formData });
        console.log(formData)
    }

    handleSubmit = (addUser) => {
        if (this.validateFormData()) {
            axios.post('http://localhost:8080/api/auth/signup', addUser).then(res => {
                // update state.staff.staffInfo
                //this.setState({addUser: res.data.data}) 
                this.handle(res.data.message);
            })
        }
    }

    showHide = () => {
        this.state.isShow ?
            this.setState({
                isShow: false
            }) :
            this.setState({
                isShow: true
            });
    }

    render() {
        return (
            <>
            <div className="container">
        <div className="row login-container">
            <div className="col-12 col-md-6 pl-0">
                <img src="store/1/default_images/front_register.jpg" className="img-cover" alt="Login"/>
            </div>
            <div className="col-12 col-md-6">
                <div className="login-card">
                    <h1 className="font-20 font-weight-bold">Signup</h1>

                    <form className="mt-35">

                                                    <div className="form-group">
                                <label className="input-label" for="email">Username:</label>
                                <input type="text" name="username" maxlength="64" placeholder="Username" onChange={this.handleInputChange} className="form-control "
                                      />
                                        {this.state.error.username && <div style={{width:"430px", height:"10px", fontSize:"13px", backgroundColor:"#f5cd7d", paddingTop:"10px"}} className="validation alert alert-warning">{this.state.error.username}</div>}


                                                            </div>
                        
                        <div className="form-group">
                            <label className="input-label" for="full_name">Email:</label>
                            <input type="text" name="email" maxlength="64" placeholder="Email Address" onChange={this.handleInputChange}  className="form-control "/>
                            {this.state.error.email && <div style={{width:"430px", height:"10px", fontSize:"13px", backgroundColor:"#f5cd7d", paddingTop:"10px"}} className="validation alert alert-warning">{this.state.error.email}</div>}
                             
                                                    </div>

                        <div className="form-group">
                            <label className="input-label" for="password">Password:</label>
                            <input name="password" type="password" maxlength="64" placeholder="Password" onChange={this.handleInputChange}
                                   className="form-control "/>
                            {this.state.error.password && <div style={{width:"430px", height:"10px", fontSize:"13px", backgroundColor:"#f5cd7d", paddingTop:"10px"}} className="validation alert alert-warning">{this.state.error.password}</div>}
                                                    </div>

                        <div className="form-group ">
                            <label className="input-label" for="confirm_password">Confirm Password:</label>
                            <input type="password" name="confirmPassword" maxlength="64" placeholder="Confirm password" onChange={this.handleInputChange} 
                                   className="form-control " />
                            {this.state.error.confirmPassword && <div style={{width:"430px", height:"10px", fontSize:"13px", backgroundColor:"#f5cd7d", paddingTop:"10px"}} className="validation alert alert-warning">{this.state.error.confirmPassword}</div>}
                                                    </div>

                                                  

                                                <button  type="button" onClick={() => this.handleSubmit(this.state.addUser)}
                                className="btn btn-primary btn-block mt-20">Signup</button>
                    </form>

                    <div className="text-center mt-20">
                        <span className="text-secondary">
                            Already have an account? 
                            <Link to ="/login" className="text-secondary font-weight-bold"> Login</Link>
                        </span>
                    </div>

                </div>
            </div>
        </div>
            </div>
            </>
        );
    }
}

export default withRouter(Signup);