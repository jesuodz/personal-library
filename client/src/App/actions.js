import axios from 'axios';
import { GET_BOOKS, DELETE_BOOK } from './types';

export const getBooks = () => dispatch => {
  axios
    .get('/api/books')
    .then(res => 
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(err => console.log(err.response.data));
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
} 
