import React from "react";
import authHeader from "../../config/authHeader"
import axios from "axios";
import {USER_INFO_API_BASE_URL} from "../../config/env";
import {connect} from 'react-redux';
import { getDetailInfo, updateDetail } from '../../actions/detail'
import validator from 'validator';
import {withRouterParams, withRouter} from "../layout/auth/withRouter"
import {getUserByIdRequest} from "../../actions/user";
import {Link} from "react-router-dom";
import $ from "jquery"
import {imageRequest} from "../../actions/course"
import Panel from "../layout/panel.jsx";
import Header from "../../user/layout/header.jsx";
import loadjs from "loadjs";


class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.params.id,
            
            newDetail:  {},
            error: '',
            
            updateSuccess: false,
            isShow: false, 
            alert:'',
            error:{},

            ava:'',
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
        
        
    }

    componentDidMount(){        
        this.props.getUserByIdRequest(this.state.id);
        // this.state.newDetail=tmp
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
    } 
    
    // validate = (form) => {
    //     let isValid = true;

    //     const error = {}

    //     if(form.fullname==null){            
    //         error['fullname'] = 'The field is required.';
    //         isValid = false;
    //     }

    //     this.setState({
    //         error: error
    //     })

    //     return isValid;
    // } 

    showHide = () => {
        this.state.isShow?
            this.setState({
                isShow: false
            }):
            this.setState({
                isShow: true
            });
    }

    handleInputChange= e => {  
        let formData = Object.assign({},this.state.newDetail);
        
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
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
        
        formData[e.target.name] = e.target.value;        
        this.setState({newDetail:formData});  
        console.log(formData)  
        }
    }
     
    validateEmail = () => {
        let isValid = true;

        const error = {}
        
        if (this.state.newDetail.email !== undefined) {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.newDetail.email)) {
                isValid = false;
                error["email"] = "Please enter valid email address.";
            }
        }    

        this.setState({
            error: error
        })

        return isValid;
    }

    updateDetail = (newDetail, id) => {
        if(this.validateEmail()){
        this.props.imageRequest(this.state.ava)
        console.log(this.state.ava)
        this.props.getUserByIdRequest(id);
        newDetail.role==null&&(
        this.props.userById.role.name == "ROLE_USER"? newDetail.role="ROLE_USER":newDetail.role="ROLE_ADMIN")
        let newForm = Object.assign(this.props.userById,newDetail);
        console.log(newForm)
            
        axios.post('http://localhost:8080/api/admin/user/update', newForm , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            //this.props.getUserByIdRequest(res.data.data.id)
            // tmp={...res.data.data}
            // delete tmp.role
            // tmp.role= res.data.data.role.name
            // this.setState({newDetail: tmp})     
            this.setState({updateSuccess:true})
            if(res.data.message == "Success"){
                Swal.fire({
                    icon: "success",
                    html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Profile has been changed successfully </h3>",
                    showConfirmButton: !1,
                    width: "25rem"
                }),
                setTimeout(function() {
                Swal.close()
                    
                }, 1000)
                
                setTimeout(()=>{
                    this.props.navigate('/user-info')
                },1000);
            }
            else {
                
                this.setState({alert:res.data.message})
            }
            })
        }
        this.setState({newDetail:{}})
          
    }




    render() {
        const {userById} = this.props
    
        return(
            
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                      
        

                    <section className="mt-35">
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                      
                      <h2 className="section-title">Edit User</h2>
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
                                                        <input className="form-control prompt srch_explore" type="text" required="" name="username" disabled="true"  value={userById.username}/>															
                                                    </div>
                                                </div>
                                            </div>           
                                            {userById.role&&userById.role.id=="1"?
                                            <div className="col-lg-6">
                                                <div className="ui focus mt-30 ">
                                                    <label>Role</label>
                                                    <select class="custom-select ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`role${userById.id}`} name="role" onChange={this.handleInputChange}>
                                                        <option value="ROLE_ADMIN" selected>Admin</option>
                                                        <option value="ROLE_USER">User</option>
                                                    </select>  
                                                </div>
                                            </div>
                                            :
                                            <div className="col-lg-6">
                                                <div className="ui focus mt-30 ">
                                                <label>Role</label>
                                                    <select class="custom-select ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`role${userById.id}`} name="role" onChange={this.handleInputChange}>
                                                        <option value="ROLE_ADMIN">Admin</option>
                                                        <option value="ROLE_USER" selected>User</option>
                                                    </select>  
                                                </div>
                                            </div>}      
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Fullname</label>
                                                    <div className=" ui left icon input swdh11 swdh19" key={`fullname${userById.id}`}>
                                                        <input className="form-control prompt srch_explore" type="text" name="fullname"  
                                                        onChange={this.handleInputChange} defaultValue={userById.fullname}/>					
                                                    </div>

                                                </div>
                                            </div>  
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Password</label>
                                                    <div className=" ui left icon input swdh11 swdh19" key={`pass${userById.id}`}>
                                                        <input className="form-control prompt srch_explore" type={this.state.isShow?'text':'password'}  name="password"  
                                                        onChange={this.handleInputChange} placeholder="New password here"/>		
                                                        <div style={{margin: 'auto'}}>
                                                        {this.state.isShow?<i className="fa fa-fw fa-eye" id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide}/>
                                                        :<i className="fa fa-fw fa-eye-slash"id="togglePassword" style={{marginLeft: '-40px', cursor: 'pointer'}} onClick={this.showHide} /> }
                                                        </div>				
                                                    </div>
                                                </div>
                                            </div>                                
                                            
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Email</label>
                                                    <div className="ui left icon input swdh11 swdh19" key={`email${userById.id}`}>
                                                        <input className="form-control prompt srch_explore" type="text" name="email"  
                                                        onChange={this.handleInputChange} defaultValue={userById.email}/>					
                                                    </div>
                                                    {this.state.error.email && <div className="validation alert alert-warning">{this.state.error.email}</div>}

                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="ui search focus mt-30">
                                                    <label>Phone</label>
                                                    <div className="ui left icon input swdh11 swdh19" key={`phone${userById.id}`}>
                                                        <input className="form-control prompt srch_explore" type="text" name="phone" 
                                                        onChange={this.handleInputChange} defaultValue={userById.phone}/>					
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="ui search focus mt-30">
                                                    <label>Address</label>
                                                    <div className=" ui left icon input swdh11 swdh19" key={`address${userById.id}`}>
                                                        <input className=" form-control prompt srch_explore" type="text" name="address"  
                                                        onChange={this.handleInputChange} defaultValue={userById.address}/>					
                                                    </div>
                                                </div>
                                            </div>
                                            {userById.enabled&&userById.enabled?
                                            <div className="col-lg-3">
                                                <div className="ui focus mt-30 ">
                                                    <label>Status</label>
                                                    <select class="custom-select ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`status${userById.id}`} name="enabled" onChange={this.handleInputChange}>
                                                        <option value="true" selected>Active</option>
                                                        <option value="false">InActive</option>
                                                    </select>  
                                                </div>
                                            </div>
                                            :
                                            <div className="col-lg-3">
                                                <div className="ui focus mt-30 ">
                                                    <label>Status</label>
                                                    <select class="custom-select ui left icon swdh11 swdh19 dropdown cntry152 prompt srch_explore" key={`status${userById.id}`} name="enabled" onChange={this.handleInputChange}>
                                                        <option value="true">Active</option>
                                                        <option value="false" selected>Inactive</option>
                                                    </select>  
                                                </div>
                                            </div>}  
                                            <div className="col-lg-6">
                                                <div className="ui focus mt-30 ">
                                                    <div className="thumb-item">
                                                        {this.state.img?
                                                            <img src={this.state.img} style={{width:"80px", paddingTop:"20px"}} alt=""/>
                                                            :<img src={userById.avatarImage} style={{width:"100px", paddingTop:"20px"}} alt=""/>
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

                                        <Link to="/user-info" ><button  type="button" className=" btn btn-sm btn-primary" >Back</button></Link>
                                        &nbsp;&nbsp;&nbsp;
                                        <button style={{backgroundColor:"#eb4242", borderColor:"#eb4242"}} type="button" className=" btn btn-sm btn-primary" value={'Update'} onClick={()=>this.updateDetail(this.state.newDetail, userById.id)}>Save</button>

                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                    </div>

                      
                </section>
                
                </div>
            </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return{
        userById: state.user.userById,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserByIdRequest:(e) => dispatch (getUserByIdRequest(e)),
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withRouterParams(UserEdit)));