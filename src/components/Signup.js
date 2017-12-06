import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import { Button, Container, Grid, Form, Message } from 'semantic-ui-react'
import Navbar from './Navbar';
import Request from 'superagent';

class Signup extends Component {
  state = { name: '', pwd: '', city: '', submittedCity: '', submittedName: '', submittedPwd: '' }
  
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, pwd, city } = this.state

    this.setState({ submittedName: name, submittedPwd: pwd, submittedCity: city })
    let apiUrl = 'http://192.168.223.128:9000/api/register';
    Request.post(apiUrl)
    .send({ username: name, password: pwd, location: city })
    .then((res, err) => {
      if(err) throw (err);
      console.log(res);
    });
  }

  render() {
    const { name, pwd, city } = this.state;
    const { state, username, loggedIn } = this.props.location;

    return (
      <div>
        <Navbar routerState={state} loggedIn={loggedIn}/>
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
                      value={name} onChange={this.handleChange} required 
                    />
                    <Message warning content='You can only sign up for an account once with a given e-mail address.'/>
                    <Form.Input icon='lock' iconPosition='left' placeholder='Your password' name='pwd' 
                      value={pwd} onChange={this.handleChange} required
                    />
                    <Form.Input icon='marker' iconPosition='left' placeholder='Your location as City, State' name='city' 
                      value={city} onChange={this.handleChange} required
                    />
                    <Form.Button primary fluid content='Signup' />
                  </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Signup;
