import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signup } from '../../actions/sessionActions'
import TextField from '../TextField/TextField'

const SignupForm = ({ errors, history, signedId, signup }) => {
  console.log('TCL: SignupForm -> signedId', signedId)
  console.log('TCL: SignupForm -> errors', errors)
  const [email, setEmail] = useState('')
  const [handle, setHandle] = useState('')
  const [password, setPw] = useState('')
  const [password2, setPw2] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    signup({ email, handle, password, password2 })
  }

  useEffect(() => {
    if (signedId) history.push('/login')
  }, [signedId, history])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        handleChange={value => setEmail(value)}
        id="signupFormEmail"
        label="Email"
        type="email"
        value={email}
      />
      <TextField
        handleChange={value => setHandle(value)}
        id="signupFormHandle"
        label="Handle"
        type="handle"
        value={handle}
      />
      <TextField
        handleChange={value => setPw(value)}
        id="signupPw"
        label="Password"
        type="password"
        value={password}
      />
      <TextField
        handleChange={value => setPw2(value)}
        id="signupPw2"
        label="Repeat password"
        type="password"
        value={password2}
      />
      <button type="submit">Signup</button>
    </form>
  )
}

SignupForm.propTypes = {
  errors: PropTypes.object,
  history: PropTypes.object.isRequired,
  signedId: PropTypes.bool,
  signup: PropTypes.func.isRequired,
}

const mapStateToProps = ({ session, errors }) => {
  return {
    signedId: session.isSignIn,
    errors: errors.session,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signup: user => dispatch(signup(user)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SignupForm)
