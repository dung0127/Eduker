import React from 'react'
import {Link} from "react-router-dom"
import { fetchDetailUserRequest } from '../../actions/detail'
import {connect} from 'react-redux';
import { fetchAllEnrollRequest } from '../../actions/course';
import moment from 'moment';
import {withRouterParams} from '../../admin/layout/auth/withRouter';
import Header from '../layout/header.jsx';
import loadjs from 'loadjs';
import {fetchAllSavedRequest, fetchUnsavedRequest} from "../../actions/savedCourse"

class DetailUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            detail: [],
            name: this.props.params.name
        }
    }

    componentDidMount(){
        this.props.fetchDetailUserRequest();
        this.props.fetchAllEnrollRequest();
        this.props.fetchAllSavedRequest();
        
    }

    componentDidUpdate(prevProps){
        if(this.props.params.name!==prevProps.params.name){
            this.props.fetchDetailUserRequest();
            this.props.fetchAllEnrollRequest();
        }
    }

    unsavedCourse = (id) =>{
        this.props.fetchUnsavedRequest(id);
    }

    render () {
        const { courses } = this.props;

        const {enroll} = this.props
        console.log(this.state.name)
        return (
            <>
            <Header/>
            <section className="site-top-banner position-relative">
            <img src="https://lms2.rocket-soft.org/store/1015/6.jpg" className="img-cover" alt=""/>
            </section>

            <section className="container">
                <div className="rounded-lg shadow-sm px-25 py-20 px-lg-50 py-lg-35 position-relative user-profile-info bg-white">
                    <div className="profile-info-box d-flex align-items-start justify-content-between">
                        <div className="user-details d-flex align-items-center">
                            <div className="user-profile-avatar">
                                <img src={this.props.user.avatarImage} className="img-cover" alt="Robert Ransdell"/>

                                                            <span className="user-circle-badge has-verified d-flex align-items-center justify-content-center">
                                        <i data-feather="check" width="20" height="20" className="text-white"></i>
                                    </span>
                                                    </div>
                            
                            <div className="ml-20 ml-lg-40">
                                <h1 className="font-24 font-weight-bold text-dark-blue">{this.props.user.fullname} </h1>
                                <span className="text-gray"> {this.props.user.username}</span>
                                {localStorage.getItem("role")=="ROLE_ADMIN"?'':
                                <div className="w-100 mt-10 d-flex align-items-center justify-content-center justify-content-lg-start">
                                    <div className="d-flex flex-column followers-status">
                                        <span className="font-20 font-weight-bold text-dark-blue">{enroll&&enroll.length}</span>
                                        <span className="font-14 text-gray">Enrolled</span>
                                    </div>

                                    <div className="d-flex flex-column ml-25 pl-5 following-status">
                                        <span className="font-20 font-weight-bold text-dark-blue">{courses&&courses.length}</span>
                                        <span className="font-14 text-gray">Saved</span>
                                    </div>
                                </div>
                                }
                            </div>
                            
                        </div>
                        
                        <div className="user-actions d-flex flex-column">
                    <Link to="/edit-profile" type="button" data-user-id="1015" className="btn btn-primary btn-sm">
                                                    Edit
                                            </Link>

                                    </div>
                    </div>

                    <div className="mt-40 border-top"></div>

                   
                </div>
            </section>

            <div className="container mt-30">
                <section className="rounded-lg border px-10 pb-35 pt-5 position-relative">
                    <ul className="nav nav-tabs d-flex align-items-center px-20 px-lg-50 pb-15" id="tabs-tab" role="tablist">
                        <li className="nav-item mr-20 mr-lg-50 mt-30">
                            <a className="position-relative text-dark-blue font-weight-500 font-16 active" id="about-tab" data-toggle="tab" href="#about" role="tab" aria-controls="about" aria-selected="true">About</a>
                        </li>
                        {localStorage.getItem("role")=="ROLE_USER"?
                        <>
                        <li className="nav-item mr-20 mr-lg-50 mt-30">
                            <a className="position-relative text-dark-blue font-weight-500 font-16 " id="webinars-tab" data-toggle="tab" href="#webinars" role="tab" aria-controls="webinars" aria-selected="false">Enrolled</a>
                        </li>
                        <li className="nav-item mr-20 mr-lg-50 mt-30">
                            <a className="position-relative text-dark-blue font-weight-500 font-16 " id="badges-tab" data-toggle="tab" href="#badges" role="tab" aria-controls="badges" aria-selected="false">Saved</a>
                        </li>
                        </>
                        :''
                        }

                    </ul>

                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade px-20 px-lg-50 show active" id="about" role="tabpanel" aria-labelledby="about-tab">
                            <div className="mt-40">
                    <h3 className="font-16 text-dark-blue font-weight-bold">Name</h3>

                    <ul className="list-group-custom">
                    {this.props.user.fullname}  
                                    </ul>
                </div>
            
                    <div className="mt-40">
                    <h3 className="font-16 text-dark-blue font-weight-bold">Email</h3>

                    <ul className="list-group-custom">
                    {this.props.user.email}</ul>
                </div>
            
                    <div className="mt-40">
                    <h3 className="font-16 text-dark-blue font-weight-bold">Phone</h3>

                    <div className="mt-30">
                    {this.props.user.phone}</div>
                </div>
            
                    <div className="mt-40">
                    <h3 className="font-16 text-dark-blue font-weight-bold">Address</h3>

                    <div className="mt-20 d-flex align-items-center">
                    {this.props.user.address}</div>
                </div>
            

                    </div>
                    <div className="tab-pane fade" id="webinars" role="tabpanel" aria-labelledby="webinars-tab">
                        
                    {enroll&&enroll.length>0?
                    <div className="mt-20 row">
                            {enroll&&enroll.map((course, k) => 
                            <div className="col-lg-4 mt-20">
                        <div className="webinar-card">
            <figure>
                <div className="image-box">
                    
                <Link to={`/course/${course.id}`} params={course.id}>
                                                            <img src={course.imageVideoDescription}  className="img-cover" alt="Effective Time Management" />
                                                        </Link>

                            </div>

                            <figcaption className="webinar-card-body">
                                                        {/* <div className="user-inline-avatar d-flex align-items-center">
                                                            <div className="avatar">
                                                                <img src="/store/923/avatar/617a4f9983fe5.png" className="img-cover" alt="John Powe" />
                                                            </div>
                                                            <a href="users/923/profile" target="_blank" className="user-name ml-5 font-14">John Powe</a>
                                                        </div> */}

                                                        <Link to={`/course/${course.id}`} params={course.id}>
                                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">{course.title}</h3>
                                                        </Link>

                                                        {/* <span className="d-block font-14 mt-10"> In <a href="categories/Business/Management" target="_blank" className="text-decoration-underline">{course.catalog} </a></span> */}
                                                        
                                                        <div className="stars-card d-flex align-items-center mt-15">
                                                        {course.avgRatting?
                                                            [...Array(5)].map((e, i) => (i+0.5 < course.avgRatting)?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star active"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        :   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        ):   [...Array(5)].map((e, i) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        )}
                                                        {course.avgRatting?
                                                            <span className="badge badge-primary ml-10">{course.avgRatting.toFixed(1)}</span>
                                                            :<span className="badge badge-primary ml-10">0.0</span>
                                                        }
                                                        </div>

                                                        <div className="d-flex justify-content-between mt-20">
                                                            <div className="d-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock webinar-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                                <span className="duration font-14 ml-5">{course.videoDuration} Hours</span>
                                                            </div>

                                                            <div className="vertical-line mx-15"></div>

                                                            <div className="d-flex align-items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar webinar-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                                {course.updatedDate?<span className="date-published font-14 ml-5">{moment(course.updatedDate).format('MMM DD, YYYY')}</span>:''}
                                                            </div>
                                                        </div>

                                                        <div className="webinar-price-box mt-25">
                                                            <span className="real">${course.price}</span>
                                                        </div>
                                                    </figcaption>
            </figure>
        </div>
                            </div>
                            )}
                    
                    </div>
                    :
                    <div class="no-result default-no-result mt-50 d-flex align-items-center justify-content-center flex-column">
                        <div class="no-result-logo">
                            <img src="/assets/default/img/no-results/student.png" alt=""/>
                        </div>
                        <div class="d-flex align-items-center flex-column mt-30 text-center">
                            <h2 class="text-dark-blue">No Enroll Course!</h2>
                            <p class="mt-5 text-center text-gray font-weight-500">You can go to shopping a course and enroll on later.</p>
                        </div>
                    </div>
                    }

                    </div>
                    <div className="tab-pane fade" id="badges" role="tabpanel" aria-labelledby="badges-tab">
                     {courses&&courses.length>0?                                       
                    <div className="mt-20 row">
                        {courses.map((save,index) => 
                        <div className="col-lg-4 mt-20">
                    <div className="webinar-card">
        <figure>
            <div className="image-box">
                
            <Link to={`/course/${save.id}`} params={save.id}>
                                                        <img src={save.imageVideoDescription}  className="img-cover" alt="Effective Time Management" />
                                                    </Link>

                        </div>

                        <figcaption className="webinar-card-body">
                                                    {/* <div className="user-inline-avatar d-flex align-items-center">
                                                        <div className="avatar">
                                                            <img src="/store/923/avatar/617a4f9983fe5.png" className="img-cover" alt="John Powe" />
                                                        </div>
                                                        <a href="users/923/profile" target="_blank" className="user-name ml-5 font-14">John Powe</a>
                                                    </div> */}

                                                    <Link to={`/course/${save.id}`} params={save.id}>
                                                        <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">{save.title}</h3>
                                                    </Link>

                                                    {/* <span className="d-block font-14 mt-10"> In <a href="categories/Business/Management" target="_blank" className="text-decoration-underline">{course.catalog} </a></span> */}
                                                    
                                                    <div className="stars-card d-flex align-items-center mt-15">
                                                    {save.avgRatting?
                                                        [...Array(5)].map((e, i) => (i+0.5 < save.avgRatting)?
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star active"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    :   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    ):   [...Array(5)].map((e, i) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    )}
                                                    {save.avgRatting?
                                                        <span className="badge badge-primary ml-10">{save.avgRatting.toFixed(1)}</span>
                                                        :<span className="badge badge-primary ml-10">0.0</span>
                                                    }
                                                    </div>

                                                    <div className="d-flex justify-content-between mt-20">
                                                        <div className="d-flex align-items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock webinar-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                            <span className="duration font-14 ml-5">{save.videoDuration} Hours</span>
                                                        </div>

                                                        <div className="vertical-line mx-15"></div>

                                                        <div className="d-flex align-items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-calendar webinar-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                                            {save.updatedDate?<span className="date-published font-14 ml-5">{moment(save.updatedDate).format('MMM DD, YYYY')}</span>:''}
                                                        </div>
                                                    </div>

                                                    <div className="webinar-price-box mt-25">
                                                        <span className="real">${save.price}</span>
                                                    </div>
                                                </figcaption>
        </figure>
    </div>
                        </div>
                        )}
                    </div>
                    :
                    <div class="no-result default-no-result mt-50 d-flex align-items-center justify-content-center flex-column">
                        <div class="no-result-logo">
                            <img src="/assets/default/img/no-results/student.png" alt=""/>
                        </div>
                        <div class="d-flex align-items-center flex-column mt-30 text-center">
                            <h2 class="text-dark-blue">No Favorite Course!</h2>
                            <p class="mt-5 text-center text-gray font-weight-500">You can add a course to your favorites and enroll on later.</p>
                                </div>
                    </div>
}
                        </div>

                        <div className="tab-pane fade px-20 px-lg-50 " id="appointments" role="tabpanel" aria-labelledby="appointments-tab">
                            <div className="mt-40">
                <h3 className="font-16 font-weight-bold text-dark-blue">Click on a day and view available times</h3>

                <div className="mt-35">
                    <div className="row align-items-center justify-content-center">
                        <input type="hidden" id="inlineCalender" className="form-control"/>
                        <div className="inline-reservation-calender"></div>
                    </div>
                </div>
            </div>

            <div className="pick-a-time d-none" id="PickTimeContainer" data-user-id="1015">

                <div className="d-flex align-items-center my-40 rounded-lg border px-10 py-5">
                    <div className="appointment-timezone-icon">
                        <img src="/assets/default/img/icons/timezone.svg" alt="appointment timezone"/>
                    </div>
                    <div className="ml-15">
                        <div className="font-16 font-weight-bold text-dark-blue">Note:</div>
                        <p className="font-14 font-weight-500 text-gray">All of the time slots displayed in time zone America/New_York GMT -04:00</p>
                    </div>
                </div>


                <div className="loading-img d-none text-center">
                    <img src="/assets/default/img/loading.gif" width="80" height="80"/>
                </div>

                <form className="d-none">
                    <input type="hidden" name="_token" value="g4KwLYysx3Rf4UHggOKK39AoVOs7xYjNKLvMVnMl"/>
                    <input type="hidden" name="day" id="selectedDay" value=""/>

                    <h3 className="font-16 font-weight-bold text-dark-blue">
                                            Pick a time
                                                        </h3>

                    <div className="d-flex flex-column mt-10">
                                            <span className="d-block font-14 text-gray font-weight-500">
                                The instructor hourly charge is 

                                                                                            <span className="text-primary">$100</span>
                                                                                </span>

                                                <span className="d-block font-14 text-gray font-weight-500">
                                The instructor hourly charge for in-person classes is 

                                                                                            <span className="text-primary">$250</span>
                                                                                </span>
                                                                <span className="d-block font-14 text-gray font-weight-500">This instructor conducts group meetings (20 to 200 students).</span>
                        
                        
                        <span className="font-14 text-gray mt-5 selected_date font-weight-500">Selected date: <span></span></span>
                    </div>

                                    <div id="availableTimes" className="d-flex flex-wrap align-items-center mt-25">

                        </div>

                        <div className="js-time-description-card d-none mt-25 rounded-sm border p-10">

                        </div>

                        <div className="mt-25 d-none js-finalize-reserve">
                            <h3 className="font-16 font-weight-bold text-dark-blue">Finalize your meeting</h3>
                            <span className="selected-date-time font-14 text-gray font-weight-500">Meeting Time: <span></span></span>

                            <div className="mt-15">
                                <span className="font-16 font-weight-500 text-dark-blue">Meeting Type</span>

                                <div className="d-flex align-items-center mt-5">
                                    <div className="meeting-type-reserve position-relative">
                                        <input type="radio" name="meeting_type" id="meetingTypeInPerson" value="in_person"/>
                                        <label for="meetingTypeInPerson">In-person</label>
                                    </div>

                                    <div className="meeting-type-reserve position-relative">
                                        <input type="radio" name="meeting_type" id="meetingTypeOnline" value="online"/>
                                        <label for="meetingTypeOnline">Online</label>
                                    </div>
                                </div>
                            </div>

                                                    <div className="js-group-meeting-switch d-none align-items-center mt-20">
                                    <label className="mb-0 mr-10 text-gray font-14 font-weight-500 cursor-pointer"
                                        for="withGroupMeetingSwitch">Group meeting</label>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" name="with_group_meeting" className="custom-control-input"
                                            id="withGroupMeetingSwitch"/>
                                        <label className="custom-control-label" for="withGroupMeetingSwitch"></label>
                                    </div>
                                </div>

                                <div className="js-group-meeting-options d-none mt-15">
                                    <div className="row">
                                        <div className="col-12 col-lg-4">
                                            <div className="form-group">
                                                <input type="hidden" id="online_group_max_student" value="200"/>
                                                <input type="hidden" id="in_person_group_max_student" value="30"/>
                                                <label for="studentCountRange" className="form-label">Participates:</label>
                                                <div
                                                    className="range"
                                                    id="studentCountRange"
                                                    data-minLimit="1"
                                                >
                                                    <input type="hidden" name="student_count" value="1"/>
                                                    <div className="invalid-feedback"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="js-online-group-amount d-none font-14 font-weight-500 mt-15">
                                        <span className="text-gray d-block">Online Group meeting hourly rate is $50 per student.</span>
                                        <span className="text-danger mt-5 d-block">The instructor group meeting capacity is 20 to 200 students. The main price will be applied.</span>
                                        <span className="text-danger mt-5 d-block">Maximum group meeting capacity is 200.</span>
                                    </div>

                                    <div className="js-in-person-group-amount d-none font-14 font-weight-500 mt-15">
                                        <span className="text-gray d-block">In-person Group meeting hourly rate is $150 per student.</span>
                                        <span className="text-danger mt-5 d-block">The instructor group meeting capacity is 5 to 30 students. The main price will be applied.</span>
                                        <span className="text-danger mt-5 d-block">Maximum group meeting capacity is 30.</span>
                                    </div>
                                </div>
                                            </div>

                        <div className="js-reserve-description d-none form-group mt-30">
                            <label className="input-label">Description</label>
                            <textarea name="description" className="form-control" rows="5" placeholder="Description (Optional)"></textarea>
                        </div>

                        <div className="js-reserve-btn d-none align-items-center justify-content-end mt-30">
                            <button type="button" className="js-submit-form btn btn-primary">Reserve a Meeting</button>
                        </div>
                            </form>
            </div>

                            </div>
                    </div>
                </section>
            </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {        
        user: state.detail.user,
        enroll: state.course.coursesEnroll,
        courses: state.savedCourse.courses,
        unsavedSuccess: state.savedCourse.unsavedSuccess

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        fetchAllSavedRequest:() => dispatch (fetchAllSavedRequest()),
        fetchUnsavedRequest:(e) => dispatch (fetchUnsavedRequest(e)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
    };
}

export default withRouterParams(connect(mapStateToProps,mapDispatchToProps)(DetailUser)); 