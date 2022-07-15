import React, { Component } from "react";
import {connect} from 'react-redux';
import { withRouterParams, withRouter } from "../../admin/layout/auth/withRouter";
import {Link} from "react-router-dom";
import moment from 'moment';
import loadjs from 'loadjs';
import { fetchCreateReviewRequest,fetchDeleteReviewRequest,fetchUpdateReviewRequest } from "../../actions/review";
import {imageRequest} from "../../actions/course"
import { courseByIdRequest , updateCourseRequest} from '../../actions/course';
import { createLessonRequest, deleteLessonRequest, fetchLessonByCourseIdRequest, fetchLessonByIdRequest, updateLessonRequest } from "../../actions/lesson";
import axios from 'axios';
import { createLectureRequest, deleteLectureRequest, fetchLectureByIdRequest, updateLectureRequest } from "../../actions/lecture";
import validator from 'validator';
import authHeader from "../../config/authHeader"
import Panel from "../layout/panel.jsx";
import Header from "../../user/layout/header.jsx";


class CourseEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            id : this.props.params.id,      
            save:'', 
            show: false,
            review:{},

            editCourse: {
                },

            image:'',

            video:'',
            
            error: {},

            course: this.props.course,

            select:'',

            ava:'',

            videoUp:'',

            videoLecture:'',

            stateVideo:'',

            newLesson:{
                title:''
            },
            status:'',     
            switch: false,
            changeSwitch: false,
            newLecture:{},
            addLecture:{
                id:'',
                title:'',
                videoDuration:'',
                videoUrl:'',
                sort:'',
                preview:'false'
            },
        }

    }

    getStateVideo = (id) => {
        this.setState({stateVideo:"#video"+id})
    }
    getSwitch = (preview) => {
        this.setState({switch:preview})
    }
    stopVideo = (id) => {
        
        $("#videoModalLecture"+id).on('hidden.bs.modal', function(e) {
            var $iframes = $(e.target).find('iframe');
            $iframes.each(function(index, iframe){
            $(iframe).attr('src', $(iframe).attr('src'));
            });
          })
    }
    switch =  () => {
        this.state.changeSwitch?
            this.setState({
                changeSwitch: false,
            }):
            this.setState({
                changeSwitch: true,
            });
    }

    // changeSwitch =  () => {
    //     this.state.switch?
    //         this.setState({
    //             switch: false
    //         }):
    //         this.setState({
    //             switch: true
    //         });
    // }

    handleInputLessonChange = (e) => {   
        let formData = Object.assign({}, this.state.newLesson);    
        formData[e.target.name] = e.target.value;        
        this.setState({newLesson:formData});  
        console.log(formData)  
    }

    handleInputLectureChange = (e) => {   
        let formData = Object.assign({}, this.state.newLecture);
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                })
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            } 
            else{
                this.setState({
                    videoLecture: URL.createObjectURL(e.target.files[0])
                    
                })

                // let url = URL.createObjectURL(e.target.files[0])
                // let videoP = document.querySelector("video").src= url;
                // videoP.setAttribute("src", url)
                // videoP.play();
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({videoUp:e.target.files[0]})

            }
            
            this.setState({newLecture:formData});  
        }
        else {
            formData[e.target.name] = e.target.value;        
            this.setState({newLecture:formData});  
        }    
        
        console.log(formData)  
    }

    removeVideo = (id,url) => {
        this.setState({videoLecture:url})
        let videoP = document.querySelector("#demo"+id)
        videoP.setAttribute("src", url)
        videoP.play();
    }

    handleInputLectureCreateChange = (e) => {   
        let formData = Object.assign({}, this.state.addLecture);    
         
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                })
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            } 
            else{
                this.setState({
                    videoLecture: URL.createObjectURL(e.target.files[0])
                    
                })

                // let url = URL.createObjectURL(e.target.files[0])
                // let videoP = document.querySelector("video").src= url;
                // videoP.setAttribute("src", url)
                // videoP.play();
                formData[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({videoUp:e.target.files[0]})

            }
            
            this.setState({addLecture:formData}); 
        }
        else {
            formData[e.target.name] = e.target.value;        
            this.setState({addLecture:formData}); 
        }    
        console.log(formData)  

    }

    updateLesson = (lesson, courseId, edit, id) => {
        edit.courseId=courseId;
        let newForm = Object.assign(lesson,edit);
        this.props.updateLessonRequest(newForm,courseId);
        this.setState({newLesson:{title:''}}); 
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Title has been changed successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
        $('#idles'+id).click();
    }

    createLesson = (courseId, add) => {
        if(this.validateCreateLesson()){
        add.courseId=courseId;
        this.props.createLessonRequest(add,courseId);
        Array.from(document.querySelectorAll('.lesson')).forEach(input=>(input.value=""))
        this.setState({newLesson:{title:''}}); 
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Lesson added successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
        $('#createLesson').click();
        }
    }

    deleteLesson = (id, courseId) => {
        
        this.props.deleteLessonRequest(id, courseId);
          
        // Array.from(document.querySelectorAll('input')).forEach(input=>(input.defaultValue=""))
    }

    closeModal = () => {
        this.setState({
            error: {}
        })
    }
    
    validate = (sort,idLes, data) => {
        const error = {}
        let isValid = true;
        data.map((les) => 
        (les.id == idLes) ? (
            les.lectures.map((lec) => (
                (lec.sort==sort)?(
                    isValid = false,
                    error['sort'] = 'Sort already exists'
                ):''
            ))
        ):''
        )
        // if (this.state.newLecture.videoUrl !== undefined) {
        //     var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
        //     if (!pattern.test(this.state.newLecture.videoUrl)) {
        //       isValid = false;
        //       error["videoUrl"] = "Please enter valid youtube url.";
        //     }
        // }
        
        this.setState({
            error: error
        })

        return isValid;
    }

    updateLecture = (lecture, lessonId, courseId, edit) => {

        axios.get('http://localhost:8080/api/course/'+courseId+'/lessons',{ headers: authHeader() }).then((res) => {
        if(this.validate(edit.sort, lessonId, res.data.data)){
            
        this.props.imageRequest(this.state.videoLecture)
        edit.lessonId=lessonId;
        let newForm = Object.assign(lecture,edit);
        console.log(newForm);
        this.props.updateLectureRequest(newForm,courseId);
        this.setState({newLecture:{
            
        }})
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Lecture has been changed successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
        $('#idlec'+lecture.id).click();
        }
        
        })
    } 

    validateCreateLesson = () => {
        const error = {}
        let isValid = true;
        if(validator.isEmpty(this.state.newLesson.title)){            
            error['create'] = 'Title is required.';
            isValid = false;
        }
        this.setState({
            error: error
        })

        return isValid;
    }

    validateCreate = (sort,idLes, data) => {
        const error = {}
        let isValid = true;
        data.map((les) => 
        (les.id == idLes) ? (
            les.lectures.map((lec) => (
                (lec.sort==sort)?(
                    isValid = false,
                    error['sortCreate'] = 'Sort already exists'
                ):''
            ))
        ):''
        )
        
        if(validator.isEmpty(this.state.addLecture.sort)){            
            error['sortCreate'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.title)){            
            error['titleCreate'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoUrl)){            
            error['videoUrlCreate'] = 'The field is required.';
            isValid = false;
        }
        // else {
        //     var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
        //     if (!pattern.test(this.state.addLecture.videoUrl)) {
        //       isValid = false;
        //       error["videoUrlCreate"] = "Please enter valid youtube url.";
        //     }
        // }

        if(validator.isEmpty(this.state.addLecture.videoDuration)){            
            error['videoDurationCreate'] = 'The field is required.';
            isValid = false;
        }                
       
        this.setState({
            error: error
        })

        return isValid;
    }

    changeSwitch =  () => {
        if(this.state.switch)
        {
            this.setState({
                switch: false,
            })
            let formDataLecture = Object.assign({}, this.state.addLecture); 
            //console.log(formDataLecture)
          
            formDataLecture['preview'] = 'false';   
            this.setState({addLecture:formDataLecture});  
            
        }

        else{
            this.setState({
                switch: true,
            })
            let formDataLecture = Object.assign({}, this.state.addLecture); 
            //console.log(formDataLecture)
            
            formDataLecture['preview'] = 'true';   
            this.setState({addLecture:formDataLecture});  
        }
        console.log(this.state.switch)
    }

    editChangeSwitch =  () => {
        if(this.state.switch)
        {
            this.setState({
                switch: false,
            })
            let formDataLecture = Object.assign({}, this.state.newLecture); 
            //console.log(formDataLecture)
          
            formDataLecture['preview'] = 'false';   
            this.setState({newLecture:formDataLecture});  
            
        }

        else{
            this.setState({
                switch: true,
            })
            let formDataLecture = Object.assign({}, this.state.newLecture); 
            //console.log(formDataLecture)
            
            formDataLecture['preview'] = 'true';   
            this.setState({newLecture:formDataLecture});  
        }
        console.log(this.state.switch)
    }


    createLecture = (courseId, lessonId, add) => {
        axios.get('http://localhost:8080/api/course/'+courseId+'/lessons',{ headers: authHeader() }).then((res) => {
          
        if(this.validateCreate(add.sort, lessonId, res.data.data)){
        this.props.imageRequest(this.state.videoUp)

        add.lessonId=lessonId;
        // console.log(add)
        this.props.createLectureRequest(add,courseId);
        Array.from(document.querySelectorAll('.lecture')).forEach(input=>(input.value=""))
        this.setState({
            switch: false,
        })
        this.setState({addLecture:{
            title:'',
            videoDuration:'',
            videoUrl:'',
            sort:'',
            preview:'false'
        }})
        $('#idlecCreate'+lessonId).click();
        }
        
        })
    }

    deleteLecture = (id, courseId) => {
        this.props.deleteLectureRequest(id, courseId);
    }


    createReview = (form, id) => {
        form.courseId = id
        this.props.fetchCreateReviewRequest(form, id),
        loadjs('/assets/default/js/review.js', () => {});

    }

    updateReview = (form, id) => {
        form.courseId = id
        let newForm = Object.assign(this.props.course.userReview,form);
        this.props.fetchUpdateReviewRequest(newForm, id)
        this.setState({show:false})
        loadjs('/assets/default/js/review.js', () => {});

    }

    deleteReview = (idReview, id) => {
        this.props.fetchDeleteReviewRequest(idReview ,id);
        loadjs('/assets/default/js/review.js', () => {});

    }

    formReview = e => {   
        let formData = Object.assign({}, this.state.review); 
        //console.log(formDataLecture)
        formData[e.target.name] = e.target.value;        
        this.setState({review:formData});  
        console.log(formData);
    }

    showEdit = () => {
        this.state.show? this.setState({show: false}) : this.setState({show: true})
    }

    savedCourse = (id) => {
        this.props.fetchSavedRequest(id);
    }

    unsavedCourse = (id) => {
        this.props.fetchUnsavedRequest(id);
    }

    componentDidMount(){

        loadjs('/assets/default/vendors/swiper/swiper-bundle.min.js', () => {});
        loadjs('/assets/default/js/parts/main.min.js', () => {});
        loadjs('/assets/default/vendors/parallax/parallax.min.js', () => {});
        loadjs('/assets/default/js/parts/home.min.js', () => {});
        // loadjs('/assets/default/js/parts/categories.min.js', () => {});
        // loadjs('/assets/default/vendors/feather-icons/dist/feather.min.js', () => {});
        // loadjs('/assets/default/js/cart.js', () => {});

        loadjs('/assets/default/js/panel/webinar.min.js', () => {});
        loadjs('/assets/default/js/panel/webinar_content_locale.min.js', () => {});
        loadjs('/assets/vendors/summernote/summernote-bs4.min.js', () => {});
        loadjs('/assets/default/vendors/chartjs/chart.min.js', () => {});
        loadjs('/assets/default/vendors/apexcharts/apexcharts.min.js', () => {});
        loadjs('/assets/default/vendors/sweetalert2/dist/sweetalert2.min.js', () => {});
        loadjs('/assets/default/vendors/select2/select2.min.js', () => {});

        
        this.props.courseByIdRequest(this.state.id);

    } 

    handleSelect = e => {            
        this.setState({select: e.target.value});  
        console.log(e.target.value)
    }

    // -------------------------  Course  -----------------------------
    formCourse = e => {   
        let formDataCourse = Object.assign({}, this.state.editCourse);  
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                })
                formDataCourse[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({ava:e.target.files[0]})
            } 
            else{
                this.setState({
                    video: URL.createObjectURL(e.target.files[0])
                    
                })

                let url = URL.createObjectURL(e.target.files[0])
                let videoP = document.querySelector(".videoHere");
                videoP.setAttribute("src", url)
                videoP.play();
                formDataCourse[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({videoUp:e.target.files[0]})

            }
            
            this.setState({editCourse:formDataCourse});  
        }
        else {
        formDataCourse[e.target.name] = e.target.value;        
        this.setState({editCourse:formDataCourse});  
        console.log(formDataCourse)  
        }
    }

    editCourse = (edit, courseId) => {
        let newForm = Object.assign(this.props.course,edit);
        this.props.imageRequest(this.state.ava)
        this.props.imageRequest(this.state.videoUp)

        this.props.updateCourseRequest(newForm, courseId);
        
            Swal.fire({
                icon: "success",
                html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Information has been changed successfully </h3>",
                showConfirmButton: !1,
                width: "25rem"
            }),
            setTimeout(function() {
            Swal.close()
                
            }, 1000)
        
    }

    render(){
        let dem = 0;
        console.log(this.state.video)
        console.log(this.state.image)


        return (
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                <div className="panel-section-card py-20 px-25 ">
                    
                <section className="mt-25">
                            <ul className="nav nav-tabs bg-secondary rounded-sm p-15 d-flex align-items-center justify-content-between" id="tabs-tab" role="tablist">
                                <li  className="nav-item " >
                                
                                </li>
                                <li  className="nav-item " >
                                    <a  className="position-relative font-14 text-white active" id="information-tab"
                                    data-toggle="tab" href="#information" role="tab" aria-controls="information"
                                    aria-selected="true">Basic Information</a>
                                </li>
                                <li  className="nav-item " >
                                
                                </li>
                                <li className="nav-item">
                                    <a className="position-relative font-14 text-white " id="content-tab" data-toggle="tab"
                                    href="#content" role="tab" aria-controls="content"
                                    aria-selected="false">Content</a>
                                </li>
                                <li  className="nav-item " >
                                
                                </li>
                                
                                
                            </ul>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active " id="information" role="tabpanel"
                                aria-labelledby="information-tab">

                                <div className="mt-20">
                                    <br/>
                                    <div className="mt-15 course-description">
                                        <p><font color="#1c1d1f"><b>Title</b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`title${this.props.course.id}`}>
                                        <input className="form-control prompt srch_explore" type="text" placeholder="Course title here" name="title" data-purpose="edit-course-title" maxlength="60" defaultValue={this.props.course.title} onChange={this.formCourse}  />															
                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>Short Description</b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`short${this.props.course.id}`}>
                                        <textarea className="form-control " rows="5" name="shortDescription" placeholder="Item description here..."  defaultValue={this.props.course.shortDescription}  onChange={this.formCourse}></textarea>
                                        
                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>Requirements</b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`requirements${this.props.course.id}`}>
                                        <textarea className="form-control " rows="5" name="requirement" placeholder="Item description here..."  defaultValue={this.props.course.requirement}  onChange={this.formCourse}></textarea>
                                        </p>
                                        <br/>

                                        <p><font color="#1c1d1f"><b>Description</b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`description${this.props.course.id}`}>
                                        <textarea rows="10" name="description" className="form-control "  defaultValue={this.props.course.description}  onChange={this.formCourse}></textarea>
                                        
                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>Who this course is for? </b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`who${this.props.course.id}`}>
                                        <textarea className="form-control " rows="5" name="whoThisCourseIsFor" placeholder="" defaultValue={this.props.course.whoThisCourseIsFor}   onChange={this.formCourse}></textarea>


                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>What you'll learn?</b></font></p>
                                        <p style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`learn${this.props.course.id}`}>
                                        <textarea className="form-control " rows="5" name="whatYouWillLearn" placeholder=""  defaultValue={this.props.course.whatYouWillLearn}  onChange={this.formCourse}></textarea>

                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>Category</b></font></p>
                                            <select className="form-control"  name="subCatalogId" onChange={this.formCourse} >
                                                <option selected disabled >Select a Category</option>
                                                {
                                                this.props.catalogs.map((catalog) => {
                                                    return (
                                                        catalog.subCatalogs.length>0?
                                                        <>
                                                        <optgroup label={catalog.name}>
                                                        {catalog.subCatalogs.map(sub => {
                                                            return (
                                                                <option value={sub.id}>{sub.name}</option>
                                                            )
                                                        } )}
                                                        </optgroup>
                                                        </>
                                                        
                                                        :<option value={catalog.id}>{catalog.name}</option>
                                                )})}
                    
               
                                            </select>

                                        <br/>
                                        <p><font color="#1c1d1f"><b>Language</b></font></p>
                                        <select  name="language" onChange={this.formCourse} className="custom-select ">
                                                <option value="" selected disabled>Select language</option>
                                                <option value="ENG">English</option>
                                                <option value="VN">Vietnamese</option>
                                                <option value="FR">French</option>
                                                <option value="JP">Japanese</option>
                                        </select>
                                        <br/>
                                        <br/>
                                        
                                        <p><font color="#1c1d1f"><b>Course Thumbnail</b></font></p>
                                        <p  style={{fontSize:"14px", color:"rgb(28,29,31)"}}  key={`thumbnail${this.props.course.id}`}>
                                            <br/>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6 col-sm-6">
                                                <div className="loc_group">
                                                <div className="thumb-item">
                                            {this.state.image?
                                            <img src={this.state.image} alt="" style={{height:"80px", width:"100px"}}/>
                                            :<img src={this.props.course.imageVideoDescription} alt="" style={{height:"80px", width:"100px"}}/>
                                            }
                                            <br/>
                                            <br/>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                    </button>
                                                </div>
                                                
                                                <input type="file" name="imageVideoDescription" onChange={this.formCourse} accept="image/*" className="form-control " placeholder="360x250px preferred"/>
                                            
                                            </div>
                                            {this.state.error.imageVideoDescription && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.imageVideoDescription}</div>}

                                            
                                        </div>
                                    
                                                </div>
                                            </div>
                                        </div>
                                        </p>
                                        <br/>
                                        <p><font color="#1c1d1f"><b>Video</b></font></p>
                                        <p  style={{fontSize:"14px", color:"rgb(28,29,31)"}}>
                                            <div className="row">
                                                <div className="col-lg-12 col-md-6 col-sm-6">
                                                    <div className="loc_group">
                                                        <div className="input-group js-video-demo-path-input" key={`youtube${this.props.course.id}`}>
                                                        <video width="320" height="240" controls className="videoHere">
                                                        <source src={this.props.course.urlVideoDescription} type="video/mp4"/>
                                                        </video>
                                                       
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>		
                                        </p>
                                     
                                        <br/>
                                        <div className="input-group">
                                        <div className="input-group-prepend">
                                            <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                            </button>
                                        </div>
                            
                                        <input type="file" name="urlVideoDescription" onChange={this.formCourse} accept="video/*"  className="form-control "/>
                           
                                        </div>

                        
                                    </div>
                                </div>


                            {/* <div className="mt-35">
                                <h2 className="section-title after-line">Comments <span className="ml-5">(0)</span></h2>

                                <div className="mt-20">
                                    <form >

                                        <input type="hidden" name="_token" value=" V1yQUuqpChkymsEzCbH3pHmi4wVeZ6rhp2xV2qJX"/>
                                        <input type="hidden" id="commentItemId" name="item_id" value="2009"/>
                                        <input type="hidden" id="commentItemName" name="item_name" value="webinar_id"/>

                                        <div className="form-group">
                                            <textarea name="comment" className="form-control " rows="10"></textarea>
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-primary">Post comment</button>
                                    </form>
                                </div>
                            </div> */}


                            </div>
                            <div className="tab-pane fade " id="content" role="tabpanel" >
                                <br/>
                            <button data-toggle="modal" data-target='#createLesson' className="btn btn-primary btn-sm mt-15" >New Lesson</button>
                            
                                <div className="modal fade"    id={'createLesson'} aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">Add New Lesson</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="new-section-block">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="new-section">
                                                                <div className="form_group">
                                                                <input className="form_input_1" type="hidden" name="courseId" value={this.props.course.id}/>
                                                                    <label className="label25">Title*</label>
                                                                    <input className="form_input_1 lesson form-control" type="text" name="title"  onChange={this.handleInputLessonChange} />
                                                                    {this.state.error.create && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.create}</div>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-sm btn-primary" value={'add'} onClick={()=>this.createLesson(this.props.course.id,this.state.newLesson)}>Save</button>
                                                <button type="button" className="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.props.course.lessons&&this.props.course.lessons.length>0?
                                <section className="mt-20">
        
                                    <div className="accordion-content-wrapper" id="chaptersAccordionsessions" role="tablist" aria-multiselectable="true">
                                        {
                                            this.props.course.lessons?
                                            this.props.course.lessons.map((lesson,index) => {
                                                let count =0
                                                {lesson.lectures.map((lecture,k)=> count++)}
                                                return (
                                                    <div className="accordion-row rounded-sm border mt-20 p-15">
                                            <div className="d-flex align-items-center justify-content-between" role="tab" id={"lesson"+lesson.id}>
                                                <div className="js-chapter-collapse-toggle d-flex align-items-center" href={"#lessonClose"+lesson.id} aria-controls={"lessonClose"+lesson.id} data-parent="#chaptersAccordionsessions" role="button" data-toggle="collapse" aria-expanded="true">
                                                    <span className="chapter-icon mr-15"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></span>

                                                    <span className="font-weight-bold text-secondary font-14">{lesson.title}</span>
                                                </div>

                                                <div className="d-flex align-items-center">
                                                     
                                                    <span className="mr-15 font-14 text-gray">
                                                        {count} lectures
                                                    </span>
                                                    <button data-toggle="modal" data-target={'#idlecCreate'+lesson.id} className="add-course-content-btn mr-10" data-chapter={index} title="Add Lecture">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                    </button>
                                                    <button data-toggle="modal" data-target={'#idles'+lesson.id} class="js-add-chapter btn-transparent text-gray" data-webinar-id="2010" data-type="file" data-chapter="31" data-locale="EN">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 mr-10 cursor-pointer"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                    </button>
                                                    <a type="button"  value={'delete'} onClick={()=>this.deleteLesson(lesson.id, this.props.course.id)}  title="Delete" className=" btn btn-sm btn-transparent text-gray">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-10 cursor-pointer"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                    </a>
                                                    {count>0?
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down collapse-chevron-icon" href={"#lessonClose"+lesson.id} aria-controls={"lessonClose"+lesson.id} data-parent="#chaptersAccordionsessions" role="button" data-toggle="collapse" aria-expanded="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                    :''}
                                                </div>
                                            </div>

                                                <div id={"lessonClose"+lesson.id} aria-labelledby={"lesson"+lesson.id} className=" collapse" role="tabpanel">
                                                    <div className="panel-collapse">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="accordion-content-wrapper" id={'chapterContentAccordion'+lesson.id} role="tablist" aria-multiselectable="true">
                                                                        {lesson.lectures.map((lecture,i)=>{
                                                                            return (
                                                                                <div className="accordion-row rounded-sm border mt-20 p-15" >
                                                                                    <div className="d-flex align-items-center justify-content-between" role="tab" >
                                                                                        <div className="d-flex align-items-center" aria-expanded="true">
                                                                                            <span className="d-flex align-items-center justify-content-center mr-15">
                                                                                                <span className="chapter-icon chapter-content-icon">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film text-gray"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                                                                                                </span>
                                                                                            </span>
                                                                                            <span className="font-weight-bold text-secondary font-14">{lecture.title} </span>&nbsp;
                                                                                            
                                                                                        </div>
                                                                                        
                                                                                        <div className="d-flex align-items-center" >
                                                                                            <a href="#" data-toggle="modal" onClick={()=>this.removeVideo(lecture.id,lecture.videoUrl)} data-target={"#videoModalLecture"+lecture.id} className="course-content-btns  ">
                                                                                                <img  src="http://www.downloadclipart.net/medium/play-button-png-clipart.png" style={{width:"30px",height:"25px"}} alt="" />
                                                                                            </a>&nbsp;
                                                                                            <button data-toggle="modal" onClick={()=>this.getSwitch(lecture.preview)} data-target={'#idlec'+lecture.id} class="js-add-chapter btn-transparent text-gray" data-webinar-id="2010" data-type="file" data-chapter="31" data-locale="EN">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 mr-10 cursor-pointer"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                                                            </button>
                                                                                            <a type="button"  value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)}  title="Delete" className=" btn btn-sm btn-transparent text-gray">
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-10 cursor-pointer"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="modal vd_mdl fade" id={"videoModalLecture"+lecture.id} role="dialog" aria-hidden="true">
                                                                                                    <div className="modal-dialog modal-lg" role="document">
                                                                                                        <div className="modal-content">
                                                                                                            
                                                                                                            <div className="modal-header">
                                                                                                                <h5 className="modal-title">Video</h5>
                                                                                                                <button onClick={()=>this.stopVideo(lecture.id)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                                </button>
                                                                                                            </div>
                                                                                                           
                                                                                                            <div className="modal-body"  >
                                                                                                                {/* <iframe style={{height:"300px"}} className="form-control" src={lecture.videoUrl} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                                                                                                                <video width="765" height="400" controls id={`demo${lecture.id}`} key={`demo${lecture.id}`}>
                                                                                                                    <source src={this.state.videoLecture} type="video/mp4"/>
                                                                                                                </video>
                                                                                                                
                                                                                                                
                                                                                                            </div>
                                                                                                            
                                                                                                            <div className="modal-footer">
                                                                                                                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                    </div>
                                                                                    <div className="modal fade update"  id={'idlec'+lecture.id} aria-hidden="true">
                                                                                    <div className="modal-dialog modal-lg">
                                                                                        <div className="modal-content">
                                                                                            <div className="modal-header">
                                                                                                <h5 className="modal-title">Edit Lecture</h5>
                                                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                    <span aria-hidden="true">&times;</span>
                                                                                                </button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <div className="new-section-block">
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-12">
                                                                                                            <div className="new-section">
                                                                                                                <div className="form_group" key={`title${lecture.id}`}>
                                                                                                                    <label className="label25">Title*</label>
                                                                                                                    <input className="form_input_1 lec form-control" type="text" name="title"  defaultValue={lecture.title} onChange={this.handleInputLectureChange}/>
                                                                                                                    
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-4 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Sort*</label>
                                                                                                                <div className="ui left icon input swdh19" key={`sort${lecture.id}`} >
                                                                                                                    <input className="prompt srch_explore lec form-control" type="number" min="1" max="100" placeholder="1" name="sort" defaultValue={lecture.sort} onChange={this.handleInputLectureChange} />
                                                                                                                </div>
                                                                                                                {this.state.error.sort && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.sort}</div>}


                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-5 col-md-6">
                                                                                                            <div className="ui search focus mt-30 lbel25">
                                                                                                                <label>Duration*</label>
                                                                                                                <div className="input-group">
                                                                                                                <div className="input-group-prepend" key={`duration${lecture.id}`}>
                                                                                                                    <span className="input-group-text" id="timeInputGroupPrepend">
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock text-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                                <input className="prompt srch_explore lec form-control" type="number" min="1" max="100" placeholder="1" name="videoDuration" defaultValue={lecture.videoDuration} onChange={this.handleInputLectureChange} />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="col-lg-3 col-md-3">
                                                                                                            <div className="mt-30 lbel25">
                                                                                                                    <label>Preview*</label>
                                                                                                            </div>
                                                                                                            <div className="preview-dt">
                                                                                                                {
                                                                                                                this.state.switch?
                                                                                                                <div className="custom-control custom-switch " onClick={()=>this.editChangeSwitch()}>
                                                                                                                    <input type="checkbox" name="preview"  className="custom-control-input" checked/>
                                                                                                                    <label className="custom-control-label" ></label>
                                                                                                                </div>
                                                                                                            :
                                                                                                                <div className="custom-control custom-switch" onClick={()=>this.editChangeSwitch()}>
                                                                                                                    <input type="checkbox" name="preview"  className="custom-control-input" />
                                                                                                                    <label className="custom-control-label" ></label>
                                                                                                                </div>
                                                                                                                }
                                                                                                                
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        
                                                                                                        <div className="col-lg-12 col-md-12">
                                                                                                            <div className="ui search focus mt-30 lbel25" >
                                                                                                                <label>Video*</label>
                                                                                                                
                                                                                                                {/* <div className="input-group js-video-demo-path-input"  key={`youtube${lecture.id}`}>
                                                                                                                    {this.state.video?
                                                                                                                    <video width="1000" height="250" controls >
                                                                                                                    <source src={this.state.video} type="video/mp4"/>
                                                                                                                    </video>
                                                                                                                    :
                                                                                                                    <video width="1000" height="250" controls >
                                                                                                                    <source src={lecture.videoUrl} type="video/mp4"/>
                                                                                                                    </video>
                                                                                                                    }

                                                                                                                
                                                                                                                </div> */}
                                                                                                                <br/>
                                                                                                                <div className="input-group" key={`video${lecture.id}`}  >
                                                                                                                    <div className="input-group-prepend">
                                                                                                                        <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                        
                                                                                                                    <input type="file" name="videoUrl" onChange={this.handleInputLectureChange} accept="video/*"  className="form-control "/>
                                                                                                    
                                                                                                                </div>
                                                                                                                {this.state.error.videoUrl && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.videoUrl}</div>}

                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                 
                                                                                                <button type="button" className="btn btn-sm btn-primary" value={'edit'}  onClick={()=>this.updateLecture(lecture,lesson.id,this.props.course.id,this.state.newLecture)}   >Save</button>
                                                                                                <button type="button" className="btn btn-sm btn-danger" data-dismiss="modal" onClick={()=>this.closeModal()}>Close</button>
                                                                                                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                                    
                                                                                    )
                                                                        })}
                                                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                                
                                                    </div>
                                                </div>
                                                <div className="modal fade"   id={'idles'+lesson.id} aria-hidden="true">
                                                    <div className="modal-dialog modal-lg">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title">Edit Lesson</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="new-section-block">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="new-section">
                                                                                <div className="form_group" key={`ok${lesson.id}`}>
                                                                                <input className="form_input_1" type="hidden" name="id" value={lesson.id}/>
                                                                                <input className="form_input_1" type="hidden" name="courseId" value={this.props.course.id}/>
                                                                                    <label className="label25">Title*</label>
                                                                                    <input className="form_input_1 form-control" type="text" name="title"  defaultValue={lesson.title} onChange={(value)=>this.handleInputLessonChange(value)} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-sm btn-primary" value={'edit'} onClick={()=>this.updateLesson(lesson,this.props.course.id,this.state.newLesson,lesson.id)}>Save</button>
                                                                <button type="button" className="btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                                                                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLesson(lesson.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal fade update"  id={'idlecCreate'+lesson.id}  aria-hidden="true">
                                                                                        <div className="modal-dialog modal-lg">
                                                                                            <div className="modal-content">
                                                                                                <div className="modal-header">
                                                                                                    <h5 className="modal-title">Add New Lecture</h5>
                                                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                                                        <span aria-hidden="true">&times;</span>
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div className="modal-body">
                                                                                                    <div className="new-section-block">
                                                                                                        <div className="row">
                                                                                                            <div className="col-md-12">
                                                                                                                <div className="new-section">
                                                                                                            

                                                                                    <div className="form-group">
                                                                                        {/* <input className="form_input_1" type="hidden" name="id" value={lecture.id} /> */}
                                                                                        <label className="input-label">Title *</label>
                                                                                        <input type="text" placeholder="Insert your lecture title." name="title" onChange={this.handleInputLectureCreateChange} className="form-control lecture"/>
                                                                                        {this.state.error.titleCreate && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.titleCreate}</div>}


                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <label className="input-label">Sort *</label>
                                                                                        <input type="number" min="0" max="100" placeholder="1" name="sort" onChange={this.handleInputLectureCreateChange} className="form-control lecture"/>
                                                                                        {this.state.error.sort && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.sort}</div>}
                                                                                        {this.state.error.sortCreate && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.sortCreate}</div>}

                                                                                    </div>
                                                                                        

                                                                                    <div className="form-group">
                                                                                        <label className="input-label">Video *</label>
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <div className="local-input input-group">
                                                                                            {/* <div className="input-group-prepend">
                                                                                                <button type="button" className="input-group-text panel-file-manager text-white" data-input="file_pathrecord" data-preview="holder">
                                                                                                    <i data-feather="link" width="18" height="18" className="text-white"></i>
                                                                                                </button>
                                                                                            </div> */}
                                                                                            <div className="input-group-prepend">
                                                                                                <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                                                                                </button>
                                                                                            </div>
                                                                                            <input type="file" name="videoUrl" onChange={this.handleInputLectureCreateChange} accept="video/*"  className="form-control lecture"/>

                                                                                            {/* <input type="text" placeholder="Youtube video URL" name="videoUrl" onChange={this.handleInputLectureCreateChange} className="form-control lecture"/> */}

                                                                                        </div>
                                                                                        {this.state.error.videoUrlCreate && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.videoUrlCreate}</div>}

                                                                                    </div>

                                                                                    <div className="form-group">
                                                                                        <label className="input-label">Duration (Hour) *</label>
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <div className="local-input input-group">
                                                                                            <div className="input-group-prepend">
                                                                                                <button type="button" className="input-group-text panel-file-manager text-white">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock text-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                                                                </button>
                                                                                            </div>
                                                                                            <input type="number" min="0" max="100" placeholder="0" name="videoDuration" onChange={this.handleInputLectureCreateChange} className="form-control lecture"/>
                                                                                        </div>
                                                                                        {this.state.error.videoDurationCreate && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.videoDurationCreate}</div>}

                                                                                    </div>

                                                                                    <div className="form-group">
                                                                                        <div className="d-flex align-items-center justify-content-between">
                                                                                            <label className="cursor-pointer input-label" >Preview *</label>
                                                                                            {this.state.switch?
                                                                                                <div className="custom-control custom-switch " onClick={()=>this.changeSwitch()}>
                                                                                                    <input type="checkbox" name="preview"  className="custom-control-input" checked/>
                                                                                                    <label className="custom-control-label" ></label>
                                                                                                </div>
                                                                                            :
                                                                                            <div className="custom-control custom-switch" onClick={()=>this.changeSwitch()}>
                                                                                                    <input type="checkbox" name="preview"  className="custom-control-input" />
                                                                                                    <label className="custom-control-label" ></label>
                                                                                                </div>
                                                                                            }
                                                                                            
                                                                                            
                                                                                        </div>
                                                                                    </div>

                                                                                                                </div>
                                                                                                            </div>
                                                                                                        
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="modal-footer">
                                                                                                    <button type="button" className="btn btn-sm btn-primary" value={'edit'}  onClick={()=>this.createLecture(this.props.course.id,lesson.id,this.state.addLecture)}>Save</button>
                                                                                                    <button type="button" className="close-swl btn btn-sm btn-danger ml-2" data-dismiss="modal" onClick={()=>this.closeModal()}>Close</button>
                                                                                                    {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                </div>
                                            </div>
                                                    
                                                )
                                            }):''

                                            
                                        }
                                        
                                    </div>
                                
                         
                                </section>
                                :
                                <div class="row mt-10">
                                    <div class="col-12">

                                    <div class="accordion-content-wrapper mt-15" id="prerequisitesAccordion" role="tablist" aria-multiselectable="true">
                                <div class="no-result default-no-result mt-50 d-flex align-items-center justify-content-center flex-column">
                                <div class="no-result-logo">
                                    <img src="/assets/default/img/no-results/comment.png" alt=""/>
                                </div>
                                <div class="d-flex align-items-center flex-column mt-30 text-center">
                                    <h2 class="text-dark-blue">No Lesson is defined!</h2>
                                    <p class="mt-5 text-center text-gray font-weight-500">You can create lesson for students to learn.</p>
                                        </div>
                            </div>
                                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            
                        </div>
                <br/>
               
                </section>
                </div>
                <div style={{fload:"right"}} className="create-webinar-footer mt-20 pt-15">
                    <div className="mt-20 mt-md-0">

                    <Link to="/course-info" ><button style={{backgroundColor:"#eb4242", borderColor:"#eb4242"}} type="button" className=" btn btn-sm btn-primary " >Back</button></Link>
                                        
                    <button type="button" value={'add'} onClick={()=>this.editCourse(this.state.editCourse, this.props.course.id)} className=" btn btn-sm btn-primary ml-15">Save</button>

                    </div>
                </div>
                </div>
            </div>
            </>
            );
        }
  
    };


const mapStateToProps = state => {
    return {        
        course: state.course.courseById,
        cartItems: state.cart.items,
        savedSuccess: state.savedCourse.savedSuccess,
        reviewSuccess: state.review.reviewSuccess,

        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        img: state.course.img,

        lesson: state.lesson.lesson,
        messageSuccessLesson: state.lesson.messageSuccess,
        lecture: state.lecture.lecture,
        messageSuccessLecture: state.lecture.messageSuccess,
        lessons: state.lesson.lessons,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseByIdRequest:(e) => dispatch (courseByIdRequest(e)),
        fetchCreateReviewRequest:(e,i) => dispatch (fetchCreateReviewRequest(e,i)),
        fetchUpdateReviewRequest:(e,i) => dispatch (fetchUpdateReviewRequest(e,i)),
        fetchDeleteReviewRequest:(e,i) => dispatch (fetchDeleteReviewRequest(e,i)),
        imageRequest:(e) => dispatch (imageRequest(e)),
        updateCourseRequest:(e,i) => dispatch (updateCourseRequest(e,i)),

        fetchLessonByCourseIdRequest:(e) => dispatch(fetchLessonByCourseIdRequest(e)),

        fetchLessonByIdRequest:(e) => dispatch (fetchLessonByIdRequest(e)),
        updateLessonRequest:(e,i) => dispatch (updateLessonRequest(e,i)),
        createLessonRequest:(e,i) => dispatch (createLessonRequest(e,i)),
        deleteLessonRequest:(e,i) => dispatch (deleteLessonRequest(e,i)),

        fetchLectureByIdRequest: (e) => dispatch (fetchLectureByIdRequest(e)),
        updateLectureRequest:(e,i) => dispatch (updateLectureRequest(e,i)),
        createLectureRequest:(e,i) => dispatch (createLectureRequest(e,i)),
        deleteLectureRequest:(e,i) => dispatch (deleteLectureRequest(e,i)),

        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        

    };
}

export default withRouter(withRouterParams(connect(mapStateToProps,mapDispatchToProps)(CourseEdit)));
