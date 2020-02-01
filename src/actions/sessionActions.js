import * as APIUtil from '../util/sessionApiUtil'
import jwtDecode from 'jwt-decode'

/**
 * action types
 */

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT'
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN'

/**
 * action creators
 */

/**
 * @param {Object} currentUser
 */
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
})

/**
 * Redirect to `Sign in` page
 */
const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
})

/**
 * @param {Array} errors
 */
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
})

const logoutUser = () => {
  return {
    type: RECEIVE_USER_LOGOUT,
  }
}

/**
 * @param {Object} user
 * @param {String} user.handle
 * @param {String} user.email
 * @param {String} user.password
 * @param {String} user.password2
 */
export const signup = user => dispatch =>
  APIUtil.signup(user)
    .then(() => {
      dispatch(receiveUserSignIn())
    })
    .catch(err => {
      dispatch(receiveErrors({ message: err }))
    })

/**
 * @param {Object} user
 * @param {String} user.email
 * @param {String} user.password
 */
export const login = user => dispatch =>
  APIUtil.login(user)
    .then(res => {
      const { token } = res.data.login
      localStorage.setItem('jwtToken', token)
      APIUtil.setAuthToken(token)
      const decoded = jwtDecode(token)
      dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(receiveErrors({ message: err }))
    })

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  APIUtil.setAuthToken(false)
  dispatch(logoutUser())
}
