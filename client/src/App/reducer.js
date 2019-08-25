import { GET_BOOKS } from "./types";

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
    default:
      return state;
  }
}
