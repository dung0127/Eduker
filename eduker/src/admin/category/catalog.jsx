import React from "react";
import {connect} from 'react-redux';
import { fetchCatalogRequest, searchCatalogRequest,updateCatalogRequest} from "../../actions/catalog";
import Header from "../../user/layout/header.jsx";
import Panel from "../layout/panel.jsx";
import {Link} from "react-router-dom"

class Catalog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            catalogs: [],
            editCatalog: {
                id:'',
                name:'',
                description:'',
            },
            searchCatalog:'',
        }
    }

    getCatalog = (catalogId, name, desscsription) => {
        this.setState({editCatalog : {
            id:catalogId,
            name:name,
            description:desscsription,
        }}); 
    }

    handleInputEditCatalogChange = e => {   
        let formData = Object.assign({}, this.state.editCatalog);    
        console.log(formData)
        formData[e.target.name] = e.target.value;        
        this.setState({editCatalog:formData});  
        console.log(formData)  
    }

    updateCatalog = (editCatalog , id) => {
        this.props.updateCatalogRequest(editCatalog);
        Swal.fire({
            icon: "success",
            html: '<h3 class="font-20 text-center text-dark-blue py-25"> Catalog has been changed successfully</h3>',
            showConfirmButton: !1,
            width: "25rem"
        }),
        setTimeout(function() {
        Swal.close()
            
        }, 800)
        $('#id'+id).click();
    }

    handleInputSearchCatalogChange = e => {   
        let value = e.target.value       
        this.setState({searchCatalog:value});  
    }

    searchCatalog = (searchCatalog) => {
        this.props.searchCatalogRequest(searchCatalog)
    }

    componentDidMount(){
        this.props.fetchCatalogRequest();

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
                                                <button type="button"  onClick={()=>this.searchCatalog(this.state.searchCatalog) } className="js-video-demo-path-links rounded-left input-group-text input-group-text-rounded-left text-white" data-preview="holder">
                                                <img style={{width:"23px", height:"23px"}} src="/assets/default/img/search1.png"/>
                                                </button>
                                            </div>
                                            <input type="text" placeholder="Search..."  onChange={this.handleInputSearchCatalogChange} onKeyPress={e=> e.key==='Enter' && this.searchCatalog(this.state.searchCatalog)} className="form-control "/>
                                        </div>
                                        
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

                    <section className="mt-35">
                        
                    <div className="d-flex align-items-start align-items-md-center justify-content-between flex-column flex-md-row">
                        <h2 className="section-title">Catalog</h2>
                    </div>
                        <Link to ="/catalog-add" className="btn btn-primary btn-sm mt-15" >New Catalog</Link>

                    <div className="panel-section-card py-20 px-25 mt-20">
                        <div className="row">
                            <div className="col-12 ">
                                <div className="table-responsive">
                                    <table className="table text-center custom-table">
                                        <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th className="text-left">Name</th>
                                            <th className="text-left">Subcatalog</th>
                                            <th className="text-center">Action</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                       
                                                {this.props.catalogs.map((catalog,index) => {
                                                    return (
                                                        <tr>
                                                            <td className="align-middle">
                                                                <div className="text-left">
                                                                {index + 1}
                                                                </div>
                                                            </td>
                                                            
                                                            <td className="align-middle text-left">
                                                            <span >
                                                            {catalog.name}
                                                                </span>
                                                            </td>
                                                            <td className="align-middle text-left">
                                                                <span>
                                                                {catalog.subCatalogs.map(sub => {
                                                                    return (
                                                                        <div><span className="_5f7g11">-  {sub.name}</span></div>
                                                                    )
                                                                } )}
                                                                </span>
                                                            </td>
                                                            
                                                            <td className="align-middle">
                                                                <span title="Edit" className="text-dark-blue" data-toggle="modal" data-target={'#id'+catalog.id}  onClick={() => this.getCatalog(catalog.id, catalog.name, catalog.description)}><img style={{height:"20px", width:"20px", cursor:"pointer"}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACYElEQVRoge2ZPWsUQRjHf4reHSQggh9AwSYE0gTSiTkVm4joh0hzSUBCvoDBYGHU2tLOQuVI0qQJ2CRtIEiKVElxycUXtIyQl2JmcpPlMjtvu3uH+4dhj7lnZ/6/mWdm9vagVKmoqgKLQBs4jVQ2LPp9DnwCPgL3QgDeRDSuylpKn28T8cfAlC9ASzYy5tuAo97J/o6AaeAlcCKLF4QahTz0mo75p1r9JB2IGddG8wK4zLySN0QeAGnmlbwgsgZQOX8K/AJGUuIbOK6JLAH0BbsuP/8gMkRWALr5J0AFWMYP4pkpMAuApHklV4gXMnbLFBQb4DLzSi4Qt2TcX1OHMQHSzCvZQNSAVRmzZOo0FoCteSUThG7+ALhjaigGgO0+n1QFaMp7fwOjiIfLFVnXBobTGgkFcB35pJIz8Y3OyA/ZNBAC4DvySekzYT3ySr4AscyDR9ro8gFYICxtdCUXrFXa6HIFGEH8AOkJ8+AO0JDxH3w60+Rt/mpgxwPyajwdU1QFPgOPgUPgIbBte3MoQKiqwBdgAmH+AfDdpYEiAWqIx4IJxG4zjtl8FdgBvuqV17JylyKftLkJ3AUG9coiZsA3bdTmckWvzBsgJOcLBwhdsCfyesFzrDVwG3hk+L4CzAF1xIKt47BVSnWdgW5BLgfZrHaPTWnhecIiFrF61D5X6Aw0ES9jB1Pi/gGbwHvgp2dfmcxAnrqB8PZHryz6JHZR10XcTwCFb6Oh6nuAMoWKVt8D/B8p1JLX8cztuOu+vO6bgtQrkl4u8yaACvAK2OsBo8myi/gb9roJoFQpR50BLV1hJUuKr/4AAAAASUVORK5CYII="/></span>
                                                            </td>
                                                        
                                                            <div className="modal fade update"  id={'id'+catalog.id} aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Edit Catalog</h5>
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
                                                                            <input className="form_input_1" type="hidden" name="id" value={catalog.id}/>
                                                                                <label style={{float:"left"}} className="label25">Catalog</label>
                                                                                <input className="form-control" type="text" name="name" defaultValue={catalog.name} onChange={this.handleInputEditCatalogChange}/>
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
                                                                                <label style={{float:"left"}} className="label25">Description</label>
                                                                                <div className="ui form swdh30">
                                                                                    <div className="field">
                                                                                        <textarea className="form-control"  rows="6" name="description" defaultValue={catalog.description} onChange={this.handleInputEditCatalogChange}></textarea>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{fontSize:"12px", color:"gray", float:"left"}} className="help-block">220 words</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="save-chapter btn btn-sm btn-primary" onClick={()=>this.updateCatalog(this.state.editCatalog,catalog.id)}>Save</button>

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
        updateSuccess: state.catalog.updateSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        searchCatalogRequest:(e) => dispatch (searchCatalogRequest(e)),
        updateCatalogRequest:(e) => dispatch (updateCatalogRequest(e))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Catalog);