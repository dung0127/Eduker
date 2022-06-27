import React, { Component } from "react";
import {connect} from 'react-redux';
import { withRouterParams } from "../../admin/layout/auth/withRouter";
import {courseByIdRequest} from "../../actions/course";
import {Link} from "react-router-dom";
import { addToCart,removeFromCart } from "../../actions/cart";
import {fetchSavedRequest, fetchUnsavedRequest } from "../../actions/savedCourse";
import moment from 'moment';
import loadjs from 'loadjs';
import { fetchCreateReviewRequest,fetchDeleteReviewRequest,fetchUpdateReviewRequest } from "../../actions/review";
import Header from "../layout/header.jsx";
import jQuery from "jquery";

class CourseById extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.params.id,      
            save:'', 
            show: false,
            review:{}
        }

    }

    addCart = (items, courses) => {
        this.props.addToCart(items, courses);

    }

    stopVideo = (id) => {
        
        $("#videoModalLecture"+id).on('hidden.bs.modal', function(e) {
            var $iframes = $(e.target).find('iframe');
            $iframes.each(function(index, iframe){
            $(iframe).attr('src', $(iframe).attr('src'));
            });
          })
    }

    createReview = (form, id) => {
        form.courseId = id
        this.props.fetchCreateReviewRequest(form, id),
        loadjs('/assets/default/js/review.js', () => {});

    }

    updateReview = (form, id) => {
        form.courseId = id
        let newForm = Object.assign(this.props.course.userReview,form);
        this.props.fetchUpdateReviewRequest(newForm, id)
        this.setState({show:false})
        loadjs('/assets/default/js/review.js', () => {});

    }

    deleteReview = (idReview, id) => {
        this.props.fetchDeleteReviewRequest(idReview ,id);
        loadjs('/assets/default/js/review.js', () => {});

    }

    formReview = e => {   
        let formData = Object.assign({}, this.state.review); 
        //console.log(formDataLecture)
        formData[e.target.name] = e.target.value;        
        this.setState({review:formData});  
        console.log(formData);
    }

    showEdit = () => {
        this.state.show? this.setState({show: false}) : this.setState({show: true})
    }

    savedCourse = (id) => {
        this.props.fetchSavedRequest(id);
    }

    unsavedCourse = (id) => {
        this.props.fetchUnsavedRequest(id);
    }

    componentDidMount(){
       
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        // loadjs('/assets/default/js/parts/categories.min.js', () => {});
        // loadjs('/assets/default/vendors/feather-icons/dist/feather.min.js', () => {});
        // loadjs('/assets/default/js/cart.js', () => {});

        
        this.props.courseByIdRequest(this.state.id);

    } 

    
    render(){
        let dem = 0;
        return (
            <>
            <Header/>
            <section className="course-cover-container not-active-special-offer">
                <img src={this.props.course.imageVideoDescription} className="img-cover course-cover-img" alt="New In-App Live System"/>

                <div className="cover-content pt-40">
                    <div className="container position-relative">
                    </div>
                </div>
            </section>
            <section className="container course-content-section webinar">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="course-content-body user-select-none">
                            <div className="course-body-on-cover text-white">
                                <h1 className="font-30 course-title">
                                {this.props.course.title}
                                </h1>
                                <span className="d-block font-16 mt-10">{this.props.course.shortDescription}</span>

                                <div className="d-flex align-items-center">
                                    <div className="stars-card d-flex align-items-center  mt-15">
                                        {this.props.course.avgRatting?
                                            [...Array(5)].map((e, i) => (i+0.5 < this.props.course.avgRatting)?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star active"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        :   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        ):   [...Array(5)].map((e, i) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        )}
                                    
                                        <span className="badge badge-primary ml-10">{this.props.course.avgRatting&&this.props.course.avgRatting.toFixed(1)}</span>
            
                                    </div>
                                    <span className="ml-10 mt-15 font-14">({this.props.course.reviews&&this.props.course.reviews.length} Ratings)</span>
                                </div>

                                <div className="mt-15">
                                    <span className="font-14"> </span>
                                {this.props.course.language=='VN'?'Vietnamese':this.props.course.language=='ENG'?'English':this.props.course.language=='FR'?'French':this.props.course.language=='JP'?'Japanese':''}
                                </div>

                                <div className="mt-30 d-flex align-items-center">
                                    <div className="progress course-progress flex-grow-1 shadow-xs rounded-sm">
                                        <span className="progress-bar rounded-sm bg-warning" style={{width:" 40%"}}></span>
                                    </div>

                                    <span className="ml-15 font-14 font-weight-500">
                                        {this.props.course.totalSold} Customers enrolled
                                    </span>
                                </div>
                            </div>

                            <div className=" mt-35 ">
                                <ul className="nav nav-tabs bg-secondary rounded-sm p-15 d-flex align-items-center justify-content-between" id="tabs-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="position-relative font-14 text-white active" id="information-tab"
                                        data-toggle="tab" href="#information" role="tab" aria-controls="information"
                                        aria-selected="true">Information</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="position-relative font-14 text-white " id="content-tab" data-toggle="tab"
                                        href="#content" role="tab" aria-controls="content"
                                        aria-selected="false">Content</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="position-relative font-14 text-white " id="reviews-tab" data-toggle="tab"
                                        href="#reviews" role="tab" aria-controls="reviews"
                                        aria-selected="false">Reviews</a>
                                    </li>
                                </ul>

                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active " id="information" role="tabpanel"
                                        aria-labelledby="information-tab">
                                        <div className="mt-20">
                                            <h1 className="section-title after-line">About this course</h1>
                                            <br/>
                                            <div className="mt-15 course-description">
                                                <p><font color="#1c1d1f"><b>Requirements</b></font></p>
                                                <p style={{fontSize:"14px;color:rgb(28,29,31);"}}>{this.props.course.requirement} </p>
                                                <br/>
                                                <p><font color="#1c1d1f"><b>Description</b></font></p>
                                                <p style={{fontSize:"14px;color:rgb(28,29,31);"}}>{this.props.course.description} </p>
                                                <br/>
                                                <p><font color="#1c1d1f"><b>Who this course is for? </b></font></p>
                                                <p style={{fontSize:"14px;color:rgb(28,29,31);"}}>{this.props.course.whoThisCourseIsFor}</p>
                                                <br/>
                                                <p><font color="#1c1d1f"><b>What you'll learn?</b></font></p>
                                                <p style={{fontSize:"14px;color:rgb(28,29,31);"}}>{this.props.course.whatYouWillLearn}</p>

                                                
                                            </div>
                                        </div>


                                    {/* <div className="mt-35">
                                        <h2 className="section-title after-line">Comments <span className="ml-5">(0)</span></h2>

                                        <div className="mt-20">
                                            <form >

                                                <input type="hidden" name="_token" value=" V1yQUuqpChkymsEzCbH3pHmi4wVeZ6rhp2xV2qJX"/>
                                                <input type="hidden" id="commentItemId" name="item_id" value="2009"/>
                                                <input type="hidden" id="commentItemName" name="item_name" value="webinar_id"/>

                                                <div className="form-group">
                                                    <textarea name="comment" className="form-control " rows="10"></textarea>
                                                    <div className="invalid-feedback"></div>
                                                </div>
                                                <button type="submit" className="btn btn-sm btn-primary">Post comment</button>
                                            </form>
                                        </div>
                                    </div> */}


                                    </div>
                                    <div className="tab-pane fade " id="content" role="tabpanel" aria-labelledby="content-tab">
                                        <section className="mt-20">
                
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="accordion-content-wrapper" id="chaptersAccordionsessions" role="tablist" aria-multiselectable="true">
                                                {
                                                    this.props.course.lessons?
                                                    this.props.course.lessons.map((lesson,index) => {
                                                        let count =0
                                                        {lesson.lectures.map((lecture,i)=> count++)}
                                                        return (
                                                            <div className="accordion-row rounded-sm border mt-20 p-15">
                                                    <div className="d-flex align-items-center justify-content-between" role="tab" id={"lesson"+lesson.id}>
                                                        <div className="js-chapter-collapse-toggle d-flex align-items-center" href={"#lessonClose"+lesson.id} aria-controls={"lessonClose"+lesson.id} data-parent="#chaptersAccordionsessions" role="button" data-toggle="collapse" aria-expanded="true">
                                                            <span className="chapter-icon mr-15"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>

                                                            <span className="font-weight-bold text-secondary font-14">{lesson.title}</span>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <span className="mr-15 font-14 text-gray">
                                                                {count} lectures
                                                            </span>
                                                            {count>0?
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down collapse-chevron-icon" href={"#lessonClose"+lesson.id} aria-controls={"lessonClose"+lesson.id} data-parent="#chaptersAccordionsessions" role="button" data-toggle="collapse" aria-expanded="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                            :''}
                                                        </div>
                                                    </div>

                                                    <div id={"lessonClose"+lesson.id} aria-labelledby={"#lesson"+lesson.id} className=" collapse" role="tabpanel">
                                                        <div className="panel-collapse">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div className="accordion-content-wrapper" id="sessionsAccordion" role="tablist" aria-multiselectable="true">
                                                                            {lesson.lectures.map((lecture,i)=>{
                                                                                
                                                                                return (
                                                                                    <div className="accordion-row rounded-sm border mt-20 p-15">
                                                                                        <div className="d-flex align-items-center justify-content-between" role="tab" id="session_76">
                                                                                            <div className="d-flex align-items-center" href="#collapseSession76" aria-controls="collapseSession76" data-parent="#sessionsAccordion" role="button" data-toggle="collapse" aria-expanded="true">
                                                                                                <span className="d-flex align-items-center justify-content-center mr-15">
                                                                                                    <span className="chapter-icon chapter-content-icon">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film text-gray"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                                                                                                    </span>
                                                                                                </span>
                                                                                                <span className="font-weight-bold text-secondary font-14">{lecture.title}</span>
                                                                                            </div>
                                                                                            <div className="d-flex align-items-center">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock text-gray mr-5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                                                                <span className="mr-15 font-14 text-gray">
                                                                                                    {lecture.videoDuration} hours
                                                                                                </span>
                                                                                                {lecture.videoUrl?
                                                                                                lecture.preview?
                                                                                                <a href="#" data-toggle="modal" data-target={"#videoModalLecture"+lecture.id} className="course-content-btns  ">
                                                                                                <img  src="http://www.downloadclipart.net/medium/play-button-png-clipart.png" style={{width:"30px",height:"25px"}} alt="" />
                                                                                                </a>:''
                                                                                                :''}
                                                                                                <div className="modal vd_mdl fade" id={"videoModalLecture"+lecture.id} role="dialog" aria-hidden="true">
                                                                                                    <div className="modal-dialog modal-lg" role="document">
                                                                                                        <div className="modal-content">
                                                                                                            
                                                                                                            <div className="modal-header">
                                                                                                                <h5 className="modal-title">Video Preview</h5>
                                                                                                                <button onClick={()=>this.stopVideo(lecture.id)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                                </button>
                                                                                                            </div>
                                                                                                            {lecture.videoUrl?
                                                                                                            <div className="modal-body"  >
                                                                                                                <iframe style={{height:"300px"}} className="form-control" src={lecture.videoUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                                                                            </div>
                                                                                                            :console.log(lecture.videoUrl)}
                                                                                                            <div className="modal-footer">
                                                                                                                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            
                                                                                        </div>

                                                                                    </div>
                                                                                        
                                                                                        )
                                                                            })}
                                                                            
                                                                    </div>
                                                                </div>
                                                            </div>
                                                                    
                                                        </div>
                                                    </div>
                                                            </div>
                                                            
                                                        )
                                                    }):''
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                    </section>
                                    </div>
                                    <div className="tab-pane fade " id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                        
                                        <div className="mt-35">
                                            
            
        </div>

        <section className="mt-40">
        {localStorage.getItem("isLogin")&&localStorage.getItem("role")=="ROLE_ADMIN"?
        ''
        :
            this.props.course.purchased?
                this.props.course.userReview?
                <>
                <h2 className="section-title after-line">Your Review &nbsp; <Link to='' onClick={()=>this.showEdit()}><img style={{height:"25px", width:"25px"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></Link></h2> 
                <br/>
                <div className="course-reviews-box row align-items-center">
                    
                <div className="col-12 text-center " >
                    {/* <div className="reviews-rate font-36 font-weight-bold text-primary">5.00</div> */}
                
                    <div className="text-center">
                    
                            <div className="total_rating">	
                            <div></div>
                            <div className="stars-card d-flex align-items-center justify-content-start mt-0">

                                    {[...Array(5)].map((e, i) => (i < this.props.course.userReview.ratting)  ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star active"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    :   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    )}
                                    <div style={{float:"right"}}></div></div>
                                    < div className="text-center">{this.props.course.userReview.feedback}</div>
                                
                            </div>
                
                        {/* <div className="mt-15">1  Reviews</div> */}
                    </div>
                    <br/>
                    {this.state.show?
                    <>
                    <div className="course-reviews-box row align-items-center">
                    
                    <div className="col-12 text-center ">
                        {/* <div className="reviews-rate font-36 font-weight-bold text-primary">5.00</div> */}

                        <div className="text-center">
                        
                                <div className="total_rating ">	
                                                                            
                                    <div className="rate" onChange={this.formReview}>
                                        <input type="radio" id="star5" name="ratting" value="5" />
                                        <label for="star5" title="text"></label>
                                        <input type="radio" id="star4" name="ratting" value="4" />
                                        <label for="star4" title="text"></label>
                                        <input type="radio" id="star3" name="ratting" value="3" />
                                        <label for="star3" title="text"></label>
                                        <input type="radio" id="star2" name="ratting" value="2" />
                                        <label for="star2" title="text"></label>
                                        <input type="radio" id="star1" name="ratting" value="1" />
                                        <label for="star1" title="text"></label>

                                    </div>
                                    < div className="text-center">Course Rating</div>

                                </div>
                                    

                            {/* <div className="mt-15">1  Reviews</div> */}
                        </div>
                    </div>

                    </div>
                    <form className="mt-20">
                        <div className="form-group">
                            <textarea name="feedback" className="form-control" rows="10" placeholder="Add a public review" onChange={this.formReview}></textarea>
                        </div>
                        <button type="button" title="edit" onClick={()=>this.updateReview(this.state.review,this.props.course.id)} className="btn btn-sm btn-primary mt-20">Edit</button>&emsp;
                        <button type="button" title="delete" onClick={()=>this.deleteReview(this.props.course.userReview.id, this.props.course.id)} style={{backgroundColor:"#f14d4d", borderColor:"#f14d4d"}} className="btn btn-sm btn-primary mt-20">Detele</button>
                    
                    </form>
                    </>:''}
                </div>

                </div>
        
                </>
                :
                <>
                <h2 className="section-title after-line">Reviews </h2>
                <br/>
                <div className="course-reviews-box row align-items-center">
                    
                    <div className="col-12 text-center ">
                        {/* <div className="reviews-rate font-36 font-weight-bold text-primary">5.00</div> */}

                        <div className="text-center">
                        
                                <div className="total_rating ">	
                                                                            
                                    <div className="rate" onChange={this.formReview}>
                                        <input type="radio" id="star5" name="ratting" value="5" />
                                        <label for="star5" title="text"></label>
                                        <input type="radio" id="star4" name="ratting" value="4" />
                                        <label for="star4" title="text"></label>
                                        <input type="radio" id="star3" name="ratting" value="3" />
                                        <label for="star3" title="text"></label>
                                        <input type="radio" id="star2" name="ratting" value="2" />
                                        <label for="star2" title="text"></label>
                                        <input type="radio" id="star1" name="ratting" value="1" />
                                        <label for="star1" title="text"></label>

                                    </div>
                                    < div className="text-center">Course Rating</div>

                                </div>
                                    

                            {/* <div className="mt-15">1  Reviews</div> */}
                        </div>
                    </div>

                    </div>
                    <form className="mt-20">
                        <div className="form-group">
                            <textarea name="feedback" className="form-control" rows="10" placeholder="Add a public review" onChange={this.formReview}></textarea>
                        </div>
                        <button type="button" onClick={()=>this.createReview(this.state.review, this.props.course.id)} className="btn btn-sm btn-primary mt-20">Post review</button>
                    </form>
                </>
            :''
        }
            <div className="mt-45">
        {this.props.course.reviews&&this.props.course.reviews.length>0? this.props.course.reviews.map((review, r) => {
            return (
                <div className="comments-card shadow-lg rounded-sm border px-20 py-15 mt-30" data-address="/reviews/store-reply-comment" data-csrf="V1yQUuqpChkymsEzCbH3pHmi4wVeZ6rhp2xV2qJX" data-id="33">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="user-inline-avatar d-flex align-items-center mt-10">
                            {/* <div className="avatar">
                                <img src="/store/979/avatar/617a4ed2908fd.png" className="img-cover" alt=""/>
                            </div> */}
                            <div className="d-flex flex-column ml-5">
                                <span className="font-weight-500 text-secondary"><h3>{review.username}</h3></span>
                                <br/>
                                <div className="stars-card d-flex align-items-center justify-content-start mt-0">

                                {[...Array(5)].map((e, i) => (i < review.ratting) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star active"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    :   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    )}
                                
                                </div>
                            </div>
                        </div>

                        {/* <div className="d-flex align-items-center">
                            <span className="font-12 text-gray mr-10">2 Mar 2022 | 15:57</span>

                            <div className="btn-group dropdown table-actions">
                                <button type="button" className="btn-transparent dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i data-feather="more-vertical" height="20"></i>
                                </button>
                                <div className="dropdown-menu">
                                    <a href="/reviews/store-reply-commnet" className="webinar-actions d-block text-hover-primary reply-comment">Reply</a>
                                    <a href="" className="webinar-actions d-block mt-10 text-hover-primary">Report</a>

                                                                    </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="mt-20 text-gray font-14">
                    {review.feedback}
                    </div>

                </div> )
            }):
                <div className="review_item">
                    No review stars on this course !
                </div>
        }
                    
                                        
            </div>
        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="course-content-sidebar col-12 col-lg-4 mt-25 mt-lg-0">
                        <div className="">
                            <div className="course-img has-video">

                                {/* <img src={this.props.course.imageVideoDescription} className="img-cover" alt=""/> */}
                                
                                <div className="course-video-icon cursor-pointer d-flex align-items-center justify-content-center">
                                    <iframe  src={this.props.course.urlVideoDescription} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                                <i data-feather="play" width="25" height="25"></i>
                                </div>
                            </div>

                            <div className="px-20 pb-30">
                                <form>
                                    <input type="hidden" name="_token" value="V1yQUuqpChkymsEzCbH3pHmi4wVeZ6rhp2xV2qJX"/>
                                    <input type="hidden" name="webinar_id" value="2009"/>
                                            
                                    <div id="priceBox" className="d-flex align-items-center justify-content-center mt-20 ">
                                        <div className="text-center">
                                            <span id="realPrice" data-value="10" data-special-offer="" className="d-block  font-30 text-primary ">
                                                ${this.props.course.price}
                                            </span>
                                        </div>
                                    </div>
                                    {localStorage.getItem("isLogin")?
                                    localStorage.getItem("role")=="ROLE_ADMIN"?'':
                                        this.props.course.purchased?
                                        <div className="mt-20 d-flex flex-column">
                                            
                                            <Link to= {`/learn/${this.props.course.id}`}  style={{backgroundColor:"#e1b329", borderColor:"#e1b329"}} type="button" className="btn btn-primary" params={this.props.course.id} >Enroll now</Link>
                                            {/* <div class="jq-toast-wrap bottom-right" role="alert" aria-live="polite"><div className="jq-toast-single jq-has-icon jq-icon-success" style={{backgroundColor: "rgb(67, 212, 119)", color: "white", textAlign: "left"}}><span className="jq-toast-loader jq-toast-loaded" style={{WebkitTransition: "width 9.6s ease-in",                       OTransition: "width 9.6s ease-in",                       transition: "width 9.6s ease-in",  backgroundColor: "#9EC600"}}></span><span className="close-jq-toast-single">×</span><h2 className="jq-toast-heading">Added to cart!</h2>You can continue shopping or go to cart to finalize your order.</div></div> */}
                                        </div>
                                    :
                                    <div className="mt-20 d-flex flex-column">
                                        <button type="button" className="btn btn-primary" onClick={() => this.addCart(this.props.cartItems, this.props.course)}>
                                        Add to Cart
                                        </button>
                                        {/* <div class="jq-toast-wrap bottom-right" role="alert" aria-live="polite"><div className="jq-toast-single jq-has-icon jq-icon-success" style={{backgroundColor: "rgb(67, 212, 119)", color: "white", textAlign: "left"}}><span className="jq-toast-loader jq-toast-loaded" style={{WebkitTransition: "width 9.6s ease-in",                       OTransition: "width 9.6s ease-in",                       transition: "width 9.6s ease-in",  backgroundColor: "#9EC600"}}></span><span className="close-jq-toast-single">×</span><h2 className="jq-toast-heading">Added to cart!</h2>You can continue shopping or go to cart to finalize your order.</div></div> */}
                                    </div>
                                    :
                                    <div className="mt-20 d-flex flex-column">
                                        <button type="button" className="btn btn-primary" onClick={() => this.addCart(this.props.cartItems, this.props.course)}>
                                        Add to Cart
                                        </button>
                                        {/* <div class="jq-toast-wrap bottom-right" role="alert" aria-live="polite"><div className="jq-toast-single jq-has-icon jq-icon-success" style={{backgroundColor: "rgb(67, 212, 119)", color: "white", textAlign: "left"}}><span className="jq-toast-loader jq-toast-loaded" style={{WebkitTransition: "width 9.6s ease-in",                       OTransition: "width 9.6s ease-in",                       transition: "width 9.6s ease-in",  backgroundColor: "#9EC600"}}></span><span className="close-jq-toast-single">×</span><h2 className="jq-toast-heading">Added to cart!</h2>You can continue shopping or go to cart to finalize your order.</div></div> */}
                                    </div>
                                    
                                    }
                                   

                                </form>

                                {localStorage.getItem("role")=="ROLE_USER"?		
                                <div className="mt-40 p-10 rounded-sm border row align-items-center favorites-share-box">
                                    
                                    {this.props.course.saved?
                                    <div className="col" onClick={()=>this.unsavedCourse(this.props.course.id)} >
                                        <Link to ='' className="d-flex flex-column align-items-center text-gray">
                                            <img src="/assets/default/img/icon-heart.svg"  style={{width:"22px", height:"22px"}} alt=""/>
                                            <span  className="font-12">Unfavorite</span>
                                        </Link>
                                    </div>
                                    :
                                    <div className="col" onClick={()=>this.savedCourse(this.props.course.id)}>
                                        <Link to ='' className="d-flex flex-column align-items-center text-gray">
                                          
                                            <svg style={{width:"22px", height:"22px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/></svg>
                                            <span className="font-12">Favorite</span>
                                           
                                            </Link>
                                    </div>}
                                    
                                </div>
                                :''}
                            </div>
                        </div>
                        
                        <div className="rounded-lg shadow-sm mt-35 px-25 py-20">
                            <h3 className="sidebar-title font-16 text-secondary font-weight-bold"></h3>

                            <div className="mt-30" >
                                <div className="mt-20 d-flex align-items-center justify-content-between text-gray">
                                    <div className="d-flex align-items-center">
                                        <i data-feather="calendar" width="20" height="20"></i>
                                        <span className="ml-5 font-14 font-weight-500">Date:</span>
                                    </div>
                                    <span className="font-14">{moment(this.props.course.updatedDate).format('MMM DD, YYYY')}</span>
                                </div>

                                {/* <div className="mt-20 d-flex align-items-center justify-content-between text-gray">
                                    <div className="d-flex align-items-center">
                                        <i data-feather="user" width="20" height="20"></i>
                                        <span className="ml-5 font-14 font-weight-500">Capacity:</span>
                                    </div>
                                    <span className="font-14">10 Students</span>
                                </div> */}
                                
                                <div className="mt-20 d-flex align-items-center justify-content-between text-gray">
                                    <div className="d-flex align-items-center">
                                        <i data-feather="clock" width="20" height="20"></i>
                                        <span className="ml-5 font-14 font-weight-500">Duration:</span>
                                    </div>
                                    <span className="font-14">{this.props.course.videoDuration} Hours</span>
                                </div>

                                <div className="mt-20 d-flex align-items-center justify-content-between text-gray">
                                    <div className="d-flex align-items-center">
                                        <i data-feather="users" width="20" height="20"></i>
                                        <span className="ml-5 font-14 font-weight-500">Customers enrolled:</span>
                                    </div>
                                    <span className="font-14">{this.props.course.totalSold}</span>
                                </div>

                                {/* <div className="mt-20 d-flex align-items-center justify-content-between text-gray">
                                    <div className="d-flex align-items-center">
                                        <img src="/assets/default/img/icons/sessions.svg" width="20" alt=""/>
                                        <span className="ml-5 font-14 font-weight-500">Sessions:</span>
                                    </div>
                                    <span className="font-14">3</span>
                                </div> */}
                                
                                
                            </div>
                        </div>         
                        
                            

                    </div>
                </div>
            </section>
            </>
            );
        }
  
    };


const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
        cartItems: state.cart.items,
        savedSuccess: state.savedCourse.savedSuccess,
        reviewSuccess: state.review.reviewSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        addToCart:(e,p) => dispatch (addToCart(e,p)),
        fetchSavedRequest:(e) => dispatch (fetchSavedRequest(e)),
        fetchUnsavedRequest:(e) => dispatch (fetchUnsavedRequest(e)),
        fetchCreateReviewRequest:(e,i) => dispatch (fetchCreateReviewRequest(e,i)),
        fetchUpdateReviewRequest:(e,i) => dispatch (fetchUpdateReviewRequest(e,i)),
        fetchDeleteReviewRequest:(e,i) => dispatch (fetchDeleteReviewRequest(e,i)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouterParams(CourseById));
