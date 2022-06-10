import React from "react";
import { connect } from "react-redux";
import { fetchCatalogRequest } from "../../actions/catalog";
import { fetchCourseRequest } from "../../actions/course";
import Header from "./header.jsx";


class Contact extends React.Component {
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
           <section   className="site-top-banner search-top-banner opacity-04 position-relative">
        <img src="store/1/default_images/category_cover.png"   className="img-cover" alt="Contact"/>

        <div   className="container h-100">
            <div   className="row contact-us-head h-100 justify-content-center text-center">
                <div   className="col-12 col-md-9 col-lg-7">
                    <div   className="top-search-categories-form">
                        <h1   className="text-white font-30 mb-15">Contact US</h1>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div   className="container">
        <section   className="">
            <div   className="contact-map" 
            >
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325642465107!2d106.66413961526037!3d10.786351961958788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecb37e59e33%3A0xfe7c4d9f94f9e079!2zNTkwIEPDoWNoIE3huqFuZyBUaMOhbmcgOCwgUGjGsOG7nW5nIDExLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1647233337652!5m2!1svi!2s" style={{width:"1150px", height:"700px" , border:"0"}} allowfullscreen="" loading="lazy"></iframe>

            </div>


            <div   className="row">
                <div   className="col-12 col-md-4">
                    <div   className="contact-items mt-30 rounded-lg py-20 py-md-40 px-15 px-md-30 text-center">
                        <div   className="contact-icon-box box-info p-20 d-flex align-items-center justify-content-center mx-auto">
                            <i data-feather="map-pin" width="50" height="50"   className="text-white"></i>
                        </div>

                        <h3   className="mt-30 font-16 font-weight-bold text-dark-blue">Address</h3>
                                                <p   className="font-weight-500 font-14 text-gray mt-10">590, Cách Mạng Tháng Tám, P11, Quận 3, TPHCM</p>
                                            </div>
                </div>

                <div   className="col-12 col-md-4">
                    <div   className="contact-items mt-30 rounded-lg py-20 py-md-40 px-15 px-md-30 text-center">
                        <div   className="contact-icon-box box-green p-20 d-flex align-items-center justify-content-center mx-auto">
                            <i data-feather="phone" width="50" height="50"   className="text-white"></i>
                        </div>

                        <h3   className="mt-30 font-16 font-weight-bold text-dark-blue">Phone</h3>
                                                <p   className="font-weight-500 text-gray font-14 mt-10">415-716-1166 <br/> 415-716-1167</p>
                                            </div>
                </div>

                <div   className="col-12 col-md-4">
                    <div   className="contact-items mt-30 rounded-lg py-20 py-md-40 px-15 px-md-30 text-center">
                        <div   className="contact-icon-box box-red p-20 d-flex align-items-center justify-content-center mx-auto">
                            <i data-feather="mail" width="50" height="50"   className="text-white"></i>
                        </div>

                        <h3   className="mt-30 font-16 font-weight-bold text-dark-blue">Email</h3>
                                                 <p   className="font-weight-500 text-gray font-14 mt-10">rocket@gmail.com <br/> info@lms.rocket-soft.org</p>
                                            </div>
                </div>
            </div>
        </section>

        

    </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Contact)