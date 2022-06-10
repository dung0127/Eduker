import React from "react";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {USER_INFO_API_BASE_URL} from "../../config/env";
import {connect} from 'react-redux';
import { getDetailInfo, updateDetail } from '../../actions/detail'
import $ from "jquery"
import {withRouter} from "../../admin/layout/auth/withRouter"
import {imageRequest} from "../../actions/course"
import Header from "../layout/header.jsx";
import loadjs from "loadjs";
import {Link} from "react-router-dom"

class DetailEdit extends React.Component {
    constructor(){
        super();
        this.state = {
            user: [],
            newDetail: {
                fullname: '',
                email: '',
                enable: '',
                address: ''
                },
            error: {},
            updateSuccess: false,
            messageSuccess:'',
            ava:''
        }
        
        this.handleInputChange = this.handleInputChange.bind(this);
  
    }

    componentDidMount(){        
        this.getDetail();
        loadjs('/assets/default/js/panel/user_setting.min.js', () => {});
        loadjs('/assets/vendors/cropit/jquery.cropit.js', () => {});
        loadjs('/assets/default/js/parts/img_cropit.min.js', () => {});
    } 

    getDetail = () => {
        axios.get(USER_INFO_API_BASE_URL+'/user-information', { headers: authHeader() }).then((res) => {
            this.setState({user: res.data.data});
            this.props.getDetailInfo(res.data.data);
            this.setState({newDetail: res.data.data});
        });
    }

    handleInputChange= e => {   
        let formData = Object.assign({}, this.state.newDetail);    
        console.log(formData)
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
            if (e.target.accept=="image/*"){
                this.setState({
                    img: URL.createObjectURL(e.target.files[0])
                })
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
                console.log(e.target.files[0])
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
        
        if (this.state.newDetail.email !== '') {
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

    updateDetail = (newDetail) => {
        console.log(this.validateEmail())
        if(this.validateEmail()){
        this.props.imageRequest(this.state.ava)
        axios.post(USER_INFO_API_BASE_URL+'/update', newDetail , { headers: authHeader() }).then(res=>{
            // update state.staff.staffInfo
            this.props.getDetailInfo(res.data.data);  
            this.props.updateDetail(this.state.updateSuccess) 
            this.setState({newDetail: res.data.data}) 
            this.setState({messageSuccess:res.data.message})
            if(res.data.message=="Success"){
                loadjs('/assets/default/js/success.js', () => {});
                
             
                this.props.navigate('/detail')
            }
            else {
                
                loadjs('/assets/default/js/error.js', () => {});

            }
            
        })
        }
        this.setState({newDetail: {
            fullname: '',
            email: '',
            enable: '',
            address: ''
            },}) 
    }

    render() {
        console.log(this.props.isUpdate)
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
    <img src="/assets/default/img/icons/basic-info.svg" className="img-cover" alt=""/>
</a>

<div className="ml-10 ">
    <h4 className="font-27 text-secondary font-weight-bold">Basic Information</h4>
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
                <div className="panel-content" style={{paddingLeft:"100px"}}>
                

                <form className="mt-30">
                
                
                            <section>
               
                
                <div className="row mt-20">
                <div className="col-12 col-lg-12">
                <div className="form-group">
                        <label className="input-label">Username</label>
                        <input type="text" disabled="true"  value={this.state.user.username} className="form-control " />
                                    </div>
                <div className="form-group">
                    <label className="input-label">Fulname</label>
                    <input type="text" name="fullname" required="" onChange={this.handleInputChange} defaultValue={this.state.user.fullname}  className="form-control " />
                </div>                    
                    <div className="form-group">
                        <label className="input-label">Email</label>
                        <input type="text"  name="email" required="" onChange={this.handleInputChange} defaultValue={this.state.user.email} className="form-control "   />
                                    </div>
                
                    <div className="form-group">
                        <label className="input-label">Phone</label>
                        <input type="text" name="phone" required="" onChange={this.handleInputChange} defaultValue={this.state.user.phone} className="form-control "   />
                                    </div>
                
                    <div className="form-group">
                        <label className="input-label">Address</label>
                        <input type="text" name="address" required=""  onChange={this.handleInputChange} defaultValue={this.state.user.address} className="form-control "   />
                    </div>

                    <div className="form-group">
                        <label className="input-label">Status</label>
                        <input type="text" disabled="true" value={this.state.user.enabled?'Active':'Inactive'} required=""  className="form-control "   />
                    </div>

                    <section>
    <h3 class="section-title after-line mt-35"></h3>

    <div class="row mt-20">
        <div class="col-12 col-lg-12">

            <div class="form-group">
                <label class="input-label">Profile Image</label>
                {this.state.img?
                <img src={this.state.img} alt="" id="profileImagePreview" width="150" height="150" class="rounded-circle my-15 d-block ml-5"/>
                :
                <img src={this.state.user.avatarImage} alt="" id="profileImagePreview" width="150" height="150" class="rounded-circle my-15 d-block ml-5"/>
                }
               

            </div>
            <div className="thumb-dt">													
            <div className="upload-btn" >													
                <input className="uploadBtn-main-input" id="myInput" type="file" name="avatarImage" onChange={this.handleInputChange} accept="image/*" />
              
            </div>
        </div>
        </div>
        
    </div>
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
                <div className="">
                        <Link to ="/detail" type="button" id="getNextStep" className="btn btn-sm btn-primary ml-15" >Back</Link>
                        <button value={'Update'} onClick={()=>this.updateDetail(this.state.newDetail)} type="button" className="btn btn-sm btn-primary ml-15" >Save</button>
                            </div>
                
                {/* <button type="button" id="saveData" className="btn btn-sm btn-primary ml-15">Save</button> */}
                </div>
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
        isUpdate: state.detail.updateSuccess,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetailInfo: (detailInfo) => {
            dispatch(getDetailInfo(detailInfo));
        },
        updateDetail: (updateSuccess) => {
            dispatch(updateDetail(updateSuccess));
        },
        imageRequest:(e) => dispatch (imageRequest(e)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailEdit))