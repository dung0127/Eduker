import React from "react";

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

                    <div className="col-6 col-md-3">
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
                            <p><a href="/login">
                                    <font color="#ffffff">- Login</font>
                                </a></p>
                            <p>
                                <font color="#ffffff"><a href="/register">
                                        <font color="#ffffff">- Register</font>
                                    </a><br/></font>
                            </p>
                            <p><a href="/blog">
                                    <font color="#ffffff">- Blog</font>
                                </a></p>
                            <p><a href="/contact">
                                    <font color="#ffffff">- Contact us</font>
                                </a></p>
                            <p>
                                <font color="#ffffff"><a href="/certificate_validation">
                                        <font color="#ffffff">- Certificate validation</font>
                                    </a><br/></font>
                            </p>
                            <p>
                                <font color="#ffffff"><a href="/become_instructor">
                                        <font color="#ffffff">- Become instructor</font>
                                    </a><br/></font>
                            </p>
                            <p><a href="/pages/terms">
                                    <font color="#ffffff">- Terms &amp; rules</font>
                                </a></p>
                            <p><a href="/pages/about">
                                    <font color="#ffffff">- About us</font>
                                </a><br/></p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <span className="header d-block text-white font-weight-bold">Similar Businesses</span>

                        <div className="mt-20">
                            <p><a href="https://www.udemy.com/" target="_blank">
                                    <font color="#ffffff">- Udemy</font>
                                </a></p>
                            <p><a href="https://www.skillshare.com/" target="_blank">
                                    <font color="#ffffff">- Skillshare</font>
                                </a></p>
                            <p><a href="https://www.coursera.org/" target="_blank">
                                    <font color="#ffffff">- Coursera</font>
                                </a></p>
                            <p><a href="https://www.linkedin.com/learning/" target="_blank">
                                    <font color="#ffffff">- Lynda</font>
                                </a></p>
                            <p><a href="https://www.skillsoft.com/" target="_blank">
                                    <font color="#ffffff">- Skillsoft</font>
                                </a></p>
                            <p><a href="https://www.udacity.com/" target="_blank">
                                    <font color="#ffffff">- Udacity</font>
                                </a></p>
                            <p><a href="https://www.edx.org/" target="_blank">
                                    <font color="#ffffff">- edX</font>
                                </a></p>
                            <p><a href="https://www.masterclassName.com/" target="_blank">
                                    <font color="#ffffff">- MasterclassName</font>
                                </a><br/></p>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <span className="header d-block text-white font-weight-bold">Purchase Rocket LMS</span>

                        <div className="mt-20">
                            <p><a title="Notnt" href="https://codecanyon.net"><img style={{width: "200px"}}
                                        src="/store/1/default_images/envato.png"/></a></p>
                        </div>
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