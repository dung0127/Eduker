import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {CATALOG_INFO_BASE_URL} from "../../config/env";
import {SUBCATALOG_INFO_BASE_URL} from "../../config/env";
import authHeader from "../../config/authHeader";
import {withRouter} from '../layout/auth/withRouter'
import $ from "jquery";
import Panel from "../layout/panel.jsx"
import Header from "../../user/layout/header.jsx";
import loadjs from 'loadjs';
import validator from 'validator';


let arr = [];
class CatalogAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            addCatalog: {
                name:'',
                description:'',
            },
            addSubCatalog: {
                catalogId:'',
                name:'',
                description:'',
            },
            subCatalog: [],
            error:{}
        }

        this.handleInputCatalogChange = this.handleInputCatalogChange.bind(this);
        this.newSubCatalog = this.newSubCatalog.bind(this);
    }

    validateCatalog = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addCatalog.name)){            
            error['nameCata'] = 'The Title field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addCatalog.description)){            
            error['descriptionCata'] = 'The Description field is required.';
            isValid = false;
        }
        
        this.setState({
            error: error
        })

        return isValid;
    }

    validateSubCatalog = () => {
        let isValid = true;

        const error = {}

        if(validator.isEmpty(this.state.addSubCatalog.name)){            
            error['name'] = 'The Title field is required.';
            isValid = false;
        }

        if(validator.isEmpty(this.state.addSubCatalog.description)){            
            error['description'] = 'The Description field is required.';
            isValid = false;
        }
        
        this.setState({
            error: error
        })

        return isValid;
    }

    handleInputCatalogChange = e => {   
        let formData = Object.assign({}, this.state.addCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addCatalog:formData});  
        console.log(formData)  
    }

    subCatalog = e => {   
        let formData = Object.assign({}, this.state.addSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addSubCatalog:formData});  
        console.log(formData)  
    }
    
    newSubCatalog = (addSubCatalog) => {
        if(this.validateSubCatalog()){
            arr.push(addSubCatalog);
            this.setState({subCatalog: arr});
            Array.from(document.querySelectorAll('.sub')).forEach(input=>(input.value=""))
            $('#hoho').click();
        }
    }

    deleteSubCatalog = (name) => {
        for (var i=0; i< arr.length; i++){
            if(arr[i].name === name){
                arr.splice(i,1);
            }
        }
        this.setState({subCatalog:arr});
    }

    handleSubmitCatalog = (addCatalog, subCatalog) => {
        if(this.validateCatalog()){
            axios.post(CATALOG_INFO_BASE_URL + '/create', addCatalog , { headers: authHeader() }).then(res=>{
                subCatalog.map((sub,index) => {
                    return (
                        sub.catalogId = res.data.data.id,
                        axios.post(SUBCATALOG_INFO_BASE_URL + '/create', sub, { headers: authHeader() }).then(res=>{})
                    )})
                

                arr = [];
                if(res.data.message=='Success'){
                    Swal.fire({
                        icon: "success",
                        html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Submit catalog successfully </h3>",
                        showConfirmButton: !1,
                        width: "25rem"
                    }),
                    setTimeout(function() {
                    Swal.close()
                        
                    }, 1000)
                    
                    setTimeout(()=>{
                        this.props.navigate('/catalog')
                    },1000);
                }
            })
            
        }
    }

    componentDidMount (){
        loadjs('/assets/default/vendors/bootstrap-tagsinput/bootstrap-tagsinput.min.js', () => {});

    }
    render(){
        return (
           <>
           <Header/>
            <div className="d-flex justify-content-end">
                <Panel/>

                <div className="panel-content">
                      
                    <section className="mt-35">
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                       <h2 className="section-title">Create New Catalog</h2>
                    </div>
                    <div className="panel-section-card py-20 px-25 mt-20">
                    <div className="col-12">
                            <div className="step-content">
                                <div className="step-tab-panel step-tab-info active" id="tab_step1"> 
                                    <div className="tab-from-content">
                                        <div className="course__form">
                                            <div className="general_info10">
                                                <div class="row">
                                                    <div class="col-lg-8">
                                                        <div class="discount_form">
                                                            <div class="row">
                                                                <div class="col-lg-6 col-md-6">
                                                                    <div class="mt-20 lbel25">	
                                                                        <label>Name</label>
                                                                        <div class="ui left icon input swdh19">
                                                                            <input class="form-control prompt srch_explore" type="text" name="name" required=""  placeholder="Name here" onChange={this.handleInputCatalogChange}/>															
                                                                            {this.state.error.nameCata && <div style={{color:" red",fontSize:"12px"}} >{this.state.error.nameCata}</div>}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-12 col-md-12">	
                                                                    <div class="ui search focus mt-20 lbel25">
                                                                        <label>Description</label>
                                                                        <div class="ui form swdh30">
                                                                            <div class="field">
                                                                                <textarea className="form-control" rows="5" name="description" id="" placeholder="Item description here..." onChange={this.handleInputCatalogChange}></textarea>
                                                                                {this.state.error.descriptionCata && <div style={{color:" red",fontSize:"12px"}} >{this.state.error.descriptionCata}</div>}
                                                                            
                                                                            </div>
                                                                        </div>
                                                                    
                                                                    </div>	

                                                                </div>
                                                                
                                                                <div class="col-lg-12 ">	
                                                                    <div class="mt-20 lbel25">
                                                                        <div class="section-add-item-wrap p-7">
                                                                        <button  title="Edit" className="gray-s form-control" style={{backgroundColor:"rgb(250 91 91)"}} data-toggle="modal" data-target='#hoho' ><i class="far fa-plus-square mr-2"></i>New SubCatalog</button>
                                                                        </div>			
                                                                    </div>					
                                                                </div>
                                                                <div class="modal fade"  tabindex="-1" id='hoho' aria-hidden="true">
                                                                    <div class="modal-dialog modal-lg">
                                                                        <div class="modal-content">
                                                                            <div class="modal-header">
                                                                                <h5 class="modal-title">New SubCatalog</h5>
                                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                    <span aria-hidden="true">&times;</span>
                                                                                    </button>
                                                                            </div>
                                                                            <div class="modal-body">
                                                                                <div class="new-section-block">
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="new-section">
                                                                                                <div class="form_group">
                                                                                                <input class="form_input_1 " type="hidden" name="id" value=''/>
                                                                                                    <label class="label25 ">SubCatalog </label>
                                                                                                    <input class="form-control form_input_1 sub" type="text" name="name" onChange={this.subCatalog}/>
                                                                                                    {this.state.error.name && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.name}</div>}

                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <br/>
                                                                                <div class="new-section-block">
                                                                                    <div class="row">
                                                                                        <div class="col-md-12">
                                                                                            <div class="new-section">
                                                                                                <div class="form_group">
                                                                                                    <label class="label25">Description</label>
                                                                                                    <div class="ui form swdh30">
                                                                                                        <div class="field">
                                                                                                            <textarea className="form-control sub" rows="3" name="description" onChange={this.subCatalog}></textarea>
                                                                                                            {this.state.error.description && <div style={{color:"red",fontSize:"12px"}} >{this.state.error.description}</div>}

                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div class="modal-footer">
                                                                                <button type="button" class="btn btn-sm btn-primary" value={'add'} onClick={()=>this.newSubCatalog(this.state.addSubCatalog)}>Save</button>
                                                                                <button type="button" class="close-swl btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                                                                            
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6 col-md-6" >
                                                                    <div class="mt-20 lbel25">	
                                                                        <label>Subcatalog</label>
                                                                    </div>
                                                                    <div class="added-section-item mb-30">
                                                                       
                                                                        {
                                                                            this.state.subCatalog.map(sub => {
                                                                                return (
                                                                                    <>
                                                                                    <div class="section-header" style={{backgroundColor:"#43d477", borderRadius:"5px", textAlign:"center", paddingTop:"5px", paddingBottom:"5px", color:"white", fontSize:"14px"}}>
                                                                                        {sub.name}&nbsp;
                                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" value={'delete'} name={sub.name} onClick={()=>this.deleteSubCatalog(sub.name)}>
                                                                                            &times; &nbsp;
                                                                                        </button>
                                                                                    </div>
                                                                                    <br/></>
                                                                                )
                                                                            })
                                                                        }
                                                                        
                                                                    </div>         
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="step-tab-panel step-tab-location">
                                    <div className="tab-from-content">
                                        <div className="mt-20 mt-md-0">
                                        <Link to="/catalog" ><button style={{backgroundColor:"#eb4242", borderColor:"#eb4242"}} type="button" className=" btn btn-sm btn-primary" >Back</button></Link>
                                        &nbsp;&nbsp;&nbsp;
                                        <button  type="button" className=" btn btn-sm btn-primary" value={'Add'} onClick={()=>this.handleSubmitCatalog(this.state.addCatalog,this.state.subCatalog)}>Save</button>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>


                </section>
            
                </div>
            </div>
           </>
        )
    }
}


export default withRouter(CatalogAdd)