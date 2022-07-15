import React from "react";
import {connect}  from "react-redux";
import {fetchDashboardRequest} from "../../actions/dashboard"
import Header from "../../user/layout/header.jsx";
import loadjs from "loadjs";
import Panel from "../layout/panel.jsx";

class DashBoard extends React.Component {
	constructor(props) {
        super(props)

        this.state = {
        }

    }
    
    componentDidMount(){
        this.props.fetchDashboardRequest();
       
    }

    render() {
		const {dashboard} = this.props
        return (
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                        <section className="">
                
            </section>

            <section className="dashboard">
                <div className="row">
                    
                    <div className="col-12 col-lg-4 mt-35">
                        <a href="#" className="bg-white dashboard-stats rounded-sm panel-shadow p-10 p-md-20 d-flex align-items-center">
                            <div className="stat-icon requests">
                                <img src="/assets/default/img/icons/monay.svg " alt=""/>

                            </div>
                            <div className="d-flex flex-column ml-15">
                                <span className="font-16 text-gray font-weight-500">Total Sales</span>

                                <span className="font-30 text-secondary">${dashboard.totalSales}</span>
                                <span className="font-16 text-gray font-weight-500">New ${dashboard.totalTodaySales}</span>


                            </div>
                        </a>

                        <a href="#" className="bg-white dashboard-stats rounded-sm panel-shadow p-10 p-md-20 d-flex align-items-center mt-15 mt-md-30">
                            <div className="stat-icon monthly-sales">
                                <img src="/assets/default/img/icons/course.png" alt=""/>
                            </div>
                            <div className="d-flex flex-column ml-15">
                                <span className="font-16 text-gray font-weight-500">Total Course</span>

                                <span className="font-30 text-secondary">{dashboard.totalCourses}</span>
                                <span className="font-16 text-gray font-weight-500">New {dashboard.totalTodayCourses}</span>

                            </div>
                        </a>
                    </div>

                    <div className="col-12 col-lg-4 mt-35">
                        <a href="#" className="bg-white dashboard-stats rounded-sm panel-shadow p-10 p-md-20 d-flex align-items-center">
                            <div className="stat-icon support-messages">
                                <img src="/assets/default/img/icons/request.svg" alt=""/>
                            </div>
                            <div className="d-flex flex-column ml-15">
                                <span className="font-16 text-gray font-weight-500">Total Enroll</span>

                                <span className="font-30 text-secondary">{dashboard.totalEnroll}</span>
                                <span className="font-16 text-gray font-weight-500">New {dashboard.totalTodayEnroll}</span>

                            </div>
                        </a>

                        <a href="#" className="bg-white dashboard-stats rounded-sm panel-shadow p-10 p-md-20 d-flex align-items-center mt-15 mt-md-30">
                            <div className="stat-icon comments">
                                <img src="/assets/default/img/icons/student.png" alt=""/>
                            </div>
                            <div className="d-flex flex-column ml-15">
                                <span className="font-16 text-gray font-weight-500">Total Customers</span>

                                <span className="font-30 text-secondary">{dashboard.totalUsers}</span>
                                <span className="font-16 text-gray font-weight-500">New {dashboard.totalTodayUsers}</span>

                            </div>
                        </a>
                    </div>
                   
                    <div className="col-12 col-lg-4 mt-35">
                        <div className="dashboard-banner">
                            <img src="/store/1/dashboard.png" style={{ width:"500px"}} alt="" className="img-cover"/>
                        </div>
                    </div>
                    
                </div>

                
            </section>


            <div className="d-none" id="iNotAvailableModal">
                <div className="offline-modal">
                    <h3 className="section-title after-line">Activate offline status</h3>
                    <p className="mt-20 font-16 text-gray">If you put your account offline, a message will be displayed in your profile and it will be noticed to users. You can type a personalized message in the following input.</p>

                    <div className="form-group mt-15">
                        <label>Offline message</label>
                        <textarea name="message" rows="4" className="form-control "></textarea>
                        <div className="invalid-feedback"></div>
                    </div>

                    <div className="mt-30 d-flex align-items-center justify-content-end">
                        <button type="button" className="js-save-offline-toggle btn btn-primary btn-sm">Save</button>
                        <button type="button" className="btn btn-danger ml-10 close-swl btn-sm">Close</button>
                    </div>
                </div>
            </div>

            <div className="d-none" id="noticeboardMessageModal">
                <div className="text-center">
                    <h3 className="modal-title font-20 font-weight-500 text-dark-blue"></h3>
                    <span className="modal-time d-block font-12 text-gray mt-25"></span>
                    <p className="modal-message font-weight-500 text-gray mt-4"></p>
                </div>
            </div>

                </div>
            </div>
            </>
        );
    }
}


const mapStateToProps = state => { 
    return {        
		dashboard: state.dashboard.dashboard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDashboardRequest:() => dispatch (fetchDashboardRequest()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);