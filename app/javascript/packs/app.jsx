import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MemoryRouter } from 'react-router-dom'
import reducer from 'services/reducers'
import initChannels from 'services/channels'
import App from '../containers/App'


const store = createStore(
  reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

initChannels(store)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  	<MemoryRouter>
	    <Provider store={store}>
	      <App />
	    </Provider>
	  </MemoryRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
