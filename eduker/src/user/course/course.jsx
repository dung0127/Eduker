import React from "react";
import { connect } from 'react-redux';
import { fetchCourseRequest } from "../../actions/course"
import { Link } from "react-router-dom"
import { addToCart } from "../../actions/cart";
import { fetchSavedRequest } from "../../actions/savedCourse";
import moment from 'moment';
import Header from "../layout/header.jsx";

  
let date
class Course extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleClick(data) {
        console.log(data);
        if (data >= 0 && data < this.props.totalPages) {
            this.props.fetchCourseRequest(data);
        }
    }

    componentDidMount() {
        this.props.fetchCourseRequest(this.props.page);
    }
    handleInputSearchCourseChange = e => {
        let value = e.target.value
        this.setState({ searchCourse: value });
    }

    searchCourse = (searchCourse) => {
        this.props.searchCourseRequest(searchCourse)
    }

    savedCourse = (id) => {
        this.props.fetchSavedRequest(id);
    }

    render() {
        return (
            <>
                <Header/>
                <section className="site-top-banner search-top-banner opacity-04 position-relative">
                    <img src="./store/1/default_images/category_cover.png" className="img-cover" alt="" />

                    <div className="container h-100">
                        <div className="row h-100 align-items-center justify-content-center text-center">
                            <div className="col-12 col-md-9 col-lg-7">
                                <div className="top-search-categories-form">
                                    <h1 className="text-white font-30 mb-15">Courses</h1>
                                    {/* <span className="course-count-badge py-5 px-10 text-white rounded">{this.props.courses.length} Courses</span> */}
{/* 
                                    <div className="search-input bg-white p-10 flex-grow-1">
                                        <form action="/search" method="get">
                                            <div className="form-group d-flex align-items-center m-0">
                                                <input type="text" name="search" className="form-control border-0" placeholder="Search courses, instructors and organizations..." />
                                                <button type="submit" className="btn btn-primary rounded-pill">Search</button>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container mt-30">

                    <section className="mt-lg-50 pt-lg-20 mt-md-40 pt-md-40">
                        <form action="/classNamees" method="get" id="filtersForm">

                            {/* <div id="topFilters" className="shadow-lg border border-gray300 rounded-sm p-10 p-md-20">
                                <div className="row align-items-center">
                                    <div className="col-lg-3 d-flex align-items-center">
                                        <div className="checkbox-button primary-selected">
                                            <input type="radio" name="card" id="gridView" value="grid" checked="checked" />
                                            <label for="gridView" className="bg-white border-0 mb-0">
                                                <i data-feather="grid" width="25" height="25" className=" text-primary "></i>
                                            </label>
                                        </div>

                                        <div className="checkbox-button primary-selected ml-10">
                                            <input type="radio" name="card" id="listView" value="list" />
                                            <label for="listView" className="bg-white border-0 mb-0">
                                                <i data-feather="list" width="25" height="25" className=""></i>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 d-block d-md-flex align-items-center justify-content-end my-25 my-lg-0">
                                        <div className="d-flex align-items-center justify-content-between justify-content-md-center mx-0 mx-md-20 my-20 my-md-0">
                                            <label className="mb-0 mr-10 cursor-pointer" for="upcoming">Upcoming</label>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="upcoming" className="custom-control-input" id="upcoming" />
                                                <label className="custom-control-label" for="upcoming"></label>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between justify-content-md-center">
                                            <label className="mb-0 mr-10 cursor-pointer" for="free">Free</label>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="free" className="custom-control-input" id="free" />
                                                <label className="custom-control-label" for="free"></label>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between justify-content-md-center mx-0 mx-md-20 my-20 my-md-0">
                                            <label className="mb-0 mr-10 cursor-pointer" for="discount">Discount</label>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="discount" className="custom-control-input" id="discount" />
                                                <label className="custom-control-label" for="discount"></label>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between justify-content-md-center">
                                            <label className="mb-0 mr-10 cursor-pointer" for="download">Download</label>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" name="downloadable" className="custom-control-input" id="download" />
                                                <label className="custom-control-label" for="download"></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 d-flex align-items-center">
                                        <select name="sort" className="form-control font-14">
                                            <option disabled selected>Sort by</option>
                                            <option value="">All</option>
                                            <option value="newest" selected="selected" >Newest</option>
                                            <option value="expensive" >Highest Price</option>
                                            <option value="inexpensive" >Lowest Price</option>
                                            <option value="bestsellers" >Bestsellers</option>
                                            <option value="best_rates" >Best Rated</option>
                                        </select>
                                    </div>

                                </div>
                            </div> */}

                            <div className="row mt-20">
                                <div className="col-12 col-lg-12">

                                    <div className="row">
                                    {
                                    this.props.courses.map((course,index) => {
                                        return (
                                            <div className="col-12 col-lg-6 mt-20"  key={index}>
                                                <div className="webinar-card">
                                                <figure>
                                                    <div className="image-box">
                                                        {/* <span className="badge badge-primary">Not conducted</span> */}

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
                                </div>


                                {/* <div className="col-12 col-lg-4">
                                    <div className="mt-20 p-20 rounded-sm shadow-lg border border-gray300 filters-container">

                                        <div className="">
                                            <h3 className="category-filter-title font-20 font-weight-bold text-dark-blue">Type</h3>

                                            <div className="pt-10">
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagewebinar">Live className</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="type[]" id="filterLanguagewebinar" value="webinar" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagewebinar"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagecourse">Course</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="type[]" id="filterLanguagecourse" value="course" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagecourse"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagetext_lesson">Text course</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="type[]" id="filterLanguagetext_lesson" value="text_lesson" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagetext_lesson"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-25 pt-25 border-top border-gray300">
                                            <h3 className="category-filter-title font-20 font-weight-bold text-dark-blue">More options</h3>

                                            <div className="pt-10">
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagesubscribe">Show only subscribe</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="moreOptions[]" id="filterLanguagesubscribe" value="subscribe" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagesubscribe"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagecertificate_included">Show only certificate included</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="moreOptions[]" id="filterLanguagecertificate_included" value="certificate_included" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagecertificate_included"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagewith_quiz">Show only courses with quiz</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="moreOptions[]" id="filterLanguagewith_quiz" value="with_quiz" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagewith_quiz"></label>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-20">
                                                    <label className="cursor-pointer" for="filterLanguagefeatured">Show only featured courses</label>
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" name="moreOptions[]" id="filterLanguagefeatured" value="featured" className="custom-control-input" />
                                                        <label className="custom-control-label" for="filterLanguagefeatured"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <button type="submit" className="btn btn-sm btn-primary btn-block mt-30">Filter items</button>
                                    </div>
                                </div> */}
                            </div>

                        </form>
                        {this.props.totalPages>1?
                        <div className="mt-50 pt-30">
                            <nav className="d-flex justify-content-center">
                                <ul className="custom-pagination d-flex align-items-center justify-content-center">
                                    {this.props.page > 0?   
                                    <li  className="previous" onClick={() => this.handleClick(this.props.page-1)}>
                                        <a><svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </a></li>
                                    :<li className="previous disabled">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </li>} 
                                    {[...Array(this.props.totalPages)].map((e, i) => (this.props.page) == i ?<li><a style={{cursor:"pointer"}} className="active" onClick={() => this.handleClick(i)} key={i}>{i+1}</a></li>
                                                                                                :<li><a style={{cursor:"pointer"}} onClick={() => this.handleClick(i)} key={i}>{i+1}</a></li>)         }
                                    {this.props.page  < (this.props.totalPages-1)?
                                    <li className="next" onClick={() => this.handleClick(this.props.page+1)}><a>
                                        <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </a></li>
                                    :<li className="next disabled">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </li>
                                    }   
                                </ul>
                            </nav>
                        </div>
                        :''}
                    </section>
                </div>
            </>
        );
    }

};

const mapStateToProps = state => {
    return {
        courses: state.course.courses,
        page: state.course.page,
        totalPages: state.course.totalPages,
        cartItems: state.cart.items,
        savedSuccess: state.savedCourse.savedSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest: (e) => dispatch(fetchCourseRequest(e)),
        addToCart: (e, p) => dispatch(addToCart(e, p)),
        fetchSavedRequest: (e) => dispatch(fetchSavedRequest(e)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
