import { GET_BOOKS, DELETE_BOOK } from "./types";

const initialState = {
  books: [],
  book: {},
  errors: {}
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
    default:
      return state;
  }
}
