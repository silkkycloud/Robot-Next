import { proxy, subscribe } from 'valtio'

const getInitialState = () => {
  try {
    const state = JSON.parse(<string>localStorage.getItem('pipedState'))
    if (state) return state
  } catch (e) {}

  return {
    version: '0.1.0',
    apiUrl: `https://${process.env.NEXT_PUBLIC_API_HOSTNAME}`,
    authenticated: false,
    authToken: '',
    theme: process.env.NEXT_PUBLIC_DEFAULT_THEME,
  }
}

export const state = proxy(getInitialState())

subscribe(state, () => {
  localStorage.setItem('pipedState', JSON.stringify(state))
})

export default state
