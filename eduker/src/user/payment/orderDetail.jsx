import React from "react";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import { fetchOrderRequest, fetchOrderByIdRequest } from "../../actions/payment";
import {withRouterParams} from "../../admin/layout/auth/withRouter"
import moment from 'moment';
import Header from "../layout/header.jsx";
import loadjs from "loadjs";

 class OrderDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id

        }
    }

    componentDidMount(){
        this.props.fetchOrderByIdRequest(this.state.id);
        loadjs('/assets/default/js/print.js', () => {});

    } 

    render(){
        const { orderById } = this.props;
        return (
            <>
            <Header/>
             <section className="site-top-banner position-relative">
             <img src="https://lms2.rocket-soft.org/store/1015/6.jpg" className="img-cover" alt=""/>
             </section>
             <section className="container">
             <div className="rounded-lg shadow-sm px-25 py-20 px-lg-50 py-lg-35 position-relative user-profile-info bg-white">
             <div className="webinar-progress d-block d-lg-flex align-items-center p-15 panel-shadow bg-white rounded-sm">
             <div className="progress-item d-flex align-items-center">
             <a href=" /panel/setting/step/1 " className="progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle active" data-toggle="tooltip" data-placement="top" title="Basic Information">
             <img src="/assets/default/img/orders.svg" className="img-cover" alt=""/>
             </a>
             <div className="ml-10 ">
                 <h3 className="font-27 text-secondary font-weight-bold">Orders #{orderById.orderNumber}</h3>
             </div>
             </div>
             </div>
                     {/* <div className="mt-30 border-top"></div> */}
 
             <div className="d-flex justify-content-end">
 
             </div>
                 </div>
             </section>
             <div className="container mt-30" id="print_this" >
             <section className="rounded-lg border px-10 pb-35 pt-5 position-relative" style={{backgroundColor:"white"}}>
             <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
            </div>
            <div className="panel-section-card py-20 px-25 mt-20">
             <div className="col-md-12">
                        <div className="invoice_body">
                            <div className="invoice_dts">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="invoice_title">Rocket, LMS</h2>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="vhls140">
                                            <ul>
                                                <li><div className="vdt-list">590, Cách Mạng Tháng Tám, P11, Quận 3</div></li>
                                                <li><div className="vdt-list">Thành phố Hồ Chí Minh</div></li>
                                                <li><a href="#">  rockeLMS.com</a></li>
                                                
                                            </ul>
                                        </div>		
                                    </div>
                                    <div className="col-md-3">
                                        <div className="vhls140">
                                            <ul>
                                            <li><div className="vdt-list"><span>Date :</span>{moment(orderById.dateOrder).format('MMM DD, YYYY')}</div></li>
                                            <li><div className="vdt-list"><span>Order ID :</span><b>#{orderById.orderNumber}</b> </div></li>
                                
                                            </ul>
                                        </div>		
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <hr/>
                            <div className="panel-section-card py-20 px-25 mt-20">
                <div className="row">
                    <div className="col-12 ">
                        <div className="table-responsive">
                            <table className="table text-center custom-table">
                                <thead>
                                <tr>
                                    <th>Item</th>
                                    <th className="text-left">Purchase Date</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total Amount</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {orderById.orderDetails&&orderById.orderDetails.map((order,index) => {
                                        return (
                                    <tr key={index}>
                                        
                                        <td className="text-left">
                                            <div className="text-left">
                                            {order.course.title}
                                                                                            </div>
                                        </td>
                                        <td className="text-left">
                                                                                            <span>{moment(orderById.dateOrder).format('MMM DD, YYYY')}</span>
                                                                                    </td>
                                        <td className="align-middle">1</td>
                                        <td className="align-middle">${order.course.price }</td>
                                        <td className="align-middle">${orderById.totalAmount }</td>
                                        
                                        
                                    </tr>);
                                            }
                                        )
                                    } 
                                    <td colSpan={4}></td>
                                                <td colSpan={1} style={{width:"200px"}}>
                                                    <div className="user_dt_trans">														
                                                        <h3>Total paid : ${orderById.totalAmount }</h3>
                                                        <p>Paid via Paypal</p>
                                                    </div>
                                                </td>	
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                            {/* <div className="invoice_table">
                                <div className="table-responsive-md">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Purchase Date</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col" >Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orderById.orderDetails&&orderById.orderDetails.map((order,index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                <div className="user_dt_trans">
                                                                    <p>{order.course.title}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">														
                                                                    <p>{moment(orderById.dateOrder).format('MMM DD, YYYY')}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">
                                                                    <p>1</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">
                                                                    <p>${order.course.price }</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">														
                                                                    <p>${orderById.totalAmount }</p>
                                                                </div>
                                                            </td>		
                                                        </tr>);
                                                    }
                                                    
                                                )
                                            } 
                                                <td colSpan={4}></td>
                                                <td colSpan={1} style={{width:"200px"}}>
                                                    <div className="user_dt_trans">														
                                                        <h3>Total paid : ${orderById.totalAmount }</h3>
                                                        <p>Paid via Paypal</p>
                                                    </div>
                                                </td>												
                                            										
                                        </tbody>
                                    </table>	
                                    													
                                </div>
                            </div> */}
                            <div className="invoice_footer">
                                <div className="leftfooter">
                                    <p>Thanks for buying.</p>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    </div>
                    
         </section>
         <br/>
         
         </div>
         <div style={{paddingLeft:"150px"}}>
            <Link to ="/orders" type="button" id="getNextStep" className="btn btn-sm btn-primary ml-15" >Back</Link>
            <button style={{backgroundColor:"#dc2e2e", borderColor:"#dc2e2e"}} type="button" value={'Value'} onClick={()=> printdiv('print_this')}  className="btn btn-sm btn-primary ml-15" >Print</button>
         </div>
            </>
            
      );
    }
  
};

const mapStateToProps = state => {
    return {        
        orders: state.payment.orders,
        page: state.payment.page,
        totalPages: state.payment.totalPages,
        orderById: state.payment.order

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderRequest:(e) => dispatch (fetchOrderRequest(e)),
        fetchOrderByIdRequest:(e) => dispatch (fetchOrderByIdRequest(e)),
    };
}

export default withRouterParams(connect(mapStateToProps,mapDispatchToProps)(OrderDetail));
