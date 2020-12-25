import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import UnitTestFilterByDocReport from './UnitTestFilterByDocReport';

class UnitTestFilterByDocDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: props.buttonText,
            title: props.title,
            body: props.body,
            modal: false,
            fade: false,
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade
        });
    }

    render() {
        return (
            <span>
                <Button onClick={this.toggle}>{this.state.buttonText}</Button>
                <Modal isOpen={this.state.modal} fade={this.state.fade }  toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>  
                        <h4>{this.state.body}</h4>
                        <UnitTestFilterByDocReport documents={this.props.documents}/>                              
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}
    // constructor(props) {
    //     super(props);
    //     this.state = {visible: false};
    //     this.onClick = this.onClick.bind(this);
    //     this.onHide = this.onHide.bind(this);
    // }

    // componentDidMount() {
    //     //this.setState({documents: this.props.filterByDocument_Data});
    // }

    // onClick() {
    //     this.setState({visible: true});
    // }

    // onHide() {
    //     this.setState({visible: false});
    // }

    // render() {
    //     const footer = (
    //         <div>
    //             <Button label="Close" icon="pi pi-times" onClick={this.onHide} />
    //         </div>
    //     );

    //     return (
    //         <div>
    //             <div className="content-section introduction">
    //                 <div className="feature-intro">
    //                     <hr></hr>
    //                     <h5>Show Document Details:</h5>
    //                     <p>Show access denied by document report.</p>
    //                 </div>
    //             </div>

    //             <div className="content-section implementation">
    //                 <Dialog header="Show Past 24 Hours" visible={this.state.visible} style={{width: '50vw'}} footer={footer} onHide={this.onHide} maximizable>
    //                     <UnitTestFilterByDocReport documents={this.props.documents}/>
    //                 </Dialog>

    //                 <Button label={this.props.buttonlabel} icon="pi pi-external-link" onClick={this.onClick} />
    //             </div>
    //         </div>
    //     )
    // }

export default UnitTestFilterByDocDialog ; 