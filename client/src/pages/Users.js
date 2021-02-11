import React, { Component } from 'react'
import axios from 'axios';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.get('/api/users').then((obj) => {
            console.log(obj);
            this.setState({ users: obj.data });
        })
    }

    render() {
        return (
            <div>
                <ListGroup>
                    {
                        this.state.users.map((user) => (
                            <ListGroupItem key={user._id}>{user.name}</ListGroupItem>
                        ))
                    }
                </ListGroup>

            </div>
        )
    }
}
