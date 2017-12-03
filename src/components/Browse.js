import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import  { Container, Image, Grid, 
          Input, Icon, Card, Dimmer,
          Header, Button, Transition
        } from 'semantic-ui-react';

import Navbar from './Navbar';
import bookImage from '../assets/images/books.jpg';

class Browse extends Component {

  constructor(){
    super();
    this.state = {
      cardSelected: false,
      active: false,
      visible: false
    };
  }
  handleShow = () => this.setState({ active: true })

  handleHide = () => this.setState({ active: false })

  handleRaisedShow = () => this.setState({ cardSelected: true })
  handleRaisedHide = () => this.setState({ cardSelected: false })

  render() {
    let cardSelected = this.state.cardSelected;
    const { active, visible } = this.state;
    const content = (
      <div>
        <Header as='h2' inverted>Title</Header>

        <Button primary>Add</Button>
        <Button>View</Button>
      </div>
    );

    return (
      <div className="App">
        <Navbar routerState={this.props.location.state}/>
        <Grid.Row >
          <Grid.Column className="Browse-imageHeader" width={16}>
            {this.props.location.state}
          </Grid.Column>
        </Grid.Row>
        <div className="Browse-arrow-div"><div className="Browse-arrow-up"></div></div>
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column className="Browse-input" width={6}>
                <Input fluid icon="search" transparent placeholder='Browse for a book...'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Transition visible={visible} animation='scale' duration={500}>
          <Image size='small' src={logo} />
          </Transition>
          <Card.Group itemsPerRow={4}>
            <Card className="Browse-card" raised={this.state.cardSelected}>
              <Dimmer.Dimmable as={Image} dimmed={active} dimmer={{ active, content }} onMouseEnter={this.handleShow}
                onMouseLeave={this.handleHide} size='medium' src={logo}
              />
              <Card.Content>
                <Card.Header>Daniel</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  10 Friends
                </a>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default Browse;
