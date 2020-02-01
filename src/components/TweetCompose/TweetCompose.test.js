import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import TweetCompose, { TWEET_COMPOSE } from './TweetCompose'
import session from '../../reducers/session'

const userId = '014fdbf5-5659-5572-82f7-4b4217f4fdc5'

const initialState = {
  session: {
    user: {
      id: userId,
    },
  },
}

// https://testing-library.com/docs/example-react-redux
function renderWithRedux(
  ui,
  { initialState, store = createStore(session, initialState) } = config
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

const text = 'Test tweet'

const mocks = [
  {
    request: {
      query: TWEET_COMPOSE,
      variables: {
        userId,
        text,
      },
    },
    result: {
      data: {
        composeTweet: {
          id: 'd4d58508-4850-5394-b711-381f13f268d9',
          text,
          date: '2020-01-30T21:32:36+0000',
        },
      },
    },
  },
]

test('renders without errors', () => {
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={[]}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const title = getByTestId('title')

  expect(title).toBeInTheDocument()
})

test('sets text state on blur', () => {
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={[]} addTypename={false}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const input = getByTestId('input')

  fireEvent.input(input, { target: { value: text } })
  fireEvent.focusOut(input) // Blur event not working

  console.log('TCL: input', input.value)

  expect(input).toHaveValue(text)
})

test('shows loading state', () => {
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const form = getByTestId('form')
  const input = getByTestId('input')

  fireEvent.input(input, { target: { value: text } })
  fireEvent.blur(input)
  fireEvent.submit(form)

  const loading = getByTestId('loading')

  expect(loading).toBeInTheDocument()
})

test('shows grapql error', async () => {
  const mock = {
    request: {
      query: TWEET_COMPOSE,
      variables: {
        userId,
        text,
      },
    },
    error: new Error('Network error'),
  }
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={[mock]} addTypename={false}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const form = getByTestId('form')
  const input = getByTestId('input')

  fireEvent.input(input, { target: { value: text } })
  fireEvent.blur(input)
  fireEvent.submit(form)

  const error = await waitForElement(() => getByTestId('error'))

  expect(error).toBeInTheDocument()
})

test('shows input error', () => {
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const form = getByTestId('form')
  const input = getByTestId('input')

  fireEvent.input(input, { target: { value: '' } })
  fireEvent.blur(input)
  fireEvent.submit(form)

  const inputError = getByTestId('input-error')

  expect(inputError).toBeInTheDocument()
})

test('show composed tweet result', async () => {
  const { getByTestId } = renderWithRedux(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TweetCompose />
    </MockedProvider>,
    { initialState }
  )

  const form = getByTestId('form')
  const input = getByTestId('input')

  fireEvent.input(input, { target: { value: text } })
  fireEvent.blur(input)
  fireEvent.submit(form)

  const composedTweet = await waitForElement(() =>
    getByTestId('composed-tweet')
  )

  expect(composedTweet).toBeInTheDocument()
})
