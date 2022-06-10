import React from "react";
import {Link} from "react-router-dom";
import { fetchCourseRequest } from "../../actions/course";
import {connect}  from "react-redux";
import { fetchCatalogRequest} from "../../actions/catalog";
import Header from "./header.jsx";

 class About extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCourseRequest(0);
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
                                    <h1 className="text-white font-30 mb-15">About US</h1>
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

    <section   className="container mt-10 mt-md-40">
    <div className="row">
            <div   className="col-12">
                <div   className="post-show mt-30">
                    <div><b>Rocket LMS</b> is an online course marketplace with a pile of features that helps you to run your online education business easily. This platform helps instructors and students get in touch together and share knowledge.</div><div><br/></div><div>Teachers will be able to create unlimited video courses, live classes, text courses, projects, quizzes, files, etc and students will be able to use the educational material and increase their skill level.</div><div><br/></div><div>Rocket LMS is based on real business needs, cultural differences, advanced user researches so it covers your business requirements efficiently.</div><div style={{textAlign: "center"}} ><img src="/store/1/default_images/about.png" style={{width: "1110px"}}/><br/></div><div><br/></div><div><b>WHY CHOOSE Rocket LMS?</b></div><div><br/></div><div>- Comprehensive solution for online education businesses</div><div>- Based on real business needs</div><div>- Multiple content types (Video courses, Live classes, text courses)</div><div>- Youtube, Vimeo, and AWS integration</div><div>- Google calendar integration</div><div>- Online 1 to 1 meetings support</div><div>- Single &amp; multiple instructors</div><div>- Organizational education system</div><div>- Subscribe system</div><div>- Various payment gateways for worldwide</div><div>- Offline payment</div><div>- Multilanguage</div><div>- Fully responsive</div><div>- Fully customizable</div><div>- RTL support</div>
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
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
     
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(About)