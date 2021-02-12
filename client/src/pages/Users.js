import React, { Component } from 'react'
import axios from 'axios';
import { Button, Spinner, Table } from 'reactstrap';
import '../css/Users.css';
import AddUserModal from '../components/AddUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import { Link } from 'react-router-dom';

export default class Users extends Component {
    state = {
        users: [],
        isLoaded: false
    }

    async componentDidMount() {
        await axios.get('/api/users').then((obj) => {
            this.setState({ users: obj.data, isLoaded: !this.state.isLoaded });
        }).catch(err => console.log(err));
    }

    deleteUser = async (id) => {
        // Delete in Server
        await axios.delete(`/api/users/${id}`).catch(err => console.log(err));

        //Delete in State
        this.setState(state => ({
            users: state.users.filter(user => user._id !== id)
        }));
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <UpdateUserModal id={user._id} setState={(arrowfunc) => this.setState(arrowfunc)} ></UpdateUserModal>
                                        </td>
                                        <td>
                                            <Button className="customBtn" color="danger" onClick={() => this.deleteUser(user._id)}>X</Button>
                                        </td>
                                        <td>
                                            <Link to={'/users/' + user._id} style={{ color: 'white', textDecoration: 'none' }} >
                                                <Button color="dark">
                                                    Details
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <AddUserModal setState={(arrowfunc) => this.setState(arrowfunc)} />
                </div>
            )
        } else {
            return (<Spinner color="primary" />)
        }

    }
}
