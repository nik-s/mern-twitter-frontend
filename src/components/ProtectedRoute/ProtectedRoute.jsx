import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.any.isRequired,
}

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.isAuthenticated,
  }
}

export default compose(connect(mapStateToProps), withRouter)(ProtectedRoute)
