import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import  { Container, Image, Grid, 
          Input, Icon, Card, Dimmer,
          Button, Statistic, Menu
        } from 'semantic-ui-react';

//Component declarations
import Navbar from './Navbar';



class MyProfile extends Component {
  
  state = ({ username: '', location: '' });
  
  updateUsername = (username, location) => this.setState({ username: username, location: location });

  componentDidMount(){
    if(this.props.location.username){
      this.setState({ username: this.props.location.username });
    }
  }

  render() {
    let { state, username, loggedIn } = this.props.location;
  
    return (
      <div>
        <Navbar username={username} routerState={state} loggedIn={loggedIn} updateUsername={this.updateUsername}/>
        <Grid>
        <Grid.Row >
          <Grid.Column className="Browse-imageHeader" width={16}>
            {this.props.location.state}
          </Grid.Column>
        </Grid.Row>
        </Grid>
        <div className="Browse-arrow-div"><div className="Browse-arrow-up"></div></div>
        <Container>
          <h1>My Profile</h1>
          <p>{this.state.username}</p>
          <p>{this.state.location}</p>
          <Menu secondary pointing>
            <Menu.Item active={true}>
              <Statistic size='mini'>
                <Statistic.Value><Icon name='add'/></Statistic.Value>
                <Statistic.Label>Add Book</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Item active={false}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Books Own</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Item active={false}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Wishlist</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Item active={false}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Required</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Item active={false}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Given</Statistic.Label>
              </Statistic>
            </Menu.Item>
            <Menu.Item active={false}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Received</Statistic.Label>
              </Statistic>
            </Menu.Item>
          </Menu>
        </Container>
      </div>
    );
  }
}

export default MyProfile;
