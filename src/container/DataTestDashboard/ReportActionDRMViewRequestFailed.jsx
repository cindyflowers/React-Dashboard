// cars:  [
//     {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
//     {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
//     {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
// ],

import React, {Component} from 'react';
import {DataTable, DataTableSubmenu, Column } from 'primereact/datatable';
import DialogActionDRMViewRequestFailed from './DialogActionDRMViewRequestFailed'
//import {CarService} from '../service/CarService';

class ReportActionDRMViewRequestFailed extends Component {

    constructor(prop) {
        super(prop);
        this.state = { 
            loading: false,
            data: this.props.data
        };
        this.headerTemplate = this.headerTemplate.bind(this);
        this.footerTemplate = this.footerTemplate.bind(this);
    }

    headerTemplate(data) {
        return data.Requests;
    }
    
    footerTemplate(data, index) {
        return ([
                    <td key={data.brand + '_footerTotalLabel'} colSpan="3" style={{textAlign: 'right'}}>Total Price</td>,
                    <td key={data.brand + '_footerTotalValue'}>{this.calculateGroupTotal(data.brand)}</td>
            ]
        );
    }
    
    calculateGroupTotal(brand) {
        let total = 0;
        
        if(this.state.cars) {
            for(let car of this.state.cars) {
                if(car.brand === brand) {
                    total += car.price;
                }
            }
        }

        return total;
    }

    render() {
        return (
            <div>
                <div className="content-section implementation">
                    <DataTable header="RowSpan" value={this.state.data} rowGroupMode="rowspan" sortField="user" sortOrder={1} groupField="user"     
                        style={{marginTop:'30px'}}>    
                        <Column field="user" header="User" />   
                        <Column field="filename" header="File" />       
                        <Column field="Hits" header="Violations" />
                        {/* <Column field="user" header="Color" />
                        <Column field="filename" header="Vin" /> */}
                    </DataTable>
                </div>
            </div>
        );
    }
}


    // componentDidMount() {
    //     this.setState({ loading: true });
    // }

    // loadData(event) {
    //     event.rows = 3;
    //     event.first = 0;
    // }

    // carTemplate(car) {
    //     if (!car) {
    //         return;
    //     }

    //     const src = "showcase/resources/demo/images/car/" + car.brand + ".png";

    //     return (
    //         <div className="p-grid car-item">
    //             <div className="p-col-12 p-md-3">
    //                 <img src={src} alt="Car" />
    //             </div>
    //             <div className="p-col-12 p-md-9">
    //                 <div className="p-grid">
    //                     <div className="p-col-2 p-sm-6">Vin: </div>
    //                     <div className="p-col-10 p-sm-6">{car.vin}</div>
            
    //                     <div className="p-col-2 p-sm-6">Year: </div>
    //                     <div className="p-col-10 p-sm-6">{car.year}</div>
            
    //                     <div className="p-col-2 p-sm-6">Brand: </div>
    //                     <div className="p-col-10 p-sm-6">{car.brand}</div>
            
    //                     <div className="p-col-2 p-sm-6">Color: </div>
    //                     <div className="p-col-10 p-sm-6">{car.color}</div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    

    // render() {
    //     return (
    //         <div className="datascroll-demo">
    //             <div className="content-section implementation">
    //                 <DataScroller id="myDataScroller" value={this.state.cars} itemTemplate={this.carTemplate} 
    //                         rows={this.state.cars.length}  header="List of Cars" inline={true}/>
    //             </div>
                
    //         </div>
    //     );
    // }
//}

export default  ReportActionDRMViewRequestFailed;