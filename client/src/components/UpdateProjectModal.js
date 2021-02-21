import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import '../css/Users.css';

import { connect } from 'react-redux';
import { updateProject } from '../actions/projectActions';
import { getUsers } from '../actions/userActions';
import PropTypes from 'prop-types';

class UpdateProjectModal extends Component {
    state = {
        modal: false,
        user: '',
    }

    componentDidMount() {
        // Get Users
        this.props.getUsers();
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const newProject = {
            title: this.state.title,
            content: this.state.content,
            user: this.state.user
        }

        this.props.updateProject(this.props.id, newProject);

        // Toggle
        this.toggle();
    }

    onChange = (e) => {
        if (e.target.name === "user") {
            const selectedIndex = e.target.options.selectedIndex;
            this.setState({ [e.target.name]: e.target.options[selectedIndex].getAttribute('data-key') });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    render() {
        const { users } = this.props.user;
        return (
            <div>
                <Button className="customBtn" color="warning" style={{ marginLeft: 10 }} onClick={this.toggle}>+</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Update User</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleName">Title</Label>
                                <Input type="text" name="title" id="examplaTitle" placeholder="Enter Title" onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleLastName">Content</Label>
                                <Input type="textarea" name="content" id="exampleContent" placeholder="Enter Content" onChange={this.onChange} />
                            </FormGroup>
                            {
                                <FormGroup>
                                    <Label for="exampleSelectMulti">Select Users</Label>
                                    <Input type="select" name="user" id="exampleSelectMulti" onChange={this.onChange}>
                                        <option key="0"></option>
                                        {
                                            users.map((user) => (
                                                <option key={user._id} data-key={user._id}>{`${user.name} ${user.lastName}`}</option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                            }
                            <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}

UpdateProjectModal.propTypes = {
    getUsers: PropTypes.func.isRequired,
    updateProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    project: state.project
});

export default connect(mapStateToProps, { updateProject, getUsers })(UpdateProjectModal);