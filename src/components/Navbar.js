import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Menu, Input, Container } from 'semantic-ui-react'
import '../assets/css/Navbar.css';
class Navbar extends Component {
  constructor(){
    super();
   
    this.state = { activeItem: 'home' };
  }

  componentDidMount(){
    if(this.props.routerState){
      this.setState({ activeItem: this.props.routerState });
    }
  }
  
  render() {
    let activeItem = this.state.activeItem;

    return (
      <Menu className='Navbar-menu'>
        <Container>
          <Menu.Item as={Link} to={{ pathname: '/', state: 'home' }} header active={activeItem === 'home'}>
            BookShare
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/browse', state: 'browse' }} position='right' active={activeItem === 'browse'}> 
            Browse Books
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/about', state: 'about' }} active={activeItem === 'about'}>
            About
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/login', state: 'login' }} active={activeItem === 'login'}>
            Login
          </Menu.Item>
          <Menu.Item as={Link} to={{ pathname: '/signup', state: 'signup' }} active={activeItem === 'signup'}>
            Signup
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Navbar;