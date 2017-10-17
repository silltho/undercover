import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('app-props')
  const props = JSON.parse(node.getAttribute('data'))
  console.log(props)
  ReactDOM.render(
    <App {...props} />,
    document.body.appendChild(document.createElement('div')),
  )
})
