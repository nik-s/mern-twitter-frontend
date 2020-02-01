import axios from 'axios'

export const getTweets = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/tweets`)
}

/**
 * @param {String} id - User id
 */
export const getUserTweets = id => {
  return axios.get(`${process.env.REACT_APP_API_URL}/api/tweets/user/${id}`)
}

/**
 * @param {Object} data
 */
export const writeTweet = data => {
  return axios.post('/api/tweets/', data)
}
