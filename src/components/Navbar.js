import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu, Input, Container } from 'semantic-ui-react'
import '../assets/css/Navbar.css';

import Request from 'superagent';

class Navbar extends Component {
  state = ({ activeItem: 'home', loggedIn: false, username: '' });
  
  componentDidMount(){
    if(this.props.routerState){
      this.setState({ activeItem: this.props.routerState, loggedIn: this.props.loggedIn });
      this.setState({ username: this.props.username });
    }
    
    //Check to see if a token is stored in local storage. If there is a token, athenticate.
    if(localStorage.getItem('BookToken') && !this.props.loggedIn){
      console.log('A token exists');
      let apiUrl = 'http://192.168.223.128:9000/api/authToken';
      Request.get(apiUrl)
      .set('Authorization', localStorage.getItem('BookToken'))
      .then((res, err) => {
        if(err) throw (err);
        console.log(res);
        let dbRes = JSON.parse(res.text);
        if (dbRes.success){
          this.setState({
            loggedIn: true,
            username: dbRes.username
          });
          if(this.props.updateUsername){
            this.props.updateUsername(this.state.username, dbRes.location);
          }
        } else{
          localStorage.removeItem('BookToken');
        }
      });

    }
    
  }
  
  render() {
    let { activeItem, loggedIn, username } = this.state;

    return (
      <Menu fixed='top' className='Navbar-menu'>
        <Container>
          <Menu.Item as={Link} to={{ pathname: '/', state: 'home', loggedIn: loggedIn, username: username  }} 
            header active={activeItem === 'home'}
          >
            BookShare
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/browse', state: 'browse', loggedIn: loggedIn, username: username }} 
            position='right' active={activeItem === 'browse'}> 
            Browse Books
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/about', state: 'about', loggedIn: loggedIn, username: username   }} 
            active={activeItem === 'about'}>
            About
          </Menu.Item>
          { !loggedIn && 
            <Menu.Item as={Link} to={{ pathname: '/login', state: 'login', loggedIn: loggedIn, username: username  }} 
              active={activeItem === 'login'}>
              Login
            </Menu.Item>
          }
          { !loggedIn && 
            <Menu.Item as={Link} to={{ pathname: '/signup', state: 'signup', loggedIn: loggedIn, username: username  }} 
              active={activeItem === 'signup'}>
              Signup
            </Menu.Item>
          }

          { loggedIn &&
            <Menu.Item as={Link} to={{ pathname: '/profile', state: 'My Profile', loggedIn: loggedIn, username: username }}
              active={activeItem === 'My Profile'}>
              My Profile
            </Menu.Item>
          }
          { loggedIn &&
            <Menu.Item> Logout </Menu.Item>
          }

        </Container>
      </Menu>
    );
  }
}

export default Navbar;