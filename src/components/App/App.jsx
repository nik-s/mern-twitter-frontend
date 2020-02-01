import React from 'react'
import { Switch } from 'react-router-dom'
import AuthRoute from '../AuthRoute/AuthRoute'
import MainPage from '../MainPage/MainPage'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'
import NavBar from '../NavBar/NavBar'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Tweets from '../Tweets/Tweets'
import Profile from '../Profile/Profile'
import TweetCompose from '../TweetCompose/TweetCompose'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/tweets" component={Tweets} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/new-tweet" component={TweetCompose} />
      </Switch>
    </>
  )
}

export default App
