import axios from 'axios';
import {
  GET_BOOKS,
  DELETE_BOOK,
  DELETE_ALL,
  GET_ERRORS,
  ADD_BOOK
} from './types';

export const getBooks = () => dispatch => {
  axios
    .get('/api/books')
    .then(res => 
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const deleteBook = id => dispatch => {
  axios
    .delete(`/api/books/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_BOOK,
        payload: res.data
      });
      dispatch(getBooks());
    })
    .catch(err => console.log(err.response.data));
};

export const deleteAll = () => dispatch => {
  if (window.confirm('Are you sure you want to delete all books?')) {
    axios
      .delete('/api/books')
      .then(res => {
        dispatch({
          type: DELETE_ALL,
          payload: res.data
        });
        dispatch(getBooks());
      })
      .catch(err => console.log(err));
  }
};

export const addBook = title => dispatch => {
  console.log(title);
  axios
    .post('/api/books', {title: title})
    .then(res => {
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      });
      dispatch(getBooks());
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}
