import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from 'services/reducers'
import initChannels from 'services/channels'
import App from '../containers/App'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && // eslint-disable-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
)

initChannels(store)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})
