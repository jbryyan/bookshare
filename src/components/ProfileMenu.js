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
    const { myBookData } = this.props;
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
            <Statistic.Value>{myBookData ? myBookData[0].books.length : 0 }</Statistic.Value>
            <Statistic.Label>Books Own</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Wishlist'} name='Wishlist' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>{myBookData ? myBookData[1].wishlist.length : 0 }</Statistic.Value>
            <Statistic.Label>Wishlist</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Requests'} name='Requests' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>{myBookData ? myBookData[2].requests.length : 0 }</Statistic.Value>
            <Statistic.Label>Requests</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Given'} name='Given' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>{myBookData ? myBookData[3].given.length : 0 }</Statistic.Value>
            <Statistic.Label>Given</Statistic.Label>
          </Statistic>
        </Menu.Item>
        <Menu.Item active={activeItem === 'Received'} name='Received' onClick={this.handleChange}>
          <Statistic size='mini'>
            <Statistic.Value>{myBookData ? myBookData[4].received.length : 0 }</Statistic.Value>
            <Statistic.Label>Received</Statistic.Label>
          </Statistic>
        </Menu.Item>
      </Menu>
    )
  }
}

export default ProfileMenu;
