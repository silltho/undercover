import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router } from 'react-router-dom'
import reducer from 'services/reducers'
import history from 'services/history'
import initChannels from 'services/channels'
import App from '../containers/App'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

initChannels(store)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
