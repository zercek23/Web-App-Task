import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main';

import CustomNavbar from './components/CustomNavbar';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CustomNavbar />
          <Container>
            <Main />
          </Container>
        </div>
      </Provider>
    )
  }
}

export default App;
