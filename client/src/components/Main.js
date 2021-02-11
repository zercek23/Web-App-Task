import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Projects from '../pages/Projects';
import UserDetail from '../pages/UserDetail';
import Users from '../pages/Users';

class Main extends Component {
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
      <Switch>
        <Route exact path='/' component={Projects}></Route>
        <Route exact path='/users' component={Users}></Route>
        {
          this.state.users.map((user) => (
            <Route exact path={`/users/${user._id}`} component={() => <UserDetail id={user._id} />}></Route>
          ))
        }
        
      </Switch>
    )
  }
}

export default Main;
