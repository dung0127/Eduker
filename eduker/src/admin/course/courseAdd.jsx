import React, { Component } from 'react';
import axios from 'axios';
import { fetchCatalogRequest} from "../../actions/catalog";
import {fetchSubCatalogRequest} from "../../actions/subCatalog";
import {connect} from 'react-redux';
import authHeader from "../../config/authHeader"
import $, { data } from 'jquery';
import validator from 'validator';
import {Link} from "react-router-dom";
import {imageRequest} from "../../actions/course";
import { withRouter } from '../layout/auth/withRouter';
import loadjs from 'loadjs';


import Header from '../../user/layout/header.jsx';
import Panel from '../layout/panel.jsx';

let lectures = [];
let lessons =[] ;
let lesslec = [] ;
let idLesson = 1;
let idLecture = 1 ;    

class CourseAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {

            addCourse: {
                language:'',
                title:'',
                shortDescription:'',
                description:'',
                requirement:'',
                whoThisCourseIsFor:'',
                whatYouWillLearn:'',
                price:'',
                videoDuration:'',
                urlVideoDescription:'',
                imageVideoDescription:'',
                activate:'',
                subCatalogId:'',
                },

            addLesson: {
                id: '',
                title:'',
            },
            
            addLecture:{
                id:'',
                title:'',
                videoUrl:'',
                videoDuration:'',
                preview:'false',
                sort:'',
            },

            select:'',

            show:'1',

            classStep1:'active',
            classStep2:'',
            classStep3:'',
            classStep4:'',
            classStep5:'',

            image:'',

            video:'',

            videoUp:'',
            
            error: {},

            lesson:[],

            switch:false,

            status: false,

            course:'',

            ava:'',

            go:'d-none',
            
            lessonId: '',

            videoUpload: true 
        }
    }

    changeVideo = e => {
        if (this.state.videoUpload) 
            this.setState({videoUpload:false})
        else
            this.setState({videoUpload:true})

    }

    getLessonTitle = (ti) => {
        let select = Object.assign({}, this.state.lesson); 
        console.log(select)
        select['title'] = ti;     
        this.setState({lesson:select});  
        console.log(select);
    }

    btnGo = () => {
        this.setState({go:''})
    }

    btnHide = () => {
        this.setState({go:'d-none'})
    }

    // ------------------------- Alert + Step + NextPage + PrevPage  --------------
    
    handleSuccess = () => {
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Submit course successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
		
		setTimeout(()=>{
			this.props.navigate('/course-info')
		},1000);
		
	} 

    handleError = () => {
        Swal.fire({
            icon: "error",
            html: '<h2 class="font-20 text-center text-dark-blue py-25">' + "Failed </h2>",
            showConfirmButton: !1,
            width: "25rem"
        })
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

    changeStatus =  e => {
        this.state.status?
            this.setState({
                status: false
            }):
            this.setState({
                status: true
            });
        this.formCourse(e);
    }

    handleClick = (num) =>{
        if(num==1){
            this.setState({classStep1:'active',classStep2:'',classStep3:'',classStep4:'',classStep5:'',show: '1'
        })
        }
        if(num==2 && this.validateStep1()){
            this.setState({classStep1:'',classStep2:'active',classStep3:'',classStep4:'', classStep5:'',show: '2'
            })
        }
        if(num==3 && this.validateStep2()){
            this.setState({classStep1:'',classStep2:'',classStep3:'active',classStep4:'',classStep5:'',show: '3'
        })
        }
        if(num==4 && this.validateStep3()){
            this.setState({classStep1:'',classStep2:'',classStep3:'',classStep4:'active',classStep5:'',show: '4'
        })
        }
        if(num==5 && this.validateStep4()){
            this.setState({classStep1:'',classStep2:'e',classStep3:'',classStep4:'e',classStep5:'active',show: '5'
        })
        }
    }
    
    handleSelect = e => {            
        this.setState({select: e.target.value});  
        console.log(e.target.value)
    }

    handleLesson = e => {
        let select = Object.assign({}, this.state.lesson); 
        console.log(select)
        select[e.target.name] = e.target.value;        
        this.setState({lesson:select});  
        console.log(select);

    }

    pageNext = () => {
        
        this.state.show=='1'?
            this.validateStep1()&&this.setState({show: '2', classStep1:'',classStep2:'active',classStep3:'',classStep4:'', classStep5:''
            }):this.state.show=='2'?
            this.validateStep2()&&this.setState({classStep1:'',classStep2:'',classStep3:'active',classStep4:'',classStep5:'',show: '3'
            }):this.state.show=='3'?
            this.validateStep3()&&this.setState({classStep1:'',classStep2:'',classStep3:'',classStep4:'active',classStep5:'',show: '4'
            }):
            this.validateStep4()&&this.setState({classStep1:'',classStep2:'',classStep3:'',classStep4:'',classStep5:'active',show: '5'
            })
        
    }

    pagePrev = () => {
        this.state.show=='5'?
            this.setState({show: '4', classStep1:'',classStep2:'',classStep3:'',classStep4:'active',classStep5:''
            }):this.state.show=='4'?
            this.setState({show: '3', classStep1:'',classStep2:'',classStep3:'active',classStep4:'',classStep5:''
            }):this.state.show=='3'?
            this.setState({show: '2', classStep1:'',classStep2:'active',classStep3:'',classStep4:'',classStep5:''
            }):
            this.setState({show: '1', classStep1:'active',classStep2:'',classStep3:'',classStep4:'',classStep5:''
            })
    }

    // -------------------------  Lesson  -----------------------------

    formLesson = e => {   
        let formDataLesson = Object.assign({}, this.state.addLesson);    
        formDataLesson[e.target.name] = e.target.value;        
        this.setState({addLesson:formDataLesson});  
        console.log(formDataLesson)  
    }

    newLesson = (add) => {
        if(this.validateLesson()){
        idLesson++;
        add.id=idLesson;
        lessons.push(add);
        this.setState({addLesson: {id: '' ,title:'',}});
        Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""))
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + saveSuccessLang + "</h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 800)
        $('#createLesson').click();
        }
       
        console.log(add)
        
    }

    removeLesson = (del) => {
        
        for (var i=0; i< lessons.length; i++){
            if(lessons[i].id === del){
                lessons.splice(i,1);
            }
        }
        this.setState({addLesson:lessons});
        loadjs('/assets/default/js/deleteSuccess.js', () => {});
    }

    // -------------------------  Lecture  -----------------------------
    formLecture = e => {   
        let formDataLecture = Object.assign({}, this.state.addLecture); 
        //console.log(formDataLecture)
        if (e.target.files && e.target.files[0]) {
            if (e.target.accept=="image/*"){
                this.setState({
                    image: URL.createObjectURL(e.target.files[0])
                })
                formDataLecture[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
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
                formDataLecture[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
                this.setState({videoUp:e.target.files[0]})

            }
            
            this.setState({addLecture:formDataLecture}); 
        }
        else {
            formDataLecture[e.target.name] = e.target.value;        
            this.setState({addLecture:formDataLecture});  
        }    
        
        console.log(formDataLecture);
    }

    validateSort = (sort,select) => {
        const error = {}
        let isValid = true;
        console.log(select)
        lesslec.map((less) => (
            less.title==select?(
            less.lectures.map((lec) => (
                lec.sort==sort?(
                    error['sort'] = 'Sort already exists',
                    isValid = false
                ):''
            ))):''
        ))
        this.setState({
            error: error
        })

        return isValid;
    } 

    newLecture = (lesson, add) => {
        if(this.validateSort(add.sort,lesson.title)&&this.validateLecture()){
        this.props.imageRequest(this.state.videoUp)
        idLecture++;
        add.id=idLecture;
        lectures.push(add);
        console.log(lectures)
        lesson.lectures = lectures;
        lesslec.push(lesson);
        console.log('ko',lesslec)
        this.setState({addLecture: {id:'', title:'',
                videoUrl:'',
                videoDuration:'',
                preview:'false',
                sort:'',}});
        this.setState({switch:''})
        lectures=[];
        lesson=[];
        this.setState({go:''});
        Array.from(document.querySelectorAll('input')).forEach(input=>(input.value=""));
        Array.from(document.querySelectorAll('select')).forEach(select=>(select.value=""))  ;
        console.log(lesslec);
        this.setState({course:lesslec})
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + saveSuccessLang + "</h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 800)
        $('#createLecture').click();
        }
    }

    removeLecture = (del) => {
        
        let tmp =[]
        for (var i=0; i< lesslec.length; i++){
            tmp = lesslec[i].lectures;
            for (var j=0; j<tmp.length;j++){
                console.log('lecture', tmp[j].id)
                console.log('delte',del)
                if(tmp[j].id === del){
                    lesslec.splice(i,1);
                }   

            }
        }
        this.setState({addLecture: {id:'', title:'',
        videoUrl:'',
        videoDuration:'',
        preview:'false',
        sort:'',}});
        
        loadjs('/assets/default/js/deleteSuccess.js', () => {});

        console.log(lectures);
        console.log(lesslec);
    }

    // -------------------------  Course  -----------------------------
    formCourse = e => {   
        let formDataCourse = Object.assign({}, this.state.addCourse);  
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
                    video: e.target.files[0].name
                })
                formDataCourse[e.target.name] = 'http://localhost:8080/images/'+e.target.files[0].name
            }
            
            this.setState({addCourse:formDataCourse});  
        }
        else {
        formDataCourse[e.target.name] = e.target.value;        
        this.setState({addCourse:formDataCourse});  
        console.log(formDataCourse)  
        }
    }

    course = (courseAdd) => {
        let tmp
        lessons.map((les,i) =>
            (
                tmp =[],
                lesslec.map((lec,k) => (
                    les.title==lec.title? (
                        lec.lectures.map((le,j)=>(
                            delete le.id,
                            tmp.push(le)
                        )),
                        // tmp.push(lec.lectures),
                        les.lectures=tmp):''
                ))
            )
        )
        lessons.map((les,i) =>
            (
                les.lectures!== undefined?'':les.lectures=[]
            )
        )
        lessons.map((les,i) =>
            (
                delete les.id
            )
        )
        
        courseAdd.lessons = lessons
        console.log(courseAdd)
        this.props.imageRequest(this.state.ava)
        axios.post('http://localhost:8080/api/course/create', courseAdd , { headers: authHeader()}).then(res=>{
           
            this.handleSuccess();
        }).catch(error => {this.handleError()})


    }

    courseDraf = (courseAdd) => {
        console.log(courseAdd)
        this.props.imageRequest(this.state.ava)
        axios.post('http://localhost:8080/api/course/create-draft', courseAdd , { headers: authHeader()}).then(res=>{
           
            this.handleSuccess();
        }).catch(error => {this.handleError()})


    }
    
    // ---------------------------- Validate --------------------------
    validateStep1 = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addCourse.title)){            
            error['title'] = 'The Title field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.shortDescription)){            
            error['shortDescription'] = 'The Short Description field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.description)){            
            error['description'] = 'The Description field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.requirement)){            
            error['requirement'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.whatYouWillLearn)){            
            error['whatYouWillLearn'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.whoThisCourseIsFor)){            
            error['whoThisCourseIsFor'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.price)){            
            error['price'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.videoDuration)){            
            error['videoDuration'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.subCatalogId)){            
            error['subCatalogId'] = 'The field is required.';
            isValid = false;
        }
        if(validator.isEmpty(this.state.addCourse.language)){            
            error['language'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateStep2 = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addCourse.urlVideoDescription)){            
            error['urlVideoDescription'] = 'The URL field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCourse.imageVideoDescription)){            
            error['imageVideoDescription'] = 'The Image field is required.';
            isValid = false;
        }

        // if (this.state.addCourse.urlVideoDescription !== '') {
        //     var pattern = new RegExp(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch))((\w|-){11})(?:\S+)?$/i);
        //     if (!pattern.test(this.state.addCourse.urlVideoDescription)) {
        //       isValid = false;
        //       error["urlVideoDescription"] = "Please enter valid youtube url.";
        //     }
        //   }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateStep3 = () => {
        let isValid = true;

        const error = {}

        if(lessons == []){            
            error['titleLesson'] = 'The field is required.';
            isValid = false;
        }

        if(lesslec==[]){            
            error['titleLecture'] = 'The field is required.';
            isValid = false;
        }
        
        this.setState({
            error: error
        })

        return isValid;
    }


    validateLesson= ()=> {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addLesson.title)){            
            error['titleLesson'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    validateLecture=()=>{
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addLecture.title)){            
            error['titleLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoUrl)){            
            error['videoUrlLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.sort)){            
            error['sortLecture'] = 'The field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addLecture.videoDuration)){            
            error['videoDurationLecture'] = 'The field is required.';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    componentDidMount () {
        this.props.fetchCatalogRequest();
        this.props.fetchSubCatalogRequest();
        loadjs('/assets/default/js/panel/webinar.min.js', () => {});
        loadjs('/assets/default/js/panel/webinar_content_locale.min.js', () => {});
        loadjs('/assets/vendors/summernote/summernote-bs4.min.js', () => {});
        loadjs('/assets/default/vendors/chartjs/chart.min.js', () => {});
        loadjs('/assets/default/vendors/apexcharts/apexcharts.min.js', () => {});
        loadjs('/assets/default/vendors/sweetalert2/dist/sweetalert2.min.js', () => {});
        loadjs('/assets/default/vendors/select2/select2.min.js', () => {});
            
       
    }
    
    
    render() {
      
        console.log('hi',this.state.lesson)
        return (
            <>
            <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                            <div className="">

                   
                        <div className="webinar-progress d-block d-lg-flex align-items-center p-15 panel-shadow bg-white rounded-sm">

                        <div className="progress-item d-flex align-items-center" onClick={()=>{this.handleClick(1)}}>
                        <button type="button" data-step="1" className={"js-get-next-step p-0 border-0 progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle " +this.state.classStep1} data-toggle="tooltip" data-placement="top" title="Basic Information">
                            <img src="assets/default/img/icons/paper.svg" className="img-cover" alt=""/>
                        </button>

                        <div className="ml-10" >
                            <span className="font-14 text-gray">Step 1/4</span>
                            <h4 className="font-16 text-secondary font-weight-bold">Basic Information</h4>
                        </div>
                    </div>
                        <div className="progress-item d-flex align-items-center" onClick={()=>{this.handleClick(2)}}>
                        <button type="button" data-step="2" className={"js-get-next-step p-0 border-0 progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle " +this.state.classStep2} data-toggle="tooltip" data-placement="top" title="Media">
                            <img src="assets/default/img/icons/video.svg" className="img-cover" alt=""/>
                        </button>

                        <div className="ml-10" >
                            <span className="font-14 text-gray">Step 2/4</span>
                            <h4 className="font-16 text-secondary font-weight-bold">Media</h4>
                        </div>
                    </div>
                        <div className="progress-item d-flex align-items-center" onClick={()=>{this.handleClick(3)}}>
                        <button type="button" data-step="3" className={"js-get-next-step p-0 border-0 progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle " +this.state.classStep3} data-toggle="tooltip" data-placement="top" title="Lesson">
                            <img src="assets/default/img/icons/paper_plus.svg" className="img-cover" alt=""/>
                        </button>

                        <div className="ml-10">
                            <span className="font-14 text-gray">Step 3/4</span>
                            <h4 className="font-16 text-secondary font-weight-bold">Content</h4>
                        </div>
                    </div>
                       
                        <div className="progress-item d-flex align-items-center" onClick={()=>{this.handleClick(4)}}>
                        <button type="button" data-step="5" className={"js-get-next-stsep p-0 border-0 progress-icon p-10 d-flex align-items-center justify-content-center rounded-circle " +this.state.classStep4} data-toggle="tooltip" data-placement="top" title="Publish">
                            <img src="assets/default/img/icons/shield_done.svg" className="img-cover" alt=""/>
                        </button>

                        <div className="ml-10">
                            <span className="font-14 text-gray">Step 4/4</span>
                            <h4 className="font-16 text-secondary font-weight-bold">Publish</h4>
                        </div>
                    </div>
                </div>

                        <input type="hidden" name="_token" value="g4KwLYysx3Rf4UHggOKK39AoVOs7xYjNKLvMVnMl"/>
                        <input type="hidden" name="current_step" value="1"/>
                        <input type="hidden" name="draft" value="no" id="forDraft"/>
                        <input type="hidden" name="get_next" value="no" id="getNext"/>
                        <input type="hidden" name="get_step" value="0" id="getStep"/>

            {this.state.show=='1'?
            <>
            
            <div className="row">
                <div className="col-12 col-md-6 mt-15">
                    <div className="">
                        <br/>
                        <h2 className="section-title after-line">Basic Information</h2>
                        <br/>
                    </div>
                    <div className="form-group mt-15">
                        <label className="input-label">Course Title *</label>
                        <input type="text" name="title" className="form-control " onChange={this.formCourse} placeholder="Course title here" maxlength="60"/>
                        {this.state.error.title && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.title}</div>}
                       
                    </div>

                    
                    <div className="form-group mt-15">
                        <label className="input-label">Short Description *</label>
                        <input type="text" name="shortDescription" style={{width:"600px"}} className="form-control  "placeholder="Item description here..." onChange={this.formCourse}/>
                        {this.state.error.shortDescription && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.shortDescription}</div>}

                    </div>

            </div>
            
            </div>
            
            <div className="row">
                <div className="col-md-12">
            <label className="input-label">Category</label>

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
            {this.state.error.subCatalogId && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.subCatalogId}</div>}								

            </div>
            </div>
            <br/>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="input-label">Course Description*</label>
                        <textarea rows="5" className="form-control " name="description" placeholder="Insert your course description" onChange={this.formCourse}></textarea>
                        {this.state.error.description && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.description}</div>}								
                    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="input-label">Requirements*</label>
                        <textarea rows="5" name="requirement" className="form-control " placeholder="Minimum 300 words." onChange={this.formCourse}></textarea>
                        {this.state.error.requirement && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.requirement}</div>}
                    
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="input-label">What will students learn in your course? *</label>
                        <textarea rows="5" name="whatYouWillLearn" onChange={this.formCourse} className="form-control " placeholder="Student will gain this skills, knowledge after completing this course. (One per line)."></textarea>
                        {this.state.error.whatYouWillLearn && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.whatYouWillLearn}</div>}
                        
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="input-label">Who this course is for? *</label>
                        <textarea rows="5" name="whoThisCourseIsFor"  onChange={this.formCourse} className="form-control " placeholder="What knowledge, technology, tools required by users to start this course. (One per line)."></textarea>
                        {this.state.error.whoThisCourseIsFor && <div style={{color:"red",fontSize:"12px"}}  >{this.state.error.whoThisCourseIsFor}</div>}
                        
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label className="input-label">Language *</label>
                    <select  name="language" onChange={this.formCourse} className="custom-select ">
                            <option value="" selected disabled>Select language</option>
                            <option value="ENG">English</option>
                            <option value="VN">Vietnamese</option>
                            <option value="FR">French</option>
                            <option value="JP">Japanese</option>
                    </select>
                    {this.state.error.language && <div style={{color:"red",fontSize:"12px"}}  >{this.state.error.language}</div>}

                </div>
                <div className="col-md-4">
                    <label className="input-label">Duration (Hour) *</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="timeInputGroupPrepend">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-clock text-white"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </span>
                            </div>
                            <input type="number" min="1" max="100" placeholder="1 Hour" name="videoDuration" onChange={this.formCourse}  className="form-control "/>
                        </div>
                    {this.state.error.videoDuration && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.videoDuration}</div>}
                            
                </div>
                <div className="col-md-4">
                    <label className="input-label">Regular Price ($) *</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                           
                                <span className="input-group-text  text-white font-16" id="timeInputGroupPrepend">
                                    $
                                </span>
                            </div>
                            <input type="number" placeholder="$0" name="price" onChange={this.formCourse} className="form-control "/>
                        </div>
                    {this.state.error.price && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.price}</div>}

                            
                </div>
            </div>
            </>
            :this.state.show=='2'?
            <>
             <div className="row">
                <div className="col-12 col-md-6 mt-15">
                    <div className="">
                        <br/>
                        <h2 className="section-title after-line">Media</h2>
                    </div>
                    <div className="form-group mt-25">
                        <label className="input-label">Intro Course overview provider type.</label>
                    </div>

                    <div className="form-group mt-0">
                        <label className="input-label font-12">Video*</label>
                        {/* <select name="video_demo_source" class="form-control" onChange={this.changeVideo}>
                                <option value="true" >Upload</option>
                                <option value="false" >Youtube</option>
                        </select>
                        <br/> */}
                        {/* {this.state.videoUpload?
                        <> */}
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </button>
                            </div>
                            
                            <input type="file" name="urlVideoDescription" onChange={this.formCourse} accept="video/*"  className="form-control "/>
                           
                        </div>

                        {this.state.error.urlVideoDescription && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.urlVideoDescription}</div>}
                        {/* </>
                        :
                        <>
                        <div className="input-group js-video-demo-path-input">
                            <div className="input-group-prepend">
                                <button type="button" className="js-video-demo-path-links rounded-left input-group-text input-group-text-rounded-left text-white" data-preview="holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                </button>
                            </div>
                            <input type="text" placeholder="Youtube Video URL" name="urlVideoDescription" onChange={this.formCourse}  className="form-control "/>
                        </div>
                        {this.state.error.urlVideoDescription && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.urlVideoDescription}</div>}
                        
                        </>
                        } */}
                    </div>

                    <div className="form-group mt-15">
                        <label className="input-label">Thumbnail *</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button className="input-group-text " data-input="thumbnail" data-preview="holder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </button>
                            </div>
                            
                            <input type="file" name="imageVideoDescription" onChange={this.formCourse} accept="image/*" className="form-control " placeholder="360x250px preferred"/>
                           
                        </div>
                        {this.state.error.imageVideoDescription && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.imageVideoDescription}</div>}

                        {this.state.image?
                            <img src={this.state.image} style={{width:"250px", height:"150px"}} alt=""/>
                            :''
                        }
                    </div>
            </div>
            </div>
            </>
            :this.state.show=='3'?
            <>
                            
<section className="mt-50">
    <div className="">
        <h2 className="section-title after-line">Content</h2>
    </div>
    <div className="mt-15">
        <p className="font-12 text-gray">- You can upload course parts for video courses using this section.</p>
        <p className="font-12 text-gray">- You can also upload additional files like projects, exercises, attachments.</p>
    </div>
    <button data-toggle="modal" data-target='#createLesson' className="btn btn-primary btn-sm mt-15" >New Lesson</button>
    {lessons.length>0?
    <div className="row mt-10">
    <div className="col-12">
        <div className="accordion-content-wrapper mt-15" id="chapterAccordion" role="tablist" aria-multiselectable="true">
            <ul className="draggable-content-lists draggable-lists-chapter-file" data-drag-className="draggable-lists-chapter-file" data-order-table="webinar_chapters">
            
            {lessons.map((less,i) => {
                let topic=0;
                {lesslec.map((l,p) => {
                    if(l.title==less.title) topic++
                })}
                return (
            <li data-id={i} data-chapter-order="" className="accordion-row bg-white rounded-sm panel-shadow mt-20 py-15 py-lg-30 px-10 px-lg-20">
                <div className="d-flex align-items-center justify-content-between " role="tab" id={'chapter_'+i}>
                    <div className="d-flex align-items-center" href={'#collapseChapter'+i} aria-controls={'collapseChapter'+i} data-parent="#chapterAccordion" role="button" data-toggle="collapse" aria-expanded="true">
                        <span className="chapter-icon mr-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        </span>
                        
                        <div className="">
                            <span className="font-weight-bold text-dark-blue d-block">{less.title}</span>
                            <span className="font-12 text-gray d-block">
                           
                                {topic} Lectures
                            </span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <button onClick={() => this.getLessonTitle(less.title)} data-toggle="modal" data-target='#createLecture' className="add-course-content-btn mr-10" data-chapter={i} title="Add Lecture">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>

                        {/* <button type="button" className="js-add-chapter btn-transparent text-gray" data-webinar-id="2010" data-type="file"  data-chapter={i} data-locale="EN">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3 mr-10 cursor-pointer"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        </button> */}

                        <a type="button" value='delete' name={less.title} onClick={()=>this.removeLesson(less.id)} title="Delete" className=" btn btn-sm btn-transparent text-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-10 cursor-pointer"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </a>
                        {topic>0?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down collapse-chevron-icon feather-chevron-up text-gray" href={'#collapseChapter'+i}  aria-controls={'collapseChapter'+i} data-parent="#chapterAccordion" role="button" data-toggle="collapse" aria-expanded="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        :''}
                    </div>
                </div>

                <div id={'collapseChapter'+i} aria-labelledby={'chapter_'+i} className=" collapse show" role="tabpanel">
                    <div className="panel-collapse text-gray">

                        <div className="accordion-content-wrapper mt-15" id={'chapterContentAccordion'+i} role="tablist" aria-multiselectable="true">
                            <ul className={"draggable-content-lists draggable-lists-file-chapter-"+i} data-drag-className={"draggable-lists-file-chapter-"+i} data-order-table="files">
                                {lesslec.map((l,p) => {
                                    if(l.title==less.title)
                                    return(
                                        l.lectures.map((lecture,k) =>{
                                            
                                            return (
                                                <li data-id={"lecture"+i} className="accordion-row bg-white rounded-sm border border-gray300 mt-20 py-15 py-lg-30 px-10 px-lg-20">
                                <div className="d-flex align-items-center justify-content-between " role="tab" id={"lecture"+i}>
                                <div className="d-flex align-items-center" href={"#collapseFile"+p} aria-controls={"collapseFile"+p} data-parent={'#chapterContentAccordion'+i} role="button" data-toggle="collapse" aria-expanded="true">
                                <span className="chapter-icon chapter-content-icon mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-film"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                                </span>

                                    <div className="font-weight-bold text-dark-blue d-block">{lecture.title}</div>
                                </div>

                                <div className="d-flex align-items-center">
                                    


                                    <a type="button" onClick={()=>this.removeLecture(lecture.id)} value='delete' name={lecture.title} title="Delete" className="btn btn-sm btn-transparent text-gray">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-10 cursor-pointer"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </a>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down collapse-chevron-icon collapsed" href={"#collapseFile"+p} aria-controls={"collapseFile"+p} data-parent="#chapterContentAccordion0" role="button" data-toggle="collapse" aria-expanded="false"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                                </div>
                                <div id={"collapseFile"+p} aria-labelledby="file_74" class=" collapse " role="tabpanel">
            <div class="panel-collapse text-gray">
                <div class="js-content-form file-form" data-action="/panel/files/74/update">
                    <input type="hidden" name="ajax[74][webinar_id]" value="2010"/>
                    <input type="hidden" name="ajax[74][chapter_id]" value="31" class="chapter-input"/>

                    <div class="row">
                        <div class="col-12 col-lg-6">
                            
                    <div className="form-group">
                        <label className="input-label">Title *</label>
                        <input value={lecture.title} disabled className="form-control"/>
                    
                    </div>
                    <div className="form-group">
                        <label className="input-label">Sort *</label>
                        <input value={lecture.sort} disabled className="form-control"/>

                    </div>

                    <div className="form-group">
                        <label className="input-label">Video *</label>
                    </div>
                    <div className="input-group js-video-demo-path-input"  key={`youtube${lecture.id}`}>
                       
                        <video width="1000" height="250" controls key={`video${lecture.id}`}>
                        <source src={lecture.videoUrl} type="video/mp4"/>
                        </video>
                        


                    </div>
<br/>
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
        <input value={lecture.videoDuration} disabled className="form-control"/>
    </div>
</div>

<div className="form-group">
    <div className="d-flex align-items-center justify-content-between">
        <label className="cursor-pointer input-label" >Preview *</label>
        {lecture.preview=="true"?
            <div className="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input" checked="checked"/>
                <label className="custom-control-label" ></label>
            </div>
        :
        <div className="custom-control custom-switch" >
            <input type="checkbox" className="custom-control-input"   />
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
                                
                                </li>
                                                )
                                            } ));
                                        }
                                    )
                                }
                                
                                
                            </ul>
                            
                        </div>

                    </div>
                </div>
                
            </li>
                    
                )
            })}
            </ul>
        </div>

    </div>
    </div>
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

</section>


<div className="modal fade update"  id='createLesson' aria-hidden="true">
    <div className="modal-dialog modal-lg">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">New Lesson</h5>
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
                                    <label className="label25">Lesson Title*</label>
                                    <input className="form-control " type="text" name="title" onChange={this.formLesson} />
                                    {this.state.error.titleLesson && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.titleLesson}</div>}
                                </div>
                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="save-chapter btn btn-sm btn-primary" onClick={()=>this.newLesson(this.state.addLesson)} >Save</button>
                <button type="button" className="close-swl btn btn-sm btn-danger ml-2" data-dismiss="modal" onClick={()=>this.closeModal()}>Close</button>
                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
            </div>
        </div>
    </div>
</div>
<div className="modal fade update"  id='createLecture' aria-hidden="true">
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
    <label className="input-label">Title *</label>
    <input type="text" placeholder="Insert your lecture title." name="title" onChange={this.formLecture} className="form-control"/>
    {this.state.error.titleLecture && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.titleLecture}</div>}

</div>
<div className="form-group">
    <label className="input-label">Sort *</label>
    <input type="number" min="0" max="100" placeholder="0" name="sort" onChange={this.formLecture} className="form-control"/>
    {this.state.error.sort && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.sort}</div>}
    {this.state.error.sortLecture && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.sortLecture}</div>}

</div>
    

<div className="form-group">
    <label className="input-label">Video *</label>
</div>
<div className="form-group">
    <div className="local-input input-group">
        <div className="input-group-prepend">
            <button className="input-group-text " data-input="thumbnail" data-preview="holder">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            </button>
        </div>
        <input type="file" name="videoUrl" onChange={this.formLecture} accept="video/*"  className="form-control"/>


    </div>
    {this.state.error.videoUrlLecture && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.videoUrlLecture}</div>}

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
        <input type="number" min="0" max="100" placeholder="0" name="videoDuration" onChange={this.formLecture} className="form-control"/>
    </div>
    {this.state.error.videoDurationLecture && <div style={{color:"red",fontSize:"12px"}}>{this.state.error.videoDurationLecture}</div>}

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
                <button type="button" className="btn btn-sm btn-primary" onClick={()=>this.newLecture(this.state.lesson,this.state.addLecture)} >Save</button>
                <button type="button" className="close-swl btn btn-sm btn-danger ml-2" data-dismiss="modal" onClick={()=>this.closeModal()}>Close</button>
                {/* <button type="button" className="main-btn" data-dismiss="modal" value={'delete'} onClick={()=>this.deleteLecture(lecture.id, this.props.course.id)} ><i className="uil uil-trash-alt"></i>DELETE</button> */}
            </div>
        </div>
    </div>
</div>
            </>
            :
            <>
            <section className="mt-50">
    <div className="">
        <h2 className="section-title after-line">Publish</h2>
    </div>
    <div className="mt-15">What you want save as?</div>
    <div className="mt-15">
    
            <p className="font-12 text-gray">- Your course is in an <b>Activate</b> state. Students can view, purchase or enroll in this course.</p> 
        
            <p className="font-12 text-gray">- Your course is in a <b>Draft</b> state. Students cannot view, purchase or enroll in this course.</p>
        
    </div>
   <div className="mt-15 row">
   <div className="col-md-6">
                    
        <select name="activate" onChange={this.changeStatus} className="custom-select ">
                <option value="" selected disabled>Select Status</option>
                <option value="false"  >Submit For Draft</option>
                <option value="true"  >Submit For Activate</option>
        </select>
    </div>
    </div>          

</section>
            </>
            }
            <br/>
            <div className="create-webinar-footer d-flex flex-column flex-md-row align-items-center justify-content-between mt-20 pt-15 border-top">
                <div className="d-flex align-items-center">
                    {this.state.show>1?
                    <button type="button" onClick={this.pagePrev} className="btn btn-sm btn-primary ">Previous</button>
                    :''
                    }
                     {this.state.show<4?
                    <button type="button" onClick={this.pageNext} className="btn btn-sm btn-primary ml-15" >Next</button>
                    :''}
                </div>
                {this.state.course&&this.state.show==4?
                <div className="mt-20 mt-md-0">

                    <button  type="button" value={'add'} onClick={()=>this.course(this.state.addCourse)} className=" btn btn-sm btn-primary">Submit</button>

                </div>
                :''}
                {this.state.show==2?
                <div className="mt-20 mt-md-0">

                    <button type="button" value={'add'} onClick={()=>this.courseDraf(this.state.addCourse)}  className=" btn btn-sm btn-primary">Submit as Draft</button>

                </div>
                :''}
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
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        img: state.course.img
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        imageRequest:(e) => dispatch (imageRequest(e)),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CourseAdd));