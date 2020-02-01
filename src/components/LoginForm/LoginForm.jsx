import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login } from '../../actions/sessionActions'
import TextField from '../TextField/TextField'

// https://testing-library.com/docs/example-react-router
// https://testing-library.com/docs/example-react-redux
const LoginForm = ({ errors, history, isAuthenticated, login }) => {
  console.log('TCL: LoginForm -> errors', errors)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    login({ email, password })
  }

  useEffect(() => {
    if (isAuthenticated) history.push('/tweets')
  }, [isAuthenticated, history])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        handleChange={value => setEmail(value)}
        id="loginFormEmail"
        label="Email"
        type="email"
        value={email}
      />
      <TextField
        handleChange={value => setPassword(value)}
        id="loginFormEmail"
        label="Password"
        type="password"
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired,
}

const mapStateToProps = ({ errors, isAuthenticated }) => {
  return {
    errors: errors.session,
    isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(LoginForm)
