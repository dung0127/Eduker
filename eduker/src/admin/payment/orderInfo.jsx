import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrderRequest, searchOrderRequest } from '../../actions/payment';
import $ from "jquery";
import moment from 'moment';
import Panel from "../layout/panel.jsx";
import Header from "../../user/layout/header.jsx";
import loadjs from "loadjs";

class OrderInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchOrder:''
        }
                       
    }

    componentDidMount(){
        this.props.fetchOrderRequest(this.props.page);
        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        loadjs('/assets/default/js/parts/categories.min.js', () => {});
    } 

    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchOrder:value}); 
        console.log(value) 
    }

    searchOrder = (search) => {

        this.props.searchOrderRequest(search)
    }

    render() {
        
        return(
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                      
            <section className="mt-25">
                <div className="panel-section-card py-20 px-25 mt-20">
                    <div className="row">
                        
                        <div className="col-12 col-lg-12">
                            <div className="row">
                               
                                <div className="col-12 col-lg-12">
                                        
                                        <div className="input-group js-video-demo-path-input">
                                            <div className="input-group-prepend">
                                                <button type="button"  onClick={()=>this.searchOrder(this.state.searchOrder) } className="js-video-demo-path-links rounded-left input-group-text input-group-text-rounded-left text-white" data-preview="holder">
                                                <img style={{width:"23px", height:"23px"}} src="/assets/default/img/search1.png"/>
                                                </button>
                                            </div>
                                            <input type="text" placeholder="Search..."  name="search" onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchOrder(this.state.searchOrder)} className="form-control "/>
                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

                    <section className="mt-35">
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                        
                        <h2 className="section-title">Orders</h2>
                    </div>
                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="table-responsive">
                                    <table className="table text-center custom-table">
                                        <thead>
                                        <tr>
                                            <th className="text-center">No.</th>
                                            <th className="text-center">Order Number</th>
                                            <th className="text-center">Username</th>
                                            <th className="text-center">Total Amount</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Date Order</th>
                                            <th className="text-center">Action</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                                {this.props.orders.map((order,index) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <span >
                                                                {index + 1 + this.props.page*10}
                                                                </span>
                                                            </td>
                                                            
                                                            <td className="align-middle">
                                                            <span >
                                                            #{order.orderNumber}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span >
                                                            {order.user.username}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                            ${order.totalAmount}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                            {order.statusOrder?<span className="text-primary">Completed</span>:<span  className="text-dark-blue">In Progress</span>}

                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                            {moment(order.dateOrder).format('MMM DD, YYYY')}
                                                                </span>
                                                            </td>
                                                           
                                                            <td className="align-middle">
                                                                <Link to={`/order-detail/${order.orderNumber}`} params={order.orderNumber}><span><img style={{width:"23px", height:"23px", cursor:"pointer"}} src="assets/default/img/icons/paper.svg" className="img-cover" alt=""/></span>
                                                                </Link>

                                                            </td>
                                                
                                                        </tr>);
                                                    }
                                                )
                                            
                                            
                                                }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                      
                </section>
            
                </div>
            </div>
            </>
        );
    };
}

const mapStateToProps = state => {
    return {        
        orders: state.payment.orders,
        page: state.payment.page,
        totalPages: state.payment.totalPages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderRequest:(e) => dispatch (fetchOrderRequest(e)),
        searchOrderRequest:(e) => dispatch (searchOrderRequest(e))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderInfo);