import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';
import '../css/Users.css';

export default class UpdateProjectModal extends Component {
    state = {
        modal: false,
        getUsers: [],
        user: '',
        isUsersLoaded: false
    }

    async componentDidMount() {
        // Get Users
        await axios.get('/api/users').then((obj) => {
            this.setState({ getUsers: obj.data, isUsersLoaded: !this.state.isUsersLoaded });
        }).catch(err => console.log(err));
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

        // Put to Server
        await axios.put(`/api/projects/${this.props.id}`, newProject).catch(err => console.log(err));

        // Get data again and Update State
        await axios.get('/api/projects').then(obj => {
            this.props.setState({ projects: obj.data })
        }).catch(err => console.log(err));

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
                                !this.state.isUsersLoaded ? (<Spinner color="primary" />) :
                                    (
                                        <FormGroup>
                                            <Label for="exampleSelectMulti">Select Users</Label>
                                            <Input type="select" name="user" id="exampleSelectMulti" onChange={this.onChange}>
                                                <option key="0"></option>
                                                {
                                                    this.state.getUsers.map((user) => (
                                                        <option key={user._id} data-key={user._id}>{`${user.name} ${user.lastName}`}</option>
                                                    ))
                                                }
                                            </Input>
                                        </FormGroup>
                                    )
                            }
                            <Button color="primary" onClick={this.onSubmit}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

            </div>
        )
    }
}
