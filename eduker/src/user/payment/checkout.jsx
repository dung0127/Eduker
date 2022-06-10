import React from "react";
import { connect } from 'react-redux';
import { fetchCourseRequest } from "../../actions/course";
import { fetchDetailUserRequest } from "../../actions/detail";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cart";
import sum from "../../config/sum"
import { fetchPaymentRequest } from "../../actions/payment";
import validator from "validator";
import { withRouter } from "../../admin/layout/auth/withRouter"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { fetchAllEnrollRequest } from "../../actions/course";
import Header from "../layout/header.jsx";
import loadjs from "loadjs";

const initialOptions = {
	"client-id": "ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr",
	"currency": "USD",
	"intent": "capture",
	"data-client-token": "EPvXfu7wGWNtrVgVmSrkwTUBQMzYNbLi0gE0fWbfg63XNOkmwkpmfytv3UjgMym9hoJMzdk-J4KRObiu",
};

class Checkout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			course: '',
			checkout: {
				billingAddress: '',
				nameHolder: '',
				cardNumber: '',
				expirationDate: '',
				zipcode: '',
				cvv: '',
			},
			showButtons: false,
			loading: true,
			paid: false,
			error: {},
		}
	}

	validate = () => {
        let isValid = true;

        const error = {}

		if(this.props.cartItems.length<=0){
			error['cart'] = 'Shopping Cart is empty! Go to shopping now';
            isValid = false;
		}

        this.setState({
            error: error
        })

        return isValid;
    }

	createOrder(data, actions, sum) {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: sum,
					},
				},
			],
		});
	}

	onApprove(data, actions, items) {
		actions.order.capture().then(details => {
			const paymentData = {
				payerID: data.payerID,
				orderID: data.orderID
			};
			// console.log("Payment Approved: ", paymentData);
			this.setState({ showButtons: false, paid: true });
			let info = {};
			const cartId = [...new Set(items.map(item => item.id))];
			info.courseIds = cartId;
			info.orderId = paymentData.orderID;
			this.props.fetchPaymentRequest(info);
            loadjs('/assets/default/js/success.js', () => {});

            this.props.navigate('/orders')
		
		});

	}

	componentDidMount() {
		this.props.fetchDetailUserRequest();
		this.props.fetchAllEnrollRequest();
        loadjs('https://www.paypal.com/sdk/js?client-id=ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr', () => {});
        loadjs('https://www.paypal.com/sdk/js?client-id=ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr', () => {});

	}

	componentDidUpdate() {
        this.props.cartItems.map((item) => 
            this.props.enroll.map((course)=> 
            (item.id == course.id)?
                this.props.removeFromCart(this.props.cartItems,item):'')
        )
    }



	render() {
		const { cartItems, user } = this.props;
		return (
			<>
                <Header/>
                <section className="cart-banner position-relative text-center">
                    <h1 className="font-30 text-white font-weight-bold">Checkout</h1>
                </section>

                <div className="container">
                <div className="row mt-30">
                    {this.props.cartItems.length>0?
                    <div className="col-12 col-lg-6">
                        <section className="mt-45">
                            <h3 className="section-title">Payment Method</h3>
                            <div className="rounded-sm shadow mt-20 pb-20 px-20">
                                        <br/>
                            <PayPalScriptProvider options={{ "client-id": "ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr" }}>
                                <PayPalButtons style={{ layout: "horizontal"}} createOrder={(data, actions) => this.createOrder(data, actions, sum.formatCurrency(cartItems.reduce((a, c) => a + c.price, 0)))}
                                    onApprove={(data, actions) => this.onApprove(data, actions, cartItems)} />
                            </PayPalScriptProvider>
                            </div>
                        </section>
                    </div>
                    :
                    <div className="col-12 col-lg-6">
                        <section className="mt-45">
                        <div className="mt-20 pb-20 px-20">
                        <h3 className="section-title">Shopping Cart is empty! Go to shopping <Link to='/course' style={{color:"blue", textDecoration: "underline"}}>NOW</Link></h3>
                        </div></section>
                    </div>}
                    <div className="col-12 col-lg-6">
                        <section className="mt-45">
                            <h3 className="section-title">Order Summary</h3>
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

                                </form>
                            </div>
                        </section>
                    </div>
                    
                </div>
                    <section className="mt-45 ">
                        <h2 className="section-title">Order Detail</h2>
                        <div className="rounded-sm shadow mt-20 py-25 px-10 px-md-30">
                        <div className="row d-none d-md-flex">
                            <div className="col-12 col-lg-8"><span
                                    className="text-gray font-weight-500">Item</span></div>
                            <div className="col-6 col-lg-4 text-center"><span
                                    className="text-gray font-weight-500">Price</span></div>
                           
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

                                <div className="col-6 col-lg-4 d-flex flex-md-column align-items-center justify-content-center">
                                    <span className="text-gray d-inline-block d-md-none">Price :</span>

                                    <span className="font-20 text-primary mt-0 mt-md-5 font-weight-bold">${item.price}</span>
                                        
                                </div>

                                
                            </div>
                         )): <div className="row mt-5 cart-row" >
                             <div className="col-3 mb-15 mb-md-0" >
                             Your cart is empty !</div></div>}
                             <Link to='/course' ><button className="btn btn-sm btn-primary mt-25">Continue Shopping</button></Link>
                        </div>
                    </section>

                
                </div>
            </>
		);
	}

};

const mapStateToProps = state => {
	return {
		user: state.detail.user,
		cartItems: state.cart.items,
        enroll: state.course.coursesEnroll,
		message: state.payment.messageSuccess,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchDetailUserRequest: () => dispatch(fetchDetailUserRequest()),
		fetchPaymentRequest: (e) => dispatch(fetchPaymentRequest(e)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
        removeFromCart: (e, p) => dispatch(removeFromCart(e, p)),

	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
