import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const TWEETS_QUERY = gql`
  query($userId: String!) {
    tweets(filter: { field: "userId", eq: $userId }) {
      id
      text
      date
    }
  }
`

const Profile = ({ user }) => {
  const { id } = user
  console.log('TCL: Profile -> user', user)
  const { loading, error, data } = useQuery(TWEETS_QUERY, {
    variables: {
      userId: id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <div>Profile</div>
      {data &&
        data.tweets &&
        data.tweets.length > 0 &&
        data.tweets.map(({ id, text, date }) => (
          <div key={id}>
            <div>{text}</div>
            <div>{date}</div>
          </div>
        ))}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
  }
}

export default connect(mapStateToProps)(Profile)
