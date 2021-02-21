import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Users.css';

import { connect } from 'react-redux';
import { updateUser } from '../actions/userActions';
import PropTypes from 'prop-types';

class UpdateUserModal extends Component {
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
        this.props.updateUser(this.props.id, newUser);

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

UpdateUserModal.propTypes = {
    updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { updateUser })(UpdateUserModal);