import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import { Button, Container, Grid, Form } from 'semantic-ui-react'
import Navbar from './Navbar';
import Request from 'superagent';

import  { Redirect } from 'react-router-dom'

class Login extends Component {
  state = { name: '', pwd: '', submittedName: '', submittedPwd: '', login: false }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, pwd } = this.state

    this.setState({ submittedName: name, submittedPwd: pwd });
    let apiUrl = 'http://192.168.223.128:9000/api/authenticate';
    Request.post(apiUrl)
    .send({ username: name, password: pwd })
    .then((res, err) => {
      if(err) throw (err);
      console.log(res);
      let dbRes = JSON.parse(res.text);
      if(dbRes.success){
        localStorage.setItem("BookToken", dbRes.message);
        this.setState({ login: true });
      }
    });
  }
  
  updateLogin = () => {
    this.setState({ login: true });
  }
  

  render() {
    const { name, pwd, submittedName, submittedpwd, login} = this.state
    const { state, username, loggedIn } = this.props.location;
    return (
      <div>
        { login && <Redirect to='/profile'/> }
        <Navbar username={username} routerState={state} loggedIn={loggedIn} updateLogin={this.updateLogin} />
        <Grid.Row >
          <Grid.Column className="Browse-imageHeader" width={16}>
            {this.props.location.state}
          </Grid.Column>
        </Grid.Row>
        <div className="Browse-arrow-div"><div className="Browse-arrow-up"></div></div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column width={9}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input icon='user' iconPosition='left' placeholder='Your username' name='name' 
                      value={name} onChange={this.handleChange} 
                    />
                    <Form.Input icon='lock' iconPosition='left' placeholder='Your password' name='pwd' type='password'
                      value={pwd} onChange={this.handleChange} 
                    />
                    <Form.Button primary fluid content='Login' />
                  </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Login;
