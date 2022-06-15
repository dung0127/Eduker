import React from "react";
import {connect}  from "react-redux"
import { Link } from "react-router-dom"
import {fetchDetailUserRequest} from "../../actions/detail"
import {withRouter} from '../../admin/layout/auth/withRouter'
import { fetchCourseRequest } from "../../actions/course";
import { fetchCatalogRequest} from "../../actions/catalog"
import {fetchSubCatalogByIdRequest} from "../../actions/subCatalog"
import { loginRequest, logout } from "../../actions/auth"
import loadjs from 'loadjs';
import sum from "../../config/sum";

class HeaderGuest extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCatalogRequest();
        this.props.fetchCourseRequest(0);
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
            
    }

    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value}); 
        console.log(value) 
    }

    searchCourse = (search) => {
        this.props.navigate(`/search/${search}`,{params:search})
    }
    render() {
        const { cartItems, catalogs } = this.props;
        return (
            <>
                <div className="top-navbar d-flex border-bottom">
                    <div className="container d-flex justify-content-between flex-column flex-lg-row">
                        <div
                            className="top-contact-box border-bottom d-flex flex-column flex-md-row align-items-center justify-content-center">

                            <div className="d-flex align-items-center justify-content-center">
                                <span className="d-flex align-items-center py-10 py-lg-0 text-dark-blue font-14">
                                    <i data-feather="phone" width="20" height="20" className="mr-10"></i>
                                    415-716-1166
                                </span>

                                <div className="border-left mx-5 mx-lg-15 h-100"></div>

                                <span className="d-flex align-items-center py-10 py-lg-0 text-dark-blue font-14">
                                    <i data-feather="mail" width="20" height="20" className="mr-10"></i>
                                    mailer@rocket-soft.org
                                </span>
                            </div>

                            <div className="d-flex align-items-center justify-content-between justify-content-md-center">
                                {/* <form action="/locale" method="post" className="mr-15 mx-md-20">
                                    <input type="hidden" name="_token" value="ETPTxzgAqooYOwRHgA79RMUNuNbEPsW22p7jTn3I"/>

                                    <input type="hidden" name="locale"/>

                                    <div className="language-select">
                                        <div id="localItems" data-selected-country="US"
                                            data-countries='{&quot;IQ&quot;:&quot;Arabic&quot;,&quot;US&quot;:&quot;English&quot;,&quot;ES&quot;:&quot;Spanish&quot;}'>
                                        </div> 
                                    </div>
                                </form> */}



                                <form  className="mr-15 mx-md-20 form-inline my-2 my-lg-0 navbar-search position-relative">
                                    <input className="form-control mr-5 rounded" type="text" name="search" placeholder="Search..."  onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchCourse(this.state.searchCourse)}
                                        aria-label="Search"/>
                                    <button onClick={()=>this.searchCourse(this.state.searchCourse) }
                                        className="btn-transparent d-flex align-items-center justify-content-center search-icon">
                                        <i data-feather="search" width="20" height="20" className="mr-10"></i>
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="xs-w-100 d-flex align-items-center justify-content-between ">
                            <div className="d-flex">

                                <div className="dropdown">
                                    <button type="button" className="btn btn-transparent dropdown-toggle"
                                        id="navbarShopingCart" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i data-feather="shopping-cart" width="20" height="20" className="mr-10"></i>
                                        <span className="badge badge-circle-primary d-flex align-items-center justify-content-center">{cartItems.length}</span>
                                        
                                    </button>

                                    <div className="dropdown-menu" aria-labelledby="navbarShopingCart">
                                        <div className="d-md-none border-bottom mb-20 pb-10 text-right">
                                            <i className="close-dropdown mr-10" data-feather="x" width="32" height="32"></i>
                                        </div>
                                        <div className="h-100">
                                            <div className="navbar-shopping-cart h-100" data-simplebar>
                                                {/* <div className="d-flex align-items-center text-center py-50">
                                                    <i data-feather="shopping-cart" width="20" height="20" className="mr-10"></i>
                                                    <span className="">Your cart is empty</span>
                                                </div> */}
                                                 <div className="mb-auto">
                                                    {cartItems&&cartItems.length>0? cartItems.map((item) => (
                                                    <div className="navbar-cart-box d-flex align-items-center">
                                
                                                        <a href="https://lms.rocket-soft.org/course/The-Future-of-Energy" target="_blank" className="navbar-cart-img">
                                                            <img src={item.imageVideoDescription} alt="product title" className="img-cover"/>
                                                        </a>
                                                        <div className="navbar-cart-info">
                                                            <a href="https://lms.rocket-soft.org/course/The-Future-of-Energy" target="_blank">
                                                                <h4>{item.title}</h4>
                                                            </a>
                                                            <div className="price mt-10">
                                                                    <span className="text-primary font-weight-bold">${item.price}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )):
                                                    
                                                    <div className="navbar-cart-boxalign-items-center" style={{textAlign:"center"}}>
                                                            <span>Your cart is empty</span>
                                                    </div>
                                                }
                                                    
                                                            
                                            </div>
                    <div className="navbar-cart-actions">
                        <div className="navbar-cart-total mt-15 border-top d-flex align-items-center justify-content-between">
                            <strong className="total-text">Total</strong>
                            <strong className="text-primary font-weight-bold">${sum.formatCurrency(
                                                    cartItems.reduce((a, c) => a + c.price, 0)
                                                )}</strong>
                        </div>

                        <Link to="/cart" className="btn btn-sm btn-primary btn-block mt-50 mt-md-15">Go to cart</Link>
                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="border-left mx-5 mx-lg-15"></div> */}

                                {/* <div className="dropdown">
                                    <button type="button" className="btn btn-transparent dropdown-toggle" disabled
                                        id="navbarNotification" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                        <i data-feather="bell" width="20" height="20" className="mr-10"></i>
                                        <span className="badge badge-circle-danger d-flex align-items-center justify-content-center">95</span>

                                    </button>

                                    <div className="dropdown-menu pt-20" aria-labelledby="navbarNotification">
                                        <div className="d-flex flex-column h-100">
                                            <div className="mb-auto navbar-notification-card" data-simplebar>
                                                <div className="d-md-none border-bottom mb-20 pb-10 text-right">
                                                    <i className="close-dropdown mr-10" data-feather="x" width="32" height="32"
                                                    ></i>
                                                </div>

                                                <div className="d-flex align-items-center text-center py-50">
                                                    <i data-feather="bell" width="20" height="20" className="mr-10"></i>
                                                    <span className="">Empty notifications</span>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="d-flex align-items-center ml-md-50">
                                <Link to= "/login" className="py-5 px-10 mr-10 text-dark-blue font-14">Login</Link>
                                <Link to="/signup" className="py-5 px-10 text-dark-blue font-14">Register</Link>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div id="navbarVacuum"></div>
                <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between w-100">

                            <a className="navbar-brand navbar-order mr-0" href="/">
                                <img src="/store/1/default_images/website-logo.png" className="img-cover" alt="site logo"/>
                            </a>

                            <button className="navbar-toggler navbar-order" type="button" id="navbarToggle">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="mx-lg-30 d-none d-lg-flex flex-grow-1 navbar-toggle-content " id="navbarContent">
                                <div className="navbar-toggle-header text-right d-lg-none">
                                    <button className="btn-transparent" id="navbarClose">
                                        <i data-feather="x" width="32" height="32"></i>
                                    </button>
                                </div>

                                <ul className="navbar-nav mr-auto d-flex align-items-center">
                                    <li className="mr-lg-25">
                                        <div className="menu-category">
                                            <ul>
                                                <li className="cursor-pointer user-select-none d-flex xs-categories-toggle">
                                                    <i data-feather="grid" width="20" height="20"
                                                        className="mr-10 d-none d-lg-block"></i>
                                                    Categories

                                                    <ul className="cat-dropdown-menu">
                                                    {this.props.catalogs.map((catalog,j) => {
                                                    return (
                                                        catalog.subCatalogs.length>0?
                                                        <li key={j}>
                                                            <a href="#">
                                                                
                                                                <div className="d-flex align-items-center" >
                                                                    {catalog.name}
                                                                </div>
                                                                
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right d-none d-lg-inline-block ml-10"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                                
                                                            </a>
                                                            <ul className="sub-menu">
                                                            {catalog.subCatalogs.map((subCatalog,index) => {
                                                                return (
                                                                <li><Link to={`/courses/${subCatalog.name}/${subCatalog.id}`}  params={subCatalog.id}>{subCatalog.name}</Link></li>
                                                                )})}
                                                            </ul>

                                                        </li>
                                                        :
                                                        <li key={j}>
                                                            <a href="/categories/Design">
                                                                
                                                                <div className="d-flex align-items-center" >
                                                                    {catalog.name}
                                                                </div>
                                                            </a>

                                                        </li>
                                                    )})}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>

                                    <li className="nav-item">
                                        <Link to= "/index" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/course" className="nav-link" >Courses</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/about">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/contact">Contact</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="nav-icons-or-start-live navbar-order">

                                <Link to="/login" className="d-none d-lg-flex btn btn-sm btn-primary nav-start-a-live-btn">
                                    Start a new course
                                </Link>

                                <Link to="/login" className="d-flex d-lg-none text-primary nav-start-a-live-btn font-14">
                                    Start a new course
                                </Link>

                                <div className="d-none nav-notify-cart-dropdown top-navbar ">
                                    <div className="dropdown">
                                        <button type="button" disabled className="btn btn-transparent dropdown-toggle"
                                            id="navbarShopingCart" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i data-feather="shopping-cart" width="20" height="20" className="mr-10"></i>

                                        </button>

                                        <div className="dropdown-menu" aria-labelledby="navbarShopingCart">
                                            <div className="d-md-none border-bottom mb-20 pb-10 text-right">
                                                <i className="close-dropdown mr-10" data-feather="x" width="32" height="32"
                                                    ></i>
                                            </div>
                                            <div className="h-100">
                                                <div className="navbar-shopping-cart h-100" data-simplebar>
                                                    <div className="d-flex align-items-center text-center py-50">
                                                        <i data-feather="shopping-cart" width="20" height="20"
                                                            className="mr-10"></i>
                                                        <span className="">Your cart is empty</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-left mx-15"></div>

                                    <div className="dropdown">
                                        <button type="button" className="btn btn-transparent dropdown-toggle" disabled
                                            id="navbarNotification" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                            <i data-feather="bell" width="20" height="20" className="mr-10"></i>

                                        </button>

                                        <div className="dropdown-menu pt-20" aria-labelledby="navbarNotification">
                                            <div className="d-flex flex-column h-100">
                                                <div className="mb-auto navbar-notification-card" data-simplebar>
                                                    <div className="d-md-none border-bottom mb-20 pb-10 text-right">
                                                        <i className="close-dropdown mr-10" data-feather="x" width="32" height="32"
                                                            ></i>
                                                    </div>

                                                    <div className="d-flex align-items-center text-center py-50">
                                                        <i data-feather="bell" width="20" height="20" className="mr-10"></i>
                                                        <span className="">Empty notifications</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderGuest))