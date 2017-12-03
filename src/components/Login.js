import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import { Button } from 'semantic-ui-react'
import Navbar from './Navbar';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <Navbar routerState={this.props.location.state}/>
      </div>
    );
  }
}

export default Login;
