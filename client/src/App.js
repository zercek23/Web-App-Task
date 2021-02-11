import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main';

import CustomNavbar from './components/CustomNavbar';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (

      <div className="App">
        <CustomNavbar />
        <Container>
          <Main />
        </Container>
      </div>


    )
  }
}

export default App;
