import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Projects from '../pages/Projects';
import Users from '../pages/Users';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Projects}></Route>
      <Route exact path='/users' component={Users}></Route>
    </Switch>
  );
}

export default Main;