import { GET_BOOKS, DELETE_BOOK, DELETE_ALL } from "./types";

const initialState = {
  books: [],
  book: {},
  errors: {},
  msg: ''
};

export default (state = initialState, action) => {
  switch(action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload
      }
    case DELETE_BOOK:
      return {
        ...state,
        book: action.payload
      }
    case DELETE_ALL:
      return {
        ...state,
        msg: action.payload
      }
    default:
      return state;
  }
}
