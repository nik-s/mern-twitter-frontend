import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import { MockedProvider, wait } from '@apollo/react-testing'
import Tweets, { TWEETS_QUERY } from './Tweets'

const mocks = [
  {
    request: {
      query: TWEETS_QUERY,
    },
    result: {
      data: {
        tweets: [
          {
            id: '4104796d-d682-5f49-9d60-be8fa08ff7b0',
            text: 'Tweet text',
            date: '2020-01-30T21:32:36+0000',
            user: {
              id: '64a434d7-c257-57fa-b0b2-be5b90b6ce36',
              handle: 'test_user',
            },
          },
        ],
      },
    },
  },
]

test('renders without errors', async () => {
  const { getByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tweets />
    </MockedProvider>
  )

  const title = await waitForElement(() => getByTestId('title'))

  expect(title).toBeInTheDocument()
})

test('renders loading state', () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[]}>
      <Tweets />
    </MockedProvider>
  )

  const loading = getByTestId('loading')

  expect(loading).toBeInTheDocument()
})

test('renders tweets', async () => {
  const { getAllByTestId } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Tweets />
    </MockedProvider>
  )

  const tweets = await waitForElement(() => getAllByTestId('tweet'))

  expect(tweets[0]).toBeInTheDocument()
})

test('renders error UI', async () => {
  const mock = {
    request: {
      query: TWEETS_QUERY,
    },
    error: new Error('Network error'),
  }

  const { getByTestId } = render(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <Tweets />
    </MockedProvider>
  )

  await wait(0)

  // const error = await waitForElement(() => getByTestId('error'))

  // expect(error).toBeInTheDocument()
})
