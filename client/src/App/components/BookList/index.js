import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, CardSubtitle,
  CardColumns, Button, CardTitle, Container, Row, Col } from 'reactstrap';
import { deleteBook } from '../../actions';

import './index.css';

class BookList extends Component {

  onDeleteClick = id => {
    this.props.deleteBook(id);
  }

  render() {
    const books = this.props.books;
    const errors = this.props.errors;

    let dashboardContent;

    if (!this.props.errors.nobooks) {
      dashboardContent = (
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
    } else {
      dashboardContent = (
        <div>
          <p className='lead text-muted'>Currently there're no books stored. Add one!</p>
        </div>
      );
    }

    return (
      <div className='dashboard'>
        <Container>
          <Row>
            <Col md='12'>
              {dashboardContent}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired
};

BookList.defaultProps = {
  books: []
};

const mapStateToProps = state => ({
  books: state.books,
  errors: state.errors
});

export default connect(mapStateToProps, { deleteBook })(BookList);
