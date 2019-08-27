import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteAll } from '../../actions';

const containerStyle = { padding: '20px', justifyContent: 'center' };

class BookActions extends Component {

  onDeleteClick = () => {
    if (this.props.totalBooks) {
      this.props.deleteAll();
    } else {
      console.log('Sorry, there\'re no books stored')
    }
  }

  render() {
    return (
      <Container style={containerStyle}>
        <Button
          className='mr-2'
          color='primary'
        >
          Add a book
        </Button>
        <Button
          className='mr-2'
          color='danger'
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete all
        </Button>
      </Container>
    );
  }
}

BookActions.propTypes = {
  deleteAll: PropTypes.func.isRequired,
  // totalBooks: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  totalBooks: state.books.length
});

export default connect(mapStateToProps, { deleteAll })(BookActions);
