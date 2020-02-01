import {
  RECEIVE_USER_LOGOUT,
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
} from '../actions/sessionActions'

const initialState = {
  isAuthenticated: false,
  user: undefined,
  isSignIn: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser,
      }
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined,
      }
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      }
    default:
      return state
  }
}
