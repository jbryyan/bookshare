import React, { Component } from 'react';
import '../assets/css/About.css';
import { Grid, Container } from 'semantic-ui-react'
import Navbar from './Navbar';

class About extends Component {

  render() {
    const fccLink = 'https://www.freecodecamp.org/challenges/manage-a-book-trading-club';
    const { state, username, loggedIn } = this.props.location;
  
    return (    
      <div>
        <Navbar username={username} routerState={state} loggedIn={loggedIn}/>
        <Grid.Row >
          <Grid.Column className="About-imageHeader" width={16}>
            {this.props.location.state}
          </Grid.Column>
        </Grid.Row>
        <div className="About-arrow-div"><div className="About-arrow-up"></div></div>
        <Container>
          <h1>About BookShare</h1>
          <h2>Project Purpose</h2>
          <p>
            This is a freeCodeCamp full-stack project: <a href={fccLink}>"Manage a Book Trading Club | Free Code Camp"</a><br/><br/>
            The project fullfills the following user stories:
          </p>
          <ul>
            <li>I can view all books posted by every user.</li>
            <li>I can add a new book.</li>
            <li>I can update my settings to store my full name, city, and state.</li>
            <li>I can propose a trade and wait for the other user to accept the trade.</li>
          </ul>
          <h2>Frontend Tech Stack and UI Lib</h2>
          <h2>Backend Tech Stack</h2>
          <h2>External API</h2>
        </Container>
      </div>
    );
  }
}

export default About;
