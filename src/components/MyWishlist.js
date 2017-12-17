import React, { Component } from 'react';
import { Card, Dimmer, Button, Image, Icon } from 'semantic-ui-react';

class MyWishlist extends Component {

  render(){
    let bookWishlist = this.props.bookWishlist;
    return(
      <Card.Group>
        { bookWishlist && Object
          .keys(bookWishlist)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
                onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
              >
                <Dimmer active={this.props.active === key}>
                  <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
                </Dimmer>
                <div className='MyProfile-imageWrapper'>
                  { typeof(bookWishlist[key].bookData.imageLinks) != 'undefined' ?
                    <Image className='MyProfile-img' src={bookWishlist[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                    <div></div>
                  }
                </div>
              </Dimmer.Dimmable>
              <Card.Content>
                <Card.Header className='MyProfile-cardHeader'>{bookWishlist[key].bookData.title}</Card.Header>
                { typeof(bookWishlist[key].bookData.authors) != 'undefined' ? 
                  <Card.Meta className='MyProfile-cardHeader'>Author: {bookWishlist[key].bookData.authors[0] } </Card.Meta> : 
                  <Card.Meta>Author: </Card.Meta>  
                }
                <Card.Meta>Published: {bookWishlist[key].bookData.publishedDate}</Card.Meta>
                <Card.Meta>Pages: {bookWishlist[key].bookData.pageCount}</Card.Meta>
              </Card.Content>
              
              <Card.Content extra className='MyProfile-cardExtraContent'>
                <Button className='MyProfile-cardButton' fluid onClick={() => this.props.addBook(bookWishlist[key], key)}>
                  <Icon name='trash' />
                  Remove from list
                </Button> 
              </Card.Content>
              
            </Card>
          )
        }
      </Card.Group>
    )
  }
}

export default MyWishlist;


