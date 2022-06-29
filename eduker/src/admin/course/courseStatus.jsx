import React, { Component } from 'react';
import axios from 'axios';
import { courseByIdRequest , updateCourseRequest} from '../../actions/course';
import { fetchCatalogRequest } from '../../actions/catalog';
import { fetchSubCatalogRequest } from '../../actions/subCatalog';
import {connect} from 'react-redux';
import authHeader from "../../config/authHeader";
import validator from 'validator';
import {withRouterParams, withRouter} from '../layout/auth/withRouter'
import {Link} from "react-router-dom"
import Header from '../../user/layout/header.jsx';
import Panel from '../layout/panel.jsx';

class CourseStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : this.props.params.id,  

            statusCourse:'',
            status:'',
        }
    }

    // -------------------------  Course  -----------------------------
    formCourse = e => {   
        let formDataCourse = Object.assign({}, this.state.statusCourse);  
        
        formDataCourse[e.target.name] = e.target.value;    
        this.setState({statusCourse:formDataCourse});  
        console.log(formDataCourse)  
    }

    changeStatus =  e => {
        this.state.status?
            this.setState({
                status: false
            }):
            this.setState({
                status: true
            });
        this.formCourse(e);
    }
    
    editCourse = (edit, courseId) => {
        let newForm = Object.assign(this.props.course,edit);
        this.props.updateCourseRequest(newForm, courseId);
        
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Status has been changed successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
        
        setTimeout(()=>{
            this.props.navigate('/course-info')
        },1000);
        
    }

    componentDidMount () {
        this.props.courseByIdRequest(this.state.id);
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
                       <h2 className="section-title">Edit Status Publish</h2>
                </div>
                <div className="panel-section-card py-20 px-25 mt-20">
                <div className="col-12">
                    <section className="mt-35">
                    
                        <div className="mt-15">What you want save as?</div>
                        <div className="mt-15">
                        
                                <p className="font-12 text-gray">- Your course is in an <b>Activate</b> state. Students can view, purchase or enroll in this course.</p> 
                            
                                <p className="font-12 text-gray">- Your course is in a <b>Draft</b> state. Students cannot view, purchase or enroll in this course.</p>
                            
                        </div>
                        <div className="mt-15 row">
                        <div className="col-md-6">
                                        
                            <select name="activate" onChange={this.changeStatus}  className="custom-select ">
                                    <option value="" selected disabled>Select Status</option>
                                    <option value="false"  >Submit For Draft</option>
                                    <option value="true"  >Submit For Activate</option>
                            </select>
                        </div>
                        </div>        
                        <br/>  
                        
                    </section>
                    </div>
                    <div>
                        <Link to ="/course-info" type="button" style={{backgroundColor:"#eb4242", borderColor:"#eb4242"}} id="getNextStep" className="btn btn-sm btn-primary ml-15" >Back</Link>
                        <button type="button" class="btn btn-sm btn-primary ml-15" value={'edit'} onClick={()=>this.editCourse(this.state.statusCourse, this.props.course.id)} >Save</button>
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
    return {        
        course: state.course.courseById,
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        messageSuccess: state.course.messageSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        updateCourseRequest:(e,i) => dispatch (updateCourseRequest(e,i))
    };
}

export default withRouter(withRouterParams(connect(mapStateToProps,mapDispatchToProps)(CourseStatus)));