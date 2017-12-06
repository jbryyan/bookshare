import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import  { Container, Image, Grid, 
          Input, Icon, Card, Dimmer,
          Button, 
        } from 'semantic-ui-react';

//Component declarations
import Navbar from './Navbar';
import ModalDetails from './ModalDetails';


class Browse extends Component {
  //Init state
  state = ({ active: false, open: false });
  
  //Functions used to show details button when hovering over book image.
  showDim = () => this.setState({ active: true });
  hideDim = () => this.setState({ active: false });
  
  //Functions used to show the modal, which shows the details of the book clicked.
  showModal =  () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false })
  
  
  render() {
    //Active state is used for the card image onHover state. On Hover (active), the view details button will appear.
    const { active } = this.state;
    //Open state is passed to ModalDetails component, used to open the modal when user clives on card image details button.
    const { open } = this.state
    //This is the card content whenever hovering over the card image. Shows a button which triggers a modal. (ModalDetails.js)
    const content = (
      <div>
        <Button inverted onClick={this.showModal} className="Browse-button-view">View Details</Button>
      </div>
    );
    //Used to pass navbar states across components
    const { state, username, loggedIn } = this.props.location;

    return (
      <div>
        <Navbar username={username} routerState={state} loggedIn={loggedIn} />
        <Grid.Row >
          <Grid.Column className="Browse-imageHeader" width={16}>
            {this.props.location.state}
          </Grid.Column>
        </Grid.Row>
        <div className="Browse-arrow-div"><div className="Browse-arrow-up"></div></div>
        
        {/* Container to keep cards bounded. Limiting width. */}
        <Container>
          <Grid>
            <Grid.Row centered>
              <Grid.Column className="Browse-input" width={6}>
                <Input fluid icon="search" transparent placeholder='Browse for a book...'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* Beginning of book cards. Grabbed from database. */}
          <Card.Group itemsPerRow={4}>
            <Card className="Browse-card">
              <Dimmer.Dimmable as={Image} dimmed={active} dimmer={{ active, content }} onMouseEnter={this.showDim}
                onMouseLeave={this.hideDim} size='medium' src={logo}
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
        {/* Modal popup with individual book details. */}
        <ModalDetails open={open} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default Browse;
