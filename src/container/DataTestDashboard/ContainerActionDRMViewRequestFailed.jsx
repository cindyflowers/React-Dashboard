import React from 'react';
import moment from 'moment'
import {Button} from 'primereact/button'
import { dashboardService } from '../../_services';
import DonutActionDRMViewRequestFailed from './DonutActionDRMViewRequestFailed'
import ListActionDRMViewRequestFailed from './ListActionDRMViewRequestFailed'
import DialogActionDRMViewRequestFailed from './DialogActionDRMViewRequestFailed'
import {Menu} from 'primereact/menu';


import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './DataTestDashboard.scss'

class ContainerActionDRMViewRequestFailed extends React.Component {
    
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
            filterByRequests_Data: null,
            filterByRequests_Error: null,
            itemSelected: null,
            subscription: null,
            modal: false,
            hours: null,
            fade: false,
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
        dashboardService.filterByRequest()
            .then(
                filterByRequest_Data => {
                    this.setState({ filterByRequest_Data });
                },
                filterByRequest_Error => {
                    this.setState({ filterByRequest_Error });
                }
            );
    }

    toggleView(event) {
        this.setState({viewType: event.currentTarget.id});
    }

    render() {
        const {filterByRequest_Data, filterByRequest_Error, modal, fade, viewType } = this.state;
        return (
            <div>
                {filterByRequest_Data &&
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
                                <ListActionDRMViewRequestFailed data={filterByRequest_Data}></ListActionDRMViewRequestFailed>
                            }
                            {viewType  === 'DonutView' &&
                                <DonutActionDRMViewRequestFailed data={filterByRequest_Data}></DonutActionDRMViewRequestFailed>
                            }
                        </div>
                    </div>
                }
                {modal === true &&
                    <div >
                        <div className="content-section implementation">
                            <DialogActionDRMViewRequestFailed buttonText="Show past 24 hours" title="DRM Request Failures - past 24 hours" 
                            modal={modal} fade={fade} toggle={this.toggleDialog_ForReports} type='ByDoc' documents={filterByRequest_Data}  hours="24"/>
                        </div>
                    </div>
                }
                {filterByRequest_Error &&
                    <div class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> {this.state.filterByRequest_Error}
                    </div>
                }
                {filterByRequest_Data === null &&
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
export default  ContainerActionDRMViewRequestFailed;