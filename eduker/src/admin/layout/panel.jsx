import React from "react";
import { fetchDetailUserRequest} from "../../actions/detail"
import {loginRequest} from "../../actions/auth"
import {connect} from 'react-redux'
import loadjs from "loadjs";
import {Link} from "react-router-dom"

const isEmpty = (v) => {
return Object.keys(v).length === 0;
}

class Panel extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
            
        this.props.fetchDetailUserRequest();
    }

    render() {
        return (
            <>
                <div className="xs-panel-nav d-flex d-lg-none justify-content-between py-5 px-15">
                    
                    <div className="user-info d-flex align-items-center justify-content-between" >
                        
                        <div className="user-avatar">
                      
                            <img src="store/1015/avatar/617a4f2fb8a6d.png" className="img-cover" alt="Robert Ransdell"/>
                        </div>

                        <div className="user-name ml-15">
                            <h3 className="font-16 font-weight-bold">Robert Ransdell</h3>
                        </div>
                    </div>

                    <button className="sidebar-toggler btn-transparent d-flex flex-column-reverse justify-content-center align-items-center p-5 rounded-sm sidebarNavToggle" type="button">
                        <span>Menu</span>
                        <i data-feather="menu" width="16" height="16"></i>
                    </button>
                </div>
                

                <div className="panel-sidebar pt-50 pb-25 px-25" id="panelSidebar" >
                    <button className="btn-transparent panel-sidebar-close sidebarNavToggle">
                        <i data-feather="x" width="24" height="24"></i>
                    </button>

                    <div className="user-info d-flex align-items-center flex-row flex-lg-column justify-content-lg-center">
                        <a href="panel" className="user-avatar">
                            <img src={this.props.user.avatarImage} className="img-cover" alt="Robert Ransdell"/>
                        </a>

                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <a href="panel" className="user-name mt-15">
                                <h3 className="font-16 font-weight-bold text-center">{this.props.user.fullname}</h3>
                            </a>

                                    </div>
                    </div>
                    <hr/>
                    <ul className="sidebar-menu  " data-simplebar >

                        <li className="sidenav-item ">
                            <Link to ="/dashboard" className="d-flex align-items-center">
                                <span className="sidenav-item-icon mr-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Group_1264" transform="translate(-188.102 -869.102)">
                        <g id="Group_1262">
                            <g id="speedometer" transform="translate(188.102 869.102)">
                                <path id="Path_1547" d="M20.484 3.515a12 12 0 0 0-16.97 16.97 12 12 0 0 0 16.97-16.97zM12 22.593A10.594 10.594 0 1 1 22.593 12 10.606 10.606 0 0 1 12 22.593zm0 0" className="cls-1"/>
                                <path id="Path_1548" d="M118.647 321.206a.7.7 0 0 0-.5-.206h-8.094a.7.7 0 0 0-.5.206l-2.228 2.228a.7.7 0 0 0-.012.982 9.357 9.357 0 0 0 13.569 0 .7.7 0 0 0-.012-.982zm-4.544 4.716a7.882 7.882 0 0 1-5.273-2l1.517-1.517h7.512l1.517 1.517a7.882 7.882 0 0 1-5.273 2zm0 0" className="cls-1" transform="translate(-102.104 -305.954)"/>
                                <path id="Path_1549" d="M216.719 120.194a.7.7 0 0 0-.919.38l-1.606 3.876h-.091a2.063 2.063 0 1 0 1.39.541l1.606-3.877a.7.7 0 0 0-.38-.919zm-2.616 6.969a.654.654 0 1 1 .654-.654.655.655 0 0 1-.657.654zm0 0" className="cls-1" transform="translate(-202.104 -114.509)"/>
                                <path id="Path_1550" d="M65.375 56A9.385 9.385 0 0 0 56 65.375a.7.7 0 0 0 .7.7h1.25a.7.7 0 1 0 0-1.406h-.516a7.933 7.933 0 0 1 1.83-4.409l.362.362a.7.7 0 1 0 .994-.994l-.362-.362a7.934 7.934 0 0 1 4.41-1.83v.516a.7.7 0 1 0 1.406 0v-.516a7.934 7.934 0 0 1 4.41 1.83l-.362.362a.7.7 0 0 0 .994.994l.362-.362a7.932 7.932 0 0 1 1.83 4.409H72.8a.7.7 0 0 0 0 1.406h1.25a.7.7 0 0 0 .7-.7A9.385 9.385 0 0 0 65.375 56zm0 0" className="cls-1" transform="translate(-53.376 -53.375)"/>
                            </g>
                        </g>
                    </g>
                </svg>
                                </span>
                                <span className="font-14 text-dark-blue font-weight-500">Dashboard</span>
                            </Link>
                        </li>
                        
                        <li className="sidenav-item ">
                            <a className="d-flex align-items-center" data-toggle="collapse" href="#webinarCollapse" role="button" aria-expanded="false" aria-controls="webinarCollapse">
                                <span className="sidenav-item-icon mr-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Mask_Group_17" clip-path="url(#clip-path)" data-name="Mask Group 17" transform="translate(-25 -410)">
                        <g id="online-class" transform="translate(25 410)">
                            <path id="Path_153" d="M22.078 12.319a2.112 2.112 0 0 0 1.922-2.1V3.656a2.112 2.112 0 0 0-2.109-2.109h-6.985A2.112 2.112 0 0 0 12.8 3.656v2.766H4.031a2.112 2.112 0 0 0-2.109 2.109v8.438a2.1 2.1 0 0 0 .121.7h-.777A1.267 1.267 0 0 0 0 18.938a3.52 3.52 0 0 0 3.516 3.516h16.968A3.52 3.52 0 0 0 24 18.938a1.267 1.267 0 0 0-1.266-1.266h-.777a2.1 2.1 0 0 0 .121-.7zM14.2 3.656a.7.7 0 0 1 .7-.7h6.984a.7.7 0 0 1 .7.7v6.562a.7.7 0 0 1-.7.7h-6.509a.7.7 0 0 0-.373.107l-1.418.886.589-1.963a.7.7 0 0 0 .03-.2zm6.281 17.391H3.516a2.112 2.112 0 0 1-2.1-1.969h21.173a2.112 2.112 0 0 1-2.105 1.969zM6.7 12.375a.8.8 0 1 1 .8.8.8.8 0 0 1-.8-.8zm-.375 3c0-.424.548-.8 1.172-.8a1.435 1.435 0 0 1 .885.287.692.692 0 0 1 .287.51v2.3H6.328zm3.75 2.3v-2.3a2.074 2.074 0 0 0-.815-1.608l-.036-.027a2.2 2.2 0 1 0-3.455 0 2.073 2.073 0 0 0-.851 1.634v2.3h-.887a.7.7 0 0 1-.7-.7V8.531a.7.7 0 0 1 .7-.7H12.8v1.816l-.559 1.864a1.4 1.4 0 0 0 2.092 1.6l1.247-.779h5.1v4.641a.7.7 0 0 1-.7.7z" className="cls-3" data-name="Path 153"/>
                            <path id="Path_154" d="M19.125 7.922h-1.5a.7.7 0 0 0 0 1.406h1.5a.7.7 0 0 0 0-1.406z" className="cls-3" data-name="Path 154"/>
                            <path id="Path_155" d="M16.5 5.953h3.75a.7.7 0 0 0 0-1.406H16.5a.7.7 0 0 0 0 1.406z" className="cls-3" data-name="Path 155"/>
                        </g>
                    </g>
                </svg>
                                </span>
                                <span className="font-14 text-dark-blue font-weight-500">Courses</span>
                            </a>

                            <div className="collapse " id="webinarCollapse">
                                <ul className="sidenav-item-collapse">
                                                            <li className="mt-5 ">
                                            <Link to ="/course-info">All Courses</Link>
                                        </li>

                                        <li className="mt-5 ">
                                            <Link to ="/course-add">New course</Link>
                                        </li>
                                 
                                </ul>
                            </div>
                        </li>

                        <li className="sidenav-item ">
                            <a href="panel/setting" className="d-flex align-items-center">
                                <span className="sidenav-item-icon mr-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="Mask_Group_24" clip-path="url(#clip-path)" data-name="Mask Group 24" transform="translate(-25 -410)">
                        <g id="settings" transform="translate(25 410)">
                            <path id="Path_177" d="M12.753 24h-1.506a2.212 2.212 0 0 1-2.209-2.209v-.51a9.689 9.689 0 0 1-1.5-.625l-.361.361a2.209 2.209 0 0 1-3.125 0l-1.07-1.064a2.209 2.209 0 0 1 0-3.125l.361-.361a9.69 9.69 0 0 1-.625-1.5h-.51A2.212 2.212 0 0 1 0 12.753v-1.506a2.212 2.212 0 0 1 2.209-2.209h.51a9.692 9.692 0 0 1 .625-1.5l-.361-.361a2.209 2.209 0 0 1 0-3.125l1.064-1.07a2.209 2.209 0 0 1 3.125 0l.361.361a9.7 9.7 0 0 1 1.5-.625v-.51A2.212 2.212 0 0 1 11.247 0h1.506a2.212 2.212 0 0 1 2.209 2.209v.51a9.689 9.689 0 0 1 1.5.625l.361-.361a2.209 2.209 0 0 1 3.125 0l1.065 1.065a2.209 2.209 0 0 1 0 3.125l-.361.361a9.69 9.69 0 0 1 .625 1.5h.51A2.212 2.212 0 0 1 24 11.247v1.506a2.212 2.212 0 0 1-2.209 2.209h-.51a9.692 9.692 0 0 1-.625 1.5l.361.361a2.209 2.209 0 0 1 0 3.125l-1.065 1.065a2.209 2.209 0 0 1-3.125 0l-.361-.361a9.7 9.7 0 0 1-1.5.625v.51A2.212 2.212 0 0 1 12.753 24zm-4.985-4.82a8.288 8.288 0 0 0 2.148.892.7.7 0 0 1 .527.681v1.038a.8.8 0 0 0 .8.8h1.506a.8.8 0 0 0 .8-.8v-1.039a.7.7 0 0 1 .527-.681 8.288 8.288 0 0 0 2.148-.892.7.7 0 0 1 .855.108l.735.735a.8.8 0 0 0 1.135 0l1.065-1.065a.8.8 0 0 0 0-1.136l-.736-.736a.7.7 0 0 1-.108-.855 8.287 8.287 0 0 0 .892-2.148.7.7 0 0 1 .681-.527h1.038a.8.8 0 0 0 .8-.8v-1.508a.8.8 0 0 0-.8-.8h-1.028a.7.7 0 0 1-.681-.527 8.288 8.288 0 0 0-.892-2.148.7.7 0 0 1 .108-.855l.735-.735a.8.8 0 0 0 0-1.136l-1.065-1.069a.8.8 0 0 0-1.136 0l-.736.736a.7.7 0 0 1-.855.108 8.288 8.288 0 0 0-2.148-.892.7.7 0 0 1-.527-.681V2.209a.8.8 0 0 0-.8-.8h-1.509a.8.8 0 0 0-.8.8v1.039a.7.7 0 0 1-.527.681 8.288 8.288 0 0 0-2.148.892.7.7 0 0 1-.855-.108l-.735-.735a.8.8 0 0 0-1.135 0l-1.07 1.064a.8.8 0 0 0 0 1.136l.736.736a.7.7 0 0 1 .108.855 8.287 8.287 0 0 0-.892 2.148.7.7 0 0 1-.681.527H2.209a.8.8 0 0 0-.8.8v1.506a.8.8 0 0 0 .8.8h1.039a.7.7 0 0 1 .681.527 8.288 8.288 0 0 0 .892 2.148.7.7 0 0 1-.108.855l-.735.735a.8.8 0 0 0 0 1.136l1.065 1.065a.8.8 0 0 0 1.136 0l.736-.736a.706.706 0 0 1 .855-.108z" className="cls-3" data-name="Path 177"/>
                            <path id="Path_178" d="M12 17.222A5.222 5.222 0 1 1 17.222 12 5.228 5.228 0 0 1 12 17.222zm0-9.038A3.816 3.816 0 1 0 15.816 12 3.82 3.82 0 0 0 12 8.184z" className="cls-3" data-name="Path 178"/>
                        </g>
                    </g>
                </svg>
                                </span>
                                <span className="font-14 text-dark-blue font-weight-500">Settings</span>
                            </a>
                        </li>

                        <li className="sidenav-item ">
                                <a href="users/1015/profile" className="d-flex align-items-center">
                                <span className="sidenav-item-icon mr-10">
                                    <i data-feather="user" stroke="#1f3b64" stroke-width="1.5" width="24" height="24" className="mr-10 webinar-icon"></i>
                                </span>
                                    <span className="font-14 text-dark-blue font-weight-500">My Profile</span>
                                </a>
                        </li>
                        
                        <li className="sidenav-item">
                            <a href="logout" className="d-flex align-items-center">
                                <span className="sidenav-item-icon mr-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23.999" height="23.999" viewBox="0 0 23.999 23.999">
                    <g id="Group_1263" transform="translate(-161.102 -869.102)">
                        <g id="power-button" transform="translate(161.102 869.102)">
                            <path id="Path_1541" d="M20.473 3.526a11.984 11.984 0 1 0 0 16.947 11.945 11.945 0 0 0 0-16.947zM12 22.591A10.591 10.591 0 1 1 22.591 12 10.6 10.6 0 0 1 12 22.591z" className="cls-1"/>
                            <path id="Path_1542" d="M153.7 168.953a.7.7 0 0 0-.93 1.047 3.8 3.8 0 1 1-5.016-.019.7.7 0 1 0-.925-1.058 5.2 5.2 0 1 0 6.875.025z" className="cls-1" transform="translate(-138.252 -160.845)"/>
                            <path id="Path_1543" d="M241.753 126.205a.7.7 0 0 0 .7-.7v-3.749a.7.7 0 1 0-1.406 0v3.744a.7.7 0 0 0 .706.705z" className="cls-1" transform="translate(-229.754 -115.378)"/>
                        </g>
                    </g>
                </svg>
                                </span>
                                <span className="font-14 text-dark-blue font-weight-500">Log out</span>
                            </a>
                        </li>
                    </ul>
                           
                </div>
        </>
        );
    } 
};

const mapStateToProps = state => {
    return {        
        username: state.auth.username,
        token: state.auth.token,
        role: state.auth.role,
        user: state.detail.user,
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
        subCatalog: state.subCatalog.subCatalog
    }
}
 
const mapDispatchToProps = dispatch => {
    return {
        
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        loginRequest:(e) => dispatch (loginRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Panel)