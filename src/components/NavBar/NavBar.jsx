import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/sessionActions'
import { Link } from 'react-router-dom'

const NavBar = ({ loggedIn, logout }) => {
  return (
    <div>
      {loggedIn ? (
        <div>
          <Link to="/tweets">All Tweets</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/new-tweet">Write a Tweet</Link>
          <button type="button" onClick={() => logout()}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  )
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = ({ session }) => {
  return {
    loggedIn: session.isAuthenticated,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
