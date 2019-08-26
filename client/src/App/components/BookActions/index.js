import React, { Component } from 'react';
import { ButtonToolbar, Button,Container, Row } from 'reactstrap';

const containerStyle = { padding: '20px', justifyContent: 'center' };

class BookActions extends Component {
  render() {
    return (
      <Container className='clearfix text-center' style={containerStyle}>
        <Button
          className='mr-2'
          color='primary'
        >
          Add a book
        </Button>
        <Button
          className='mr-2'
          color='danger'
        >
          Delete all
        </Button>
      </Container>
    );
  }
}

export default BookActions;
