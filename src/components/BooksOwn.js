import React, { Component } from 'react';
import { Card, Dimmer, Button, Image, Icon } from 'semantic-ui-react';

class BooksOwn extends Component {

  render(){
    let booksOwn = this.props.booksOwn;
    return(
      <Card.Group>
        { booksOwn && Object
          .keys(booksOwn)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
                onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
              >
                <Dimmer active={this.props.active === key}>
                  <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
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
                <Button className='MyProfile-cardButton' fluid onClick={() => this.props.addBook(booksOwn[key], key)}>
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

export default BooksOwn;


