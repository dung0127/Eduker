import React from "react";
import {Link} from "react-router-dom"
// import "@lottiefiles/lottie-player";
import loadjs from 'loadjs';
import Header from "./header.jsx";

class MainUser extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
        
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

                    <a href="/classes?sort=newest" className="btn btn-border-white">View All</a>
                </div>

                <div className="mt-10 position-relative">
                    <div className="swiper-container latest-webinars-swiper px-12">
                        <div className="swiper-wrapper py-20">
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-warning">Featured</span>

                                            <a
                                                href="https://lms.rocket-soft.org/course/The-Professional-Guitar-Masterclass">
                                                <img src="./store/1015/The Professional Guitar Masterclass.jpg"
                                                    className="img-cover" alt="New Learning Page"/>
                                            </a>

                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/1015/avatar/617a4f2fb8a6d.png" className="img-cover"
                                                        alt="Robert Ransdell"/>
                                                </div>
                                                <a href="/users/1015/profile" target="_blank"
                                                    className="user-name ml-5 font-14">Robert Ransdell</a>
                                            </div>

                                            <a
                                                href="https://lms.rocket-soft.org/course/The-Professional-Guitar-Masterclass">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">New
                                                    Learning Page</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a href="/categories/Lifestyle/Lifestyle"
                                                    target="_blank" className="text-decoration-underline">Lifestyle</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>

                                                <span className="badge badge-primary ml-10">5.00</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">3:30 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">1 Mar 2022</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real font-14">Free</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-secondary">In progress</span>

                                            <a href="https://lms.rocket-soft.org/course/New-in-App-Live-System">
                                                <img src="./store/1015/new_live_system.jpg" className="img-cover"
                                                    alt="New In-App Live System"/>
                                            </a>

                                            <div className="progress">
                                                <span className="progress-bar" style={{width: "40%"}}></span>
                                            </div>

                                            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20220301T020000Z/20220301T020000Z&amp;text=New+In-App+Live+System"
                                                target="_blank"
                                                className="webinar-notify d-flex align-items-center justify-content-center">
                                                <i data-feather="bell" width="20" height="20" className="webinar-icon"></i>
                                            </a>
                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/1015/avatar/617a4f2fb8a6d.png" className="img-cover"
                                                        alt="Robert Ransdell"/>
                                                </div>
                                                <a href="/users/1015/profile" target="_blank"
                                                    className="user-name ml-5 font-14">Robert Ransdell</a>
                                            </div>

                                            <a href="https://lms.rocket-soft.org/course/New-in-App-Live-System">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">New
                                                    In-App Live System</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a
                                                    href="/categories/Business/Communications" target="_blank"
                                                    className="text-decoration-underline">Communications</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>

                                                <span className="badge badge-primary ml-10">5.00</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">2:30 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">1 Mar 2022</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real">$10</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-primary">Course</span>

                                            <a href="https://lms.rocket-soft.org/course/The-Future-of-Energy">
                                                <img src="./store/929/The Future of Energy.jpg" className="img-cover"
                                                    alt="The Future of Energy"/>
                                            </a>

                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/929/avatar/617a4f5d834c8.png" className="img-cover"
                                                        alt="Kate Williams"/>
                                                </div>
                                                <a href="/users/929/profile" target="_blank"
                                                    className="user-name ml-5 font-14">Kate Williams</a>
                                            </div>

                                            <a href="https://lms.rocket-soft.org/course/The-Future-of-Energy">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">The
                                                    Future of Energy</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a href="/categories/Academics/Science"
                                                    target="_blank" className="text-decoration-underline">Science</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>

                                                <span className="badge badge-primary ml-10">2.50</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">1:10 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">7 Jul 2021</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real">$60</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-primary">Course</span>

                                            <a href="https://lms.rocket-soft.org/course/How-to-Manage-Your-Virtual-Team">
                                                <img src="./store/929/How to Manage &amp; Influence Your Virtual Team.jpg"
                                                    className="img-cover" alt="How to Manage Your Virtual Team"/>
                                            </a>

                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/929/avatar/617a4f5d834c8.png" className="img-cover"
                                                        alt="Kate Williams"/>
                                                </div>
                                                <a href="/users/929/profile" target="_blank"
                                                    className="user-name ml-5 font-14">Kate Williams</a>
                                            </div>

                                            <a href="https://lms.rocket-soft.org/course/How-to-Manage-Your-Virtual-Team">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">How
                                                    to Manage Your Virtual Team</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a
                                                    href="/categories/Business/Communications" target="_blank"
                                                    className="text-decoration-underline">Communications</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>

                                                <span className="badge badge-primary ml-10">3.75</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">1:30 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">30 Jun 2021</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real">$50</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-primary">Course</span>

                                            <a href="https://lms.rocket-soft.org/course/Web-Design-for-Beginners">
                                                <img src="./store/4/Web Design for Beginners.jpg" className="img-cover"
                                                    alt="Web Design for Beginners"/>
                                            </a>

                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/934/avatar/617a4f418be6b.png" className="img-cover"
                                                        alt="Linda Anderson"/>
                                                </div>
                                                <a href="/users/934/profile" target="_blank"
                                                    className="user-name ml-5 font-14">Linda Anderson</a>
                                            </div>

                                            <a href="https://lms.rocket-soft.org/course/Web-Design-for-Beginners">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">Web
                                                    Design for Beginners</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a href="/categories/Design"
                                                    target="_blank" className="text-decoration-underline">Design</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className=""></i>

                                                <span className="badge badge-primary ml-10">4.25</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">1:45 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">7 Jul 2021</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real">$10</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="webinar-card">
                                    <figure>
                                        <div className="image-box">
                                            <span className="badge badge-primary">Not conducted</span>

                                            <a href="https://lms.rocket-soft.org/course/Effective-Time-Management">
                                                <img src="./store/867/Effective Time Management.jpg" className="img-cover"
                                                    alt="Effective Time Management"/>
                                            </a>

                                            <div className="progress">
                                                <span className="progress-bar" style={{width: "40%"}}></span>
                                            </div>

                                            <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20230731T193000Z/20230731T193000Z&amp;text=Effective+Time+Management"
                                                target="_blank"
                                                className="webinar-notify d-flex align-items-center justify-content-center">
                                                <i data-feather="bell" width="20" height="20" className="webinar-icon"></i>
                                            </a>
                                        </div>

                                        <figcaption className="webinar-card-body">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                <div className="avatar">
                                                    <img src="./store/923/avatar/617a4f9983fe5.png" className="img-cover"
                                                        alt="John Powe"/>
                                                </div>
                                                <a href="/users/923/profile" target="_blank"
                                                    className="user-name ml-5 font-14">John Powe</a>
                                            </div>

                                            <a href="https://lms.rocket-soft.org/course/Effective-Time-Management">
                                                <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                    Effective Time Management</h3>
                                            </a>

                                            <span className="d-block font-14 mt-10">In <a href="/categories/Business/Management"
                                                    target="_blank" className="text-decoration-underline">Management</a></span>

                                            <div className="stars-card d-flex align-items-center  mt-15">
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>
                                                <i data-feather="star" width="20" height="20" className="active"></i>

                                                <span className="badge badge-primary ml-10">5.00</span>

                                            </div>

                                            <div className="d-flex justify-content-between mt-20">
                                                <div className="d-flex align-items-center">
                                                    <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                    <span className="duration font-14 ml-5">1:30 Hours</span>
                                                </div>

                                                <div className="vertical-line mx-15"></div>

                                                <div className="d-flex align-items-center">
                                                    <i data-feather="calendar" width="20" height="20"
                                                        className="webinar-icon"></i>
                                                    <span className="date-published font-14 ml-5">31 Jul 2023</span>
                                                </div>
                                            </div>

                                            <div className="webinar-price-box mt-25">
                                                <span className="real">$30</span>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </div>

                        </div>
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

                <a href="/classes?sort=best_rates" className="btn btn-border-white">View All</a>
            </div>

            <div className="mt-10 position-relative">
                <div className="swiper-container best-rates-webinars-swiper px-12">
                    <div className="swiper-wrapper py-20">
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-secondary">In progress</span>

                                        <a href="https://lms.rocket-soft.org/course/Health-And-Fitness-Masterclass">
                                            <img src="./store/863/Health And Fitness Masterclass Beginner To Advanced.jpg"
                                                className="img-cover" alt="Health And Fitness Masterclass"/>
                                        </a>

                                        <div className="progress">
                                            <span className="progress-bar" style={{width: "60%"}}></span>
                                        </div>

                                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20210630T153000Z/20210630T153000Z&amp;text=Health+And+Fitness+Masterclass"
                                            target="_blank"
                                            className="webinar-notify d-flex align-items-center justify-content-center">
                                            <i data-feather="bell" width="20" height="20" className="webinar-icon"></i>
                                        </a>
                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/870/avatar/617a4f7c09d61.png" className="img-cover"
                                                    alt="Jessica Wray"/>
                                            </div>
                                            <a href="/users/870/profile" target="_blank"
                                                className="user-name ml-5 font-14">Jessica Wray</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/Health-And-Fitness-Masterclass">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                Health And Fitness Masterclass</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a
                                                href="/categories/Health-&amp;-Fitness" target="_blank"
                                                className="text-decoration-underline">Health &amp; Fitness</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>

                                            <span className="badge badge-primary ml-10">5.00</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">1:00 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">30 Jun 2021</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real">$20</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-primary">Not conducted</span>

                                        <a href="https://lms.rocket-soft.org/course/Effective-Time-Management">
                                            <img src="./store/867/Effective Time Management.jpg" className="img-cover"
                                                alt="Effective Time Management"/>
                                        </a>

                                        <div className="progress">
                                            <span className="progress-bar" style={{width: "40%"}}></span>
                                        </div>

                                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20230731T193000Z/20230731T193000Z&amp;text=Effective+Time+Management"
                                            target="_blank"
                                            className="webinar-notify d-flex align-items-center justify-content-center">
                                            <i data-feather="bell" width="20" height="20" className="webinar-icon"></i>
                                        </a>
                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/923/avatar/617a4f9983fe5.png" className="img-cover"
                                                    alt="John Powe"/>
                                            </div>
                                            <a href="/users/923/profile" target="_blank"
                                                className="user-name ml-5 font-14">John Powe</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/Effective-Time-Management">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                Effective Time Management</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a href="/categories/Business/Management"
                                                target="_blank" className="text-decoration-underline">Management</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>

                                            <span className="badge badge-primary ml-10">5.00</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">1:30 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">31 Jul 2023</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real">$30</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-secondary">In progress</span>

                                        <a href="https://lms.rocket-soft.org/course/Learn-Linux-in-5-Days">
                                            <img src="./store/1015/hero (6).jpg" className="img-cover"
                                                alt="Learn Linux in 5 Days"/>
                                        </a>

                                        <div className="progress">
                                            <span className="progress-bar" style={{width: "50%"}}></span>
                                        </div>

                                        <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;dates=20210709T153000Z/20210709T153000Z&amp;text=Learn+Linux+in+5+Days"
                                            target="_blank"
                                            className="webinar-notify d-flex align-items-center justify-content-center">
                                            <i data-feather="bell" width="20" height="20" className="webinar-icon"></i>
                                        </a>
                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/1015/avatar/617a4f2fb8a6d.png" className="img-cover"
                                                    alt="Robert Ransdell"/>
                                            </div>
                                            <a href="/users/1015/profile" target="_blank"
                                                className="user-name ml-5 font-14">Robert Ransdell</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/Learn-Linux-in-5-Days">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                Learn Linux in 5 Days</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a
                                                href="/categories/Development/Web-Development" target="_blank"
                                                className="text-decoration-underline">Web Development</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className=""></i>

                                            <span className="badge badge-primary ml-10">4.69</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">7:30 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">9 Jul 2021</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real font-14">Free</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-primary">Text course</span>

                                        <a href="https://lms.rocket-soft.org/course/Learn-Python-Programming">
                                            <img src="./store/934/Python for Beginners.jpg" className="img-cover"
                                                alt="Learn Python Programming"/>
                                        </a>

                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/934/avatar/617a4f418be6b.png" className="img-cover"
                                                    alt="Linda Anderson"/>
                                            </div>
                                            <a href="/users/934/profile" target="_blank"
                                                className="user-name ml-5 font-14">Linda Anderson</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/Learn-Python-Programming">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                Learn Python Programming</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a
                                                href="/categories/Development/Web-Development" target="_blank"
                                                className="text-decoration-underline">Web Development</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className=""></i>

                                            <span className="badge badge-primary ml-10">4.63</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">0:35 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">29 Jun 2021</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real font-14">Free</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-primary">Course</span>

                                        <a href="https://lms.rocket-soft.org/course/Become-a-Product-Manager">
                                            <img src="./store/1016/1.jpg" className="img-cover"
                                                alt="Become a Product Manager"/>
                                        </a>

                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/1016/avatar/617a4f17c8e72.png" className="img-cover"
                                                    alt="Ricardo dave"/>
                                            </div>
                                            <a href="/users/1016/profile" target="_blank"
                                                className="user-name ml-5 font-14">Ricardo dave</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/Become-a-Product-Manager">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">
                                                Become a Product Manager</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a
                                                href="/categories/Business/Business-Strategy" target="_blank"
                                                className="text-decoration-underline">Business Strategy</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className=""></i>

                                            <span className="badge badge-primary ml-10">4.58</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">2:30 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">28 Jun 2021</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real font-14">Free</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <div className="swiper-slide">
                            <div className="webinar-card">
                                <figure>
                                    <div className="image-box">
                                        <span className="badge badge-primary">Course</span>

                                        <a href="https://lms.rocket-soft.org/course/How-to-Manage-Your-Virtual-Team">
                                            <img src="./store/929/How to Manage &amp; Influence Your Virtual Team.jpg"
                                                className="img-cover" alt="How to Manage Your Virtual Team"/>
                                        </a>

                                    </div>

                                    <figcaption className="webinar-card-body">
                                        <div className="user-inline-avatar d-flex align-items-center">
                                            <div className="avatar">
                                                <img src="./store/929/avatar/617a4f5d834c8.png" className="img-cover"
                                                    alt="Kate Williams"/>
                                            </div>
                                            <a href="/users/929/profile" target="_blank"
                                                className="user-name ml-5 font-14">Kate Williams</a>
                                        </div>

                                        <a href="https://lms.rocket-soft.org/course/How-to-Manage-Your-Virtual-Team">
                                            <h3 className="mt-15 webinar-title font-weight-bold font-16 text-dark-blue">How
                                                to Manage Your Virtual Team</h3>
                                        </a>

                                        <span className="d-block font-14 mt-10">In <a
                                                href="/categories/Business/Communications" target="_blank"
                                                className="text-decoration-underline">Communications</a></span>

                                        <div className="stars-card d-flex align-items-center  mt-15">
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className="active"></i>
                                            <i data-feather="star" width="20" height="20" className=""></i>
                                            <i data-feather="star" width="20" height="20" className=""></i>

                                            <span className="badge badge-primary ml-10">3.13</span>

                                        </div>

                                        <div className="d-flex justify-content-between mt-20">
                                            <div className="d-flex align-items-center">
                                                <i data-feather="clock" width="20" height="20" className="webinar-icon"></i>
                                                <span className="duration font-14 ml-5">1:30 Hours</span>
                                            </div>

                                            <div className="vertical-line mx-15"></div>

                                            <div className="d-flex align-items-center">
                                                <i data-feather="calendar" width="20" height="20"
                                                    className="webinar-icon"></i>
                                                <span className="date-published font-14 ml-5">30 Jun 2021</span>
                                            </div>
                                        </div>

                                        <div className="webinar-price-box mt-25">
                                            <span className="real">$50</span>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="swiper-pagination best-rates-webinars-swiper-pagination">hihi</div>
                </div>
            </div>
        </section>
           
            </>
        );
    } 
};
 

export default MainUser;