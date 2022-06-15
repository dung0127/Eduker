import React from "react";
import {connect} from 'react-redux';
import { fetchSubCatalogRequest, searchSubCatalogRequest,updateSubCatalogRequest, createSubCatalogRequest } from "../../actions/subCatalog";
import { fetchCatalogRequest} from "../../actions/catalog";
import Header from "../../user/layout/header.jsx";
import {Link} from "react-router-dom"
import Panel from "../layout/panel.jsx";

class SubCatalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addSubCatalog: {
                catalogId:'',
                name:'',
                description:'',
            },
            editSubCatalog: {
                id:'',
                catalogId:'',
                name:'',
                description:'',
            },
            searchSubCatalog:'',
            updateSuccess: false,
        }
    }

    handleInputSubCatalogChange = e => {   
        let formData = Object.assign({}, this.state.addSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({addSubCatalog:formData});  
        console.log(formData)  
    }

    handleSubmitSubCatalog = (addSubCatalog) => {
        this.props.createSubCatalogRequest(addSubCatalog);
        this.props.fetchSubCatalogRequest();
        this.props.fetchCatalogRequest();
        Array.from(document.querySelectorAll('.sub')).forEach(input=>(input.value=""))
        this.setState({addSubCatalog: {
            catalogId:'',
            name:'',
            description:'',
        }})
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25">' + "Submit Subcatalog successfully </h3>",
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 1000)
        $('#newSub').click();
        
    }

    getSubCatalog = (subCatalogId, name, desscsription) => {
        this.setState({editSubCatalog : {
            id: subCatalogId,
            name: name,
            catalogId: '',
            description: desscsription,
        }}); 
    }

    handleInputEditSubCatalogChange = e => {   
        let formData = Object.assign({}, this.state.editSubCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({editSubCatalog:formData});  
        console.log(formData)  
    }

    updateSubCatalog = (editSubCatalog, id) => {
        this.props.updateSubCatalogRequest(editSubCatalog);
        this.props.fetchSubCatalogRequest();
        this.props.fetchCatalogRequest();
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25"> Subcatalog has been changed successfully</h3>',
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 800) 
        $('#idSub'+id).click();
        
    }

    handleInputSearchSubCatalogChange = e => {   
        let value = e.target.value       
        this.setState({searchSubCatalog:value});  
    }

    searchSubCatalog = (searchSubCatalog) => {
        this.props.searchSubCatalogRequest(searchSubCatalog)
    }

    componentDidMount(){
        this.props.fetchSubCatalogRequest();
    } 

    render(){
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
                               
                                <div className="col-12 col-lg-12">
                                        
                                        <div className="input-group js-video-demo-path-input">
                                            <div className="input-group-prepend">
                                                <button type="button"  onClick={()=>this.searchSubCatalog(this.state.searchSubCatalog) } className="js-video-demo-path-links rounded-left input-group-text input-group-text-rounded-left text-white" data-preview="holder">
                                                <img style={{width:"23px", height:"23px"}} src="/assets/default/img/search1.png"/>
                                                </button>
                                            </div>
                                            <input type="text" placeholder="Search..."  onChange={this.handleInputSearchSubCatalogChange} onKeyPress={e=> e.key==='Enter' && this.searchSubCatalog(this.state.searchSubCatalog)} className="form-control "/>
                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

                    <section className="mt-35" >
                        
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                        <h2 className="section-title">Subcatalog</h2>
                    </div>
                    <div className="btn btn-primary btn-sm mt-15" >
                        <a style={{color:"white"}} data-toggle="modal" data-target='#newSub'>
                                New SubCatalog
                        </a>
                    </div>
                    <div className="modal fade"  tabindex="-1" id='newSub' aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">New SubCatalog</h5>
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
                                                                                <select className="custom-select ui hj145 dropdown cntry152 prompt srch_explore" name="catalogId" onChange={this.handleInputSubCatalogChange}>
                                                                                    <option value="" selected disabled>Select Catalog</option>
                                                                                    {
                                                                                        this.props.catalogs.map((catalog,index) => {
                                                                                            return (
                                                                                                <option value={catalog.id}>{catalog.name}</option>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25" style={{float:"left"}} >Subcatalog </label>
                                                                                <input className="form_input_1 form-control" type="text" name="name" onChange={this.handleInputSubCatalogChange}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25 " style={{float:"left"}} >Description</label>
                                                                                <div className="ui form swdh30">
                                                                                    <div className="field">
                                                                                        <textarea rows="5" className="form-control" name="description" placeholder="Subcatalog description here..." onChange={this.handleInputSubCatalogChange}></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="save-chapter btn btn-sm btn-primary" value={'AddSubCatalog'} onClick={()=>this.handleSubmitSubCatalog(this.state.addSubCatalog)}>Save</button>

                                                            <button type="button" className="close-swl btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                    </div>

                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="table-responsive">
                                    <table className="table text-center custom-table">
                                        <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th className="text-left">Name</th>
                                            <th className="text-left">Description</th>
                                            <th className="text-center">Action</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                                {this.props.subCatalogs.map((subCatalog,index) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                {index + 1}
                                                                </div>
                                                            </td>
                                                            
                                                            <td className="align-middle text-left">
                                                            <span >{subCatalog.name}
                                                            </span>
                                                            </td>
                                                            <td className="align-middle text-left">
                                                                <span>
                                                                {subCatalog.description}
                                                                </span>
                                                            </td>
                                                            
                                                            <td className="align-middle">
                                                                <span title="Edit" className="text-dark-blue" data-toggle="modal" data-target={'#idSub'+subCatalog.id} onClick={() => this.getSubCatalog(subCatalog.id, subCatalog.name, subCatalog.description)}><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>
                                                            </td>
                                                        
                                                            <div className="modal fade"  tabindex="-1" id={'idSub'+subCatalog.id} aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">New SubCatalog</h5>
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
                                                                                <select className="custom-select ui hj145 dropdown cntry152 prompt srch_explore" name="catalogId" onChange={this.handleInputEditSubCatalogChange}>
                                                                                    <option value="" selected disabled>Select Catalog</option>
                                                                                    {
                                                                                        this.props.catalogs.map((catalog,index) => {
                                                                                            return (
                                                                                                <option value={catalog.id}>{catalog.name}</option>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25" style={{float:"left"}} >Subcatalog </label>
                                                                                <input className="form_input_1 form-control" type="text" name="name" defaultValue={subCatalog.name} onChange={this.handleInputEditSubCatalogChange}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <br/>
                                                            <div className="new-section-block">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="new-section">
                                                                            <div className="form_group">
                                                                                <label className="label25 " style={{float:"left"}} >Description</label>
                                                                                <div className="ui form swdh30">
                                                                                    <div className="field">
                                                                                        <textarea rows="5" className="form-control" name="description" defaultValue={subCatalog.description} onChange={this.handleInputEditSubCatalogChange}></textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="save-chapter btn btn-sm btn-primary" value={'add'} onClick={()=>this.updateSubCatalog(this.state.editSubCatalog, subCatalog.id)}>Save</button>

                                                            <button type="button" className="close-swl btn btn-sm btn-danger" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
        )
    }
}

const mapStateToProps = state => {
    return {        
        catalogs: state.catalog.catalogs,
        subCatalogs: state.subCatalog.subCatalogs,
        updateSuccess: state.subCatalog.updateSuccess,
        createSuccess: state.subCatalog.createSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogRequest:() => dispatch (fetchSubCatalogRequest()),
        searchSubCatalogRequest:(e) => dispatch (searchSubCatalogRequest(e)),
        updateSubCatalogRequest:(e) => dispatch (updateSubCatalogRequest(e)),
        createSubCatalogRequest:(e) => dispatch (createSubCatalogRequest(e)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(SubCatalog);