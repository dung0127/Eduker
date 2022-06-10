import React from "react";
import { connect } from 'react-redux';
import { fetchCourseRequest } from "../../actions/course";
import { fetchDetailUserRequest } from "../../actions/detail";
import { Link } from "react-router-dom";
import { addToCart, clearFromCart, removeFromCart } from "../../actions/cart";
import sum from "../../config/sum"
import loadjs from 'loadjs';
import $ from "jquery"
import {fetchAllEnrollRequest} from "../../actions/course"
import Header from "../layout/header.jsx";
class CartInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
        }
    }

    componentDidMount() {
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
        this.props.fetchCourseRequest(0);
        this.props.fetchAllEnrollRequest()
    }

    componentDidUpdate() {
        // this.props.cartItems.map((item) => 
        //     this.props.enroll.map((course)=> 
        //     (item.id == course.id)?
        //         this.props.removeFromCart(this.props.cartItems,item):'')
        // )
    }

    clearCart = () => {
        $('#confirm').fadeIn('fast')
    }
    alertDelete = () => {
        this.props.clearFromCart()
        $('#confirm').fadeOut('fast');
    }

    alertCancel = () => {
        $('#confirm').fadeOut('fast');
    } 

    render() {
        const { cartItems } = this.props;
        return (
            <>
                <Header/>
                <section className="cart-banner position-relative text-center">
                    <h1 className="font-30 text-white font-weight-bold">Shopping Cart</h1>
                </section>

                <div className="container">
                    <section className="mt-45">
                        <h2 className="section-title">Cart Items</h2>

                        <div className="rounded-sm shadow mt-20 py-25 px-10 px-md-30">
                        <div className="row d-none d-md-flex">
                            <div className="col-12 col-lg-8"><span
                                    className="text-gray font-weight-500">Item</span></div>
                            <div className="col-6 col-lg-2 text-center"><span
                                    className="text-gray font-weight-500">Price</span></div>
                            <div className="col-6 col-lg-2 text-center"><span
                                    className="text-gray font-weight-500">Remove</span></div>
                        </div>
                        {cartItems&& cartItems.length>0?
                            cartItems.map((item) => (
                            <div className="row mt-5 cart-row">
                                <div className="col-12 col-lg-8 mb-15 mb-md-0">
                                    <div className="webinar-card webinar-list-cart row">
                                        <div className="col-4">
                                            <div className="image-box">
                                                <img src={item.imageVideoDescription} className="img-cover" alt="user avatar"/>
                                            </div>
                                        </div>

                                        <div className="col-8">
                                            <div className="webinar-card-body p-0 w-100 h-100 d-flex flex-column">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <Link to={`/course/${item.id}`} params={item.id}>
                                                        <h3 className="font-16 font-weight-bold text-dark-blue">{item.title}</h3>
                                                    </Link>
                                                </div>
                                                <span className="text-gray font-14 mt-auto">
                                                {item.shortDescription}
                                                </span>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-lg-2 d-flex flex-md-column align-items-center justify-content-center">
                                    <span className="text-gray d-inline-block d-md-none">Price :</span>

                                    <span className="font-20 text-primary mt-0 mt-md-5 font-weight-bold">${item.price}</span>
                                        
                                </div>

                                <div className="col-6 col-lg-2 d-flex flex-md-column align-items-center justify-content-center">
                                    <span className="text-gray d-inline-block d-md-none mr-10 mr-md-0">Remove :</span>

                                    <a onClick={(e) => this.props.removeFromCart(this.props.cartItems, item)} className="btn-cart-list-delete d-flex align-items-center justify-content-center">
                                        <i data-feather="x" width="20" height="20" className=""></i>
                                    </a>
                                </div>
                            </div>
                         )): <div className="row mt-5 cart-row" >
                             <div className="col-3 mb-15 mb-md-0" >
                             Your cart is empty !</div></div>}
                             <Link to='/course' ><button className="btn btn-sm btn-primary mt-25">Continue Shopping</button></Link>
                        </div>
                    </section>

                <div className="row mt-30">
                    
                    <div className="col-12 col-lg-6">
                        <section className="mt-45">
                            <h3 className="section-title">Cart Total</h3>
                            <div className="rounded-sm shadow mt-20 pb-20 px-20">

                                <div className="cart-checkout-item">
                                    <h4 className="text-secondary font-14 font-weight-500">Subtotal</h4>
                                    <span className="font-14 text-gray font-weight-bold">${sum.formatCurrency(
                                                    cartItems.reduce((a, c) => a + c.price, 0)
                                                )}</span>
                                </div>

                                <div className="cart-checkout-item">
                                    <h4 className="text-secondary font-14 font-weight-500">Discount</h4>
                                    <span className="font-14 text-gray font-weight-bold">
                                        <span id="totalDiscount">$0.00</span>
                                    </span>
                                </div>

                                <div className="cart-checkout-item border-0">
                                    <h4 className="text-secondary font-14 font-weight-500">Total</h4>
                                    <span className="font-14 text-gray font-weight-bold"><span id="totalAmount">${sum.formatCurrency(
                                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                                )}</span></span>
                                </div>

                                <form>
                                    <input type="hidden" name="_token" value="RKwS33W8DHuj3Nwozg6ycKVNnE8kO2VUi0r01XOf"/>
                                    <input type="hidden" name="discount_id" value=""/>
                                    {localStorage.getItem("token")?
                                    <Link to="/checkout" ><button type="submit" className="btn btn-sm btn-primary mt-15">Checkout</button></Link>
                                        :
                                    <Link to="/login" ><button type="submit" className="btn btn-sm btn-primary mt-15">Login to checkout</button></Link>
    }
                                </form>
                            </div>
                        </section>
                    </div>
                </div>
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
        user: state.detail.user,
        enroll: state.course.coursesEnroll,
        cartItems: state.cart.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest: (e) => dispatch(fetchCourseRequest(e)),
        fetchDetailUserRequest: () => dispatch(fetchDetailUserRequest()),
        addToCart: (e, p) => dispatch(addToCart(e, p)),
        removeFromCart: (e, p) => dispatch(removeFromCart(e, p)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
        clearFromCart: () => dispatch(clearFromCart()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartInfo);
