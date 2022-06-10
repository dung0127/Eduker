import React from 'react';
import { Link } from 'react-router-dom';
import {COURSE_API_BASE_URL} from "../../config/env";
import authHeader from "../../config/authHeader";
import axios from 'axios';
import {connect} from 'react-redux';
import { fetchCourseRequest, deleteCourseRequest, fetchCourseByDraftRequest, searchCourseRequest, fetchCourseByActivateRequest } from "../../actions/course";
import $ from 'jquery';
import Header from '../../user/layout/header.jsx';
import Panel from '../layout/panel.jsx';

class CourseInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchCourse:'',
            delete:'',
            filter:'all',
        }
    }
    
    componentDidMount(){
        this.props.fetchCourseRequest(this.props.page);
        this.props.fetchCourseByDraftRequest(this.props.pageDraft);
        this.props.fetchCourseByActivateRequest(this.props.pageActivate);

    } 

    changeFilter = e => {
        this.setState({filter:e.target.value})
        console.log(e.target.value)

    }

    handleClick(data) {
        if(data >= 0 && data< this.props.totalPages)
        {   
            this.props.fetchCourseRequest(data);
        }
    }

    handleClickSearch(data) {
        if(data >= 0 && data< this.props.totalPagesSearch)
        {   
            this.props.searchCourseRequest(data);
        }
    }

    handleClickDraft(data) {
        if(data >= 0 && data< this.props.totalPagesDraft)
        {   
            this.props.fetchCourseByDraftRequest(data);
        }
    }

    handleClickActivate(data) {
        if(data >= 0 && data< this.props.totalPagesActivate)
        {   
            this.props.fetchCourseByActivateRequest(data);
        }
    }

    handleClickDelete(data) {
        this.setState({delete:data})
        
    }

    alertDelete = () => {
        this.props.deleteCourseRequest(this.state.delete)
        this.handleSuccess();
    }
 
    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value}); 
        console.log(value) 
    }

    searchCourse = (search) => {
        if(search==''){
            this.setState({filter:'all'})
        }
        else {
        this.props.searchCourseRequest(search);
        this.setState({filter:'search'})
        }
    }

    handleSuccess = () => {
        $('#deleteSuccess').fadeIn('fast').delay(2000).fadeOut('slow');
		
	} 

    render() {
        return (
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
                                <div className="col-12 col-lg-6">
                                    <div className="form-group">
                                        <select onChange={this.changeFilter } className="form-control select" >
                                            <option value='all' style={{fontSize:"13px"}} > All</option>
                                            <option value='activate' style={{fontSize:"13px"}}> Activate</option>
                                            <option value="draft" style={{fontSize:"13px"}}> Draft</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <div className="row">
                                        
                                        <div className="col-12 col-lg-12">
                                            <div>

                                                    <input className="form-control mr-5 rounded" type="text" style={{width:"450px"}} placeholder="Search..."  onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchCourse(this.state.searchCourse)}
                                                        aria-label="Search"/>
                                                    <button onClick={()=>this.searchCourse(this.state.searchCourse) }
                                                        className="btn-transparent d-flex align-items-center justify-content-center search-icon">
                                                    <i data-feather="search" style={{position: 'absolute', left:"430px", top:"10px"}} className="mr-10"></i>
                                                    </button>
                                            </div>
                                        </div>
                                        
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
                        :<h2 className="section-title">Draft Courses</h2>}
                    </div>
                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="table-responsive">
                                    <table className="table text-center custom-table">
                                        <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th className="text-left">Title</th>
                                            <th className="text-center">Price</th>
                                            <th className="text-center">Status</th>
                                            <th className="text-center">Action</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.filter=='all'?
                                                this.props.courses.map((course,index) => {
                                                    console.log(this.props.page)
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                IT-{index + 1 + this.props.page*12}
                                                                </div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="user-inline-avatar d-flex align-items-center">
                                                                    <div className="avatar">
                                                                        <img src={course.imageVideoDescription} className="img-cover" alt=""/>
                                                                    </div>
                                                                    <div className=" ml-5">
                                                                        <span className="d-block">{course.title}</span>
                                                                        <span className="mt-5 font-12 text-gray d-block">{course.language=='VN'?'Vietnamese':course.language=='ENG'?'English':course.language=='FR'?'French':course.language=='JP'?'Japanese':''}</span>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                                ${course.price}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            {course.activate ?          <span className="text-primary">Activate</span>:<span  className="text-dark-blue">Draf</span>}
                                                            </td>
                                                        
                                                            <td className="align-middle">
                                                                <span className="text-dark-blue"><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>
                                                            </td>
                                                
                                                        </tr>);
                                                    }
                                                )
                                            :this.state.filter=='activate'?
                                                this.props.coursesByActivate&&this.props.coursesByActivate.map((activate,m) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                IT-{m + 1 + this.props.pageActivate*12}
                                                                </div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="user-inline-avatar d-flex align-items-center">
                                                                    <div className="avatar">
                                                                        <img src={activate.imageVideoDescription} className="img-cover" alt=""/>
                                                                    </div>
                                                                    <div className=" ml-5">
                                                                        <span className="d-block">{activate.title}</span>
                                                                        <span className="mt-5 font-12 text-gray d-block">{activate.language=='VN'?'Vietnamese':activate.language=='ENG'?'English':activate.language=='FR'?'French':activate.language=='JP'?'Japanese':''}</span>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                                ${activate.price}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span className="text-primary">Activate</span>
                                                            </td>
                                                        
                                                            <td className="align-middle">
                                                                <span className="text-dark-blue"><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>

                                                            </td>
                                                
                                                        </tr>);
                                                    }
                                                )
                                            :this.state.filter=='draft'?
                                                this.props.coursesByDraft&&this.props.coursesByDraft.map((draf,n) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                IT-{n + 1 + this.props.pageDraft*12}
                                                                </div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="user-inline-avatar d-flex align-items-center">
                                                                    <div className="avatar">
                                                                        <img src={draf.imageVideoDescription} className="img-cover" alt=""/>
                                                                    </div>
                                                                    <div className=" ml-5">
                                                                        <span className="d-block">{draf.title}</span>
                                                                        <span className="mt-5 font-12 text-gray d-block">{draf.language=='VN'?'Vietnamese':draf.language=='ENG'?'English':darf.language=='FR'?'French':draf.language=='JP'?'Japanese':''}</span>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                                ${draf.price}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                                <span  className="text-dark-blue">Draf</span>
                                                            </td>
                                                        
                                                            <td className="align-middle">
                                                            <span className="text-dark-blue"><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>

                                                            </td>
                                                
                                                        </tr>);
                                                    }
                                                )
                                            :
                                                this.props.coursesSearch&&this.props.coursesSearch.map((search,p) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                IT-{p + 1 + this.props.pageSearch*12}
                                                                </div>
                                                            </td>
                                                            <td className="text-left">
                                                                <div className="user-inline-avatar d-flex align-items-center">
                                                                    <div className="avatar">
                                                                        <img src={search.imageVideoDescription} className="img-cover" alt=""/>
                                                                    </div>
                                                                    <div className=" ml-5">
                                                                        <span className="d-block">{search.title}</span>
                                                                        <span className="mt-5 font-12 text-gray d-block">{search.language=='VN'?'Vietnamese':search.language=='ENG'?'English':search.language=='FR'?'French':search.language=='JP'?'Japanese':''}</span>

                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="align-middle">
                                                            <span>
                                                                ${search.price}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle">
                                                            {search.activate ?          <span className="text-primary">Activate</span>:<span  className="text-dark-blue">Draf</span>}
                                                            </td>
                                                        
                                                            <td className="align-middle">
                                                            <span className="text-dark-blue"><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>

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

                        {this.state.filter=='all'?
                            (this.props.totalPages>1?
                            <div className="mt-50 pt-30">
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
                            :'')
                        :this.state.filter=='activate'?
                            (this.props.totalPagesActivate>1?
                            <div className="mt-50 pt-30">
                                <nav className="d-flex justify-content-center">
                                    <ul className="custom-pagination d-flex align-items-center justify-content-center">
                                        {this.props.pageActivate > 0?   
                                        <li  className="previous" onClick={() => this.handleClickActivate(this.props.pageActivate-1)}>
                                            <a><svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </a></li>
                                        :<li className="previous disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </li>} 
                                        {[...Array(this.props.totalPagesActivate)].map((e, j) => (this.props.pageActivate) == j ?<li><a style={{cursor:"pointer"}} className="active" onClick={() => this.handleClickActivate(j)} key={j}>{j+1}</a></li>
                                                                                                    :<li><a style={{cursor:"pointer"}} onClick={() => this.handleClickActivate(j)} key={j}>{j+1}</a></li>)         }
                                        {this.props.pageActivate  < (this.props.totalPagesActivate-1)?
                                        <li className="next" onClick={() => this.handleClickActivate(this.props.pageActivate+1)}><a>
                                            <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a></li>
                                        :<li className="next disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </li>
                                        }   
                                    </ul>
                                </nav>
                            </div>
                            :''   )    
                        :this.state.filter=='draft'?
                            (this.props.totalPagesDraft>1?
                            <div className="mt-50 pt-30">
                                <nav className="d-flex justify-content-center">
                                    <ul className="custom-pagination d-flex align-items-center justify-content-center">
                                        {this.props.pageDraft > 0?   
                                        <li  className="previous" onClick={() => this.handleClickDraft(this.props.pageDraft-1)}>
                                            <a><svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </a></li>
                                        :<li className="previous disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </li>} 
                                        {[...Array(this.props.totalPagesDraft)].map((e, k) => (this.props.pageDraft) == k ?<li><a style={{cursor:"pointer"}} className="active" onClick={() => this.handleClickDraft(i)} key={k}>{k+1}</a></li>
                                                                                                    :<li><a style={{cursor:"pointer"}} onClick={() => this.handleClickDraft(k)} key={k}>{k+1}</a></li>)         }
                                        {this.props.pageDraft  < (this.props.totalPagesDraft-1)?
                                        <li className="next" onClick={() => this.handleClickDraft(this.props.page+1)}><a>
                                            <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a></li>
                                        :<li className="next disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </li>
                                        }   
                                    </ul>
                                </nav>
                            </div>
                            :'')
                        :
                            (this.props.totalPagesSearch>1?
                            <div className="mt-50 pt-30">
                                <nav className="d-flex justify-content-center">
                                    <ul className="custom-pagination d-flex align-items-center justify-content-center">
                                        {this.props.pageSearch > 0?   
                                        <li  className="previous" onClick={() => this.handleClickSearch(this.props.pageSearch-1)}>
                                            <a><svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </a></li>
                                        :<li className="previous disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </li>} 
                                        {[...Array(this.props.totalPagesSearch)].map((e, l) => (this.props.pageSearch) == l ?<li><a style={{cursor:"pointer"}} className="active" onClick={() => this.handleClickSearch(i)} key={l}>{l+1}</a></li>
                                                                                                    :<li><a style={{cursor:"pointer"}} onClick={() => this.handleClickSearch(l)} key={l}>{l+1}</a></li>)         }
                                        {this.props.pageSearch  < (this.props.totalPagesSearch-1)?
                                        <li className="next" onClick={() => this.handleClickSearch(this.props.pageSearch+1)}><a>
                                            <svg style={{cursor:"pointer"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a></li>
                                        :<li className="next disabled">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </li>
                                        }   
                                    </ul>
                                </nav>
                            </div>
                            :'')
                        }

                </section>
            
                </div>
            </div>
            </>
        );

    }
}

const mapStateToProps = state => {
    return {        
        courses: state.course.courses,
        page: state.course.page,
        totalPages: state.course.totalPages,

        coursesSearch: state.course.coursesSearch,
        pageSearch: state.course.pageSearch,
        totalPagesSearch: state.course.totalPagesSearch,

        coursesByDraft : state.course.coursesByDraft,
        pageDraft: state.course.pageDraft,
        totalPagesDraft: state.course.totalPagesDraft,

        coursesByActivate : state.course.coursesByActivate,
        messageSuccess: state.course.messageSuccess,
        pageActivate: state.course.pageActivate,
        totalPagesActivate: state.course.totalPagesActivate,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        deleteCourseRequest:(e) => dispatch (deleteCourseRequest(e)),
        fetchCourseByDraftRequest:(e) =>dispatch (fetchCourseByDraftRequest(e)),
        fetchCourseByActivateRequest:(e) =>dispatch (fetchCourseByActivateRequest(e)),
        searchCourseRequest:(e) => dispatch (searchCourseRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(CourseInfo);