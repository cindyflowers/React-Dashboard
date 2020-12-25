import React from 'react';
import moment from 'moment'
import {Button} from 'primereact/button'
import { dashboardService } from '../../_services';
import Donut_Admin from './Donut_Admin'
import ListStateViolatePasswordAdmin from './ListStateViolatePasswordAdmin'
import Dialog_ForReports from './Dialog_ForReports'
import {Menu} from 'primereact/menu';


import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './DataTestDashboard.scss'

class ContainerStateViolatePasswordAdmin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
             cars:  [
                {"brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff"},
                {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
                {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"}
            ],
            reportItems: [
                {
                    label: 'Reports',
                    items: [
                        {label: '24 Hours', icon: 'pi pi-fw pi-file', command:()=>{ this.toggleDialog_ForReports(24); }},
                        {label: '72 Hours', icon: 'pi pi-fw pi-file', command:()=>{ this.toggleDialog_ForReports(72); }},
                        {label: '1 Week', icon: 'pi pi-fw pi-file', command:()=>{ this.toggleDialog_ForReports(168) }},
                        {label: '1 Month', icon: 'pi pi-fw pi-file', command:()=>{ this.toggleDialog_ForReports(720) }},
                    ]
                }, 

            ],
            filterByAdmin_Data: null,
            filterByAdmin_Error: null,
            itemSelected: null,
            subscription: null,
            modal: false,
            hours: null,
            fade: false,
            data: this.data,
            viewType: "list"
        };
        this.toggleDialog_ForReports = this.toggleDialog_ForReports.bind(this)
    }
    
        // toggle() {
    //     this.setState({
    //         modal: !this.state.modal,
    //         fade: !this.state.fade
    //     });
    // }
    toggleDialog_ForReports(hours) {
        this.setState({ hours: hours,
                        modal: !this.state.modal,
                        fade: !this.state.fade});
    }

    
    componentDidMount() {
        const subscription = dashboardService.isDashboardBATDataReady.subscribe((ready) => {
            if (ready) this.updateData();
        });
        this.setState({subscription});
    }

    componentWillUnmount () {
        this.state.subscription.unsubscribe();
    }

    updateData() {
        dashboardService.filterByAdmin()
            .then(
                filterByAdmin_Data => {
                    this.setState({ filterByAdmin_Data });
                },
                filterByAdmin_Error => {
                    this.setState({ filterByAdmin_Error });
                }
            );
    }

    toggleView(event) {
        this.setState({viewType: event.currentTarget.id});
    }

    render() {
        const {filterByAdmin_Data, filterByAdmin_Error, modal, fade, viewType, data } = this.state;
        return (
            <div>
                {filterByAdmin_Data &&
                    <div>
                        <div className="p-grid p-dir-rev">
                           <div className="p-col-2">
                                <Button id="ListView" icon="pi pi-list"onClick={(event) => this.toggleView(event)}/>
                            </div>
                            <div className="p-col-2 ">
                                <Button id="DonutView" icon="pi pi-chart-bar" onClick={(event) => this.toggleView(event)}/>
                            </div>
                            <div className="p-col-8"> 
                                <Menu model={this.state.reportItems} popup={true} ref={el => this.menu = el}/>
                                <Button label="Show" icon="pi pi-bars" onClick={(event) => this.menu.toggle(event)}/>
                            </div>
                        </div>
                        <div>
                            {viewType  === 'ListView' &&
                                <ListStateViolatePasswordAdmin data={filterByAdmin_Data}></ListStateViolatePasswordAdmin>
                            }
                            {viewType  === 'DonutView' &&
                                <Donut_Admin data={filterByAdmin_Data}></Donut_Admin>
                            }
                        </div>
                    </div>
                }
                {modal === true &&
                    <div >
                        <div className="content-section implementation">
                            <Dialog_ForReports buttonText="Show past 24 hours" title="Access Denied by Admin - past 24 hours" 
                            modal={modal} fade={fade} toggle={this.toggleDialog_ForReports} type='ByDoc' documents={filterByAdmin_Data}  hours="24"/>
                        </div>
                    </div>
                }
                {filterByAdmin_Error &&
                    <div class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> {this.state.filterByDocument_Error}
                    </div>
                }
                {filterByAdmin_Data === null &&
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status">                                    
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>                                
                }                
            </div>
        );
    }
}
export default  ContainerStateViolatePasswordAdmin;