import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import { Grid } from 'semantic-ui-react';
import Navbar from './Navbar';

class Homepage extends Component {

  render() {
    const { state, username, loggedIn } = this.props.location;

    return (
      <div>
        <Navbar username={username} routerState={state} loggedIn={loggedIn} />
        <Grid>
          <Grid.Row>
            <Grid.Column className='semantiCol' floated='right' width={3} textAlign='left'>
              Search and add books you want to give away.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className='semantiCol' width={5} textAlign='left'>
              Share books to you and to others. <br/>
              Connect to people with the same passion. 
            </Grid.Column>
            <Grid.Column className='semantiCol' floated='right' width={3} textAlign='left'>
              Receive requests from others for your books.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className='semantiCol' floated='right' width={3} textAlign='left'>
              Mail your books and receive points.
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className='semantiCol' floated='right' width={3} textAlign='left'>
              Ask for books from others with your points.
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Homepage;
