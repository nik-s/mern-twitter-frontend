import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

const AuthRoute = ({ component: Component, path, loggedIn, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={props =>
        !loggedIn ? <Component {...props} /> : <Redirect to="/tweets" />
      }
    />
  )
}

AuthRoute.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  exact: PropTypes.bool,
}

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.isAuthenticated,
  }
}

export default compose(connect(mapStateToProps), withRouter)(AuthRoute)
