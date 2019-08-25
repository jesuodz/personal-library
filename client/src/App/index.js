import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardColumns } from 'reactstrap';
import { connect } from 'react-redux';
import { getBooks } from './actions';
import './index.css';

class App extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  render() {
    return (
      <div className="App">
        <h1 className='lead'>Welcome to PersonalLibrary!</h1>
      </div>
    );
  }
}

App.propTypes = {
  getBooks: PropTypes.func.isRequired
};

export default connect(null, { getBooks })(App);
