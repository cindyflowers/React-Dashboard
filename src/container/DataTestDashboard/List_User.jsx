import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import moment from 'moment'

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './DataTestDashboard.scss'

class List_User extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
             cars:  [
                {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
            ],
            data: this.props.data,
            expandedRows: null,
        };
        this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
        //this.doSomething = this.doSomething.bind(this);
    }
    
    //doSomething() {
        // const test = "do something";
        // this.setState((state) => ({ failuresByDoc: test}));
    //}

    componentDidMount() {

    }

    rowExpansionTemplate(data) {
        const src = "../../svg/BurgerBoy.svg";

        return  (
            <div className="p-grid p-fluid" style={{padding: '2em 1em 1em 1em'}}>
                <div className="p-col-12 p-md-3" style={{textAlign:'center'}}>
                    <img src={src} alt={data.Admin}/>
                </div>
                    <div className="p-col-12 p-md-9">
                    <div className="p-grid">
                        
                        <div className="p-md-2">Violations </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.id}</div>

                        {/* <div className="p-md-2">Name: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.DocName}</div>

                        <div className="p-md-2">Owner: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.Name.First} {data.Name.Last}</div> */}

                        <div className="p-md-2">User: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{data.user}</div>

                        <div className="p-md-2">Date: </div>
                        <div className="p-md-10" style={{fontWeight:'bold'}}>{moment(data.LastAccessTS).format("MMMM Do YYYY, h:mm:ss a")}</div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {data, itemSelected } = this.state;
        return (
            <div>
                {data &&
                    <div>
                        <div className="content-section implementation">
                            <DataTable value={data} responsive={true} autoLayout="true" expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows:e.data})}     
                            rowExpansionTemplate={this.rowExpansionTemplate} dataKey="Id">
                                <Column expander={true} style={{width: '2em'}} />
                                <Column field="id" header="Violations" />
                                <Column field="user" header="User" />
                            </DataTable>
                        </div>
                    </div>
                }
            </div>

        );
    }
}
export default List_Admin;