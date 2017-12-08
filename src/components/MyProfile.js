import React, { Component } from 'react';
import logo from '../logo.svg';
import '../assets/css/Browse.css';
import '../assets/css/MyProfile.css';

import  { Container, Image, Grid, 
          Input, Icon, Card, Dimmer,
          Button, Statistic, Menu, Form,
          Header, Message
        } from 'semantic-ui-react';

//Component declarations
import Navbar from './Navbar';
import ProfileMenu from './ProfileMenu';
import ProfileMenuMobile from './ProfileMenuMobile';
import ModalDetails from './ModalDetails';
import Request from 'superagent';

class MyProfile extends Component {
  
  state = ({ 
    username: '', location: '', active: '', index: null, errorMsg: false,
    open: false, showSearch: true, search: '', bookData: null, booksOwn: [],
    menu: 'Add'
  });
  
  updateUsername = (username, location) => this.setState({ username: username, location: location });
  
  handleChange = (value, name) => {
    this.setState({ showSearch: value });
    this.setState({ menu: name });
  };

  //Functions used to show details button when hovering over book image.
  showDim = (activeKey) => this.setState({ active: activeKey });
  hideDim = () => this.setState({ active: false});

  //Functions used to show the modal, which shows the details of the book clicked.
  showModal =  (key) => this.setState({ open: true, index: key });
  closeModal = (link) => {
    if(link) console.log('Open new tab');
    this.setState({ open: false, index: null });
  }
  //Updating search state
  handleSearchChange = (e, { value }) => this.setState({ search: value });

  //Function used to search google api for book 
  handleSearch = () => {
    const searchValue = this.state.search;
    let googleBooksApi = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=20`;
    let searchApi = 'http://192.168.223.128:9000/api/searchBook';
    
    Request.get(searchApi)
    .set('Authorization', localStorage.getItem('BookToken'))
    .query({ search: searchValue })
    .then((res, err) => {
      if (err) throw err;
      let dbRes = JSON.parse(res.text);
      if(dbRes.success){
        this.setState({ bookData: dbRes.bookData, errorMsg: false });
      }
    });
  }

  //Add book to user database
  addBook = (bookData, key) => {
    console.log(bookData)
    let apiUrl = 'http://192.168.223.128:9000/api/addBook';
    Request.post(apiUrl)
    .set('Authorization', localStorage.getItem('BookToken'))
    .send({ bookData: bookData })
    .then((res, err) => {
      if(err) throw (err);
      let dbResponse = JSON.parse(res.text);
      console.log(dbResponse);
      if(dbResponse.success){
        let newBookData = [...this.state.bookData];
        newBookData[key].userOwns = true;
        this.setState({ bookData: newBookData, booksOwn: dbResponse.message });
      }
      
    });
    
  }

  componentDidMount(){
    if(this.props.location.username){
      this.setState({ username: this.props.location.username });      
    }
    let booksOwnApi = 'http://192.168.223.128:9000/api/booksOwn';
    Request.get(booksOwnApi)
    .set('Authorization', localStorage.getItem('BookToken'))
    .then((res, err) => {
      if (err) throw err;
      let dbResponse = JSON.parse(res.text);
      console.log(dbResponse);
      if(dbResponse.success){
        this.setState({ booksOwn: dbResponse.message });
      }
    });
  }

  render() {
    let { state, username, loggedIn } = this.props.location;
    let { search, bookData, errorMsg, matched, menu, booksOwn } = this.state;
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
          <Grid>
            <Grid.Row columns={1} only='tablet computer'>
              <Grid.Column>
               <ProfileMenu handleChange={this.handleChange} booksOwn={booksOwn}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1} only='mobile'>
              <Grid.Column>
                <ProfileMenuMobile handleChange={this.handleChange} booksOwn={booksOwn}/>
              </Grid.Column>
            </Grid.Row>
            { this.state.showSearch &&
              <Grid.Row centered columns={1}>
                <Grid.Column>
                  <Form onSubmit={this.handleSearch} error={errorMsg}>
                    <Form.Input className="Browse-input" fluid icon="search" transparent placeholder='Search for a book...'
                      value={search} onChange={this.handleSearchChange} />
                    <Message error content='Book does not exist in the google books api database.'/>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            }
          </Grid>
          {/* Beginning of book cards. Grabbed from database. */}
          { menu ==='Add' && <Card.Group>
            { bookData && Object
              .keys(bookData)
              .map(key =>
                <Card className='MyProfile-card' key={key}>
                  <Dimmer.Dimmable height={10} as={Image} dimmed={active === key} onMouseEnter={() => this.showDim(key)} onMouseLeave={this.hideDim}>
                    <Dimmer active={active === key}>
                      <Button inverted onClick={() => this.showModal(key)} className="Browse-button-view">View Details</Button>
                    </Dimmer>
                    <div className='MyProfile-imageWrapper'>
                      { typeof(bookData[key].volumeInfo.imageLinks) != 'undefined' ?
                        <Image className='MyProfile-img' src={bookData[key].volumeInfo.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                        <div></div>
                      }
                    </div>
                  </Dimmer.Dimmable>
                  <Card.Content>
                    <Card.Header className='MyProfile-cardHeader'>{bookData[key].volumeInfo.title}</Card.Header>
                    { typeof(bookData[key].volumeInfo.authors) != 'undefined' ? 
                      <Card.Meta className='MyProfile-cardHeader'>Author: {bookData[key].volumeInfo.authors[0] } </Card.Meta> : 
                      <Card.Meta>Author: </Card.Meta>  
                    }
                    <Card.Meta>Published: {bookData[key].volumeInfo.publishedDate}</Card.Meta>
                    <Card.Meta>Pages: {bookData[key].volumeInfo.pageCount}</Card.Meta>
                  </Card.Content>
                  
                  <Card.Content extra className='MyProfile-cardExtraContent'>
                    { !bookData[key].userOwns ?
                      <Button className='MyProfile-cardButton' fluid onClick={() => this.addBook(bookData[key], key)}>
                        <Icon name='add' />
                        Add to my books
                      </Button> :
                      <Button className='MyProfile-cardButtonOwn' fluid><Icon name='check'/>Book already owned</Button>
                    }
                  </Card.Content>
                  
                </Card>
              )
            }
          </Card.Group>
          }
          { menu ==='BooksOwn' && <Card.Group>
          { booksOwn && Object
            .keys(booksOwn)
            .map(key =>
              <Card className='MyProfile-card' key={key}>
                <Dimmer.Dimmable height={10} as={Image} dimmed={active === key} onMouseEnter={() => this.showDim(key)} onMouseLeave={this.hideDim}>
                  <Dimmer active={active === key}>
                    <Button inverted onClick={() => this.showModal(key)} className="Browse-button-view">View Details</Button>
                  </Dimmer>
                  <div className='MyProfile-imageWrapper'>
                    { typeof(booksOwn[key].bookData.imageLinks) != 'undefined' ?
                      <Image className='MyProfile-img' src={booksOwn[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                      <div></div>
                    }
                  </div>
                </Dimmer.Dimmable>
                <Card.Content>
                  <Card.Header className='MyProfile-cardHeader'>{booksOwn[key].bookData.title}</Card.Header>
                  { typeof(booksOwn[key].bookData.authors) != 'undefined' ? 
                    <Card.Meta className='MyProfile-cardHeader'>Author: {booksOwn[key].bookData.authors[0] } </Card.Meta> : 
                    <Card.Meta>Author: </Card.Meta>  
                  }
                  <Card.Meta>Published: {booksOwn[key].bookData.publishedDate}</Card.Meta>
                  <Card.Meta>Pages: {booksOwn[key].bookData.pageCount}</Card.Meta>
                </Card.Content>
                
                <Card.Content extra className='MyProfile-cardExtraContent'>
                  <Button className='MyProfile-cardButton' fluid onClick={() => this.addBook(booksOwn[key], key)}>
                    <Icon name='trash' />
                    Remove from list
                  </Button> 
                </Card.Content>
                
              </Card>
            )
          }
        </Card.Group>
        }
        </Container>
        { this.state.bookData && this.state.index &&
          <ModalDetails open={open} closeModal={this.closeModal} bookData={this.state.bookData[this.state.index]} />
        }
      </div>
    );
  }
}

export default MyProfile;
