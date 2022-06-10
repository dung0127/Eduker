import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrderRequest, searchOrderRequest } from '../../actions/payment';
import $ from "jquery";
import moment from 'moment';
import Header from '../layout/header.jsx';


class Order extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            searchOrder:''
        }
                       
    }

    componentDidMount(){
        this.props.fetchOrderRequest(this.props.page);
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
                <h3 className="font-27 text-secondary font-weight-bold">Orders</h3>
            </div>
            </div>
            </div>
                    {/* <div className="mt-30 border-top"></div> */}

            <div className="d-flex justify-content-end">

            </div>
                </div>
            </section>
            <div className="container mt-30"  >
            <section className="rounded-lg border px-10 pb-35 pt-5 position-relative" style={{backgroundColor:"white"}}>
            <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
            </div>

            <div className="panel-section-card py-20 px-25 mt-20">
                <div className="row">
                    <div className="col-12 ">
                        <div className="table-responsive">
                            <table className="table text-center custom-table">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th className="text-left">Order Number</th>
                                    <th className="text-center">Purchase Date</th>
                                    <th className="text-center">Total amount</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Actions</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.orders.map((order,index) => {
                                        return (
                                    <tr key={index}>
                                        <td className="text-left">
                                            <div className="user-inline-avatar d-flex align-items-center">
                                                
                                                <div className=" ml-5">
                                                    <span className="d-block">{index + 1 + this.props.page*10}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="align-middle">
                                            <div className="text-left">
                                            #{order.orderNumber}
                                                                                            </div>
                                        </td>
                                        <td className="align-middle">
                                                                                            <span>{moment(order.dateOrder).format('MMM DD, YYYY')}</span>
                                                                                    </td>
                                        <td className="align-middle">${order.totalAmount}</td>
                                        
                                        <td className="align-middle">
                                        {order.statusOrder?<span className="text-primary">Compeleted</span>:<span className="text-dark-blue"></span>}
                                                                                        </td>
                                        <td className="align-middle">
                                        <Link to={`/order/${order.orderNumber}`} params={order.orderNumber}><span><img style={{width:"15px", cursor:"pointer"}} src='/assets/default/img/search-line.svg'/></span>
                                        </Link></td>
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

            {this.props.totalPages>1?
            <div className="my-30">
                <nav className="d-flex justify-content-center">
                    <ul className="custom-pagination d-flex align-items-center justify-content-center">
                        {this.props.page > 0?   
                        <li  className="previous" onClick={() => this.handleClick(this.props.page-1)}>
                            <a><svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </a></li>
                        :<li className="previous disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </li>} 
                        {[...Array(this.props.totalPages)].map((e, i) => (this.props.page) == i ?<li><a style={{cursor:"pointer"}} className="active" onClick={() => this.handleClick(i)} key={i}>{i+1}</a></li>
                                                                                    :<li><a style={{cursor:"pointer"}} onClick={() => this.handleClick(i)} key={i}>{i+1}</a></li>)         }
                        {this.props.page  < (this.props.totalPages-1)?
                        <li className="next" onClick={() => this.handleClick(this.props.page+1)}><a>
                            <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        :<li className="next disabled">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </li>
                        }   
                    </ul>
                </nav>
            </div>
            :''}

        </section>
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

export default connect(mapStateToProps,mapDispatchToProps)(Order);