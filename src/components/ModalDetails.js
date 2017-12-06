import React, { Component } from 'react';
import { Button, Modal, Image, Header } from 'semantic-ui-react';

class ModalDetails extends Component {
 

  render() {

    return (
      <Modal dimmer={'blurring'} open={this.props.open} onClose={this.props.closeModal}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={this.props.closeModal}>
            Nope
          </Button>
          <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.props.closeModal} />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalDetails;
