import React from "react";
import {Link} from "react-router-dom"
import loadjs from 'loadjs';
import Header from "./header.jsx";
import {connect} from 'react-redux';
import { fetchCourseIndexRequest, fetchCourseTopRequest } from "../../actions/course";
import {fetchDetailUserRequest} from "../../actions/detail";
import { addToCart } from "../../actions/cart";
import moment from 'moment';


class MainUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course:'',
        }
       
    }

    componentDidMount(){
       
        loadjs('https://unpkg.com/swiper@8/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        this.props.fetchCourseIndexRequest();
        this.props.fetchCourseTopRequest();
    }
    componentDidUpdate(){
        
    }

    render() {
        return (
            <>
            <Header/>
            <section className="slider-container  slider-hero-section2"
                style={{backgroundImage: 'url("/assets/default/img/home/world.png")'}} ><div className="container user-select-none">

                    <div className="row slider-content align-items-center hero-section2 flex-column-reverse flex-md-row">
                        <div className="col-12 col-md-7 col-lg-6">
                            <h1 className="text-secondary font-weight-bold">Joy of learning &amp; teaching...</h1>
                            <p className="slide-hint text-gray mt-20">Rocket LMS is a fully-featured educational platform that
                                helps instructors to create and publish video courses, live classNamees, and text courses and
                                earn money, and helps students to learn in the easiest way.</p>

                            {/* <form action="/search" method="get" className="d-inline-flex mt-30 mt-lg-30 w-100">
                                <div className="form-group d-flex align-items-center m-0 slider-search p-10 bg-white w-100">
                                    <input type="text" name="search" className="form-control border-0 mr-lg-50"
                                        placeholder="Search courses, instructors and organizations..." />
                                    <button type="submit" className="btn btn-primary rounded-pill">Search</button>
                                </div>
                            </form> */}
                        </div>
                        <div className="col-12 col-md-5 col-lg-6">
                            <lottie-player src="/store/1/animated-header.json" background="transparent" speed="1" className="w-100" loop autoPlay></lottie-player>
                        </div>
                    </div>
                </div>
         
            </section>
            <div className="stats-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 mt-25 mt-lg-0">
                            <div className="stats-item d-flex flex-column align-items-center text-center py-30 px-5 w-100">
                                <div className="stat-icon-box teacher">
                                    <img src="/assets/default/img/stats/teacher.svg" alt="" />
                                </div>
                                {/* <strong className="stat-number mt-10">7</strong> */}
                                <h4 className="stat-title">Skillful Instructors</h4>
                                <p className="stat-desc mt-10">Start learning from experienced instructors.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-25 mt-lg-0">
                            <div className="stats-item d-flex flex-column align-items-center text-center py-30 px-5 w-100">
                                <div className="stat-icon-box student">
                                    <img src="./assets/default/img/stats/student.svg" alt="" />
                                </div>
                                {/* <strong className="stat-number mt-10">6</strong> */}
                                <h4 className="stat-title">Happy Students</h4>
                                <p className="stat-desc mt-10">Enrolled in our courses and improved their skills.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-25 mt-lg-0">
                            <div className="stats-item d-flex flex-column align-items-center text-center py-30 px-5 w-100">
                                <div className="stat-icon-box video">
                                    <img src="./assets/default/img/stats/video.svg" alt="" />
                                </div>
                                {/* <strong className="stat-number mt-10">8</strong> */}
                                <h4 className="stat-title">Favorite courses</h4>
                                <p className="stat-desc mt-10">Improve your skills using live knowledge flow.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-25 mt-lg-0">
                            <div className="stats-item d-flex flex-column align-items-center text-center py-30 px-5 w-100">
                                <div className="stat-icon-box course">
                                    <img src="./assets/default/img/stats/course.svg" alt="" />
                                </div>
                                {/* <strong className="stat-number mt-10">7</strong> */}
                                <h4 className="stat-title">Video Courses</h4>
                                <p className="stat-desc mt-10">Learn without any geographical &amp; time limitations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="home-sections home-sections-swiper container">
                <div className="d-flex justify-content-between ">
                    <div>
                        <h2 className="section-title">Newest Courses</h2>
                        <p className="section-hint">#Recently published courses</p>
                    </div>

                </div>

                <div className="mt-10 position-relative">
                    <div className="swiper-container latest-webinars-swiper px-12">
                        {this.props.coursesIndex?
                        <div className="swiper-wrapper py-20">
                        {
                            this.props.coursesIndex.map((course,index) => {
                                return (
                                <div className="swiper-slide">
                                    <div className="webinar-card">
                                                <figure>
                                                    <div className="image-box">
                                                        <span className="badge badge-primary" style={{backgroundColor:"#405ad9"}} >New </span>

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

                                                        <span className="d-block font-14 mt-10"> {course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''}</span>
                                                       
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
                            )
                            })
                        }
                        </div>
                        :''}
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="swiper-pagination latest-webinars-swiper-pagination"></div>
                    </div>
                </div>
            </section>
            <section className="home-sections home-sections-swiper container">
            <div className="d-flex justify-content-between">
                <div>
                    <h2 className="section-title">Best Rated Courses</h2>
                    <p className="section-hint">#Enjoy high quality and best rated content</p>
                </div>

            </div>

            <div className="mt-10 position-relative">
                <div className="swiper-container best-rates-webinars-swiper px-12">
                    {this.props.coursesTop?
                    <div className="swiper-wrapper py-20">
                    {
                    this.props.coursesTop.map((course,k) => {
                        return (
                        <div className="swiper-slide">
                            <div className="webinar-card">
                            <figure>
                                <div className="image-box">
                                    <span style={{backgroundColor:"#fb3838"}} className="badge badge-primary">Best seller</span>

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

                                    <span className="d-block font-14 mt-10"> {course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''}</span>
                                    
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
                            )
                        })
                    }
                    </div>
                    :''}
                </div>

                <div className="d-flex justify-content-center">
                    <div className="swiper-pagination best-rates-webinars-swiper-pagination"></div>
                </div>
            </div>
        </section>
           
            </>
        );
    } 
};
 

const mapStateToProps = state => {
    return {        
        coursesIndex: state.course.coursesIndex,
        coursesTop: state.course.coursesTop,
        cartItems: state.cart.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseIndexRequest:() => dispatch (fetchCourseIndexRequest()),
        fetchCourseTopRequest:() => dispatch (fetchCourseTopRequest()),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MainUser);
