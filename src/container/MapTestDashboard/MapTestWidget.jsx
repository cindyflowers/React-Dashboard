import React from 'react';
import { dashboardService } from '../../_services';
import moment from 'moment'

import './MapTestDashboard.css'

class MapTestWidget extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            filterByDocument_Data: null,
            filterByDocument_Error: null,
            itemSelected: null,
            subscription: null,
        };
        //this.doSomething = this.doSomething.bind(this);
    }
    
    //doSomething() {
        // const test = "do something";
        // this.setState((state) => ({ failuresByDoc: test}));
    //}

    
    componentDidMount() {
        const subscription = dashboardService.isDashboardBATDataReady.subscribe((ready) => {
            if (ready) this.updateAccessErrorByDocument();
        });
        this.setState({subscription});
    }

    componentWillUnmount () {
        this.state.subscription.unsubscribe();
    }

    updateAccessErrorByDocument() {
        dashboardService.filterByDocument()
            .then(
                filterByDocument_Data => {
                    this.setState({ filterByDocument_Data });
                },
                filterByDocument_Error => {
                    this.setState({ filterByDocument_Error });
                }
            );
    }

    fetchDocumentDetails = (e) => {
        var docId = e.currentTarget.getAttribute('docid');
        var itemSelected = this.state.filterByDocument_Data.filter(function(x) { return x.DocId == docId })
        this.setState({itemSelected});
        //alert (docMap2[0].DocName);        
    }

    renderResultRows(myFilterByDocument_Data) {
        return myFilterByDocument_Data.map((document, index) => {  // anon func maintains scope!
            // Pass in a function to our onClick, and make it anon
            // to maintain scope.  The function body can be anything
            // which will be executed on click only.  Our document value
            // is maintained via a closure so it works.
            return (
                <tr key={index} docid={document.DocId} onClick={this.fetchDocumentDetails}>
                <td>{document.DocName}</td>
                <td>{document.Hits}</td>
                </tr>
            ); 
        });// no need to bind with anon function
    }

    renderDetail(myItemSelected) {
        return myItemSelected.map((document, index) => {  // anon func maintains scope!
            // Pass in a function to our onClick, and make it anon
            // to maintain scope.  The function body can be anything
            // which will be executed on click only.  Our document value
            // is maintained via a closure so it works.
            return (
                <div class="border border-secondary rounded m-1">
                    <table class="table-bordered table-ellipsis ">
                        <tr><td>Type: {document.DocType}</td></tr>
                        <tr><td>Hits: {document.Hits}</td></tr>
                        <tr><td>Name: {document.DocName}</td></tr>
                        <tr><td>Owner: {document.Name.First} {document.Name.Last}</td></tr>
                        <tr><td>Date: {moment(document.LastAccessTS).format("dddd, MMMM Do YYYY, h:mm:ss a")}</td></tr>
                    </table>
                </div>
            );
        });
    }

    render() {
        const {filterByDocument_Data, filterByDocument_Error, itemSelected } = this.state;
        return (
            <div>
                {filterByDocument_Data &&
                    <div>
                        <p >Click on document for detail</p>
                        <table class="table-bordered table-ellipsis">  
                            <thead>
                                <tr class="text-center">
                                    <th>Document</th>
                                    <th>Hits</th>
                                </tr>
                            </thead>
                            <tbody class="small">
                                {this.renderResultRows(filterByDocument_Data)}  
                            </tbody> 
                        </table>  
                        
                    </div>
                }
                {itemSelected &&
                    <div>
                        
                        {this.renderDetail(itemSelected)}
                    </div>
                }
                {filterByDocument_Error &&
                    <div class="alert alert-danger" role="alert">
                        <strong>Oh snap!</strong> {this.state.filterByDocument_Error}
                    </div>
                }
                {filterByDocument_Data === null &&
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">                                    
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>                                
                }
            </div>
            // <div> 
            //     <Button onClick={this.doSomething}>Access Denied By Document</Button>
            //     <div>
            //         {failuresByDoc &&
            //             <p>{this.state.failuresByDoc}</p>
            //         }
            //     </div>
            // </div>
        );
    }
}
export default MapTestWidget;