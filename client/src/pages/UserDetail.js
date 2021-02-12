import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import {
    Card, CardBody,
    CardTitle, CardSubtitle,
    ListGroup, ListGroupItem
} from 'reactstrap';
import '../css/UserDetail.css';

export default class UserDetail extends Component {
    state = {
        user: {},
        projects: []
    }

    async componentDidMount() {
        // Get one user with id
        await axios.get(`/api/users/${this.props.id}`).then((obj) => {
            this.setState({ user: obj.data });
        }).catch(err => console.log(err));

        // Get projects
        await axios.get('/api/projects').then((obj) => {
            this.setState({ projects: obj.data });
        }).catch(err => console.log(err));
    }

    render() {
        const { _id, name, lastName, email } = this.state.user;
        return (
            <div>
                <Row style={{ marginTop: '5%' }}>
                    <Col>
                        <Card>
                            <CardBody style={{ backgroundColor: '#bff9be' }}>
                                <Row style={{ borderBottom: '1px solid black', marginBottom: '5%' }}>
                                    <Col style={{ textAlign: 'center' }} tag="h3">User Information</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardSubtitle tag="h4" className="mb-2 text-muted">Name: </CardSubtitle>
                                    </Col>
                                    <Col>
                                        <CardTitle tag="h5">{name}</CardTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardSubtitle tag="h4" className="mb-2 text-muted">Last Name: </CardSubtitle>
                                    </Col>
                                    <Col>
                                        <CardTitle tag="h5">{lastName}</CardTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardSubtitle tag="h4" className="mb-2 text-muted">E-mail: </CardSubtitle>
                                    </Col>
                                    <Col>
                                        <CardTitle tag="h5">{email}</CardTitle>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <h3>Projects</h3>
                        <ListGroup>
                            {
                                this.state.projects.map((project) => {
                                    if (project.user === _id) {
                                        return <ListGroupItem key={project._id}>{project.title}</ListGroupItem>
                                    }
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>

            </div>
        )
    }
}
