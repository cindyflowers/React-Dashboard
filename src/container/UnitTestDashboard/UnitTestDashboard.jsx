import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import { dashboardService } from '../../_services';
import UnitTestModal from './UnitTestModal';
import UnitTestFilterByDoc from './UnitTestFilterByDoc'
import UnitTestFilterByDocReport from './UnitTestFilterByDocReport'
import moment from 'moment';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './UnitTestDashboard.scss'

class UnitTestDashboard extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            dashboardBAT_Data: null,
            dashboardBAT_Error: null,
            startUTCTimeWithZ: "2019-10-09T20:00:00.000Z",
            endUTCTimeWithZ: "2019-09-08T20:00:00.000Z",  // past 30 days of data
            myCurentEndDateTime: null,
            myCurentStartDateTime: null,
            myBATDataSubscription: null,
        };
    }

    componentDidMount() {
        dashboardService.initializeDashboard(this.state.startUTCTimeWithZ, this.state.endUTCTimeWithZ)
            .then (dashboardBAT_Data => {
                    this.setState({ dashboardBAT_Data });
            })
            .catch(error => {
                this.setState({dashboardBAT_Error: error});
            });
        this.state.myCurentEndDateTime = moment(this.state.endUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
        this.state.myCurentStartDateTime = moment(this.state.startUTCTimeWithZ).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }

    componentWillUnmount() {
        
    }

    render() {
        const { dashboardBAT_Data, dashboardBAT_Error, endUTCTimeWithZ, myCurentEndDateTime, startUTCTimeWithZ, myCurentStartDateTime } = this.state;
        const footer = (
            <div>
                <Button label="Close" icon="pi pi-check" onClick={this.onHide} />
            </div>
        );
        return (
            
            <div class="m-3">
                <div class row>
                    <h4>Welcome to the Dashboard Playground!</h4>
                    {dashboardBAT_Data === null &&
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">                                    
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>                                
                    }
                    <p>
                        {dashboardBAT_Error &&
                            <div class="alert alert-danger" role="alert">
                                <strong>Oh snap!</strong> {dashboardBAT_Error}
                            </div>
                        }
                    </p> 
                    {dashboardBAT_Data  &&
                        <div>
                            <p>
                                Start Date in UTC: <b>{startUTCTimeWithZ}</b> <br></br>
                                Start Date your time: <b>{myCurentStartDateTime}</b><br></br>
                                End Date in UTC: <b>{endUTCTimeWithZ}</b> <br></br>
                                End Date your time: <b>{myCurentEndDateTime}</b> 
                            </p>

                            <div>
                                <UnitTestModal body="Success!" buttonText="Show dashboardBAT_Data..." title="dashboardService.initializeDashboard - Test Success" 
                                    dashboardBAT_Data={dashboardBAT_Data.Failures}/>
                            </div>

 
                            <div class="row">
                                <div class="col-md border border-secondary rounded m-1">
                                    <p class="text-center"><strong>Geo Fencing Violations</strong></p>
                                </div>
                                <div class="col-md border border-secondary rounded m-1">
                                    <p class="text-center"><strong>Access Denied By User</strong></p>
                                    {/* <UnitTestFilterByDocReport /> */}
                                </div>
                                <div class="col-md border border-secondary rounded m-1">
                                    <p class="text-center"><strong>Access Denied By Document</strong></p>
                                    <UnitTestFilterByDoc />
                                </div>
                                <div class="col-md border border-secondary rounded m-1">
                                    <p class="text-center"><strong>Failed Authentication</strong></p>
                                </div>
                            </div>
                        </div>                 
                    }
                </div>

            </div>
        );
    }
}
export { UnitTestDashboard }; 