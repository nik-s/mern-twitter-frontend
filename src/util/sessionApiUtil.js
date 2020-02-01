import { client } from '../graphql/client'
import { gql } from 'apollo-boost'

/**
 * @param {String|false} token
 */
export const setAuthToken = token => {
  // if (token) {
  //   client.request = operation => {
  //     operation.setContext({
  //       headers: {
  //         authorization: token,
  //       },
  //     })
  //   }
  // } else {
  //   client.request = undefined // REVIEW
  // }
}

/**
 * @param {Object} userData
 * @param {String} userData.handle
 * @param {String} userData.email
 * @param {String} userData.password
 * @param {String} userData.password2
 */
export const signup = userData => {
  const { handle, email, password, password2 } = userData
  return client.mutate({
    mutation: gql`
      mutation(
        $handle: String!
        $email: String!
        $password: String!
        $password2: String!
      ) {
        register(
          handle: $handle
          email: $email
          password: $password
          password2: $password2
        ) {
          token
        }
      }
    `,
    variables: {
      handle,
      email,
      password,
      password2,
    },
  })
}

/**
 * @param {Object} userData
 * @param {String} userData.email
 * @param {String} userData.password
 */
export const login = userData => {
  const { email, password } = userData
  return client.mutate({
    mutation: gql`
      mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
        }
      }
    `,
    variables: {
      email,
      password,
    },
  })
}
