import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, CardSubtitle,
  CardColumns, Button, CardTitle } from 'reactstrap';
import { deleteBook } from '../../actions';

import './index.css';

class BookList extends Component {

  onDeleteClick = id => {
    this.props.deleteBook(id);
  }

  render() {
    const books = this.props.books;

    return (
      <CardColumns>
        {
          books.map((book, index) => (
            <Card key={index}>
              <CardBody className='text-left'>
                <CardTitle>{book.title}</CardTitle>
                <CardSubtitle>
                  {book.commentcount} comments
                </CardSubtitle>
              </CardBody>
              <CardFooter>
                <Button
                  className='mr-2'
                  size='md'
                  color='info'
                >
                  More
                </Button>
                <Button
                  className='mr-2'
                  size='md'
                  color='danger'
                  onClick={this.onDeleteClick.bind(this, book._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        }
      </CardColumns>
    );
  }
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  deleteBook: PropTypes.func.isRequired
};

BookList.defaultProps = {
  books: []
};

const mapStateToProps = state => ({
  books: state.books
});

export default connect(mapStateToProps, { deleteBook })(BookList);
