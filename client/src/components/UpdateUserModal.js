import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import '../css/Users.css';

export default class UpdateUserModal extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            lastName: this.state.lastName,
            email: this.state.email
        }

        // Put to Server
        await axios.put(`/api/users/${this.props.id}`, newUser).catch(err => console.log(err));

        // Get data again
        await axios.get('/api/users').then(obj => {
            this.props.setState({ users: obj.data })
        }).catch(err => console.log(err));

        // Toggle
        this.toggle();
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Button className="customBtn" color="warning" style={{ marginLeft: 10 }} onClick={this.toggle}>+</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update User</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleName">Name</Label>
                                <Input type="text" name="name" id="exampleName" placeholder="Enter Name" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleLastName">Last Name</Label>
                                <Input type="text" name="lastName" id="exampleLastName" placeholder="Enter Last Name" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">E-mail</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Enter E-mail" onChange={this.onChange} />
                            </FormGroup>
                            <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}
