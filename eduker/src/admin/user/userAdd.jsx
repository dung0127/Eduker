import React from "react";
import axios from "axios";
import authHeader from "../../config/authHeader";
import validator from 'validator';
import {withRouter} from '../layout/auth/withRouter'
import {USER_INFO_API_BASE_URL } from "../../config/env";
import $ from "jquery";
import {imageRequest} from "../../actions/course";
import {connect} from 'react-redux';
import Header from "../../user/layout/header.jsx";
import Panel from "../layout/panel.jsx";
import {Link} from "react-router-dom"
import loadjs from "loadjs";

class UserAdd extends React.Component {
    constructor(){
        super();
        this.state = {
            addUser: {  
                username:'',
                password:'',
                fullname: '',
                email: '',
                address: '',
                avatarImage:'',
                role:'ROLE_ADMIN'
                },
            error: {},
            isShow: false, 
            img:'',
            alert:'',
            ava:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
  
    }

    handleSuccess = () => {
        $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
		setTimeout(()=>{
			this.props.navigate('/users')
		},1000);
		
	} 

    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    validateFormData = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addUser.username)){            
            error['username'] = 'The Username field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.password)){            
            error['password'] = 'The Password field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.fullname)){            
            error['fullname'] = 'The Fullname field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addUser.email)){            
            error['email'] = 'The Email field is required.';
            isValid = false;
        }
        else {
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

    handleInputChange = e => {   
        let formData = Object.assign({}, this.state.addUser); 
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    img: URL.createObjectURL(e.target.files[0])
                })
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            }
            
            this.setState({newDetail:formData});  
            console.log(formData)
        }
        else {   
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addUser:formData});  
        console.log(formData)  
        }
    }

    handleSubmit = (addUser) => {
        if(this.validateFormData()){
            this.props.imageRequest(this.state.ava)
            axios.post(USER_INFO_API_BASE_URL + '/create', addUser , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            //this.setState({addUser: res.data.data}) 
            this.setState({alert:res.data.message})
            if(res.data.message=='Success'){
                Swal.fire({
                    icon: "success",
                    html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Add new account successfully </h3>",
                    showConfirmButton: !1,
                    width: "25rem"
                }),
                setTimeout(function() {
                Swal.close()
                    
                }, 1000)
                
                setTimeout(()=>{
                    this.props.navigate('/user-info')
                },1000)
                
                this.setState({addUser: {  
                    username:'',
                    password:'',
                    fullname: '',
                    email: '',
                    address: '',
                    avatarImage:'',
                    role:'ROLE_ADMIN'
                    },})

                Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""))
                
            }
            else {
                Swal.fire({
                    icon: "error",
                    html: '<h3 class="font-20 text-center text-dark-blue py-25">' + res.data.message+"</h3>",
                    showConfirmButton: !1,
                    width: "25rem"
                }),
                setTimeout(function() {
                Swal.close()
                    
                }, 1000)
               
               
            }
            
        })

        }
    }

    showHide = () => {
        this.state.isShow?
            this.setState({
                isShow: false
            }):
            this.setState({
                isShow: true
            });
    }

    render() {
        return (
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>
                <div className="panel-content">

                    <section className="mt-35">
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                      
                      <h2 className="section-title">Create New Account</h2>
                    </div>
                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                            <div className="basic_form">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Username</label>
                                                    <div className="ui left icon input swdh11 swdh19">
                                                        <input className="form-control prompt srch_explore" type="text" placeholder="Username here" name="username" data-purpose="edit-course-title" maxlength="60" onChange={this.handleInputChange}/>															
                                                        {this.state.error.username && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.username}</div>}
                                                    
                                                    </div>
                                                </div>
                                            </div>           
                                            
                                            <div className="col-lg-6">
                                                <div className="ui focus mt-30 ">
                                                    <label>Role</label>
                                                    <select class="custom-select ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" name="role">
                                                        <option value="ROLE_ADMIN" disabled selected>Admin</option>
                                                    </select>  
                                                </div>
                                            </div>
                                              
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Fullname</label>
                                                    <div className=" ui left icon input swdh11 swdh19" >
                                                        <input className="form-control prompt srch_explore" type="text" placeholder="Fullname here" name="fullname" onChange={this.handleInputChange}
                                                        />
                                                        {this.state.error.fullname && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.fullname}</div>}

                                                    </div>

                                                </div>
                                            </div>  
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Password</label>
                                                    <div className=" ui left icon input swdh11 swdh19" >
                                                        <input className="form-control prompt srch_explore" placeholder="Password here" type={this.state.isShow?'text':'password'}  name="password"  
                                                        onChange={this.handleInputChange} />		
                                                        <div style={{margin: 'auto'}}>
                                                        {this.state.isShow?<i className="fa fa-fw fa-eye" id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide}/>
                                                        :<i className="fa fa-fw fa-eye-slash"id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide} /> }
                                                        </div>	
                                                        {this.state.error.password && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.password}</div>}
                                                        			
                                                    </div>
                                                </div>
                                            </div>                                
                                            
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Email</label>
                                                    <div className="ui left icon input swdh11 swdh19" >
                                                        <input className="form-control prompt srch_explore"  placeholder="Email here" type="text" name="email"  
                                                        onChange={this.handleInputChange} />					
                                                    </div>
                                                    {this.state.error.email && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.email}</div>}

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Phone</label>
                                                    <div className="ui left icon input swdh11 swdh19" >
                                                        <input className="form-control prompt srch_explore" type="text" name="phone" 
                                                        onChange={this.handleInputChange} placeholder="Phone here"/>					
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="ui search focus mt-30">
                                                    <label>Address</label>
                                                    <div className=" ui left icon input swdh11 swdh19" >
                                                        <input className=" form-control prompt srch_explore" type="text" name="address"  
                                                        onChange={this.handleInputChange} placeholder="Address here"/>					
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            <div className="col-lg-6">
                                                <div className="ui focus mt-30 ">
                                                    <div className="thumb-item">
                                                        {this.state.img?
                                                            <img src={this.state.img} style={{width:"80px", paddingTop:"20px"}} alt=""/>
                                                            :''
                                                        }
                                                        <div className="thumb-dt">													
                                                            <div className="upload-btn" >													
                                                                <input className="form-control uploadBtn-main-input" id="myInput" type="file" name="avatarImage" onChange={this.handleInputChange} accept="image/*" />
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </div>   
                                            </div> 
                                            <div className="col-lg-12">
                                                <div className="divider-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="step-tab-panel step-tab-location">
                                    <div className="tab-from-content">
                                        <div className="mt-20 mt-md-0">

                                        <Link to="/user-info" ><button style={{backgroundColor:"#eb4242", borderColor:"#eb4242"}} type="button" className=" btn btn-sm btn-primary" >Back</button></Link>
                                        &nbsp;&nbsp;&nbsp;
                                        <button  type="button" className=" btn btn-sm btn-primary" value={'add'} onClick={()=>this.handleSubmit(this.state.addUser)}>Save</button>

                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                    </div>

                      
                </section>
                
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return{
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(UserAdd));