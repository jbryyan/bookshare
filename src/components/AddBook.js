import React, { Component } from 'react';
import { Card, Dimmer, Button, Image, Icon } from 'semantic-ui-react';

class AddBook extends Component {

  render(){
    let bookData = this.props.bookData;
    return(
      <Card.Group>
      { this.props.bookData && Object
        .keys(bookData)
        .map(key =>
          <Card className='MyProfile-card' key={key}>
            <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
              onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
            >
              <Dimmer active={this.props.active === key}>
                <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
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
                <Button className='MyProfile-cardButton' fluid onClick={() => this.props.addBook(bookData[key], key)}>
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
      
    )
  }
}

export default AddBook;


