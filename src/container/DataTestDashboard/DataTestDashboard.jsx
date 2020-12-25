import React from 'react';
import {Button} from 'primereact/button';
import { dashboardService } from '../../_services';
import Dialog_BATData from './Dialog_BatData';
import ContainerActionDRMViewRequestFailed from './ContainerActionDRMViewRequestFailed'
import ContainerStateViolatePasswordAdmin from './ContainerStateViolatePasswordAdmin'
import ContainerStateViolatePasswordUser from './ContainerStateViolatePasswordUser'
import ContainerLinkSharePasswordViolated from './ContainerLinkSharePasswordViolated'
import Clock from '../Utilities/Timer'
// import UnitTestFilterByDoc from './UnitTestFilterByDoc'
import moment from 'moment';

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import './DataTestDashboard.scss'

class DataTestDashboard extends React.Component {
    
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
        this.state.myCurentEndDateTime = moment(this.state.endUTCTimeWithZ).format("MMMM Do YYYY, h:mm:ss a");
        this.state.myCurentStartDateTime = moment(this.state.startUTCTimeWithZ).format("MMMM Do YYYY, h:mm:ss a");
        console.log("Component did mount")
    }

    componentWillUnmount() {
        
    }

// ACTION_DRM_VIEW_REQUEST_FAILED	Drm View failed
// STATE_VIOLATE_PASS	Password violation - user login
// STATE_VIOLATE_PASS	Password violation - share login
// STATE_INCORCT_PASSWD	Share incorrect password - attempts exceeded

    render() {
        const { dashboardBAT_Data, dashboardBAT_Error, endUTCTimeWithZ, myCurentEndDateTime, startUTCTimeWithZ, myCurentStartDateTime } = this.state;
        const footer = (
            <div>
                {/* <Button label="Close" icon="pi pi-check" onClick={this.onHide} /> */}
            </div>
        );

        return (
            
            <div className="m-3">
                <div>
                    <h4>Welcome to the Dashboard Data Playground!</h4>
                    {dashboardBAT_Data === null &&
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">                                    
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>                                
                    }
                    {dashboardBAT_Error &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Oh snap!</strong> {dashboardBAT_Error}
                        </div>
                    }
                    {dashboardBAT_Data  &&
                        <div>
                            <div className="p-grid border border-secondary rounded m-1">
                                <div className="p-col-12 text-center"><h5>Date Range</h5></div>
                                <div className="p-col-12 p-md-6 p-lg-3"><b>Start in UTC: </b>{startUTCTimeWithZ}</div>
                                <div className="p-col-12 p-md-6 p-lg-3"><b>Start local time: </b>{myCurentStartDateTime}</div>
                                <div className="p-col-12 p-md-6 p-lg-3"><b>End in UTC: </b>{endUTCTimeWithZ}</div>
                                <div className="p-col-12 p-md-6 p-lg-3"><b>End local time: </b>{myCurentEndDateTime}</div>
                                <div className="p-col-12">
                                    <Dialog_BATData body="Success!" buttonText="Show BAT Data..." title="dashboardService.initializeDashboard - Test Success" 
                                    dashboardBAT_Data={dashboardBAT_Data.Failures}/> 
                                </div>
                            </div>
                            {/* <br></br>
                             <div class="p-grid">
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded hidden"><h5 className="text-center">Geo Fencing Violations</h5>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded hidden"><h5 className="text-center">Access Denied By User</h5>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded hidden"><h5 className="text-center">Access Denied By Document</h5>
                                    <Container_ByDoc />
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded hidden"><h5 className="text-center">Failed Authentication</h5>
                                </div>
                            </div> */}
                            <br></br>
                            <div class="p-grid">
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">DRM File View Failure</h5>
                                    <ContainerActionDRMViewRequestFailed/>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">User Password Violation</h5>
                                    <ContainerStateViolatePasswordUser/>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">Share Password Violation</h5>
                                    <ContainerStateViolatePasswordAdmin/>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">Incorrect Password Violation</h5>
                                    <ContainerLinkSharePasswordViolated/>
                                </div>
{/*                                 <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">ACCESS_FROM_MOBILE _VIOLATION</h5>
                                </div>
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">ACCESS_DOMAIN _VIOLATION</h5>
                                </div> */}
                                <div class="p-col-12 p-sm-6 p-xl-3 border border-secondary rounded"><h5 className="text-center">Clock</h5>
                                    <Clock />
                                </div>
                            </div>
                        </div>                 
                    }
                </div>
            </div>
        );
    }
}
export { DataTestDashboard }; 