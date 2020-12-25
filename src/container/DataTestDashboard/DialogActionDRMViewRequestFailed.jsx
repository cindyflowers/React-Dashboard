import React, {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ReportActionDRMViewRequestFailed from './ReportActionDRMViewRequestFailed';

class DialogDRMViewRequestFailed extends Component {
    constructor(props) {
        super();
        this.state = {
            buttonText: props.buttonText,
            title: props.title,
            body: props.body,
            modal: props.modal,
            fade: props.fade,
            toggle: props.toggle,
            //hours: props.hours,
            type: props.type,
            documents: props.documents
        };
    }
    

    render() {
        return (
            <span>
                <Modal isOpen={this.state.modal} fade={this.state.fade }  toggle={this.state.toggle}>
                    <ModalHeader toggle={this.state.toggle}>{this.state.title}</ModalHeader>
                    <ModalBody>  
                        <h4>{this.state.body}</h4>
                        {this.state.type === 'ByDoc' &&
                            <ReportActionDRMViewRequestFailed data={this.state.data}/>   
                        }                           
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.state.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}

export default DialogDRMViewRequestFailed; 