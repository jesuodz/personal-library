import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormGroupInput from '../../../FormGroupInput';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { addBook } from '../../../../actions';
import { connect } from 'react-redux';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      book_title: '',
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      errors: {}
    }));
  }
  
  handleChange = event => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = () => {
    this.props.addBook(this.state.book_title);
    this.toggle();
    this.setState({book_title: ''})
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors.title) {
      this.setState({modal: true, errors: newProps.errors})
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Button
          className='mr-2'
          color='primary'
          onClick={this.toggle}
        >
          New book
        </Button>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Add a new book</ModalHeader>
          <ModalBody>
            <FormGroupInput
              name='book_title'
              error={errors.title}
              onChange={this.handleChange}
              placeholder={'Book title'}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={this.handleSubmit}
            >
              Add book
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
};

AddBook.propTypes = {
  errors: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { addBook })(AddBook);