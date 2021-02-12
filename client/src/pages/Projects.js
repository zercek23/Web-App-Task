import React, { Component } from 'react'
import axios from 'axios';
import { Button, Spinner, Table } from 'reactstrap';
import '../css/Users.css';
import AddProjectModal from '../components/AddProjectModal';
import UpdateProjectModal from '../components/UpdateProjectModal';

export default class Projects extends Component {
    state = {
        projects: [],
        users: [],
        isLoaded: false
    }

    async componentDidMount() {
        // Get users
        await axios.get('/api/users').then((obj) => {
            this.setState({ users: obj.data });
        }).catch(err => console.log(err));

        // Get projects
        await axios.get('/api/projects').then((obj) => {
            this.setState({ projects: obj.data, isLoaded: !this.state.isLoaded });
        }).catch(err => console.log(err));        
    }

    deleteProject = async (id) => {
        //Delete in State
        this.setState(state => ({
            projects: state.projects.filter(user => user._id !== id)
        }));
        // Delete in Server
        await axios.delete(`/api/projects/${id}`).catch(err => console.log(err));
    }

    render() {
        let i = 0;
        if (this.state.isLoaded) {
            return (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>Project Title</th>
                                <th>Content</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.projects.map((project) => (
                                    <tr key={project._id}>
                                        <td style={{ width: '20%' }}>{project.title}</td>
                                        <td style={{ width: '50%' }}>{project.content}</td>
                                        <td style={{ width: '20%' }}>
                                            {
                                                this.state.users.map((user) => {
                                                    if (user._id === project.user) {
                                                        return `${user.name} ${user.lastName}`
                                                    }
                                                })
                                            }
                                        </td>
                                        <td style={{ width: '5%' }}>
                                            <UpdateProjectModal id={project._id} setState={(arrowfunc) => this.setState(arrowfunc)} />
                                        </td>
                                        <td style={{ width: '5%' }}>
                                            <Button className="customBtn" color="danger" onClick={() => this.deleteProject(project._id)}>X</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <AddProjectModal setState={(arrowfunc) => this.setState(arrowfunc)} />
                </div>
            )
        } else {
            return (<Spinner color="primary" />)
        }

    }
}
