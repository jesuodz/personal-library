import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks } from './actions';
import BookList from './components/BookList';

import './index.css';

class App extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    return (
      <div className='App container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='lead'>Welcome to PersonalLibrary!</h1>
            <BookList />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  getBooks: PropTypes.func.isRequired
};

export default connect(null, { getBooks })(App);
