import React from "react";

class FooterAdmin extends React.Component {
    render() {
        return (
            <footer className="footer bg-secondary position-relative user-select-none">
            <div className="container">
              

                <div className="mt-40 border-blue py-25 d-flex align-items-center justify-content-between">
                    <div className="footer-logo">
                        
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
                    <hr/>
                        <a href="/">
                            <img src="./store/1/default_images/website-logo-white.png" style={{width:"200px"}} className="mr-15 img-cover"
                                alt="footer logo"/>
                        </a>
                </div>
            </div>
        </footer>

        );
    } 
};
 
export default FooterAdmin;