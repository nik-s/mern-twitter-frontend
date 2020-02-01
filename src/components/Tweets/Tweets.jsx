import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const TWEETS_QUERY = gql`
  query {
    tweets(first: 20, sort: { field: "date", order: "DESC" }) {
      id
      text
      date
      user {
        id
        handle
      }
    }
  }
`

const Tweets = () => {
  const { loading, error, data } = useQuery(TWEETS_QUERY)

  if (loading) return <p data-testid="loading">Loading...</p>
  if (error) return <p data-testid="error">Error :(</p>

  return (
    <div>
      <div data-testid="title">All Tweets</div>
      {data &&
        data.tweets &&
        data.tweets.length > 0 &&
        data.tweets.map(({ id, text, date, user }) => {
          const { handle } = user
          return (
            <div key={id} data-testid="tweet">
              <div>{text}</div>
              <div>{date}</div>
              <div>{handle}</div>
            </div>
          )
        })}
    </div>
  )
}

export default Tweets
