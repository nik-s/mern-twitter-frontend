import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import TextField from '../TextField/TextField'

export const TWEET_COMPOSE = gql`
  mutation($userId: ID!, $text: String!) {
    composeTweet(userId: $userId, text: $text) {
      id
      text
      date
    }
  }
`

function validateTweet(str) {
  return str.length > 0 && str.length <= 140
}

const TweetCompose = ({ user }) => {
  const [text, setText] = useState('')
  const [isValid, handleValidation] = useState(null)
  const { id } = user
  const [tweetCompose, { loading, error, data }] = useMutation(TWEET_COMPOSE, {
    variables: {
      userId: id,
      text,
    },
    context: {
      headers: {
        authorization: localStorage.getItem('jwtToken'),
      },
    },
  })
  return (
    <form
      data-testid="form"
      onSubmit={e => {
        e.preventDefault()

        const valid = validateTweet(text)
        handleValidation(valid)

        if (valid) {
          tweetCompose()
            // Add catch method so tests work properly
            .catch(() => {})
        }
      }}
    >
      <div data-testid="title">TweetCompose</div>
      {loading && <p data-testid="loading">Loading...</p>}
      {error && <p data-testid="error">Error :(</p>}
      {data && data.composeTweet && (
        <div>
          <div>New tweet published:</div>
          <div data-testid="composed-tweet">{data.composeTweet.text}</div>
          <div>{data.composeTweet.date}</div>
        </div>
      )}
      <TextField
        errorMessage={isValid === false ? 'Check the correct tweet length' : ''}
        handleChange={value => setText(value)}
        handleValidation={value => {
          const valid = validateTweet(value)
          handleValidation(valid)
        }}
        id="tweetText"
        label="Write a new tweet"
        showLength={true}
        type="textarea"
        value={text}
      />
      <button type="submit">
        <span>Tweet</span>
      </button>
    </form>
  )
}

TweetCompose.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
  }
}

export default connect(mapStateToProps)(TweetCompose)
