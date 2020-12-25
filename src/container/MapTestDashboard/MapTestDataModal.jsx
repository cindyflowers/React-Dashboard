/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { JsonToTable } from "react-json-to-table";


class MapTestDataModal extends React.Component {
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
                        {this.props.dashboardBAT_Data &&
                            <table>   
                                <tbody>   
                                    {this.props.dashboardBAT_Data.map(failure =>
                                        <tr><JsonToTable json={failure} /></tr>
                                    )}
                                </tbody> 
                            </table>   
                        }                                
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button onClick={this.toggle}>Do Something</Button>{' '} */}
                        <Button onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </span>
        );
    }
}
export default MapTestDataModal;