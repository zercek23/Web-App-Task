import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main';

import CustomNavbar from './components/CustomNavbar';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <div className="App">
          <CustomNavbar />
          <Main />
        </div>
      </Container>

    )
  }
}

export default App;
