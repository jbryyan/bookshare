import React, { Component } from 'react';
import { Card, Dimmer, Button, 
        Image, Icon, Container,
        Grid
      } from 'semantic-ui-react';
import '../assets/css/BookRequests.css';


class BooksGiven extends Component {

  render(){
    let booksGiven= this.props.booksGiven;
    return(
      <Card.Group>
        { booksGiven && Object
          .keys(booksGiven)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
                onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
              >
                <Dimmer active={this.props.active === key}>
                  <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
                </Dimmer>
                <div className='MyProfile-imageWrapper'>
                  { typeof(booksGiven[key].bookData.imageLinks) != 'undefined' ?
                    <Image className='MyProfile-img' src={booksGiven[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                    <div></div>
                  }
                </div>
              </Dimmer.Dimmable>
              <Card.Content>
                <Card.Header className='MyProfile-cardHeader'>{booksGiven[key].bookData.title}</Card.Header>
                { typeof(booksGiven[key].bookData.authors) != 'undefined' ? 
                  <Card.Meta className='MyProfile-cardHeader'>Author: {booksGiven[key].bookData.authors[0] } </Card.Meta> : 
                  <Card.Meta>Author: </Card.Meta>  
                }
                <Card.Meta>Published: {booksGiven[key].bookData.publishedDate}</Card.Meta>
                <Card.Meta>Pages: {booksGiven[key].bookData.pageCount}</Card.Meta>
              </Card.Content>
              
              
              
            </Card>
          )
        }
      </Card.Group>
    )
  }
}

export default BooksGiven;


