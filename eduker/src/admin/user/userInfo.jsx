import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserRequest, deleteUserRequest,searchUserRequest } from "../../actions/user";
import $ from "jquery";
import Header from "../../user/layout/header.jsx";
import Panel from "../layout/panel.jsx";

class UserInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchUser:'',
            delete:'',
        }
                       
    }

    componentDidMount(){
        this.props.fetchUserRequest(this.props.page);
    } 

    handleClick(data) {
        console.log(data);
        if(data >= 0 && data< this.props.totalPages)
        {   
            this.props.fetchUserRequest(data);
        }
    }

    handleSuccess = () => {
        $('#success').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    handleError = () => {
        $('#error').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    handleClickDelete = (data) => {
        this.setState({delete:data})
    }

    alertDelete = () => {
        this.props.deleteUserRequest(this.state.delete)
        this.handleSuccess();
    }

    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchUser:value});  
    }

    searchUser = (searchUser) => {
        this.props.searchUserRequest(searchUser);
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
                                                <button type="button"  onClick={()=>this.searchUser(this.state.searchUser) } className="js-video-demo-path-links rounded-left input-group-text input-group-text-rounded-left text-white" data-preview="holder">
                                                <img style={{width:"23px", height:"23px"}} src="/assets/default/img/search1.png"/>
                                                </button>
                                            </div>
                                            <input type="text" placeholder="Search..."  name="urlVideoDescription" onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchUser(this.state.searchUser)} className="form-control "/>
                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

                    <section className="mt-35">
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                        {
                        this.state.filter=='all'?<h2 className="section-title">All Courses</h2>
                        :this.state.filter=='activate'?<h2 className="section-title">Activate Courses</h2>
                        :this.state.filter=='darft'?<h2 className="section-title">Draft Courses</h2>:''}
                    </div>
                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="table-responsive">
                                    <table className="table text-center custom-table">
                                        <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th className="text-left">Username</th>
                                            <th className="text-left">Name</th>
                                            <th className="text-left">Address</th>
                                            <th className="text-left">Email</th>
                                            <th className="text-center">Phone</th>
                                            <th className="text-center">Role</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Action</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                                {this.props.users.map((user,index) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                {index + 1 + this.props.page*10}
                                                                </div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="user-inline-avatar d-flex align-items-center">
                                                                    <div className="avatar">
                                                                        <img src={user.avatarImage} className="img-cover" alt=""/>
                                                                    </div>
                                                                    <div className=" ml-5">
                                                                        <span className="d-block">{user.username}</span>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle text-left">
                                                            <span >
                                                            {user.fullname}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle text-left">
                                                            <span>
                                                            {user.address}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle text-left">
                                                            <span>
                                                            {user.email}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                            {user.phone}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                            {user.role.name=='ROLE_ADMIN'?'ADMIN':'USER'}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            {user.enabled ?         <span className="text-primary">Active</span>:<span  className="text-dark-blue">Inactive</span>}
                                                            </td>
                                                            
                                                            <td className="align-middle">
                                                                <Link to ={`/user-edit/${user.id}`} params={user.id}  className="text-dark-blue"><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></Link>
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
        users: state.user.users,
        page: state.user.page,
        totalPages: state.user.totalPages,
        
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRequest:(e) => dispatch (fetchUserRequest(e)),
        deleteUserRequest:(e) => dispatch (deleteUserRequest(e)),
        searchUserRequest:(e) => dispatch (searchUserRequest(e)),

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);