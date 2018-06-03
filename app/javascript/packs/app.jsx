import React from 'react'
import NoSleep from 'nosleep.js'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from 'services/reducers'
import initChannels from 'services/channels'
import App from '../containers/App'

const isDevelopment = process.env.NODE_ENV === 'development'

if (isDevelopment) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('SW registered: ', registration)
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
    })
  }
  // eslint-disable-next-line no-underscore-dangle
} else if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject) {
  // eslint-disable-next-line no-underscore-dangle
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}
}

const NO_SLEEP = new NoSleep()
function enableNoSleep() {
  NO_SLEEP.enable()
  document.removeEventListener('click', enableNoSleep, false)
}

document.addEventListener('click', enableNoSleep, false)


const store = isDevelopment ?
  createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && // eslint-disable-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
  ) :
  createStore(reducer)

initChannels(store)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
  // remove loader
  const loader = document.getElementById('loader')
  document.body.removeChild(loader)
})
