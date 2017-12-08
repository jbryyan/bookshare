import React, { Component } from 'react';
import { Menu, Grid, Statistic, Icon } from 'semantic-ui-react';

class ProfileMenu extends Component {

  state = ({ activeItem: 'Add' });

  handleChange = (e, { name }) => { 
    this.setState({ activeItem: name },
      () => {
        if(this.state.activeItem === 'Add') {
          this.props.search;
          this.props.handleChange(true, name);
        }else{
          this.props.handleChange(false, name);
        } 
      }
    );
  }
  render(){
    const { activeItem } = this.state;

    return(
      <Menu secondary pointing>
        <Menu.Item active={activeItem === 'Add'} name='Add' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value><Icon name='add'/></Statistic.Value>
            <Statistic.Label>Add Book</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'BooksOwn'} name='BooksOwn' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>{this.props.booksOwn.length}</Statistic.Value>
            <Statistic.Label>Books Own</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Wishlist'} name='Wishlist' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>0</Statistic.Value>
            <Statistic.Label>Wishlist</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Required'} name='Required' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>0</Statistic.Value>
            <Statistic.Label>Required</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Given'} name='Given' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>0</Statistic.Value>
            <Statistic.Label>Given</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Received'} name='Received' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>0</Statistic.Value>
            <Statistic.Label>Received</Statistic.Label>
          </Statistic>
        </Menu.Item>
      </Menu>
    )
  }
}

export default ProfileMenu;
