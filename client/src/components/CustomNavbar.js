import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

export default class CustomNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink  href="/" >
                  Projects
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink  href="/users">
                  Users
                </NavLink>
              </NavItem>
            </Nav>
            <NavbarText>Web App Task</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
