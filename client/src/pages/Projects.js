import React, { Component } from 'react'
import { Button, Table } from 'reactstrap';
import '../css/Users.css';
import AddProjectModal from '../components/AddProjectModal';
import UpdateProjectModal from '../components/UpdateProjectModal';

import { connect } from 'react-redux';
import { getUsers } from '../actions/userActions';
import { getProjects, deleteProject } from '../actions/projectActions';
import PropTypes from 'prop-types';

class Projects extends Component {
    state = {
        projects: [],
        users: [],
        isLoaded: false
    }

    async componentDidMount() {
        // Get users
        this.props.getUsers();

        // Get projects
        this.props.getProjects();    
    }

    deleteProject = async (id) => {
        this.props.deleteProject(id);
    }

    render() {
        const { users } = this.props.user;
        const { projects } = this.props.project;
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
                            projects.map((project) => (
                                <tr key={project._id}>
                                    <td style={{ width: '20%' }}>{project.title}</td>
                                    <td style={{ width: '50%' }}>{project.content}</td>
                                    <td style={{ width: '20%' }}>
                                        {
                                            users.map((user) => {
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

    }
}

Projects.propTypes = {
    getUsers: PropTypes.func.isRequired,
    getProjects: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    project: state.project
});

export default connect(mapStateToProps, { getUsers, getProjects, deleteProject })(Projects);