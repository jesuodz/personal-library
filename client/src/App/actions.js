import axios from 'axios';
import { GET_BOOKS } from './types';

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
