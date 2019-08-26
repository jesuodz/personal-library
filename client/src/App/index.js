import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks } from './actions';
import { Container, Row, Col } from 'reactstrap';
import BookList from './components/BookList';
import BookActions from './components/BookActions';

import './index.css';

class App extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    return (
      <div className='App'>
        <Container>
          <Row>
            <Col md='12'>
              <h1 className='lead'>Welcome to PersonalLibrary!</h1>
              <BookActions />
            </Col>
            <Col md='12'>
              <BookList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

App.propTypes = {
  getBooks: PropTypes.func.isRequired
};

export default connect(null, { getBooks })(App);
