import React from "react";
import {Link} from 'react-router-dom'

class FooterUser extends React.Component {
    render() {
        return (
            <footer className="footer bg-secondary position-relative user-select-none">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className=" footer-subscribe d-block d-md-flex align-items-center justify-content-between">
                            <div className="flex-grow-1">
                                <strong>Join us today</strong>
                                <span className="d-block mt-5 text-white">#We will send the best deals and offers to your
                                    email.</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="row">

                    <div className="col-6 col-md-6">
                        <span className="header d-block text-white font-weight-bold">About US</span>

                        <div className="mt-20">
                            <p>
                                <font color="#ffffff">Rocket LMS is a fully-featured learning management system that
                                    helps you to run your education business in several hours. This platform helps
                                    instructors to create professional education materials and helps students to learn
                                    from the best instructors.</font>
                            </p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <span className="header d-block text-white font-weight-bold">Additional Links</span>

                        <div className="mt-20">
                            <p><Link to= "/login">
                                    <font color="#ffffff">- Login</font>
                                </Link></p>
                            <p>
                                <font color="#ffffff"><Link to="/signup">
                                        <font color="#ffffff">- Register</font>
                                    </Link><br/></font>
                            </p>
                            
                            <p><Link to="/contact">
                                    <font color="#ffffff">- Contact us</font>
                                </Link></p>
                           
                            
                            <p><Link to="/about">
                                    <font color="#ffffff">- About us</font>
                                </Link><br/></p>
                        </div>
                    </div>
                   
                    <div className="col-6 col-md-3">
                        <span className="header d-block text-white font-weight-bold">Learning Rocket LMS</span>

                       <a title="Notnt" href="#"><img style={{width: "200px"}}
                                        src="/store/1/default_images/envato.png"/></a>
                    </div>

                </div>

                <div className="mt-40 border-blue py-25 d-flex align-items-center justify-content-between">
                    <div className="footer-logo">
                        <a href="/">
                            <img src="./store/1/default_images/website-logo-white.png" className="img-cover"
                                alt="footer logo"/>
                        </a>
                    </div>
                    <div className="footer-social">
                        <a href="https://www.instagram.com/">
                            <img src="./store/1/default_images/social/instagram.svg" alt="Instagram" className="mr-15"/>
                        </a>
                        <a href="https://web.whatsapp.com/">
                            <img src="./store/1/default_images/social/whatsapp.svg" alt="Whatsapp" className="mr-15"/>
                        </a>
                        <a href="https://twitter.com/">
                            <img src="./store/1/default_images/social/twitter.svg" alt="Twitter" className="mr-15"/>
                        </a>
                        <a href="https://www.facebook.com/">
                            <img src="./store/1/default_images/social/facebook.svg" alt="Facebook" className="mr-15"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

        );
    } 
};
 
export default FooterUser;