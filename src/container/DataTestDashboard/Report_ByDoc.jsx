// cars:  [
//     {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
//     {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
//     {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
// ],

import React, {Component} from 'react';
import {DataTable, DataTableSubmenu, Column } from 'primereact/datatable';
//import {CarService} from '../service/CarService';

class Report_ByDoc extends Component {

    constructor() {
        super();
        this.state = { 
            cars: [
                    {"vin":"a1653d4d","brand":"VW","year":1998,"color":"White","price":10000},
                    {"vin":"ddeb9b10","brand":"Mercedes","year":1985,"color":"Green","price":25000},
                    {"vin":"d8ebe413","brand":"Jaguar","year":1979,"color":"Silver","price":30000},
                    {"vin":"aab227b7","brand":"Audi","year":1970,"color":"Black","price":12000},
                    {"vin":"631f7412","brand":"Volvo","year":1992,"color":"Red","price":15500},
                    {"vin":"7d2d22b0","brand":"VW","year":1993,"color":"Maroon","price":40000},
                    {"vin":"50e900ca","brand":"Fiat","year":1964,"color":"Blue","price":25000},
            ],
            loading: false,
        };
        this.headerTemplate = this.headerTemplate.bind(this);
        this.footerTemplate = this.footerTemplate.bind(this);
    }

    headerTemplate(data) {
        return data.brand;
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
                    <DataTable header="RowSpan" value={this.state.cars} rowGroupMode="rowspan" sortField="brand" sortOrder={1} groupField="brand"     
                        style={{marginTop:'30px'}}>    
                        <Column field="brand" header="Brand" />       
                        <Column field="year" header="Year" />
                        <Column field="color" header="Color" />
                        <Column field="vin" header="Vin" />
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

export default  Report_ByDoc;