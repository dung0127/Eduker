import React, { Component } from "react";
import {connect} from 'react-redux';
import { withRouterParams } from "../../admin/layout/auth/withRouter"
import {courseByIdRequest} from "../../actions/course";
import authHeader from "../../config/authHeader";
import axios from "axios";
import {logout} from "../../actions/auth";
import {fetchDetailUserRequest} from "../../actions/detail"
import { fetchAllEnrollRequest} from "../../actions/course"
import {withRouter} from "../../admin/layout/auth/withRouter"
import loadjs from 'loadjs';
import Header from "../layout/header.jsx";
import {Link} from "react-router-dom"

let arr

class CourseLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state ={  
            id : this.props.params.id,  
			lectureShow: '',
			prvId:'', 
        }

    }

    componentDidMount(){
		this.props.fetchDetailUserRequest();
		console.log(this.state.id)
		axios.get('http://localhost:8080/api/course/enroll',{ headers: authHeader() }).then((res) => {
			res.data.data.map((en) =>
			en.id == this.state.id?
			this.props.courseByIdRequest(en.id):''
			)
        })
        
		
    } 

	getLecture = (id, i) => {
		console.log(i)
		axios.get('http://localhost:8080/api/lecture/'+id,{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
	}
    
	prev = (id) => {
		var vt = 0
		arr.map((ar)=>(
			ar==id? vt=arr.indexOf(ar):''
		))
		if(vt>0){
		axios.get('http://localhost:8080/api/lecture/'+arr[vt-1],{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
		}
	}

	next = (id) => {
		var vt = 0
		arr.map((ar)=>(
			ar==id? vt=arr.indexOf(ar):''
		))
		if(vt<arr.length){
		axios.get('http://localhost:8080/api/lecture/'+arr[vt+1],{ headers: authHeader() }).then((res) => {
            this.setState({lectureShow:res.data.data})
			this.setState({prvId:res.data.data.id})
        })
		}
	}

    render(){
        const {course} = this.props
		arr=[]
        return (
            <div  className="learning-page">
            {course.title?
            <>
            <div  className="learning-page-navbar d-flex align-items-center justify-content-between px-15 px-lg-35 py-10">
                <div  className="d-flex align-items-lg-center flex-column flex-lg-row flex-grow-1">
            
                    <div  className="learning-page-logo-card d-flex align-items-center justify-content-between justify-content-lg-start">
                        <a  className="navbar-brand mr-0" href="/">
                                <img src="/store/1/default_images/website-logo.png"  className="img-cover" alt="site logo"/>
                        </a>
            
                        
                    </div>
            
                    <div  className="learning-page-progress-card d-flex flex-column">
                        <a href="https://lms.rocket-soft.org/course/Become-a-Product-Manager"  className="learning-page-navbar-title">
                            <span style={{fontSize:"22px"}} className="font-weight-bold">&nbsp;&nbsp;&nbsp;{course.title}</span>
                        </a>
                        <div  className="d-flex align-items-center">
                            
                        {this.state.lectureShow?
                            <span style={{fontSize:"16px"}}  className="ml-10 font-weight-500 font-14 text-gray">&nbsp;&nbsp;{this.state.lectureShow.title}</span>
                        :''}
                        </div>
                        
                    </div>
                </div>
            
                <div  className="d-flex align-items-center">
            
                    <div  className="d-none align-items-center d-lg-flex">
                        <Link to ={`/course/${course.id}`} params={course.id}  className="btn learning-page-navbar-btn btn-sm border-gray200">Course Page</Link>
            
                        <Link to ="/enroll"  className="btn learning-page-navbar-btn btn-sm border-gray200 ml-10">My Courses</Link>
                    </div>
            
                </div>
            </div>
      
            <div  className="d-flex position-relative">
                {this.state.lectureShow?
                <div className="learning-page-content flex-grow-1 bg-info-light p-15">
                    <iframe  src={this.state.lectureShow.videoUrl}  style={{width:"100%",height:"650px",top:"0",left:"0"}}  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                :
                <div  className="learning-page-content flex-grow-1 bg-info-light p-15">
                    <iframe  src={course.urlVideoDescription}  style={{width:"100%",height:"650px",top:"0",left:"0"}}  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                }
      
                <div  className="learning-page-tabs show">
                    <ul  className="nav nav-tabs py-15 d-flex align-items-center justify-content-around" id="tabs-tab" role="tablist">
                        <li  className="nav-item">
                            <a href="#" className=" font-14 d-flex align-items-center " id="content-tab" data-toggle="tab" role="tab" >
                                <i  className="learning-page-tabs-icons mr-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g id="Mask_Group_17" clip-path="url(#clip-path)" data-name="Mask Group 17" transform="translate(-25 -410)">
            <g id="online-class" transform="translate(25 410)">
                <path id="Path_153" d="M22.078 12.319a2.112 2.112 0 0 0 1.922-2.1V3.656a2.112 2.112 0 0 0-2.109-2.109h-6.985A2.112 2.112 0 0 0 12.8 3.656v2.766H4.031a2.112 2.112 0 0 0-2.109 2.109v8.438a2.1 2.1 0 0 0 .121.7h-.777A1.267 1.267 0 0 0 0 18.938a3.52 3.52 0 0 0 3.516 3.516h16.968A3.52 3.52 0 0 0 24 18.938a1.267 1.267 0 0 0-1.266-1.266h-.777a2.1 2.1 0 0 0 .121-.7zM14.2 3.656a.7.7 0 0 1 .7-.7h6.984a.7.7 0 0 1 .7.7v6.562a.7.7 0 0 1-.7.7h-6.509a.7.7 0 0 0-.373.107l-1.418.886.589-1.963a.7.7 0 0 0 .03-.2zm6.281 17.391H3.516a2.112 2.112 0 0 1-2.1-1.969h21.173a2.112 2.112 0 0 1-2.105 1.969zM6.7 12.375a.8.8 0 1 1 .8.8.8.8 0 0 1-.8-.8zm-.375 3c0-.424.548-.8 1.172-.8a1.435 1.435 0 0 1 .885.287.692.692 0 0 1 .287.51v2.3H6.328zm3.75 2.3v-2.3a2.074 2.074 0 0 0-.815-1.608l-.036-.027a2.2 2.2 0 1 0-3.455 0 2.073 2.073 0 0 0-.851 1.634v2.3h-.887a.7.7 0 0 1-.7-.7V8.531a.7.7 0 0 1 .7-.7H12.8v1.816l-.559 1.864a1.4 1.4 0 0 0 2.092 1.6l1.247-.779h5.1v4.641a.7.7 0 0 1-.7.7z"  className="cls-3" data-name="Path 153"></path>
                <path id="Path_154" d="M19.125 7.922h-1.5a.7.7 0 0 0 0 1.406h1.5a.7.7 0 0 0 0-1.406z"  className="cls-3" data-name="Path 154"></path>
                <path id="Path_155" d="M16.5 5.953h3.75a.7.7 0 0 0 0-1.406H16.5a.7.7 0 0 0 0 1.406z"  className="cls-3" data-name="Path 155"></path>
            </g>
        </g>
      </svg>
                                </i>
                                <span  className="learning-page-tabs-link-text">Content</span>
                            </a>
                        </li>
      
      
                    </ul>
      
                    <div  className="tab-content h-100" id="nav-tabContent">
                        <div  className="pb-20 tab-pane fade show active h-100" id="content" role="tabpanel" aria-labelledby="content-tab">
                            <div  className="content-tab p-15 pb-50" style={{overflowY:"auto",height:"calc(100vh - 200px)"}}>
                        <div  className="accordion-content-wrapper mt-15" id="chapterAccordion_file" role="tablist" aria-multiselectable="true">
                        {course.lessons?
						course.lessons.map((lesson,i)=>{
                            let count =0
                            {lesson.lectures.map((lecture,p)=> count++)}
						return(
                            <div  className="accordion-row bg-white rounded-sm border border-gray200 mb-2">
                        <div  className="d-flex align-items-center justify-content-between p-10" role="tab" id={'chapter'+i}>
                            <div  className="d-flex align-items-center" href={'#collapseChapter'+i} aria-controls={'collapseChapter'+i} data-parent="#chapterAccordion_file" role="button" data-toggle="collapse" aria-expanded="true">
                                <span  className="chapter-icon mr-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                </span>
        
                                <div  className="">
                                    <span  className="font-weight-bold font-14 text-dark-blue d-block">{lesson.title}</span>
                                    
                                    <span  className="font-12 text-gray d-block">
                                        
                                        {count} Lectures
                                    </span>
                                </div>
                            </div>
                            {count>0?
                            <div  className="d-flex align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className="feather collapse-chevron-icon text-gray feather-chevron-up" href={'#collapseChapter'+i} aria-controls={'collapseChapter'+i} data-parent="#chapterAccordion_file" role="button" data-toggle="collapse" aria-expanded="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                            :''}
                        </div>
        
                        <div id={'collapseChapter'+i} aria-labelledby={'chapter'+i}  className="collapse" role="tabpanel" style={{}}>
                            <div  className="panel-collapse text-gray">
                            {lesson.lectures.map((lecture,j)=>{
									return(
                                <div  className="tab-item d-flex align-items-start p-10 cursor-pointer" onClick={()=>this.getLecture(lecture.id)} data-type="file" data-id="31">
            
                                    <span  className="chapter-icon bg-gray300 mr-10">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className="feather feather-film text-gray"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                                    </span>
                            
                                    <div>
                                        <div  className="">
                                            <span  className="font-weight-500 font-14 text-dark-blue d-block">{lecture.title} </span>
                                            
                                            
                                            <span  className="font-12 text-gray d-block"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  className="feather feather-clock webinar-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {lecture.videoDuration} hours</span>
                                        </div>
                                
                                
                                    </div>
                                </div>
                                )
                            })}  
                            </div>
                        </div>
                            </div>
                        )}):''}   
                        </div>
                
        
        </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            :
            <>
            <Header/>
            <div class="col-md-12 text-center">
                <div class="no-data-div">
                <img src="/store/1/default_images/404.svg" alt="No Data" style={{height:"500px"}}/>
                </div>                
                <h2 class="mt-25 font-36">Error 404 </h2> 
                <p class="mt-25 font-16">404 Error description</p>
            </div>
            </>
            }
        </div>
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
		username: state.auth.username,
        token: state.auth.token,
        user: state.detail.user,
		enroll: state.course.coursesEnroll

    }
}

const mapDispatchToProps = dispatch => {
    return {
		logout: () => {
            dispatch(logout())
            localStorage.removeItem("isLogin");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            this.props.navigate('/index');
            window.location.reload();
        },
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
		fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest())
	
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withRouterParams(CourseLesson)));
