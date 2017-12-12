import React, { Component } from 'react';
import { Menu, Grid, Statistic, Icon, Dropdown } from 'semantic-ui-react';

class ProfileMenuMobile extends Component {

  state = ({ activeItem: 'Add' });

  handleChange = (e, { name }) => this.setState({ activeItem: name });

  render(){
    let { activeItem } = this.state; 

    return(
      <Menu secondary pointing>
        <Dropdown item color='red' text={activeItem} >
          <Dropdown.Menu>
            <Dropdown.Item active={activeItem === 'Add'} name='Add' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value><Icon name='add'/></Statistic.Value>
                <Statistic.Label>Add Book</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
            <Dropdown.Item active={activeItem === 'BooksOwn'} name='Books Own' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Books Own</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
            <Dropdown.Item active={activeItem === 'Wishlist'} name='Wishlist' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Wishlist</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
            <Dropdown.Item active={activeItem === 'Requests'} name='Requests' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Requests</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
            <Dropdown.Item active={activeItem === 'Given'} name='Given' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Given</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
            <Dropdown.Item active={activeItem === 'Received'} name='Received' onClick={this.handleChange}>
              <Statistic size='mini'>
                <Statistic.Value>0</Statistic.Value>
                <Statistic.Label>Received</Statistic.Label>
              </Statistic>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    )
  }
}

export default ProfileMenuMobile;
