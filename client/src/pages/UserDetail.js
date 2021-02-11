import React, { Component } from 'react'
import axios from 'axios';
import { Row, Col } from 'reactstrap';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import '../css/UserDetail.css';

export default class UserDetail extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        axios.get(`/api/users/${this.props.id}`).then((obj) => {
            this.setState({ user: obj.data });
            console.log(this.state.user)
        })
    }

    render() {
        const { projects, name, lastName, email } = this.state.user;
        return (
            <div>
                <Row style={{marginTop:'5%'}}>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row style={{borderBottom:'1px solid black', marginBottom:'5%'}}>
                                    <Col style={{textAlign: 'center'}} tag="h3">User Information</Col>
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
                        Projects
                    </Col>
                </Row>

            </div>
        )
    }
}
