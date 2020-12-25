// cars:  [
//     {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
//     {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
//     {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
// ],

import React, {Component} from 'react';
import {DataScroller} from 'primereact/datascroller';
//import {CarService} from '../service/CarService';

class UnitTestFilterByDocReport extends Component {

    constructor() {
        super();
        this.state = { 
            cars:  [
                {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
            ],
            loading: false,
        };
        //this.carservice = new CarService();
        this.carTemplate = this.carTemplate.bind(this);
    }

    componentDidMount() {
        //this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
        this.setState({ loading: true });
    }

    loadData(event) {
        //event.first = First row offset
        //event.rows = Number of rows per page
        //add more records to the cars array
        //this.setState({ loading: true });
        event.rows = 3;
        event.first = 0;
    }

    carTemplate(car) {
        if (!car) {
            return;
        }

        const src = "showcase/resources/demo/images/car/" + car.brand + ".png";

        return (
            <div className="p-grid car-item">
                <div className="p-col-12 p-md-3">
                    <img src={src} alt="Car" />
                </div>
                <div className="p-col-12 p-md-9">
                    <div className="p-grid">
                        <div className="p-col-2 p-sm-6">Vin: </div>
                        <div className="p-col-10 p-sm-6">{car.vin}</div>
            
                        <div className="p-col-2 p-sm-6">Year: </div>
                        <div className="p-col-10 p-sm-6">{car.year}</div>
            
                        <div className="p-col-2 p-sm-6">Brand: </div>
                        <div className="p-col-10 p-sm-6">{car.brand}</div>
            
                        <div className="p-col-2 p-sm-6">Color: </div>
                        <div className="p-col-10 p-sm-6">{car.color}</div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="datascroll-demo">
                {/* <DataScrollerSubmenu /> */}

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataScroller</h1>
                        <p>DataScroller displays data with on demand loading using scroll.</p>
                    </div>
                </div>
{/* 
                <div className="content-section implementation">
                    Demo is at the bottom of this page.
                </div> */}

                <div className="content-section implementation">
                    <DataScroller id="myDataScroller" value={this.state.cars} itemTemplate={this.carTemplate} 
                            rows={3}  header="List of Cars" inline={true}/>
                </div>
                
            </div>
        );
    }
}





// import React, { Component } from 'react';
// import { Dialog } from 'primereact/dialog';
// import { Panel } from 'primereact/panel';

// import { DataView, DataViewLayoutOptions } from "primereact/dataview";
// import { Button } from "primereact/button";
// import { Dropdown } from "primereact/dropdown";

// class UnitTestFilterByDocReport extends Component {

//     constructor() {
//         super();
//         this.state = { 
//             cars:  [
//                 {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
//                 {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
//                 {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
//             ],
//             //cars: [],
//             layout: 'list',
//             selectedCar: null, 
//             visible: false,
//             sortKey: null,
//             sortOrder: null
//         };
//         //this.carservice = new CarService();
//         this.itemTemplate = this.itemTemplate.bind(this);
//         this.onSortChange = this.onSortChange.bind(this);
//     }

//     componentDidMount() {
//         // this.carservice.getCarsLarge().then(data => this.setState({cars: data}));
//         // let test = this.state.cars;
//     }

//     onSortChange(event) {
//         const value = event.value;

//         if (value.indexOf('!') === 0) {
//             this.setState({
//                 sortOrder: -1, 
//                 sortField: value.substring(1, value.length), 
//                 sortKey: value
//             });
//         }
//         else {
//             this.setState({
//                 sortOrder: 1, 
//                 sortField: value, 
//                 sortKey: value
//             });
//         }
//     }

//     renderListItem(car) {
//         return (
//             <div className="p-col-12 car-details" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
//                 <div className="p-grid">
//                     <div className="p-col-12 p-md-3">
//                         <img src={`showcase/resources/demo/images/car/${car.brand}.png`} alt={car.brand}/>
//                     </div>
//                     <div className="p-col-12 p-md-8 car-data">
//                         <div>Vin: <b>{car.vin}</b></div>
//                         <div>Year: <b>{car.year}</b></div>
//                         <div>Brand: <b>{car.brand}</b></div>
//                         <div>Color: <b>{car.color}</b></div>
//                     </div>

//                     <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
//                         <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: car, visible: true })}></Button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     renderGridItem(car) {
//         return (
//             <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
//                 <Panel header={car.vin} style={{ textAlign: 'center' }}>
//                     <img src={`showcase/resources/demo/images/car/${car.brand}.png`} alt={car.brand} />
//                     <div className="car-detail">{car.year} - {car.color}</div>
//                     <hr className="ui-widget-content" style={{ borderTop: 0 }} />
//                     <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedCar: car, visible: true })}></Button>
//                 </Panel>
//             </div>
//         );
//     }

//     itemTemplate(car, layout) {
//         if (!car) {
//             return;
//         }

//         if (layout === 'list')
//             return this.renderListItem(car);
//         else if (layout === 'grid')
//             return this.renderGridItem(car);
//     }

//     renderCarDialogContent() {
//         if (this.state.selectedCar) {
//             return (
//                 <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
//                     <div className="p-col-12" style={{textAlign: 'center'}}>
//                         <img src={`showcase/resources/demo/images/car/${this.state.selectedCar.brand}.png`} alt={this.state.selectedCar.brand} />
//                     </div>
                    
//                     <div className="p-col-4">Vin: </div>
//                     <div className="p-col-8">{this.state.selectedCar.vin}</div>

//                     <div className="p-col-4">Year: </div>
//                     <div className="p-col-8">{this.state.selectedCar.year}</div>
                        
//                     <div className="p-col-4">Brand: </div>
//                     <div className="p-col-8">{this.state.selectedCar.brand}</div>
                    
//                     <div className="p-col-4">Color: </div>
//                     <div className="p-col-8">{this.state.selectedCar.color}</div>
//                 </div>
//             );
//         }
//         else {
//             return <div>Test</div>;
//         }
//     }

//     renderHeader() {
//         const sortOptions = [
//             {label: 'Newest First', value: '!year'},
//             {label: 'Oldest First', value: 'year'},
//             {label: 'Brand', value: 'brand'}
//         ];

//         return (
//             <div className="p-grid">
//                 <div className="p-col-6" style={{textAlign: 'left'}}>
//                     <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
//                 </div>
//                 <div className="p-col-6" style={{textAlign: 'right'}}>
//                     <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
//                 </div>
//              </div>
//         );
//     }

//     render() {
//         const header = this.renderHeader();

//         return (
//             <div >
//                 <div className="">
//                     <div className="feature-intro">
//                         <h1>DataView</h1>
//                         <p>DataView displays data in grid or list layout with pagination and sorting features.</p>
//                     </div>
//                 </div>

//                 <div className="">
//                     <DataView value={this.state.cars} layout={this.state.layout} header={header} 
//                             itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={2} 
//                             sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

//                     <Dialog header="Car Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({visible: false})}>
//                         {this.renderCarDialogContent()}
//                     </Dialog> 
//                 </div>

//                 {/* <DataViewDoc/> */}
//             </div>
//         );
//     }
// }

//     constructor(props) {
//         super(props);
//         this.state = { 
//             cars: [],
//             layout: 'list',
//             selectedDocument: null, 
//             visible: false,
//             sortKey: null,
//             sortOrder: null
//         };
//         //this.carservice = new CarService();
//         this.itemTemplate = this.itemTemplate.bind(this);
//         this.onSortChange = this.onSortChange.bind(this);
//     }

//     componentDidMount() {
//         //this.setState({documents: this.props.documents});
//     }

//     onSortChange(event) {
//         const value = event.value;

//         if (value.indexOf('!') === 0) {
//             this.setState({
//                 sortOrder: -1, 
//                 sortField: value.substring(1, value.length), 
//                 sortKey: value
//             });
//         }
//         else {
//             this.setState({
//                 sortOrder: 1, 
//                 sortField: value, 
//                 sortKey: value
//             });
//         }
//     }

//     renderListItem(document) {
//         return (
//             <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
//                 <div className="p-col-12 p-md-3">
//                     <img src={'../../svg/DeniedDoc.svg'} alt={document.DocType}/>
//                 </div>
//                 <div className="p-col-12 p-md-8 car-details">
//                     <div className="p-grid">
//                         <div className="p-col-2 p-sm-6">DocId:</div>
//                         <div className="p-col-10 p-sm-6">{document.DocId}</div>

//                         <div className="p-col-2 p-sm-6">DocName:</div>
//                         <div className="p-col-10 p-sm-6">{document.DocName}</div>

//                         <div className="p-col-2 p-sm-6">DocType:</div>
//                         <div className="p-col-10 p-sm-6">{document.DocType}</div>

//                         <div className="p-col-2 p-sm-6">LastAccessTS:</div>
//                         <div className="p-col-10 p-sm-6">{document.LastAccessTS}</div>
//                     </div>
//                 </div>

//                  <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
//                      <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedDocument: document, visible: true })}></Button>
//                  </div>
//             </div>
//         );
//     }

//     renderGridItem(document) {
//         return (
//             <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
//                 <Panel header={document.DocId} style={{ textAlign: 'center' }}>
//                     <img src={'showcase/resources/demo/images/car/${car.brand}.png'} alt={document.DocType} />
//                     <div className="car-detail">{document.DocName} - {document.DocGUID}</div>
//                     <hr className="ui-widget-content" style={{ borderTop: 0 }} />
//                     <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedDocument: document, visible: true })}></Button>
//                 </Panel>
//             </div>
//         );
//     }

//     itemTemplate(document, layout) {
//         if (!document) {
//             return;
//         }

//         if (layout === 'list')
//             return this.renderListItem(document);
//         else if (layout === 'grid')
//             return this.renderGridItem(document);
//     }

//     renderDocumentDialogContent() {
//         if (this.state.selectedDocument) {
//             return (
//                 <div className="p-grid" style={{fontSize: '16px', textAlign: 'center', padding: '20px'}}>
//                     <div className="p-col-12" style={{textAlign: 'center'}}>
//                         <img src={'../../svg/DeniedDoc.svg'} alt={this.state.selectedDocument.Type} />
//                     </div>
                    
//                     <div className="p-col-4">DocId: </div>
//                     <div className="p-col-8">{this.state.selectedDocument.DocId}</div>

//                     <div className="p-col-4">DocName: </div>
//                     <div className="p-col-8">{this.state.selectedDocument.DocName}</div>
                        
//                     <div className="p-col-4">DocType: </div>
//                     <div className="p-col-8">{this.state.selectedDocument.DocType}</div>
                    
//                     <div className="p-col-4">LastAccessTS: </div>
//                     <div className="p-col-8">{this.state.selectedDocument.LastAccessTS}</div>
//                 </div>
//             );
//         }
//         else {
//             return null;
//         }
//     }

//     renderHeader() {
//         const sortOptions = [
//             {label: 'Hits', value: 'hits'},
//         ];

//         return (
//             <div className="p-grid">
//                 <div className="p-col-6" style={{textAlign: 'left'}}>
//                     <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} />
//                 </div>
//                 <div className="p-col-6" style={{textAlign: 'right'}}>
//                     <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
//                 </div>
//             </div>
//         );
//     }

//     render() {
//         const header = this.renderHeader();

//         return (
//             <div>
//                 <div className="content-section introduction">
//                     <div className="feature-intro">
//                         <h1>DataView</h1>
//                         <p>DataView displays data in grid or list layout with pagination, sorting and filtering features.</p>
//                     </div>
//                 </div>

//                 <div className="content-section implementation">
//                     <DataView value={this.props.documents} layout={this.state.layout} header={header} 
//                             itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={20} 
//                             sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                            

//                     <Dialog header="Document Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({visible: false})}>
//                         {this.renderDocumentDialogContent()}
//                     </Dialog>
//                 </div>

//                 {/* <DataViewDoc/> */}
//             </div>
//         );
//     }
// }
export default  UnitTestFilterByDocReport;