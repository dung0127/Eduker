import React from "react";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {USER_INFO_API_BASE_URL} from "../../config/env";
import {connect} from 'react-redux';
import { getDetailInfo, updateDetail } from '../../actions/detail'
import validator from 'validator';
import $ from "jquery";
import {withRouter} from "../../admin/layout/auth/withRouter";
import Header from "../layout/header.jsx";
import {Link} from "react-router-dom";
import loadjs from "loadjs";

class ChangePassword extends React.Component {
    constructor(){
        super();
        this.state = {
            user: [],
            password: {
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
                },
            error: {},
            updateSuccess: false,
            isShow: false, 
            alert:'',
        }
        
        this.handleInputPasswordChange = this.handleInputPasswordChange.bind(this);
  
    }

    componentDidMount(){        
        this.getDetail();
    } 

    getDetail = () => {
        axios.get(USER_INFO_API_BASE_URL+'/user-information', { headers: authHeader() }).then((res) => {
            this.setState({user: res.data.data});
            this.props.getDetailInfo(res.data.data);
            this.setState({newDetail: res.data.data});
        });
    }

    validateFormData = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.password.oldPassword)){            
            error['oldPassword'] = 'The Old Password field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.password.newPassword)){            
            error['newPassword'] = 'The New Password field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.password.confirmPassword)){            
            error['confirmPassword'] = 'The Confirm Password field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    handleInputPasswordChange= e => {   
        let formData = Object.assign({}, this.state.password);    
        console.log(formData)
        formData[e.target.name] = e.target.value;
        this.setState({password:formData});         
        console.log(formData)  
    }

    updatePassword = (password) => {
        if(this.validateFormData()){
            axios.post(USER_INFO_API_BASE_URL+'/change-password', password , { headers: authHeader() }).then(res=>{
                if(res.data.message == "Success"){
                    loadjs('/assets/default/js/success.js', () => {});
                    this.props.navigate('/detail')
                }
                else {
                    loadjs('/assets/default/js/error.js', () => {});
                }
            })
        Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""))
        
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
        return(
            <>
            <Header/>
            <section className="site-top-banner position-relative">
            <img src="https://lms2.rocket-soft.org/store/1015/6.jpg" className="img-cover" alt=""/>
            </section>
            <section className="container">
            <div className="rounded-lg shadow-sm px-25 py-20 px-lg-50 py-lg-35 position-relative user-profile-info bg-white">
            <div className="webinar-progress d-block d-lg-flex align-items-center p-15 panel-shadow bg-white rounded-sm">
            <div className="progress-item d-flex align-items-center">
            <a href=" /panel/setting/step/1 " className="progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle active" data-toggle="tooltip" data-placement="top" title="Basic Information">
            <img src="/assets/default/img/key-42.svg" className="img-cover" alt=""/>
            </a>
            <div className="ml-10 ">
                <h3 className="font-27 text-secondary font-weight-bold">Change Password</h3>
            </div>
            </div>
            </div>
                    {/* <div className="mt-30 border-top"></div> */}

            <div className="d-flex justify-content-end">

            </div>
                </div>
            </section>
            <div className="container mt-30"  >
                <section className="rounded-lg border px-10 pb-35 pt-5 position-relative" style={{backgroundColor:"white"}}>
                <div className="panel-content" style={{paddingLeft:"80px"}}>

                <form className="mt-30">
                
                            <section>
                
                <div className="row mt-20">
                <div className="col-6 col-lg-6">
                <div className="form-group"style={{position: "relative"}} >
                        <label className="input-label">Old password</label>
                        <input  type={this.state.isShow?'text':'password'} name="oldPassword" required="" placeholder="Old password" onChange={this.handleInputPasswordChange} className="form-control " />
                        <div >
                        {this.state.isShow?<img src="/assets/default/img/private.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide}/>
                        :<img src="/assets/default/img/eye.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide} /> }
                        {this.state.error.oldPassword && <div style={{width:"350px", height:"40px", fontSize:"12px"}} className="validation alert alert-warning">{this.state.error.oldPassword}</div>}
                    
                        </div>
                </div>
                <div className="form-group" style={{position: "relative"}}>
                    <label className="input-label">New password</label>
                    <input type={this.state.isShow?'text':'password'} name="newPassword" required="" placeholder="New password"
                                                                            onChange={this.handleInputPasswordChange}  className="form-control " />
                    <div >
                        {this.state.isShow?<img src="/assets/default/img/private.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide}/>
                        :<img src="/assets/default/img/eye.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide} /> }
                        {this.state.error.newPassword && <div style={{width:"350px", height:"40px", fontSize:"12px"}} className="validation alert alert-warning">{this.state.error.newPassword}</div>}
                        
                        </div>
                </div>                    
                    <div className="form-group" style={{position: "relative"}}>
                        <label className="input-label">Confirm password</label>
                        <input type={this.state.isShow?'text':'password'} name="confirmPassword" required="" placeholder="Confirm password" 
                                                                            onChange={this.handleInputPasswordChange} className="form-control "   />
                        <div >
                        {this.state.isShow?<img src="/assets/default/img/private.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide}/>
                        :<img src="/assets/default/img/eye.png" style={{position: 'absolute', cursor: 'pointer', width:'15px', top:'40px',left:'330px'}} onClick={this.showHide} /> }
                        {this.state.error.confirmPassword && <div style={{width:"350px", height:"40px", fontSize:"12px"}} className="validation alert alert-warning">{this.state.error.confirmPassword}</div>}
                        
                        </div>            
                    </div>
                    <section>

</section>
                    {/* <div className="form-group mt-30 d-flex align-items-center justify-content-between">
          <label className="cursor-pointer input-label" for="publicMessagesSwitch">Enable profile messages</label>
          <div className="custom-control custom-switch">
              <input type="checkbox" name="public_messages" className="custom-control-input" id="publicMessagesSwitch" />
              <label className="custom-control-label" for="publicMessagesSwitch"></label>
          </div>
      </div> */}
               
                
                
                   
                </div>
                </div>
                </section>
                </form>
                <div className="create-webinar-footer d-flex align-items-center justify-content-between mt-20 pt-15 border-top">
                
                {/* <button type="button" id="saveData" className="btn btn-sm btn-primary ml-15">Save</button> */}
                </div>
                
                </div>
                <div style={{paddingLeft:"50px"}}>
                    <Link to ="/detail" type="button" id="getNextStep" className="btn btn-sm btn-primary ml-15" >Back</Link>
                    <button type="button" value={'Value'} onClick={()=>this.updatePassword(this.state.password)} className="btn btn-sm btn-primary ml-15" >Save</button>
                </div>
                </section>
                
            </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return{
        detailInfo: state.detail.detailInfo,   
        isUpdate: state.detail.updateSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfo: (detailInfo) => {
            dispatch(getDetailInfo(detailInfo));
        },
        updateDetail: (updateSuccess) => {
            dispatch(updateDetail(updateSuccess));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePassword));