import React, { Component } from 'react';
import { Card, Dimmer, Button, Image, Icon } from 'semantic-ui-react';

class BooksReceived extends Component {

  render(){
    let booksReceived = this.props.booksReceived;
    
    return(
      <Card.Group>
        { booksReceived && Object
          .keys(booksReceived)
          .map(key =>
            <Card className='MyProfile-card' key={key}>
              <Dimmer.Dimmable height={10} as={Image} dimmed={this.props.active === key} 
                onMouseEnter={() => this.props.showDim(key)} onMouseLeave={this.props.hideDim}
              >
                <Dimmer active={this.props.active === key}>
                  <Button inverted onClick={() => this.props.showModal(key)} className="Browse-button-view">View Details</Button>
                </Dimmer>
                <div className='MyProfile-imageWrapper'>
                  { typeof(booksReceived[key].bookData.imageLinks) != 'undefined' ?
                    <Image className='MyProfile-img' src={booksReceived[key].bookData.imageLinks.thumbnail.replace('&zoom=1', '')} /> :
                    <div></div>
                  }
                </div>
              </Dimmer.Dimmable>
              <Card.Content>
                <Card.Header className='MyProfile-cardHeader'>{booksReceived[key].bookData.title}</Card.Header>
                { typeof(booksReceived[key].bookData.authors) != 'undefined' ? 
                  <Card.Meta className='MyProfile-cardHeader'>Author: {booksReceived[key].bookData.authors[0] } </Card.Meta> : 
                  <Card.Meta>Author: </Card.Meta>  
                }
                <Card.Meta>Published: {booksReceived[key].bookData.publishedDate}</Card.Meta>
                <Card.Meta>Pages: {booksReceived[key].bookData.pageCount}</Card.Meta>
              </Card.Content>
            </Card>
          )
        }
      </Card.Group>
    )
  }
}

export default BooksReceived;


