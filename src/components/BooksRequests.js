import React, { Component } from 'react';
import { Card, Dimmer, Button, 
        Image, Icon, Container,
        Grid
      } from 'semantic-ui-react';
import '../assets/css/BookRequests.css';
import Request from 'superagent';
class BooksRequests extends Component {

  acceptReq = (bookData, key) => {
    console.log('In Accept Req');
    console.log(bookData);
    console.log(key);
    let apiUrl = 'http://192.168.223.128:9000/api/acceptReq';
  
    Request.post(apiUrl)
    .set('Authorization', localStorage.getItem('BookToken'))
    .send({ bookData: bookData })
    .then((res, err) => {
      if(err) throw (err);
      let dbResponse = JSON.parse(res.text);
      console.log(dbResponse);
      if(dbResponse.success){
        this.props.updateState(dbResponse.message);
      }
    });
    
  }

  render(){
    let bookReq = this.props.bookReq;
    return(
      <Card.Group>
        { bookReq && Object
          .keys(bookReq)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
                onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
              >
                <Dimmer active={this.props.active === key}>
                  <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
                </Dimmer>
                <div className='MyProfile-imageWrapper'>
                  { typeof(bookReq[key].bookData.imageLinks) != 'undefined' ?
                    <Image className='MyProfile-img' src={bookReq[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                    <div></div>
                  }
                </div>
              </Dimmer.Dimmable>
              <Card.Content>
                <Card.Header className='MyProfile-cardHeader'>{bookReq[key].bookData.title}</Card.Header>
                { typeof(bookReq[key].bookData.authors) != 'undefined' ? 
                  <Card.Meta className='MyProfile-cardHeader'>Author: {bookReq[key].bookData.authors[0] } </Card.Meta> : 
                  <Card.Meta>Author: </Card.Meta>  
                }
                <Card.Meta>Published: {bookReq[key].bookData.publishedDate}</Card.Meta>
                <Card.Meta>Pages: {bookReq[key].bookData.pageCount}</Card.Meta>
              </Card.Content>
              
              <Card.Content extra className='MyProfile-cardExtraContent'>
                <Grid columns='equal'>
                  <Grid.Column className='BookReq-gridColLeft'>
                    <Button className='BookReq-cardBtnL' fluid onClick={() => this.acceptReq(bookReq[key], key)}>
                      Accept
                    </Button>
                  </Grid.Column>
                  <Grid.Column className='BookReq-gridColRight'> 
                    <Button className='BookReq-cardBtnR' fluid onClick={() => this.denyReq(bookReq[key], key)}>
                      Deny
                    </Button>  
                  </Grid.Column>
                </Grid>
              </Card.Content>
              
            </Card>
          )
        }
      </Card.Group>
    )
  }
}

export default BooksRequests;


