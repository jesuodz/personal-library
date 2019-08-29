import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteAll } from '../../actions';

const containerStyle = { padding: '20px', justifyContent: 'center' };

class BookActions extends Component {

  onDeleteClick = () => {
    this.props.deleteAll();
  }

  render() {
    const errors = this.props.errors;

    let deleteButton;

    if (!errors.nobooks) {
      deleteButton = (
        <Button
          className='mr-2'
          color='danger'
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete all
        </Button>
      );
    }
    
    return (
      <Container style={containerStyle}>
        <Button
          className='mr-2'
          color='primary'
        >
          Add a book
        </Button>
        {deleteButton}
      </Container>
    );
  }
};

BookActions.propTypes = {
  deleteAll: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { deleteAll })(BookActions);
