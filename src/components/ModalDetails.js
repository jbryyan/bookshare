import React, { Component } from 'react';
import { Button, Modal, Image, Header } from 'semantic-ui-react';

class ModalDetails extends Component {
 

  render() {
    //const bookData = this.props.bookData.volumeInfo;
    //const index = this.props.index;
    let bookData = null;
    if(this.props.bookData){
      bookData = this.props.bookData.volumeInfo;
    }else if(this.props.booksOwn){
      bookData = this.props.booksOwn;
    }
    
    let author = '';
    if(typeof(bookData.authors) != 'undefined'){
      author = bookData.authors[0];
    }
    console.log(bookData.previewLink);
    return (
      <Modal dimmer={'blurring'} open={this.props.open} onClose={this.props.closeModal} closeIcon>
        <Modal.Header>{bookData.title}</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={bookData.imageLinks.thumbnail.replace('&zoom=1', '')} />
          <Modal.Description>
            <Header>{bookData.title}</Header>
            <p>{bookData.description}</p>
            <p>Author: {author}</p>
            <p>Published: {bookData.publishedDate}</p>
            <p>Pages: {bookData.pageCount}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' as='a' href={bookData.canonicalVolumeLink} target="_blank" >
            More Info
          </Button>
          <Button positive icon='checkmark' labelPosition='right' content="Add to my books" onClick={this.props.closeModal} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalDetails;
