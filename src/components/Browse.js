import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import  { Container, Image, Grid, 
          Input, Icon, Card, Dimmer,
          Button, Header, Segment
        } from 'semantic-ui-react';

//Component declarations
import Navbar from './Navbar';
import ModalDetails from './ModalDetails';
import Request from 'superagent';

class Browse extends Component {
  //Init state
  state = ({ active: false, open: false, activeTest: '', bookData: null, index: null, loggedIn: false });
  
  //Functions used to show details button when hovering over book image.
  showDim = (activeKey) => this.setState({ active: activeKey });
  hideDim = () => this.setState({ active: false });
  
  //Functions used to show the modal, which shows the details of the book clicked.
  showModal =  (key) => this.setState({ open: true, index: key });
  closeModal = (link) => {
    if(link) console.log('Open new tab');
    this.setState({ open: false, index: null });
  }
  componentWillMount(){
    console.log('Component did update');
    let apiUrl = 'http://192.168.223.128:9000/api/browseBooks';
    Request.get(apiUrl)
    .set('Authorization', localStorage.getItem('BookToken'))
    .then((res, err) => {
      if(err) throw (err);
      let dbResponse = JSON.parse(res.text);
      this.setState({ bookData: dbResponse.message });
    });
  }

  componentDidMount(){
    let apiUrl = 'http://192.168.223.128:9000/api/tokenAuth';
    if(this.props.loggedIn){
      this.setState({ loggedIn: true });
    }
    if(localStorage.getItem('BookToken') && !this.props.loggedIn){
      Request.get(apiUrl)
      .set('Authorization', localStorage.getItem('BookToken'))
      .then((res, err) => {
        if(err) throw (err);
        console.log(res);
        let dbRes = JSON.parse(res.text);
        console.log(dbRes);
        if (dbRes.success){
          this.setState({ loggedIn: true });
        }
      });
    };
    
  }

  addWishlist = (bookData, index) => {
    console.log(bookData);
    let apiUrl = 'http://192.168.223.128:9000/api/addWishlist';
    
    Request.post(apiUrl)
    .set('Authorization', localStorage.getItem('BookToken'))
    .send({ data: bookData })
    .then((res, err) => {
      if(err) throw (err);
      console.log(res);
      let dbRes = JSON.parse(res.text);
      if(dbRes.success){
        let updatedBookData = [...this.state.bookData];
        updatedBookData[index] = dbRes.message
        this.setState({ bookData: updatedBookData });
      }
    });
    
  }
  render() {
    //Active state is used for the card image onHover state. On Hover (active), the view details button will appear.
    const { active } = this.state;
    const { bookData } = this.state;
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
        <Container algined='center'>
          <Grid>
            <Grid.Row centered>
              <Grid.Column className="Browse-input" width={6}>
                <Input fluid icon="search" transparent placeholder='Browse for a book...'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* Beginning of book cards. Grabbed from database. */}
        <Card.Group>
        { bookData === null ? <Icon name='trash'/> : <div></div> }
        {bookData && Object
          .keys(bookData)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={active === key} 
                onMouseEnter={() => this.showDim(key)} onMouseLeave={this.hideDim}
              >
                <Dimmer active={active === key}>
                  <Button inverted onClick={() => this.showModal(key)} className="Browse-button-view">View Details</Button>
                </Dimmer>
                <div className='MyProfile-imageWrapper'>
                  { typeof(bookData[key].bookData.imageLinks) != 'undefined' ?
                    <Image className='MyProfile-img' src={bookData[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                    <div></div>
                  }
                </div>
              </Dimmer.Dimmable>
              <Card.Content>
                <Card.Header className='MyProfile-cardHeader'>{bookData[key].bookData.title}</Card.Header>
                { typeof(bookData[key].bookData.authors) != 'undefined' ? 
                  <Card.Meta className='MyProfile-cardHeader'>Author: {bookData[key].bookData.authors[0] } </Card.Meta> : 
                  <Card.Meta>Author: </Card.Meta>  
                }
                <Card.Meta>Published: {bookData[key].bookData.publishedDate}</Card.Meta>
                <Card.Meta>Pages: {bookData[key].bookData.pageCount}</Card.Meta>
              </Card.Content>
              
              <Card.Content extra className='MyProfile-cardExtraContent'>
                { this.state.loggedIn ? 
                  ( this.state.bookData[key].userInWishlist ?
                    <Button className='MyProfile-cardButton' fluid onClick={() => this.addWishlist(bookData[key])}>
                      <Icon name='heart' />
                      In my Wishlist
                    </Button> 
                    : <Button className='MyProfile-cardButton' fluid onClick={() => this.addWishlist(bookData[key], key)}>
                        <Icon name='heart' />
                        Add to Wishlist
                      </Button>
                  )
                  :
                  <Button className='MyProfile-cardButton' fluid><Icon name='check'/>Login & Add to Wishlist</Button>
                }
              </Card.Content>
              
            </Card>
          )
        }
      </Card.Group>
        </Container>
       
        {/* Modal popup with individual book details. */}
        { this.state.bookData && this.state.index &&
          <ModalDetails open={open} closeModal={this.closeModal} bookData={this.state.bookData[this.state.index]}/> 
        }
       
      </div>
    );
  }
}

export default Browse;
