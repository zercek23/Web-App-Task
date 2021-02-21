import React, { Component } from 'react'
import { Button, Table } from 'reactstrap';
import '../css/Users.css';
import AddUserModal from '../components/AddUserModal';
import UpdateUserModal from '../components/UpdateUserModal';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../actions/userActions';
import PropTypes from 'prop-types';

class Users extends Component {
    state = {
    }

    async componentDidMount() {

        this.props.getUsers();
        // await axios.get('/api/users').then((obj) => {
        //     this.setState({ users: obj.data, isLoaded: !this.state.isLoaded });
        // }).catch(err => console.log(err));
    }

    deleteUser = async (id) => {
        //Delete with action
        this.props.deleteUser(id);
    }

    render() {
        const { users, loading } = this.props.user;
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
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <UpdateUserModal id={user._id} />
                                    </td>
                                    <td>
                                        <Button className="customBtn" color="danger" onClick={() => this.deleteUser(user._id)}>X</Button>
                                    </td>
                                    <td>
                                        <Link to={`/users/${user._id}`} style={{ color: 'white', textDecoration: 'none' }} >
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
                <AddUserModal />
            </div>
        )

    }
}

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);